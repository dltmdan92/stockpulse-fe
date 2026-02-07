'use client';

import { useState } from 'react';
import { Plus, TrendingUp, TrendingDown, MoreVertical, Search } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { formatCurrency, formatPercent, cn } from '@/lib/utils';
import { mockSectorAllocation } from '@/lib/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function PortfolioPage() {
  const { stocks } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalValue = stocks.reduce((acc, stock) => acc + stock.currentPrice * stock.quantity, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">포트폴리오</h1>
          <p className="text-[var(--text-muted)] mt-1">보유 종목을 관리하세요</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-primary text-white font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-5 h-5" />
          종목 추가
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[var(--card)] rounded-2xl p-5 border border-[var(--border)]">
          <p className="text-sm text-[var(--text-muted)] mb-1">보유 종목 수</p>
          <p className="text-2xl font-bold">{stocks.length}개</p>
        </div>
        <div className="bg-[var(--card)] rounded-2xl p-5 border border-[var(--border)]">
          <p className="text-sm text-[var(--text-muted)] mb-1">총 평가금액</p>
          <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
        </div>
        <div className="bg-[var(--card)] rounded-2xl p-5 border border-[var(--border)]">
          <p className="text-sm text-[var(--text-muted)] mb-1">섹터 수</p>
          <p className="text-2xl font-bold">{mockSectorAllocation.length}개</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stock List */}
        <div className="lg:col-span-2 bg-[var(--card)] rounded-2xl border border-[var(--border)]">
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
                  <th className="px-4 py-3 font-medium text-right">수량</th>
                  <th className="px-4 py-3 font-medium text-right">평균 단가</th>
                  <th className="px-4 py-3 font-medium text-right">현재가</th>
                  <th className="px-4 py-3 font-medium text-right">수익률</th>
                  <th className="px-4 py-3 font-medium text-right">평가금액</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filteredStocks.map((stock) => {
                  const returnPercent = ((stock.currentPrice - stock.avgPrice) / stock.avgPrice) * 100;
                  const isPositive = returnPercent >= 0;
                  const value = stock.currentPrice * stock.quantity;

                  return (
                    <tr
                      key={stock.id}
                      className="border-b border-[var(--border)] hover:bg-[var(--background)] transition-colors"
                    >
                      <td className="px-4 py-4">
                        <div>
                          <p className="font-medium">{stock.symbol}</p>
                          <p className="text-xs text-[var(--text-muted)]">{stock.name}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right font-medium">{stock.quantity}</td>
                      <td className="px-4 py-4 text-right text-[var(--text-secondary)]">
                        {formatCurrency(stock.avgPrice, stock.country === 'US' ? 'USD' : 'KRW')}
                      </td>
                      <td className="px-4 py-4 text-right font-medium">
                        {formatCurrency(stock.currentPrice, stock.country === 'US' ? 'USD' : 'KRW')}
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
                            {formatPercent(returnPercent)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right font-medium">
                        {formatCurrency(value, stock.country === 'US' ? 'USD' : 'KRW')}
                      </td>
                      <td className="px-4 py-4">
                        <button className="p-2 hover:bg-[var(--card-hover)] rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4 text-[var(--text-muted)]" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sector Chart */}
        <div className="bg-[var(--card)] rounded-2xl p-6 border border-[var(--border)]">
          <h3 className="text-lg font-semibold mb-4">섹터별 비중</h3>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockSectorAllocation}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="percentage"
                  nameKey="sector"
                >
                  {mockSectorAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                  }}
                  formatter={((value: number) => [`${value.toFixed(1)}%`, '비중']) as never}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {mockSectorAllocation.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[var(--text-secondary)]">{item.sector}</span>
                </div>
                <span className="font-medium">{item.percentage.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
