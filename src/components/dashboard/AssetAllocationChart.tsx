'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { SectorAllocation } from '@/types';

interface AssetAllocationChartProps {
  data: SectorAllocation[];
}

export default function AssetAllocationChart({ data }: AssetAllocationChartProps) {
  return (
    <div className="bg-[var(--card)] rounded-2xl p-6 border border-[var(--border)]">
      <h3 className="text-lg font-semibold mb-4">섹터별 비중</h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
              dataKey="percentage"
              nameKey="sector"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '12px',
              }}
              formatter={((value: number) => [`${value.toFixed(1)}%`, '비중']) as never}
              labelStyle={{ color: 'var(--foreground)', fontWeight: 'bold' }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => <span className="text-sm text-[var(--text-secondary)]">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[var(--text-secondary)]">{item.sector}</span>
            </div>
            <span className="font-medium">{item.percentage.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
