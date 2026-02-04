'use client';

import { TrendingUp, TrendingDown, Wallet, PiggyBank, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency, formatPercent, cn } from '@/lib/utils';
import { PortfolioSummary } from '@/types';

interface OverviewCardsProps {
  summary: PortfolioSummary;
}

export default function OverviewCards({ summary }: OverviewCardsProps) {
  const cards = [
    {
      title: '총 자산',
      value: formatCurrency(summary.totalValue),
      icon: Wallet,
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      title: '총 투자금',
      value: formatCurrency(summary.totalCost),
      icon: PiggyBank,
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      title: '총 수익',
      value: formatCurrency(summary.totalReturn),
      subValue: formatPercent(summary.totalReturnPercent),
      isPositive: summary.totalReturn >= 0,
      icon: summary.totalReturn >= 0 ? TrendingUp : TrendingDown,
      gradient: summary.totalReturn >= 0 ? 'from-green-500 to-emerald-500' : 'from-red-500 to-rose-500',
    },
    {
      title: '일간 변동',
      value: formatCurrency(summary.dailyChange),
      subValue: formatPercent(summary.dailyChangePercent),
      isPositive: summary.dailyChange >= 0,
      icon: summary.dailyChange >= 0 ? ArrowUpRight : ArrowDownRight,
      gradient: summary.dailyChange >= 0 ? 'from-cyan-500 to-teal-500' : 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-[var(--card)] rounded-2xl p-5 border border-[var(--border)] card-hover"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-1">{card.title}</p>
                <p className="text-2xl font-bold">{card.value}</p>
                {card.subValue && (
                  <p
                    className={cn(
                      'text-sm font-medium mt-1',
                      card.isPositive ? 'text-[var(--positive)]' : 'text-[var(--negative)]'
                    )}
                  >
                    {card.subValue}
                  </p>
                )}
              </div>
              <div className={cn('w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center', card.gradient)}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
