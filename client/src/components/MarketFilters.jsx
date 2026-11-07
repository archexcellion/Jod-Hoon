import React from 'react';
import { Search, X } from 'lucide-react';

export function MarketFilters({ activeMarket, onSelectMarket, marketCounts, searchQuery, onSearchChange }) {
  const tabs = [
    { id: 'ALL', label: 'All Markets', count: marketCounts.ALL },
    { id: 'US', label: 'US Equities', count: marketCounts.US },
    { id: 'SET', label: 'Thai SET', count: marketCounts.SET },
  ];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '16px',
      }}
    >
      {/* Segmented Market Tabs */}
      <div
        role="tablist"
        aria-label="Filter markets"
        style={{
          display: 'inline-flex',
          backgroundColor: 'var(--bg-surface)',
          backdropFilter: 'blur(10px)',
          padding: '4px',
          borderRadius: '10px',
          border: '1px solid var(--border-subtle)',
          gap: '4px',
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeMarket === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectMarket(tab.id)}
              style={{
                background: isActive ? 'var(--bg-amethyst)' : 'transparent',
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                border: isActive ? '1px solid var(--border-gold)' : '1px solid transparent',
                borderRadius: '8px',
                padding: '7px 14px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: isActive ? 700 : 500,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: isActive ? 'var(--glow-gold-subtle)' : 'none',
                transition: 'background 0.2s, color 0.2s, border-color 0.2s',
              }}
            >
              <span>{tab.label}</span>
              <span
                className="tabular-numbers"
                style={{
                  fontSize: '11px',
                  padding: '2px 7px',
                  borderRadius: '999px',
                  backgroundColor: isActive ? 'var(--accent-gold)' : 'rgba(139, 92, 246, 0.15)',
                  color: isActive ? '#07050a' : 'var(--text-muted)',
                  fontWeight: 700,
                }}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Input with Violet Glow */}
      <div style={{ position: 'relative', width: '280px' }}>
        <Search
          size={16}
          style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--accent-violet-light)',
            pointerEvents: 'none',
          }}
        />
        <input
          type="text"
          placeholder="Search symbol or company..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            width: '100%',
            backgroundColor: 'var(--bg-surface)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            padding: '9px 34px 9px 36px',
            color: 'var(--text-primary)',
            fontSize: '13px',
            outline: 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent-violet)';
            e.currentTarget.style.boxShadow = '0 0 0 2px rgba(139, 92, 246, 0.35)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-subtle)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '2px',
            }}
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
