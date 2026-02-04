// TypeScript type definitions for StockPulse

export interface Stock {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  sector: string;
  country: string;
  addedAt: string;
}

export interface Trade {
  id: string;
  stockId: string;
  symbol: string;
  name: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  date: string;
  memo: string;
  tags: string[];
  targetPrice?: number;
  stopLoss?: number;
  holdingPeriod?: string;
}

export interface JournalEntry {
  id: string;
  tradeId: string;
  date: string;
  content: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
}

export interface PortfolioSummary {
  totalValue: number;
  totalCost: number;
  totalReturn: number;
  totalReturnPercent: number;
  dailyChange: number;
  dailyChangePercent: number;
}

export interface SectorAllocation {
  sector: string;
  value: number;
  percentage: number;
  color: string;
}

export interface AssetHistory {
  date: string;
  value: number;
}

export interface TradeStats {
  totalTrades: number;
  winRate: number;
  avgReturn: number;
  avgHoldingDays: number;
  bestTrade: number;
  worstTrade: number;
}

export interface TagPerformance {
  tag: string;
  trades: number;
  winRate: number;
  avgReturn: number;
}

export interface MarketIndex {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  url: string;
  symbol?: string;
}
