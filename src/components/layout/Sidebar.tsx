'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Briefcase,
  ArrowLeftRight,
  BarChart3,
  TrendingUp,
  Menu,
  X,
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: '대시보드', icon: LayoutDashboard },
  { href: '/portfolio', label: '포트폴리오', icon: Briefcase },
  { href: '/trades', label: '거래 기록', icon: ArrowLeftRight },
  { href: '/analysis', label: '분석', icon: BarChart3 },
  { href: '/market', label: '시장 정보', icon: TrendingUp },
];

export default function Sidebar() {
  const pathname = usePathname();
  const sidebarOpen = useStore((state) => state.sidebarOpen);
  const setSidebarOpen = useStore((state) => state.setSidebarOpen);

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 flex h-full w-64 flex-col bg-[var(--card)] border-r border-[var(--border)] transition-transform duration-300 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-[var(--border)]">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              StockPulse
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-[var(--card-hover)] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200',
                  isActive
                    ? 'bg-[var(--accent)] text-white shadow-lg shadow-blue-500/25'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--card-hover)] hover:text-white'
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--border)]">
          <div className="glass rounded-xl p-4">
            <p className="text-sm text-[var(--text-muted)]">
              마지막 업데이트
            </p>
            <p className="text-sm font-medium mt-1">
              {new Date().toLocaleTimeString('ko-KR')}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-[var(--positive)] pulse-dot" />
              <span className="text-xs text-[var(--positive)]">실시간</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed bottom-6 right-6 z-30 lg:hidden w-14 h-14 rounded-full gradient-primary flex items-center justify-center shadow-lg shadow-blue-500/25"
      >
        <Menu className="w-6 h-6 text-white" />
      </button>
    </>
  );
}
