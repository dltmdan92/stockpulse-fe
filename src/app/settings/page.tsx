'use client';

import { useState } from 'react';
import {
  User,
  Mail,
  Moon,
  Sun,
  Bell,
  BellOff,
  Save,
  Shield,
  Palette,
  Smartphone,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [notifications, setNotifications] = useState({
    priceAlert: true,
    tradeConfirm: true,
    portfolioReport: false,
    marketNews: true,
  });
  const [profile, setProfile] = useState({
    name: '홍길동',
    email: 'gildong@example.com',
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const notificationItems = [
    {
      key: 'priceAlert' as const,
      label: '가격 알림',
      description: '관심 종목의 가격 변동 시 알림을 받습니다',
      icon: Bell,
    },
    {
      key: 'tradeConfirm' as const,
      label: '거래 확인',
      description: '거래 체결 시 확인 알림을 받습니다',
      icon: Shield,
    },
    {
      key: 'portfolioReport' as const,
      label: '포트폴리오 리포트',
      description: '주간/월간 포트폴리오 성과 리포트를 받습니다',
      icon: Smartphone,
    },
    {
      key: 'marketNews' as const,
      label: '시장 뉴스',
      description: '주요 시장 뉴스 및 이슈 알림을 받습니다',
      icon: Bell,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">설정</h1>
        <p className="text-[var(--text-muted)] mt-1">앱 환경을 설정하세요</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Section */}
        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)]">
          <div className="p-6 border-b border-[var(--border)]">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="w-5 h-5 text-[var(--accent)]" />
              프로필
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm text-[var(--text-muted)] mb-2">
                이름
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full pl-10 pr-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-[var(--text-muted)] mb-2">
                이메일
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full pl-10 pr-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all"
                />
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-primary text-white font-medium hover:opacity-90 transition-opacity">
              <Save className="w-4 h-4" />
              저장
            </button>
          </div>
        </div>

        {/* Theme Section */}
        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)]">
          <div className="p-6 border-b border-[var(--border)]">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Palette className="w-5 h-5 text-[var(--accent)]" />
              테마
            </h3>
          </div>
          <div className="p-6">
            <p className="text-sm text-[var(--text-muted)] mb-4">
              앱의 외관 테마를 선택하세요
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setTheme('dark')}
                className={cn(
                  'flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all duration-200',
                  theme === 'dark'
                    ? 'border-[var(--accent)] bg-[var(--accent)]/10'
                    : 'border-[var(--border)] hover:border-[var(--text-muted)]'
                )}
              >
                <Moon className="w-8 h-8" />
                <span className="font-medium">다크 모드</span>
              </button>
              <button
                onClick={() => setTheme('light')}
                className={cn(
                  'flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all duration-200',
                  theme === 'light'
                    ? 'border-[var(--accent)] bg-[var(--accent)]/10'
                    : 'border-[var(--border)] hover:border-[var(--text-muted)]'
                )}
              >
                <Sun className="w-8 h-8" />
                <span className="font-medium">라이트 모드</span>
              </button>
            </div>
          </div>
        </div>

        {/* Notification Section */}
        <div className="lg:col-span-2 bg-[var(--card)] rounded-2xl border border-[var(--border)]">
          <div className="p-6 border-b border-[var(--border)]">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Bell className="w-5 h-5 text-[var(--accent)]" />
              알림 설정
            </h3>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {notificationItems.map((item) => {
              const Icon = item.icon;
              const isEnabled = notifications[item.key];

              return (
                <div
                  key={item.key}
                  className="flex items-center justify-between p-6 hover:bg-[var(--background)] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-xl flex items-center justify-center',
                        isEnabled
                          ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
                          : 'bg-[var(--card-hover)] text-[var(--text-muted)]'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-[var(--text-muted)] mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleNotification(item.key)}
                    className={cn(
                      'relative w-12 h-7 rounded-full transition-colors duration-200',
                      isEnabled ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'
                    )}
                  >
                    <span
                      className={cn(
                        'absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200',
                        isEnabled ? 'translate-x-5' : 'translate-x-0'
                      )}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
