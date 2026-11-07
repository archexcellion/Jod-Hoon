import React from 'react';
import { Activity, Clock, RefreshCw } from 'lucide-react';

export function Header({ countdown, refreshing, onRefresh }) {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: '24px',
        marginBottom: '28px',
        flexWrap: 'wrap',
        gap: '20px',
      }}
    >
      {/* Brand & Identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.25) 0%, rgba(139, 92, 246, 0.25) 100%)',
            border: '1px solid var(--border-gold)',
            boxShadow: 'var(--glow-gold-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-gold)',
          }}
        >
          <Activity size={24} strokeWidth={2.4} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <h1
              style={{
                fontSize: '26px',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #ffffff 40%, var(--accent-gold) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Jod-Hoon
            </h1>
            <span
              style={{
                fontWeight: 600,
                fontSize: '15px',
                color: 'var(--accent-gold)',
                letterSpacing: '0.02em',
              }}
            >
              (จดหุ้น)
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', marginTop: '2px', fontSize: '13px' }}>
            Multi-Market Portfolio & Live Watchlist • US & Thai SET
          </p>
        </div>
      </div>

      {/* Control Actions & Refresh Timer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '7px 14px',
            borderRadius: '8px',
            backgroundColor: 'var(--bg-surface)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--border-subtle)',
            fontSize: '13px',
            color: 'var(--text-secondary)',
          }}
        >
          <Clock size={14} color="var(--accent-violet-light)" />
          <span>Next auto-sync:</span>
          <span
            className="tabular-numbers"
            style={{
              fontWeight: 700,
              color: countdown <= 5 ? 'var(--accent-gold)' : 'var(--text-primary)',
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
            background: 'var(--accent-gold-gradient)',
            color: '#07050a',
            border: 'none',
            borderRadius: '8px',
            padding: '9px 18px',
            cursor: refreshing ? 'not-allowed' : 'pointer',
            fontWeight: 700,
            fontSize: '13px',
            letterSpacing: '0.01em',
            boxShadow: 'var(--glow-gold)',
            transition: 'opacity 0.15s, transform 0.15s, box-shadow 0.15s',
            opacity: refreshing ? 0.75 : 1,
          }}
          onMouseEnter={(e) => {
            if (!refreshing) {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 0 24px rgba(251, 191, 36, 0.6)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--glow-gold)';
          }}
        >
          <RefreshCw size={14} className={refreshing ? 'animate-spin-fast' : ''} strokeWidth={2.5} />
          <span>{refreshing ? 'Syncing...' : 'Sync Now'}</span>
        </button>
      </div>
    </header>
  );
}
