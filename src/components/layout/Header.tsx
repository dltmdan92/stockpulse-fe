'use client';

import { Bell, Search, User, Settings } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 bg-[var(--card)] border-b border-[var(--border)] sticky top-0 z-30">
      <div className="h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="종목 검색 (예: AAPL, 삼성전자)"
              className="w-full pl-10 pr-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2.5 hover:bg-[var(--card-hover)] rounded-xl transition-colors">
            <Bell className="w-5 h-5 text-[var(--text-secondary)]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--accent)] rounded-full" />
          </button>

          {/* Settings */}
          <button className="p-2.5 hover:bg-[var(--card-hover)] rounded-xl transition-colors">
            <Settings className="w-5 h-5 text-[var(--text-secondary)]" />
          </button>

          {/* User Profile */}
          <button className="flex items-center gap-3 pl-4 border-l border-[var(--border)]">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">투자자</p>
              <p className="text-xs text-[var(--text-muted)]">Premium</p>
            </div>
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
