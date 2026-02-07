'use client';

import { TrendingUp, TrendingDown, Target, Clock, Trophy, Flame } from 'lucide-react';
import { mockTradeStats, mockTagPerformance } from '@/lib/mockData';
import { formatPercent, cn } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function AnalysisPage() {
  const stats = mockTradeStats;
  const tagData = mockTagPerformance;

  const statCards = [
    { title: '총 거래 수', value: `${stats.totalTrades}회`, icon: Target, gradient: 'from-blue-500 to-cyan-500' },
    { title: '승률', value: `${stats.winRate}%`, icon: Trophy, gradient: 'from-green-500 to-emerald-500' },
    { title: '평균 수익률', value: `${stats.avgReturn}%`, icon: TrendingUp, gradient: 'from-purple-500 to-pink-500' },
    { title: '평균 보유 기간', value: `${stats.avgHoldingDays}일`, icon: Clock, gradient: 'from-orange-500 to-amber-500' },
    { title: '최고 수익', value: `+${stats.bestTrade}%`, icon: Flame, gradient: 'from-green-400 to-green-600' },
    { title: '최대 손실', value: `${stats.worstTrade}%`, icon: TrendingDown, gradient: 'from-red-400 to-red-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">분석</h1>
        <p className="text-[var(--text-muted)] mt-1">
          투자 성과를 분석하고 전략을 개선하세요
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-[var(--card)] rounded-2xl p-4 border border-[var(--border)] card-hover"
            >
              <div className={cn('w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center mb-3', card.gradient)}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold">{card.value}</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">{card.title}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tag Performance Chart */}
        <div className="bg-[var(--card)] rounded-2xl p-6 border border-[var(--border)]">
          <h3 className="text-lg font-semibold mb-4">태그별 성과</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tagData} layout="vertical" margin={{ left: 60 }}>
                <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="tag" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                  }}
                  formatter={(value: number | undefined, name: string | undefined) => [
                    name === 'avgReturn' ? `${value ?? 0}%` : `${value ?? 0}%`,
                    name === 'avgReturn' ? '평균 수익률' : '승률'
                  ]}
                />
                <Bar dataKey="avgReturn" radius={[0, 4, 4, 0]}>
                  {tagData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.avgReturn >= 0 ? '#22c55e' : '#ef4444'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tag Performance Table */}
        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)]">
          <div className="p-4 border-b border-[var(--border)]">
            <h3 className="text-lg font-semibold">전략별 상세 분석</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-[var(--text-muted)] border-b border-[var(--border)]">
                  <th className="px-4 py-3 font-medium">태그</th>
                  <th className="px-4 py-3 font-medium text-right">거래 수</th>
                  <th className="px-4 py-3 font-medium text-right">승률</th>
                  <th className="px-4 py-3 font-medium text-right">평균 수익률</th>
                </tr>
              </thead>
              <tbody>
                {tagData.map((tag, index) => (
                  <tr
                    key={index}
                    className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--background)] transition-colors"
                  >
                    <td className="px-4 py-4">
                      <span className="px-3 py-1 text-sm font-medium bg-[var(--accent)]/10 text-[var(--accent)] rounded-full">
                        {tag.tag}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right font-medium">{tag.trades}회</td>
                    <td className="px-4 py-4 text-right">
                      <span className={cn(
                        'font-medium',
                        tag.winRate >= 50 ? 'text-[var(--positive)]' : 'text-[var(--negative)]'
                      )}>
                        {tag.winRate}%
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className={cn(
                        'font-medium',
                        tag.avgReturn >= 0 ? 'text-[var(--positive)]' : 'text-[var(--negative)]'
                      )}>
                        {formatPercent(tag.avgReturn)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Insight Card */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-[var(--accent)]/20">
        <h3 className="text-lg font-semibold mb-2">💡 투자 인사이트</h3>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          <strong className="text-[var(--positive)]">#AI</strong> 태그 거래가 가장 높은 수익률(24.3%)을 기록했습니다. 
          <strong className="text-[var(--negative)]">#실적시즌</strong> 전략은 개선이 필요합니다. 
          전체 승률 67.8%는 양호하지만, 손절 기준을 더 타이트하게 설정하면 평균 수익률을 높일 수 있습니다.
        </p>
      </div>
    </div>
  );
}
