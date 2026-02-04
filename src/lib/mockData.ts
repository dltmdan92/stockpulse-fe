import {
  Stock,
  Trade,
  PortfolioSummary,
  SectorAllocation,
  AssetHistory,
  TradeStats,
  TagPerformance,
  MarketIndex,
  NewsItem,
} from '@/types';

// Mock Stocks
export const mockStocks: Stock[] = [
  {
    id: '1',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    quantity: 50,
    avgPrice: 175.5,
    currentPrice: 189.84,
    sector: 'Technology',
    country: 'US',
    addedAt: '2024-01-15',
  },
  {
    id: '2',
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    quantity: 20,
    avgPrice: 450.0,
    currentPrice: 721.28,
    sector: 'Technology',
    country: 'US',
    addedAt: '2024-02-01',
  },
  {
    id: '3',
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    quantity: 30,
    avgPrice: 380.0,
    currentPrice: 415.5,
    sector: 'Technology',
    country: 'US',
    addedAt: '2024-01-20',
  },
  {
    id: '4',
    symbol: '005930',
    name: '삼성전자',
    quantity: 100,
    avgPrice: 72000,
    currentPrice: 75400,
    sector: 'Technology',
    country: 'KR',
    addedAt: '2024-01-10',
  },
  {
    id: '5',
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    quantity: 25,
    avgPrice: 155.0,
    currentPrice: 178.25,
    sector: 'Consumer Discretionary',
    country: 'US',
    addedAt: '2024-02-05',
  },
  {
    id: '6',
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    quantity: 40,
    avgPrice: 170.0,
    currentPrice: 195.8,
    sector: 'Financials',
    country: 'US',
    addedAt: '2024-01-25',
  },
];

// Mock Trades
export const mockTrades: Trade[] = [
  {
    id: '1',
    stockId: '1',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    type: 'buy',
    quantity: 50,
    price: 175.5,
    date: '2024-01-15',
    memo: 'AI 관련 기대감, 신규 제품 출시 예정. 장기 보유 목적.',
    tags: ['#장기투자', '#빅테크', '#AI'],
    targetPrice: 200,
    stopLoss: 160,
  },
  {
    id: '2',
    stockId: '2',
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    type: 'buy',
    quantity: 20,
    price: 450.0,
    date: '2024-02-01',
    memo: 'AI 반도체 시장 성장, 데이터센터 수요 급증 예상',
    tags: ['#AI', '#반도체', '#모멘텀'],
    targetPrice: 800,
    stopLoss: 400,
  },
  {
    id: '3',
    stockId: '3',
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    type: 'buy',
    quantity: 15,
    price: 220.0,
    date: '2024-01-05',
    memo: '전기차 시장 확대, 저점 매수 기회',
    tags: ['#저점매수', '#전기차'],
    targetPrice: 280,
    stopLoss: 190,
  },
  {
    id: '4',
    stockId: '3',
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    type: 'sell',
    quantity: 15,
    price: 248.5,
    date: '2024-02-20',
    memo: '목표가 달성 전 부분 익절. 시장 변동성 증가.',
    tags: ['#익절', '#전기차'],
  },
];

// Mock Portfolio Summary
export const mockPortfolioSummary: PortfolioSummary = {
  totalValue: 45892350,
  totalCost: 38500000,
  totalReturn: 7392350,
  totalReturnPercent: 19.2,
  dailyChange: 523400,
  dailyChangePercent: 1.15,
};

// Mock Sector Allocation
export const mockSectorAllocation: SectorAllocation[] = [
  { sector: 'Technology', value: 32500000, percentage: 70.8, color: '#3b82f6' },
  { sector: 'Consumer Discretionary', value: 4456250, percentage: 9.7, color: '#8b5cf6' },
  { sector: 'Financials', value: 7832000, percentage: 17.1, color: '#22c55e' },
  { sector: 'Healthcare', value: 1104100, percentage: 2.4, color: '#f59e0b' },
];

// Mock Asset History (30 days)
export const mockAssetHistory: AssetHistory[] = [
  { date: '2024-01-05', value: 35000000 },
  { date: '2024-01-10', value: 36200000 },
  { date: '2024-01-15', value: 35800000 },
  { date: '2024-01-20', value: 37500000 },
  { date: '2024-01-25', value: 38900000 },
  { date: '2024-01-30', value: 39200000 },
  { date: '2024-02-01', value: 40100000 },
  { date: '2024-02-05', value: 41500000 },
  { date: '2024-02-10', value: 40800000 },
  { date: '2024-02-15', value: 42300000 },
  { date: '2024-02-20', value: 43800000 },
  { date: '2024-02-25', value: 44200000 },
  { date: '2024-02-28', value: 45368950 },
  { date: '2024-02-29', value: 45892350 },
];

// Mock Trade Stats
export const mockTradeStats: TradeStats = {
  totalTrades: 28,
  winRate: 67.8,
  avgReturn: 12.4,
  avgHoldingDays: 32,
  bestTrade: 58.6,
  worstTrade: -18.2,
};

// Mock Tag Performance
export const mockTagPerformance: TagPerformance[] = [
  { tag: '#AI', trades: 8, winRate: 87.5, avgReturn: 24.3 },
  { tag: '#저점매수', trades: 6, winRate: 66.7, avgReturn: 15.2 },
  { tag: '#모멘텀', trades: 5, winRate: 60.0, avgReturn: 8.7 },
  { tag: '#장기투자', trades: 4, winRate: 75.0, avgReturn: 18.5 },
  { tag: '#실적시즌', trades: 3, winRate: 33.3, avgReturn: -2.1 },
  { tag: '#반도체', trades: 2, winRate: 100.0, avgReturn: 35.8 },
];

// Mock Market Indices
export const mockMarketIndices: MarketIndex[] = [
  { symbol: 'SPX', name: 'S&P 500', value: 5078.18, change: 41.63, changePercent: 0.83 },
  { symbol: 'NDX', name: 'NASDAQ 100', value: 17914.62, change: 183.02, changePercent: 1.03 },
  { symbol: 'KOSPI', name: 'KOSPI', value: 2642.36, change: -12.45, changePercent: -0.47 },
  { symbol: 'DJI', name: 'Dow Jones', value: 38654.42, change: 125.69, changePercent: 0.33 },
];

// Mock News
export const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'NVIDIA 실적 발표, AI 반도체 수요 폭발적 성장',
    source: 'Bloomberg',
    date: '2024-02-29',
    url: '#',
    symbol: 'NVDA',
  },
  {
    id: '2',
    title: 'Apple, 차세대 M4 칩 탑재 맥북 출시 예정',
    source: 'Reuters',
    date: '2024-02-28',
    url: '#',
    symbol: 'AAPL',
  },
  {
    id: '3',
    title: 'Fed 금리 인하 신호에 기술주 강세',
    source: 'CNBC',
    date: '2024-02-28',
    url: '#',
  },
  {
    id: '4',
    title: '삼성전자, HBM3E 양산 본격화',
    source: '한국경제',
    date: '2024-02-27',
    url: '#',
    symbol: '005930',
  },
  {
    id: '5',
    title: 'Microsoft, OpenAI와 신규 파트너십 발표',
    source: 'TechCrunch',
    date: '2024-02-27',
    url: '#',
    symbol: 'MSFT',
  },
];
