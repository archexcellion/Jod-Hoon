---
name: Jod-Hoon Luxury Fintech
description: Multi-market equity tracking dashboard with obsidian dark theme, radiant glowing gold accents, and deep violet cuts.
colors:
  primary: "#fbbf24"
  primary-hover: "#f59e0b"
  secondary: "#8b5cf6"
  secondary-light: "#a78bfa"
  neutral-bg: "#07050a"
  surface: "#100b1a"
  surface-elevated: "#1a112a"
  surface-hover: "#2a1c44"
  border-subtle: "rgba(139, 92, 246, 0.16)"
  border-gold: "rgba(234, 179, 8, 0.4)"
  text-primary: "#ffffff"
  text-secondary: "#cbd5e1"
  text-muted: "#94a3b8"
  color-up: "#34d399"
  color-down: "#f87171"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
    fontSize: "26px"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.02em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  full: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "36px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.md}"
    padding: "9px 18px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
---

# Design System: Jod-Hoon Luxury Fintech

## Overview

**Creative North Star: "Obsidian Aura & Gilded Glass"**

Jod-Hoon pairs the solemn authority of deep obsidian dark backgrounds with the high-voltage clarity of liquid metallic gold and electric violet cutaways. Designed for serious market monitors tracking cross-border equities across the US and Thai SET, every surface balances luxury aesthetics with high-frequency scanability.

Surfaces use layered translucent glass panels (`rgba(16, 11, 26, 0.72)`) with ambient radial backlights, creating a three-dimensional viewport without clutter. Critical financial indicators radiate clear sentiment signals while remaining calm at rest.

**Key Characteristics:**
- Deep obsidian canvas (`#07050a`) grounded with subtle ambient violet and gold radial gradients.
- Radiant metallic gold accents (`#fbbf24`, `#f59e0b`) dedicated to focal numbers, sync triggers, and active states.
- Electric violet accents (`#8b5cf6`, `#1c1032`) cutting harsh contrast and providing depth.
- Monospace tabular figures (`tabular-nums`) across all prices, percentages, and counters.

## Colors

A high-contrast luxury fintech palette where deep void black is illuminated by molten gold and balanced by electric violet.

### Primary
- **Radiant Liquid Gold** (`#fbbf24` / `linear-gradient(135deg, #fef08a, #fbbf24, #d97706)`): Primary action button, active market badge, brand crest, and top-performer highlights.
- **Deep Amber Gold** (`#f59e0b`): Hover states and warm borders.

### Secondary
- **Electric Violet** (`#8b5cf6`): Focus rings, search input highlights, and market segmentation borders.
- **Soft Amethyst** (`#a78bfa`): Secondary icons, clock icons, and inactive badge accents.
- **Deep Obsidian Amethyst** (`#140d24`): Active tab background and elevated surface contrast.

### Neutral
- **Obsidian Black Canvas** (`#07050a`): The base void background.
- **Obsidian Glass Surface** (`rgba(16, 11, 26, 0.72)`): Container cards, table body, and search bar.
- **Pure White** (`#ffffff`): Primary tickers, prices, and high-salience text.
- **Muted Slate** (`#cbd5e1`, `#94a3b8`): Company names, secondary captions, and time markers.

### Sentiment
- **Emerald Green** (`#34d399`): Positive 24h change and operational system status.
- **Rose Red** (`#f87171`): Negative 24h change and critical error states.

### Named Rules
**The Gilded Focus Rule.** Gold is reserved strictly for value-bearing signals: primary actions, top performers, active selection, and the brand mark. It never paints passive decorative bars.

**The Violet Depth Rule.** Violet is used for structural separation and ambient depth, cutting the stark black-and-gold contrast and easing ocular fatigue during extended viewing.

## Typography

**Display Font:** System UI Sans (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif`)
**Body Font:** System UI Sans (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif`)
**Label/Mono Font:** Tabular Monospace (`ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`)

**Character:** High-precision executive fintech voice combining crisp grotesque geometric headers with zero-jitter monospace numbers.

