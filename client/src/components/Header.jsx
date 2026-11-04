import React from 'react';
import { Activity, Clock, RefreshCw } from 'lucide-react';

export function Header({ countdown, refreshing, onRefresh }) {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: '24px',
        marginBottom: '28px',
        flexWrap: 'wrap',
        gap: '20px',
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              backgroundColor: 'rgba(56, 189, 248, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-primary)',
            }}
          >
            <Activity size={20} strokeWidth={2.2} />
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            Jod-Hoon <span style={{ fontWeight: 400, color: 'var(--text-secondary)', fontSize: '18px' }}>(จดหุ้น)</span>
          </h1>
        </div>
        <p style={{ color: 'var(--text-secondary)', marginTop: '6px', fontSize: '14px' }}>
          Multi-Market Portfolio & Live Watchlist (US & Thai SET)
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            borderRadius: '6px',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            fontSize: '13px',
            color: 'var(--text-secondary)',
          }}
        >
          <Clock size={14} color="var(--accent-primary)" />
          <span>Next refresh:</span>
          <span
            className="tabular-numbers"
            style={{
              fontWeight: 600,
              color: countdown <= 5 ? 'var(--accent-primary)' : 'var(--text-primary)',
            }}
          >
            {countdown}s
          </span>
        </div>

        <button
          onClick={onRefresh}
          disabled={refreshing}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--accent-primary)',
            color: '#0b0f19',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 16px',
            cursor: refreshing ? 'not-allowed' : 'pointer',
            fontWeight: 600,
            fontSize: '13px',
            transition: 'opacity 0.15s, transform 0.1s',
            opacity: refreshing ? 0.7 : 1,
          }}
        >
          <RefreshCw size={14} className={refreshing ? 'animate-spin-fast' : ''} />
          <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
        </button>
      </div>
    </header>
  );
}
