import { create } from 'zustand';
import { Stock, Trade, PortfolioSummary } from '@/types';
import { mockStocks, mockTrades, mockPortfolioSummary } from '@/lib/mockData';

interface StoreState {
  // Portfolio
  stocks: Stock[];
  portfolioSummary: PortfolioSummary;
  
  // Trades
  trades: Trade[];
  
  // UI State
  sidebarOpen: boolean;
  
  // Actions
  addStock: (stock: Stock) => void;
  updateStock: (id: string, stock: Partial<Stock>) => void;
  removeStock: (id: string) => void;
  addTrade: (trade: Trade) => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  // Initial State
  stocks: mockStocks,
  portfolioSummary: mockPortfolioSummary,
  trades: mockTrades,
  sidebarOpen: true,
  
  // Actions
  addStock: (stock) =>
    set((state) => ({ stocks: [...state.stocks, stock] })),
  
  updateStock: (id, updatedStock) =>
    set((state) => ({
      stocks: state.stocks.map((stock) =>
        stock.id === id ? { ...stock, ...updatedStock } : stock
      ),
    })),
  
  removeStock: (id) =>
    set((state) => ({
      stocks: state.stocks.filter((stock) => stock.id !== id),
    })),
  
  addTrade: (trade) =>
    set((state) => ({ trades: [...state.trades, trade] })),
  
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
