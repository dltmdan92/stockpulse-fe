'use client';

import { useState } from 'react';
import { Plus, ArrowUpRight, ArrowDownRight, Filter, Calendar } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { formatCurrency, formatDate, cn } from '@/lib/utils';

export default function TradesPage() {
  const { trades } = useStore();
  const [typeFilter, setTypeFilter] = useState<'all' | 'buy' | 'sell'>('all');

  const filteredTrades = trades.filter((trade) => {
    if (typeFilter === 'all') return true;
    return trade.type === typeFilter;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">거래 기록</h1>
          <p className="text-[var(--text-muted)] mt-1">
            매매 기록과 투자 일지를 관리하세요
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-primary text-white font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-5 h-5" />
          거래 추가
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 p-1 bg-[var(--card)] rounded-xl border border-[var(--border)]">
          {(['all', 'buy', 'sell'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                typeFilter === type
                  ? 'bg-[var(--accent)] text-white'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--card-hover)]'
              )}
            >
              {type === 'all' ? '전체' : type === 'buy' ? '매수' : '매도'}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--card)] rounded-xl border border-[var(--border)] text-sm text-[var(--text-secondary)] hover:bg-[var(--card-hover)] transition-colors">
          <Calendar className="w-4 h-4" />
          기간 선택
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--card)] rounded-xl border border-[var(--border)] text-sm text-[var(--text-secondary)] hover:bg-[var(--card-hover)] transition-colors">
          <Filter className="w-4 h-4" />
          태그 필터
        </button>
      </div>

      {/* Trade Cards */}
      <div className="space-y-4">
        {filteredTrades.map((trade) => (
          <div
            key={trade.id}
            className="bg-[var(--card)] rounded-2xl p-5 border border-[var(--border)] card-hover"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center',
                    trade.type === 'buy'
                      ? 'bg-green-500/10 text-[var(--positive)]'
                      : 'bg-red-500/10 text-[var(--negative)]'
                  )}
                >
                  {trade.type === 'buy' ? (
                    <ArrowDownRight className="w-6 h-6" />
                  ) : (
                    <ArrowUpRight className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{trade.symbol}</h3>
                    <span
                      className={cn(
                        'px-2 py-0.5 text-xs font-medium rounded-full',
                        trade.type === 'buy'
                          ? 'bg-green-500/10 text-[var(--positive)]'
                          : 'bg-red-500/10 text-[var(--negative)]'
                      )}
                    >
                      {trade.type === 'buy' ? '매수' : '매도'}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] mt-0.5">{trade.name}</p>
                  <p className="text-sm text-[var(--text-secondary)] mt-2">
                    {trade.quantity}주 × {formatCurrency(trade.price, 'USD')} = {formatCurrency(trade.quantity * trade.price, 'USD')}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-[var(--text-muted)]">{formatDate(trade.date)}</p>
                {trade.targetPrice && (
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    목표가: {formatCurrency(trade.targetPrice, 'USD')}
                  </p>
                )}
                {trade.stopLoss && (
                  <p className="text-xs text-[var(--negative)] mt-0.5">
                    손절가: {formatCurrency(trade.stopLoss, 'USD')}
                  </p>
                )}
              </div>
            </div>

            {/* Memo */}
            {trade.memo && (
              <div className="mt-4 p-4 bg-[var(--background)] rounded-xl">
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {trade.memo}
                </p>
              </div>
            )}

            {/* Tags */}
            {trade.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {trade.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs font-medium bg-[var(--accent)]/10 text-[var(--accent)] rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
