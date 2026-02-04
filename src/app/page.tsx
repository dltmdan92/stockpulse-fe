import { Metadata } from 'next';
import DashboardClient from '@/components/dashboard/DashboardClient';

export const metadata: Metadata = {
  title: 'StockPulse | 대시보드',
  description: '투자 현황 대시보드',
};

export default function DashboardPage() {
  return <DashboardClient />;
}
