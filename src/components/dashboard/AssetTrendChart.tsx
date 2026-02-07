'use client';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { AssetHistory } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface AssetTrendChartProps {
  data: AssetHistory[];
}

export default function AssetTrendChart({ data }: AssetTrendChartProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  return (
    <div className="bg-[var(--card)] rounded-2xl p-6 border border-[var(--border)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">자산 추이</h3>
        <div className="flex gap-2">
          {['1주', '1개월', '3개월', '1년'].map((period) => (
            <button
              key={period}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[var(--background)] text-[var(--text-secondary)] hover:bg-[var(--card-hover)] hover:text-white transition-colors first:bg-[var(--accent)] first:text-white"
            >
              {period}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--border)' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${(value / 10000000).toFixed(0)}천만`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '12px',
              }}
              formatter={((value: number) => [formatCurrency(value), '평가금액']) as never}
              labelFormatter={(label) => {
                const date = new Date(label);
                return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
              }}
              labelStyle={{ color: 'var(--foreground)', fontWeight: 'bold', marginBottom: '4px' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
