import React from 'react';
import { TrendingUp, TrendingDown, Minus, ArrowUpRight } from 'lucide-react';

export function StockRow({ stock }) {
  const isThai = stock.symbol.endsWith('.BK');
  const isPositive = stock.changePercent > 0;
  const isNegative = stock.changePercent < 0;

  return (
    <tr
      style={{
        borderBottom: '1px solid var(--border-subtle)',
        transition: 'background-color 0.15s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      {/* Asset Symbol & Name */}
      <td style={{ padding: '16px 20px' }}>
        <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)', letterSpacing: '0.01em' }}>
          {stock.symbol}
        </div>
        <div style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '2px' }}>
          {stock.name}
        </div>
      </td>

      {/* Market Badge */}
      <td style={{ padding: '16px 16px' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '3px 8px',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.03em',
            backgroundColor: isThai ? 'var(--badge-set-bg)' : 'var(--badge-us-bg)',
            color: isThai ? 'var(--badge-set-text)' : 'var(--badge-us-text)',
          }}
        >
          {isThai ? 'SET' : 'US'}
        </span>
      </td>

      {/* Price */}
      <td style={{ padding: '16px 20px', textAlign: 'right' }}>
        <div
          className="tabular-numbers"
          style={{
            fontWeight: 600,
            fontSize: '16px',
            color: 'var(--text-primary)',
          }}
        >
          {stock.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', fontWeight: 500 }}>
          {stock.currency}
        </div>
      </td>

      {/* 24h Change Pill */}
      <td style={{ padding: '16px 20px', textAlign: 'right' }}>
        <div
          className="tabular-numbers"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: 600,
            backgroundColor: isPositive
              ? 'var(--color-up-bg)'
              : isNegative
              ? 'var(--color-down-bg)'
              : 'var(--color-neutral-bg)',
            color: isPositive
              ? 'var(--color-up)'
              : isNegative
              ? 'var(--color-down)'
              : 'var(--color-neutral)',
          }}
        >
          {isPositive ? (
            <TrendingUp size={13} strokeWidth={2.5} />
          ) : isNegative ? (
            <TrendingDown size={13} strokeWidth={2.5} />
          ) : (
            <Minus size={13} strokeWidth={2.5} />
          )}
          <span>
            {isPositive ? '+' : ''}
            {stock.changePercent.toFixed(2)}%
          </span>
        </div>
      </td>

      {/* External Yahoo link */}
      <td style={{ padding: '16px 20px', textAlign: 'center' }}>
        <a
          href={`https://finance.yahoo.com/quote/${stock.symbol}`}
          target="_blank"
          rel="noopener noreferrer"
          title={`Open ${stock.symbol} on Yahoo Finance`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            color: 'var(--text-muted)',
            transition: 'color 0.15s, background-color 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--accent-primary)';
            e.currentTarget.style.backgroundColor = 'var(--border-subtle)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-muted)';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <ArrowUpRight size={16} />
        </a>
      </td>
    </tr>
  );
}
