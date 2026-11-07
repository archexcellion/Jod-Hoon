import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export function StatusBanner({ health, error, onRetry }) {
  const isHealthy = health?.database === 'connected';

  if (isHealthy && !error) {
    return null; // Normal status is displayed in SummaryMetrics and Header
  }

  const alertMessage = error || (health?.database !== 'connected' ? 'Database connection degraded or offline.' : null);

  if (!alertMessage) return null;

  return (
    <div
      role="alert"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(248, 113, 113, 0.14)',
        border: '1px solid rgba(248, 113, 113, 0.35)',
        borderRadius: '10px',
        padding: '12px 18px',
        marginBottom: '20px',
        color: 'var(--color-down)',
        fontSize: '14px',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <AlertTriangle size={18} />
        <span>{alertMessage}</span>
      </div>
      <button
        onClick={onRetry}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'transparent',
          border: '1px solid var(--color-down)',
          color: 'var(--color-down)',
          borderRadius: '6px',
          padding: '5px 12px',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 700,
        }}
      >
        <RefreshCw size={12} />
        <span>Retry</span>
      </button>
    </div>
  );
}
