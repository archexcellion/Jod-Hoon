import React from 'react';
import { StockRow } from './StockRow.jsx';

export function StockTable({ loading, stocks, totalCount, searchQuery, onResetFilters, flashKey }) {
  return (
    <div
      style={{
        backgroundColor: 'var(--bg-surface)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      }}
    >
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
            fontSize: '14px',
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: '1px solid var(--border-subtle)',
                backgroundColor: 'rgba(16, 11, 26, 0.85)',
                color: 'var(--text-secondary)',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              <th scope="col" style={{ padding: '14px 22px', fontWeight: 700 }}>
                Asset
              </th>
              <th scope="col" style={{ padding: '14px 16px', fontWeight: 700 }}>
                Market
              </th>
              <th scope="col" style={{ padding: '14px 22px', fontWeight: 700, textAlign: 'right' }}>
                Latest Price
              </th>
              <th scope="col" style={{ padding: '14px 22px', fontWeight: 700, textAlign: 'right' }}>
                24h Change
              </th>
              <th scope="col" style={{ padding: '14px 20px', fontWeight: 700, textAlign: 'center' }}>
                Source
              </th>
            </tr>
          </thead>
          <tbody key={flashKey} className="flash-update">
            {loading ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '18px 22px' }}>
                    <div style={{ width: '80px', height: '16px', backgroundColor: 'var(--border-subtle)', borderRadius: '4px' }} />
                    <div style={{ width: '140px', height: '12px', backgroundColor: 'var(--border-subtle)', borderRadius: '4px', marginTop: '6px' }} />
                  </td>
                  <td style={{ padding: '18px 16px' }}>
                    <div style={{ width: '36px', height: '22px', backgroundColor: 'var(--border-subtle)', borderRadius: '6px' }} />
                  </td>
                  <td style={{ padding: '18px 22px', textAlign: 'right' }}>
                    <div style={{ width: '90px', height: '18px', backgroundColor: 'var(--border-subtle)', borderRadius: '4px', marginLeft: 'auto' }} />
                  </td>
                  <td style={{ padding: '18px 22px', textAlign: 'right' }}>
                    <div style={{ width: '70px', height: '24px', backgroundColor: 'var(--border-subtle)', borderRadius: '6px', marginLeft: 'auto' }} />
                  </td>
                  <td style={{ padding: '18px 20px', textAlign: 'center' }}>
                    <div style={{ width: '24px', height: '24px', backgroundColor: 'var(--border-subtle)', borderRadius: '6px', margin: '0 auto' }} />
                  </td>
                </tr>
              ))
            ) : stocks.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '54px 20px', textAlign: 'center' }}>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
                    No matching assets found for "{searchQuery}".
                  </p>
                  <button
                    onClick={onResetFilters}
                    style={{
                      marginTop: '14px',
                      background: 'transparent',
                      border: '1px solid var(--border-gold)',
                      color: 'var(--accent-gold)',
                      padding: '7px 16px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: 600,
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(234, 179, 8, 0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    Reset filters
                  </button>
                </td>
              </tr>
            ) : (
              stocks.map((stock) => <StockRow key={stock.symbol} stock={stock} />)
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div
        style={{
          padding: '14px 22px',
          backgroundColor: 'rgba(16, 11, 26, 0.65)',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
          color: 'var(--text-muted)',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <span>Displaying {stocks.length} of {totalCount} monitored assets</span>
        <span>Continuous sync interval: 60s • Delayed 15m for non-realtime markets</span>
      </div>
    </div>
  );
}
