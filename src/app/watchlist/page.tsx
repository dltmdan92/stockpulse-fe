'use client';

import { useState } from 'react';
import { Star, Plus, Trash2, TrendingUp, TrendingDown, X, Search } from 'lucide-react';
import { formatCurrency, formatPercent, cn } from '@/lib/utils';

interface WatchlistItem {
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  changePercent: number;
  targetPrice: number;
  currency: 'KRW' | 'USD';
}

const initialWatchlist: WatchlistItem[] = [
  {
    id: '1',
    symbol: '005930',
    name: '삼성전자',
    currentPrice: 75400,
    changePercent: 2.31,
    targetPrice: 85000,
    currency: 'KRW',
  },
  {
    id: '2',
    symbol: '000660',
    name: 'SK하이닉스',
    currentPrice: 178500,
    changePercent: -1.38,
    targetPrice: 220000,
    currency: 'KRW',
  },
  {
    id: '3',
    symbol: '035420',
    name: 'NAVER',
    currentPrice: 214000,
    changePercent: 0.94,
    targetPrice: 250000,
    currency: 'KRW',
  },
  {
    id: '4',
    symbol: '035720',
    name: '카카오',
    currentPrice: 48950,
    changePercent: -2.10,
    targetPrice: 60000,
    currency: 'KRW',
  },
  {
    id: '5',
    symbol: '373220',
    name: 'LG에너지솔루션',
    currentPrice: 387000,
    changePercent: 1.57,
    targetPrice: 450000,
    currency: 'KRW',
  },
];

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(initialWatchlist);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStock, setNewStock] = useState({
    symbol: '',
    name: '',
    currentPrice: '',
    targetPrice: '',
  });

  const filteredWatchlist = watchlist.filter(
    (item) =>
      item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStock = () => {
    if (!newStock.symbol || !newStock.name || !newStock.currentPrice) return;

    const item: WatchlistItem = {
      id: Date.now().toString(),
      symbol: newStock.symbol,
      name: newStock.name,
      currentPrice: Number(newStock.currentPrice),
      changePercent: 0,
      targetPrice: Number(newStock.targetPrice) || 0,
      currency: 'KRW',
    };

    setWatchlist((prev) => [...prev, item]);
    setNewStock({ symbol: '', name: '', currentPrice: '', targetPrice: '' });
    setShowAddModal(false);
  };

  const handleRemoveStock = (id: string) => {
    setWatchlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">관심 종목</h1>
          <p className="text-[var(--text-muted)] mt-1">관심 종목을 추가하고 관리하세요</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-primary text-white font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" />
          종목 추가
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[var(--card)] rounded-2xl p-5 border border-[var(--border)]">
          <p className="text-sm text-[var(--text-muted)] mb-1">관심 종목 수</p>
          <p className="text-2xl font-bold">{watchlist.length}개</p>
        </div>
        <div className="bg-[var(--card)] rounded-2xl p-5 border border-[var(--border)]">
          <p className="text-sm text-[var(--text-muted)] mb-1">상승 종목</p>
          <p className="text-2xl font-bold text-[var(--positive)]">
            {watchlist.filter((item) => item.changePercent > 0).length}개
          </p>
        </div>
        <div className="bg-[var(--card)] rounded-2xl p-5 border border-[var(--border)]">
          <p className="text-sm text-[var(--text-muted)] mb-1">하락 종목</p>
          <p className="text-2xl font-bold text-[var(--negative)]">
            {watchlist.filter((item) => item.changePercent < 0).length}개
          </p>
        </div>
      </div>

      {/* Watchlist Table */}
      <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)]">
        {/* Search */}
        <div className="p-4 border-b border-[var(--border)]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="종목 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-[var(--text-muted)] border-b border-[var(--border)]">
                <th className="px-4 py-3 font-medium">종목</th>
                <th className="px-4 py-3 font-medium text-right">현재가</th>
                <th className="px-4 py-3 font-medium text-right">등락률</th>
                <th className="px-4 py-3 font-medium text-right">목표가</th>
                <th className="px-4 py-3 font-medium text-right">목표 괴리율</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredWatchlist.map((item) => {
                const isPositive = item.changePercent >= 0;
                const targetGap = item.targetPrice > 0
                  ? ((item.targetPrice - item.currentPrice) / item.currentPrice) * 100
                  : 0;

                return (
                  <tr
                    key={item.id}
                    className="border-b border-[var(--border)] hover:bg-[var(--background)] transition-colors"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400 flex-shrink-0" />
                        <div>
                          <p className="font-medium">{item.symbol}</p>
                          <p className="text-xs text-[var(--text-muted)]">{item.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right font-medium">
                      {formatCurrency(item.currentPrice, item.currency === 'KRW' ? 'KRW' : 'USD')}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {isPositive ? (
                          <TrendingUp className="w-4 h-4 text-[var(--positive)]" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-[var(--negative)]" />
                        )}
                        <span
                          className={cn(
                            'font-medium',
                            isPositive ? 'text-[var(--positive)]' : 'text-[var(--negative)]'
                          )}
                        >
                          {formatPercent(item.changePercent)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right text-[var(--text-secondary)]">
                      {item.targetPrice > 0
                        ? formatCurrency(item.targetPrice, item.currency === 'KRW' ? 'KRW' : 'USD')
                        : '-'}
                    </td>
                    <td className="px-4 py-4 text-right">
                      {item.targetPrice > 0 ? (
                        <span
                          className={cn(
                            'text-sm font-medium',
                            targetGap >= 0 ? 'text-[var(--positive)]' : 'text-[var(--negative)]'
                          )}
                        >
                          {formatPercent(targetGap)}
                        </span>
                      ) : (
                        <span className="text-[var(--text-muted)]">-</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => handleRemoveStock(item.id)}
                        className="p-2 hover:bg-red-500/10 rounded-lg transition-colors group"
                      >
                        <Trash2 className="w-4 h-4 text-[var(--text-muted)] group-hover:text-red-400" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredWatchlist.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-[var(--text-muted)]">
                    {searchTerm ? '검색 결과가 없습니다' : '관심 종목을 추가해보세요'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Stock Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowAddModal(false)}
          />
          <div className="relative bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 w-full max-w-md mx-4 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">종목 추가</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-[var(--card-hover)] rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                  종목 코드
                </label>
                <input
                  type="text"
                  value={newStock.symbol}
                  onChange={(e) => setNewStock((prev) => ({ ...prev, symbol: e.target.value }))}
                  placeholder="예: 005930"
                  className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                  종목명
                </label>
                <input
                  type="text"
                  value={newStock.name}
                  onChange={(e) => setNewStock((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="예: 삼성전자"
                  className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                  현재가
                </label>
                <input
                  type="number"
                  value={newStock.currentPrice}
                  onChange={(e) => setNewStock((prev) => ({ ...prev, currentPrice: e.target.value }))}
                  placeholder="예: 75400"
                  className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                  목표가
                </label>
                <input
                  type="number"
                  value={newStock.targetPrice}
                  onChange={(e) => setNewStock((prev) => ({ ...prev, targetPrice: e.target.value }))}
                  placeholder="예: 85000"
                  className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all"
                />
              </div>
              <button
                onClick={handleAddStock}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl gradient-primary text-white font-medium hover:opacity-90 transition-opacity mt-2"
              >
                <Plus className="w-5 h-5" />
                추가하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