### Hierarchy
- **Display** (800, 26px, 1.2): Main application brand title with gold shimmer fill.
- **Headline** (700, 18px-24px, 1.3): Major metric numbers and section headers.
- **Title** (600, 14px-15px, 1.4): Table headers, ticker symbols, and card labels.
- **Body** (400, 13px-14px, 1.5): Company names, status descriptions, and search input text.
- **Label** (700, 11px-12px, 0.05em tracking, uppercase): Market pills, metric category kickers, and table column titles.

## Layout

- **Container Model**: Max-width `1160px` centered with responsive horizontal padding (`20px` to `36px`).
- **Spatial Rhythm**: `8px` base grid step. Spacing flows from `16px` between cards to `24px`-`28px` between major vertical sections.
- **Responsive Stacking**: 
  - Desktop (>1024px): 4-column overview metrics and 5-column table.
  - Mobile (<768px): Stacked KPI metrics, horizontally scrollable data table with touch targets (>44px).

## Elevation & Depth

Surfaces rely on tonal glass layering with multi-stop backdrop blur rather than heavy drop shadows.

### Shadow & Glow Vocabulary
- **Gold Focal Glow** (`box-shadow: 0 0 20px -2px rgba(245, 158, 11, 0.42)`): Applied to primary sync button and active highlights.
- **Subtle Gold Rim** (`box-shadow: 0 0 10px rgba(234, 179, 8, 0.28), 0 0 2px rgba(251, 191, 36, 0.6)`): Applied to active tab and hover states.
- **Violet Ambient Glow** (`box-shadow: 0 0 24px -4px rgba(139, 92, 246, 0.32)`): Search focus and surface elevation.

### Named Rules
**The Glass-Over-Void Rule.** Surfaces are translucent with `backdrop-filter: blur(14px)`. They let subtle ambient radial canvas lighting show through while maintaining contrast.

## Shapes

- **Corner Radii**: Standard elements use `8px` (`--rounded-md`), cards and tables use `12px` (`--rounded-lg`), pill badges use `999px` (`--rounded-full`).
- **Borders**: 1px hairline translucent borders (`rgba(139, 92, 246, 0.16)`) around all cards and tables.

## Components

### Buttons
- **Primary ("Sync Now")**:
  - Background: Gradient gold (`linear-gradient(135deg, #fef08a 0%, #fbbf24 50%, #d97706 100%)`).
  - Text: Deep obsidian black (`#07050a`), 700 weight, 13px.
  - Glow: `0 0 20px -2px rgba(245, 158, 11, 0.42)`.
  - Hover: Subtle translateY(-1px) and intensified 24px golden halo.

### Segmented Market Switch
- Background: Obsidian glass container (`rgba(16, 11, 26, 0.72)`).
- Active Tab: Amethyst ground (`#140d24`), gold hairline border (`rgba(234, 179, 8, 0.4)`), gold numeric count badge.
- Inactive Tab: Transparent, muted slate text, violet count badge.

### Summary KPI Cards
- Corner: `12px` radius.
- Background: Glass obsidian with hairline violet border.
- Hover: Border shifts to gold with soft gold corner halo.

### Stock Table & Rows
- Header: Dark amethyst translucent strip with uppercase tracking.
- Row Hover: Background transitions to violet glass, reveals a 3px vertical glowing gold indicator bar on the left edge.
- Price: Monospace digits formatted to 2 decimals with currency sub-label.
- 24h Change Pill: Glowing border badge with directional arrow (emerald for gains, rose for declines).
- External Action: Yahoo Finance launcher icon illuminating gold on hover.

## Do's and Don'ts

### Do:
- **Do** format all financial numerals with monospace tabular numbers (`font-variant-numeric: tabular-nums`).
- **Do** use gold for primary actions, active highlights, and value highlights.
- **Do** balance black and gold with violet glass surfaces to prevent harsh visual fatigue.
- **Do** maintain smooth 60s auto-refresh countdown and instant sync animations without layout shift.

### Don't:
- **Don't** use gold as a generic background for large content containers or panels.
- **Don't** use pure solid black (`#000000`) for surfaces; use obsidian violet glass (`rgba(16, 11, 26, 0.72)`).
- **Don't** remove tabular alignment on prices or percentage movements.
- **Don't** let error banners clutter the UI when systems are functioning normally.
