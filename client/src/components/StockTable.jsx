import React from 'react';
import { StockRow } from './StockRow.jsx';

export function StockTable({ loading, stocks, totalCount, searchQuery, onResetFilters, flashKey }) {
  return (
    <div
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '10px',
        overflow: 'hidden',
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
                backgroundColor: 'rgba(11, 15, 25, 0.4)',
                color: 'var(--text-secondary)',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              <th scope="col" style={{ padding: '14px 20px', fontWeight: 600 }}>
                Asset
              </th>
              <th scope="col" style={{ padding: '14px 16px', fontWeight: 600 }}>
                Market
              </th>
              <th scope="col" style={{ padding: '14px 20px', fontWeight: 600, textAlign: 'right' }}>
                Latest Price
              </th>
              <th scope="col" style={{ padding: '14px 20px', fontWeight: 600, textAlign: 'right' }}>
                24h Change
              </th>
              <th scope="col" style={{ padding: '14px 20px', fontWeight: 600, textAlign: 'center' }}>
                Link
              </th>
            </tr>
          </thead>
          <tbody key={flashKey} className="flash-update">
            {loading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '18px 20px' }}>
                    <div style={{ width: '80px', height: '16px', backgroundColor: 'var(--border-subtle)', borderRadius: '4px' }} />
                    <div style={{ width: '130px', height: '12px', backgroundColor: 'var(--border-subtle)', borderRadius: '4px', marginTop: '6px' }} />
                  </td>
                  <td style={{ padding: '18px 16px' }}>
                    <div style={{ width: '40px', height: '20px', backgroundColor: 'var(--border-subtle)', borderRadius: '4px' }} />
                  </td>
                  <td style={{ padding: '18px 20px', textAlign: 'right' }}>
                    <div style={{ width: '90px', height: '18px', backgroundColor: 'var(--border-subtle)', borderRadius: '4px', marginLeft: 'auto' }} />
                  </td>
                  <td style={{ padding: '18px 20px', textAlign: 'right' }}>
                    <div style={{ width: '65px', height: '22px', backgroundColor: 'var(--border-subtle)', borderRadius: '4px', marginLeft: 'auto' }} />
                  </td>
                  <td style={{ padding: '18px 20px', textAlign: 'center' }}>
                    <div style={{ width: '20px', height: '20px', backgroundColor: 'var(--border-subtle)', borderRadius: '4px', margin: '0 auto' }} />
                  </td>
                </tr>
              ))
            ) : stocks.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '48px 20px', textAlign: 'center' }}>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
                    No matching ticker or company found for "{searchQuery}".
                  </p>
                  <button
                    onClick={onResetFilters}
                    style={{
                      marginTop: '12px',
                      background: 'transparent',
                      border: '1px solid var(--border-muted)',
                      color: 'var(--accent-primary)',
                      padding: '6px 14px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '13px',
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

      <div
        style={{
          padding: '12px 20px',
          backgroundColor: 'rgba(11, 15, 25, 0.4)',
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
        <span>Showing {stocks.length} of {totalCount} assets</span>
        <span>Prices update automatically every 60s</span>
      </div>
    </div>
  );
}
