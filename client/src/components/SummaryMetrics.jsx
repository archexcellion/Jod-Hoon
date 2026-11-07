import React, { useMemo } from 'react';
import { TrendingUp, Award, Layers, ShieldCheck } from 'lucide-react';

export function SummaryMetrics({ stocks = [], health, lastUpdated }) {
  const metrics = useMemo(() => {
    if (!stocks || stocks.length === 0) {
      return {
        total: 0,
        usCount: 0,
        setCount: 0,
        topGainer: null,
        advancers: 0,
        decliners: 0,
      };
    }

    const setCount = stocks.filter((s) => s.symbol.endsWith('.BK')).length;
    const usCount = stocks.length - setCount;

    let top = stocks[0];
    let adv = 0;
    let dec = 0;

    stocks.forEach((s) => {
      if (s.changePercent > (top?.changePercent ?? -Infinity)) {
        top = s;
      }
      if (s.changePercent > 0) adv += 1;
      else if (s.changePercent < 0) dec += 1;
    });

    return {
      total: stocks.length,
      usCount,
      setCount,
      topGainer: top && top.changePercent > 0 ? top : null,
      advancers: adv,
      decliners: dec,
    };
  }, [stocks]);

  const cardStyle = {
    flex: '1 1 240px',
    backgroundColor: 'var(--bg-surface)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    border: '1px solid var(--border-subtle)',
    borderRadius: '12px',
    padding: '16px 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '100px',
    transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
  };

  return (
    <section
      aria-label="Market Overview Metrics"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '24px',
      }}
    >
      {/* 1. Total Monitored Assets */}
      <div
        style={cardStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-gold)';
          e.currentTarget.style.boxShadow = 'var(--glow-gold-subtle)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-subtle)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Monitored Assets
          </span>
          <Layers size={16} color="var(--accent-gold)" />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '8px' }}>
          <span className="tabular-numbers" style={{ fontSize: '26px', fontWeight: 700, color: 'var(--text-primary)' }}>
            {metrics.total}
          </span>
          <div style={{ display: 'flex', gap: '6px', fontSize: '11px', fontWeight: 600 }}>
            <span style={{ color: 'var(--badge-us-text)', backgroundColor: 'var(--badge-us-bg)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--badge-us-border)' }}>
              US {metrics.usCount}
            </span>
            <span style={{ color: 'var(--badge-set-text)', backgroundColor: 'var(--badge-set-bg)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--badge-set-border)' }}>
              SET {metrics.setCount}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Top Gainer */}
      <div
        style={cardStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-gold)';
          e.currentTarget.style.boxShadow = 'var(--glow-gold-subtle)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-subtle)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Top Performer (24h)
          </span>
          <Award size={16} color="var(--accent-gold)" />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '8px' }}>
          <div>
            <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent-gold)' }}>
              {metrics.topGainer ? metrics.topGainer.symbol : '—'}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '6px' }}>
              {metrics.topGainer ? metrics.topGainer.name?.slice(0, 16) : 'Scanning...'}
            </span>
          </div>
          {metrics.topGainer && (
            <span
              className="tabular-numbers"
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--color-up)',
                backgroundColor: 'var(--color-up-bg)',
                padding: '3px 8px',
                borderRadius: '6px',
                border: '1px solid rgba(52, 211, 153, 0.25)',
              }}
            >
              +{metrics.topGainer.changePercent.toFixed(2)}%
            </span>
          )}
        </div>
      </div>

      {/* 3. Market Breadth */}
      <div
        style={cardStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-gold)';
          e.currentTarget.style.boxShadow = 'var(--glow-gold-subtle)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-subtle)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Market Breadth
          </span>
          <TrendingUp size={16} color="var(--accent-violet)" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Advancing:</span>
            <span className="tabular-numbers" style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-up)' }}>
              {metrics.advancers}
            </span>
          </div>
          <span style={{ color: 'var(--border-muted)' }}>•</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Declining:</span>
            <span className="tabular-numbers" style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-down)' }}>
              {metrics.decliners}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Live Data Pipeline */}
      <div
        style={cardStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-gold)';
          e.currentTarget.style.boxShadow = 'var(--glow-gold-subtle)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-subtle)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Live Feed Pipeline
          </span>
          <ShieldCheck size={16} color="var(--color-up)" />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '8px' }}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
            Yahoo Finance v8
          </span>
          <span className="tabular-numbers" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            {lastUpdated ? lastUpdated.toLocaleTimeString() : 'syncing...'}
          </span>
        </div>
      </div>
    </section>
  );
}
