import React from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

export function StatusBanner({ health, lastUpdated, error, onRetry }) {
  const isHealthy = health?.database === 'connected';

  return (
    <>
      <section
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '8px',
          padding: '12px 18px',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '13px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              className={isHealthy ? 'animate-pulse-dot' : ''}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: isHealthy ? 'var(--color-up)' : 'var(--color-down)',
                display: 'inline-block',
              }}
            />
            <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>System Operational</span>
          </div>
          <span style={{ color: 'var(--border-muted)' }}>•</span>
          <span style={{ color: 'var(--text-secondary)' }}>
            PostgreSQL: <span style={{ color: 'var(--text-primary)' }}>{health?.database || 'checking...'}</span>
          </span>
          <span style={{ color: 'var(--border-muted)' }}>•</span>
          <span style={{ color: 'var(--text-secondary)' }}>
            Feed: <span style={{ color: 'var(--text-primary)' }}>Yahoo Finance v8</span>
          </span>
        </div>

        {lastUpdated && (
          <div style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={14} color="var(--color-up)" />
            <span>Updated at:</span>
            <span className="tabular-numbers" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
              {lastUpdated.toLocaleTimeString()}
            </span>
          </div>
        )}
      </section>

      {error && (
        <div
          role="alert"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--color-down-bg)',
            border: '1px solid var(--color-down)',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '24px',
            color: 'var(--color-down)',
            fontSize: '14px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertTriangle size={18} />
            <span>{error}</span>
          </div>
          <button
            onClick={onRetry}
            style={{
              background: 'transparent',
              border: '1px solid var(--color-down)',
              color: 'var(--color-down)',
              borderRadius: '4px',
              padding: '4px 10px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 600,
            }}
          >
            Retry
          </button>
        </div>
      )}
    </>
  );
}
