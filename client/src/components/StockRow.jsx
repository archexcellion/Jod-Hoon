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
        transition: 'background-color 0.15s, border-left-color 0.15s',
        borderLeft: '3px solid transparent',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)';
        e.currentTarget.style.borderLeftColor = 'var(--accent-gold)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.borderLeftColor = 'transparent';
      }}
    >
      {/* Asset Symbol & Name */}
      <td style={{ padding: '16px 22px' }}>
        <div
          className="tabular-numbers"
          style={{
            fontWeight: 700,
            fontSize: '15px',
            color: 'var(--text-primary)',
            letterSpacing: '0.02em',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {stock.symbol}
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '3px', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {stock.name || '—'}
        </div>
      </td>

      {/* Market Badge */}
      <td style={{ padding: '16px 16px' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '3px 9px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.04em',
            backgroundColor: isThai ? 'var(--badge-set-bg)' : 'var(--badge-us-bg)',
            color: isThai ? 'var(--badge-set-text)' : 'var(--badge-us-text)',
            border: isThai ? '1px solid var(--badge-set-border)' : '1px solid var(--badge-us-border)',
          }}
        >
          {isThai ? 'SET' : 'US'}
        </span>
      </td>

      {/* Price */}
      <td style={{ padding: '16px 22px', textAlign: 'right' }}>
        <div
          className="tabular-numbers"
          style={{
            fontWeight: 700,
            fontSize: '16px',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {typeof stock.price === 'number'
            ? stock.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            : '—'}
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', fontWeight: 600 }}>
          {stock.currency}
        </div>
      </td>

      {/* 24h Change Pill */}
      <td style={{ padding: '16px 22px', textAlign: 'right' }}>
        <div
          className="tabular-numbers"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: 700,
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
            border: `1px solid ${
              isPositive
                ? 'rgba(52, 211, 153, 0.25)'
                : isNegative
                ? 'rgba(248, 113, 113, 0.25)'
                : 'rgba(148, 163, 184, 0.25)'
            }`,
          }}
        >
          {isPositive ? (
            <TrendingUp size={13} strokeWidth={2.6} />
          ) : isNegative ? (
            <TrendingDown size={13} strokeWidth={2.6} />
          ) : (
            <Minus size={13} strokeWidth={2.6} />
          )}
          <span>
            {isPositive ? '+' : ''}
            {typeof stock.changePercent === 'number' ? stock.changePercent.toFixed(2) : '0.00'}%
          </span>
        </div>
      </td>

      {/* External Yahoo link */}
      <td style={{ padding: '16px 20px', textAlign: 'center' }}>
        <a
          href={`https://finance.yahoo.com/quote/${stock.symbol}`}
          target="_blank"
          rel="noopener noreferrer"
          title={`View ${stock.symbol} live on Yahoo Finance`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '30px',
            height: '30px',
            borderRadius: '6px',
            color: 'var(--text-muted)',
            border: '1px solid transparent',
            transition: 'color 0.15s, background-color 0.15s, border-color 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--accent-gold)';
            e.currentTarget.style.backgroundColor = 'rgba(234, 179, 8, 0.12)';
            e.currentTarget.style.borderColor = 'var(--border-gold)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-muted)';
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor = 'transparent';
          }}
        >
          <ArrowUpRight size={16} strokeWidth={2.2} />
        </a>
      </td>
    </tr>
  );
}
