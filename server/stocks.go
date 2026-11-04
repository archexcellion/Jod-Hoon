package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"sync"
	"time"
)

type StockQuote struct {
	Symbol        string    `json:"symbol"`
	Name          string    `json:"name"`
	Price         float64   `json:"price"`
	Currency      string    `json:"currency"`
	ChangePercent float64   `json:"changePercent"`
	UpdatedAt     time.Time `json:"updatedAt"`
}

type TrackedStock struct {
	Symbol string
	Name   string
}

var defaultTrackedStocks = []TrackedStock{
	{Symbol: "AAPL", Name: "Apple Inc."},
	{Symbol: "NVDA", Name: "NVIDIA Corp."},
	{Symbol: "MSFT", Name: "Microsoft Corp."},
	{Symbol: "PTT.BK", Name: "PTT Public Co."},
	{Symbol: "CPALL.BK", Name: "CP ALL Public Co."},
	{Symbol: "DELTA.BK", Name: "Delta Electronics"},
}

type yahooChartResponse struct {
	Chart struct {
		Result []struct {
			Meta struct {
				Currency                   string  `json:"currency"`
				Symbol                     string  `json:"symbol"`
				RegularMarketPrice         float64 `json:"regularMarketPrice"`
				RegularMarketChangePercent float64 `json:"regularMarketChangePercent"`
			} `json:"meta"`
		} `json:"result"`
	} `json:"chart"`
}

// parse the Yahoo Finance chart response and extract the stock quote information.
func parseYahooChartResponse(data []byte) (*StockQuote, error) {
	var resp yahooChartResponse
	if err := json.Unmarshal(data, &resp); err != nil {
		return nil, fmt.Errorf("json unmarshal failed: %w", err)
	}

	if len(resp.Chart.Result) == 0 {
		return nil, errors.New("empty result from yahoo finance")
	}

	meta := resp.Chart.Result[0].Meta
	return &StockQuote{
		Symbol:        meta.Symbol,
		Price:         meta.RegularMarketPrice,
		Currency:      meta.Currency,
		ChangePercent: meta.RegularMarketChangePercent,
		UpdatedAt:     time.Now().UTC(),
	}, nil
}

type StockCache struct {
	sync.RWMutex
	quotes      []StockQuote
	lastUpdated time.Time
	ttl         time.Duration
}

var cache = &StockCache{
	ttl: 45 * time.Second,
}

var httpClient = &http.Client{
	Timeout: 8 * time.Second,
}

// fetchYahooQuote fetches the stock quote for a given symbol from the Yahoo Finance API.
func fetchYahooQuote(symbol, name string) (*StockQuote, error) {
	url := fmt.Sprintf("https://query1.finance.yahoo.com/v8/finance/chart/%s?interval=1d&range=1d", symbol)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")

	resp, err := httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("yahoo api returned status %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	quote, err := parseYahooChartResponse(body)
	if err != nil {
		return nil, err
	}

	quote.Name = name
	return quote, nil
}

// returns the cached stock quotes if they are still valid, otherwise fetches new quotes from Yahoo Finance.
func getStockQuotes() []StockQuote {
	cache.RLock()
	if len(cache.quotes) > 0 && time.Since(cache.lastUpdated) < cache.ttl {
		quotes := make([]StockQuote, len(cache.quotes))
		copy(quotes, cache.quotes)
		cache.RUnlock()
		return quotes
	}
	cache.RUnlock()

	cache.Lock()
	defer cache.Unlock()

	// Double check after acquiring write lock
	if len(cache.quotes) > 0 && time.Since(cache.lastUpdated) < cache.ttl {
		quotes := make([]StockQuote, len(cache.quotes))
		copy(quotes, cache.quotes)
		return quotes
	}

	var wg sync.WaitGroup
	results := make([]StockQuote, len(defaultTrackedStocks))

	for i, item := range defaultTrackedStocks {
		wg.Add(1)
		go func(idx int, stock TrackedStock) {
			defer wg.Done()
			quote, err := fetchYahooQuote(stock.Symbol, stock.Name)
			if err != nil {
				log.Printf("Error fetching quote for %s: %v", stock.Symbol, err)
				for _, prev := range cache.quotes {
					if prev.Symbol == stock.Symbol {
						results[idx] = prev
						return
					}
				}
				results[idx] = StockQuote{
					Symbol:        stock.Symbol,
					Name:          stock.Name,
					Price:         0,
					Currency:      "USD",
					ChangePercent: 0,
					UpdatedAt:     time.Now().UTC(),
				}
				return
			}
			results[idx] = *quote
		}(i, item)
	}

	wg.Wait()
	cache.quotes = results
	cache.lastUpdated = time.Now().UTC()

	quotes := make([]StockQuote, len(cache.quotes))
	copy(quotes, cache.quotes)
	return quotes
}
