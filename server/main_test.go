package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestParseYahooChartResponse(t *testing.T) {
	sampleJSON := []byte(`{
		"chart": {
			"result": [
				{
					"meta": {
						"currency": "USD",
						"symbol": "AAPL",
						"regularMarketPrice": 225.50,
						"regularMarketChangePercent": 1.25
					}
				}
			]
		}
	}`)

	quote, err := parseYahooChartResponse(sampleJSON)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if quote.Symbol != "AAPL" {
		t.Errorf("expected symbol AAPL, got %s", quote.Symbol)
	}
	if quote.Price != 225.50 {
		t.Errorf("expected price 225.50, got %f", quote.Price)
	}
	if quote.Currency != "USD" {
		t.Errorf("expected currency USD, got %s", quote.Currency)
	}
	if quote.ChangePercent != 1.25 {
		t.Errorf("expected changePercent 1.25, got %f", quote.ChangePercent)
	}
}

func TestParseYahooChartResponse_Invalid(t *testing.T) {
	invalidJSON := []byte(`{"chart":{"result":[]}}`)
	_, err := parseYahooChartResponse(invalidJSON)
	if err == nil {
		t.Fatal("expected error on empty result, got nil")
	}
}

func TestStocksHandler(t *testing.T) {
	req := httptest.NewRequest("GET", "/api/stocks", nil)
	rr := httptest.NewRecorder()

	stocksHandler(rr, req)

	if rr.Code != http.StatusOK {
		t.Errorf("expected status 200, got %d", rr.Code)
	}

	var stocks []StockQuote
	if err := json.Unmarshal(rr.Body.Bytes(), &stocks); err != nil {
		t.Fatalf("failed to decode response: %v", err)
	}

	if len(stocks) == 0 {
		t.Errorf("expected at least 1 stock, got 0")
	}
}
