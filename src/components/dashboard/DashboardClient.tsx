'use client';

import OverviewCards from '@/components/dashboard/OverviewCards';
import AssetAllocationChart from '@/components/dashboard/AssetAllocationChart';
import AssetTrendChart from '@/components/dashboard/AssetTrendChart';
import RecentTrades from '@/components/dashboard/RecentTrades';
import { useStore } from '@/store/useStore';
import { mockSectorAllocation, mockAssetHistory } from '@/lib/mockData';

export default function DashboardClient() {
  // Optimized Selectors
  const portfolioSummary = useStore((state) => state.portfolioSummary);
  const trades = useStore((state) => state.trades);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">대시보드</h1>
        <p className="text-[var(--text-muted)] mt-1">
          포트폴리오 현황을 한눈에 확인하세요
        </p>
      </div>

      {/* Overview Cards */}
      <OverviewCards summary={portfolioSummary} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AssetTrendChart data={mockAssetHistory} />
        </div>
        <div>
          <AssetAllocationChart data={mockSectorAllocation} />
        </div>
      </div>

      {/* Recent Trades */}
      <RecentTrades trades={trades} />
    </div>
  );
}
