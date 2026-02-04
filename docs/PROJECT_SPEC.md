# Project Overview & Specifications

## Project Goal

**StockPulse** is an investment portfolio management tool that emphasizes **journaling**.
Unlike traditional trackers, it forces users to record "Why" they bought/sold, helping them analyze their decision-making process later.

## Core Features Flow

### 1. Dashboard (`/`)

- **Overview**: View total assets, daily change, and profit/loss.
- **Quick Access**: Recent trades list and sector allocation chart.

### 2. Portfolio (`/portfolio`)

- **CRUD**: Add/Edit/Delete stock holdings.
- **View**: Table view with columns for Quantity, Avg Price, Current Price (Mock), and Return %.

### 3. Trades (`/trades`)

- **Journal Entry**: When adding a trade, user MUST input:
  - Symbol & Price
  - **Memo**: Reason for trade.
  - **Tags**: Strategy tags (e.g., #AI, #DipBuy).
- **Filtering**: Filter logs by tags or "Buy/Sell" type.

### 4. Analysis (`/analysis`)

- **Performance Review**: Calculate Win Rate, Avg Return, and Profit Factor.
- **Tag Analysis**: Which tags (strategies) are performing best?

## Data Models (Core Types)

The application relies on these core TypeScript interfaces (defined in `src/types/index.ts`):

```typescript
// Stock Holding
interface Stock {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  sector: string;
}

// Trade Record
interface Trade {
  id: string;
  stockId: string;
  type: "buy" | "sell";
  price: number;
  quantity: number;
  date: string;
  memo: string; // <--- Core Feature: Investment Logic
  tags: string[]; // <--- Core Feature: Strategy Tags
}

// Market Data
interface MarketIndex {
  symbol: string;
  value: number;
  changePercent: number;
}
```

## User Persona (Target Audience)

- **Active Investors**: Who trade frequently (Swing/Day trading).
- **Learners**: Who want to track their improvement over time.
- **Visualizers**: Who prefer clean, dark-mode dashboards.
