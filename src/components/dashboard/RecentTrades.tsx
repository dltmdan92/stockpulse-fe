'use client';

import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Trade } from '@/types';
import { formatCurrency, formatDate, cn } from '@/lib/utils';

interface RecentTradesProps {
  trades: Trade[];
}

export default function RecentTrades({ trades }: RecentTradesProps) {
  const recentTrades = trades.slice(0, 5);

  return (
    <div className="bg-[var(--card)] rounded-2xl p-6 border border-[var(--border)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">최근 거래</h3>
        <a href="/trades" className="text-sm text-[var(--accent)] hover:underline">
          전체 보기
        </a>
      </div>
      <div className="space-y-3">
        {recentTrades.map((trade) => (
          <div
            key={trade.id}
            className="flex items-center justify-between p-3 rounded-xl bg-[var(--background)] hover:bg-[var(--card-hover)] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center',
                  trade.type === 'buy'
                    ? 'bg-green-500/10 text-[var(--positive)]'
                    : 'bg-red-500/10 text-[var(--negative)]'
                )}
              >
                {trade.type === 'buy' ? (
                  <ArrowDownRight className="w-5 h-5" />
                ) : (
                  <ArrowUpRight className="w-5 h-5" />
                )}
              </div>
              <div>
                <p className="font-medium">{trade.symbol}</p>
                <p className="text-xs text-[var(--text-muted)]">
                  {trade.type === 'buy' ? '매수' : '매도'} · {trade.quantity}주
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">{formatCurrency(trade.price * trade.quantity)}</p>
              <p className="text-xs text-[var(--text-muted)]">{formatDate(trade.date)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
