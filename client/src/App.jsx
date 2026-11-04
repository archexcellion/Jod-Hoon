import React, { useState, useMemo } from 'react';
import { useStocks } from './hooks/useStocks.js';
import { Header } from './components/Header.jsx';
import { StatusBanner } from './components/StatusBanner.jsx';
import { MarketFilters } from './components/MarketFilters.jsx';
import { StockTable } from './components/StockTable.jsx';

export default function App() {
  const {
    health,
    stocks,
    loading,
    refreshing,
    error,
    lastUpdated,
    countdown,
    flashKey,
    refresh,
  } = useStocks();

  const [activeMarket, setActiveMarket] = useState('ALL'); // 'ALL' | 'US' | 'SET'
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStocks = useMemo(() => {
    return stocks.filter((stock) => {
      const isThai = stock.symbol.endsWith('.BK');
      if (activeMarket === 'US' && isThai) return false;
      if (activeMarket === 'SET' && !isThai) return false;

      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        stock.symbol.toLowerCase().includes(query) ||
        (stock.name && stock.name.toLowerCase().includes(query))
      );
    });
  }, [stocks, activeMarket, searchQuery]);

  const marketCounts = useMemo(() => {
    const thaiCount = stocks.filter((s) => s.symbol.endsWith('.BK')).length;
    return {
      ALL: stocks.length,
      US: stocks.length - thaiCount,
      SET: thaiCount,
    };
  }, [stocks]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveMarket('ALL');
  };

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '40px 24px 80px' }}>
      <Header countdown={countdown} refreshing={refreshing} onRefresh={refresh} />
      <StatusBanner health={health} lastUpdated={lastUpdated} error={error} onRetry={refresh} />
      <MarketFilters
        activeMarket={activeMarket}
        onSelectMarket={setActiveMarket}
        marketCounts={marketCounts}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <StockTable
        loading={loading}
        stocks={filteredStocks}
        totalCount={stocks.length}
        searchQuery={searchQuery}
        onResetFilters={handleResetFilters}
        flashKey={flashKey}
      />
    </div>
  );
}
