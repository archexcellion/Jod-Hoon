import React from 'react';
import { Search } from 'lucide-react';

export function MarketFilters({ activeMarket, onSelectMarket, marketCounts, searchQuery, onSearchChange }) {
  const tabs = [
    { id: 'ALL', label: 'All Assets', count: marketCounts.ALL },
    { id: 'US', label: 'US Equities', count: marketCounts.US },
    { id: 'SET', label: 'Thai SET', count: marketCounts.SET },
  ];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '18px',
        flexWrap: 'wrap',
        gap: '16px',
      }}
    >
      <div
        role="tablist"
        style={{
          display: 'inline-flex',
          backgroundColor: 'var(--bg-surface)',
          padding: '4px',
          borderRadius: '8px',
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
                background: isActive ? 'var(--bg-surface-elevated)' : 'transparent',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                border: isActive ? '1px solid var(--border-muted)' : '1px solid transparent',
                borderRadius: '6px',
                padding: '6px 12px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: isActive ? 600 : 400,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'background 0.15s, color 0.15s',
              }}
            >
              <span>{tab.label}</span>
              <span
                style={{
                  fontSize: '11px',
                  padding: '1px 6px',
                  borderRadius: '999px',
                  backgroundColor: isActive ? 'var(--accent-primary)' : 'var(--border-subtle)',
                  color: isActive ? '#0b0f19' : 'var(--text-muted)',
                  fontWeight: 600,
                }}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      <div style={{ position: 'relative', width: '260px' }}>
        <Search
          size={15}
          style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)',
            pointerEvents: 'none',
          }}
        />
        <input
          type="text"
          placeholder="Filter symbol or company..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            width: '100%',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '6px',
            padding: '8px 12px 8px 34px',
            color: 'var(--text-primary)',
            fontSize: '13px',
            outline: 'none',
          }}
        />
      </div>
    </div>
  );
}
