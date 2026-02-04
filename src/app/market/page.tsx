'use client';

import { TrendingUp, TrendingDown, ExternalLink, Star, Plus } from 'lucide-react';
import { mockMarketIndices, mockNews, mockStocks } from '@/lib/mockData';
import { formatCurrency, formatPercent, cn } from '@/lib/utils';

export default function MarketPage() {
  const indices = mockMarketIndices;
  const news = mockNews;
  const watchlist = mockStocks.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">시장 정보</h1>
        <p className="text-[var(--text-muted)] mt-1">
          주요 지수와 관심 종목 뉴스를 확인하세요
        </p>
      </div>

      {/* Market Indices */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {indices.map((index, i) => {
          const isPositive = index.change >= 0;
          return (
            <div
              key={i}
              className="bg-[var(--card)] rounded-2xl p-5 border border-[var(--border)] card-hover"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium px-2 py-1 bg-[var(--background)] rounded-lg text-[var(--text-muted)]">
                  {index.symbol}
                </span>
                <div className={cn(
                  'flex items-center gap-1 text-sm font-medium',
                  isPositive ? 'text-[var(--positive)]' : 'text-[var(--negative)]'
                )}>
                  {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {formatPercent(index.changePercent)}
                </div>
              </div>
              <p className="text-2xl font-bold">{index.value.toLocaleString()}</p>
              <p className="text-sm text-[var(--text-muted)] mt-1">{index.name}</p>
              <p className={cn(
                'text-sm mt-2',
                isPositive ? 'text-[var(--positive)]' : 'text-[var(--negative)]'
              )}>
                {isPositive ? '+' : ''}{index.change.toFixed(2)}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* News Feed */}
        <div className="lg:col-span-2 bg-[var(--card)] rounded-2xl border border-[var(--border)]">
          <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
            <h3 className="font-semibold">뉴스 피드</h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--positive)] pulse-dot" />
              <span className="text-xs text-[var(--text-muted)]">실시간</span>
            </div>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {news.map((item) => (
              <a
                key={item.id}
                href={item.url}
                className="flex items-start gap-4 p-4 hover:bg-[var(--background)] transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {item.symbol && (
                      <span className="text-xs font-medium px-2 py-0.5 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full">
                        {item.symbol}
                      </span>
                    )}
                    <span className="text-xs text-[var(--text-muted)]">
                      {item.source} · {item.date}
                    </span>
                  </div>
                  <h4 className="font-medium leading-snug">{item.title}</h4>
                </div>
                <ExternalLink className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0 mt-1" />
              </a>
            ))}
          </div>
        </div>

        {/* Watchlist */}
        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)]">
          <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
            <h3 className="font-semibold">관심 종목</h3>
            <button className="p-2 hover:bg-[var(--card-hover)] rounded-lg transition-colors">
              <Plus className="w-4 h-4 text-[var(--text-muted)]" />
            </button>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {watchlist.map((stock) => {
              const returnPercent = ((stock.currentPrice - stock.avgPrice) / stock.avgPrice) * 100;
              const isPositive = returnPercent >= 0;
              return (
                <div
                  key={stock.id}
                  className="flex items-center justify-between p-4 hover:bg-[var(--background)] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <button className="p-1 hover:bg-[var(--card-hover)] rounded transition-colors">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    </button>
                    <div>
                      <p className="font-medium">{stock.symbol}</p>
                      <p className="text-xs text-[var(--text-muted)]">{stock.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {formatCurrency(stock.currentPrice, stock.country === 'US' ? 'USD' : 'KRW')}
                    </p>
                    <p className={cn(
                      'text-xs font-medium',
                      isPositive ? 'text-[var(--positive)]' : 'text-[var(--negative)]'
                    )}>
                      {formatPercent(returnPercent)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
