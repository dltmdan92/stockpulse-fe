'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Bell,
  Check,
  AlertCircle,
  TrendingUp,
  Target,
  Trophy,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  type: 'alert' | 'target' | 'achievement' | 'trend';
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'target',
    title: '삼성전자 목표가 도달',
    description: '설정하신 목표가 85,000원에 도달했습니다.',
    time: '5분 전',
    read: false,
  },
  {
    id: '2',
    type: 'achievement',
    title: '포트폴리오 수익률 5% 달성',
    description: '축하합니다! 이번 달 수익률 목표를 달성했습니다.',
    time: '1시간 전',
    read: false,
  },
  {
    id: '3',
    type: 'alert',
    title: 'AAPL 급등 알림',
    description: 'Apple 주가가 전일 대비 3.2% 상승했습니다.',
    time: '2시간 전',
    read: false,
  },
  {
    id: '4',
    type: 'trend',
    title: 'AI 반도체 섹터 상승세',
    description: 'AI 관련 반도체 종목들이 일제히 상승 중입니다.',
    time: '3시간 전',
    read: true,
  },
  {
    id: '5',
    type: 'target',
    title: 'TSLA 손절가 접근',
    description: 'Tesla 주가가 설정하신 손절가에 근접하고 있습니다.',
    time: '5시간 전',
    read: true,
  },
];

const iconMap = {
  alert: AlertCircle,
  target: Target,
  achievement: Trophy,
  trend: TrendingUp,
};

const iconColorMap = {
  alert: 'bg-red-500/10 text-[var(--negative)]',
  target: 'bg-blue-500/10 text-[var(--accent)]',
  achievement: 'bg-green-500/10 text-[var(--positive)]',
  trend: 'bg-purple-500/10 text-purple-400',
};

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 hover:bg-[var(--card-hover)] rounded-xl transition-colors"
      >
        <Bell className="w-5 h-5 text-[var(--text-secondary)]" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--accent)] rounded-full" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden z-50">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold">알림</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 text-xs font-medium bg-[var(--accent)] text-white rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-[var(--accent)] hover:underline"
                >
                  모두 읽음
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-[var(--card-hover)] rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-[var(--text-muted)]" />
              </button>
            </div>
          </div>

          {/* Notification List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => {
              const Icon = iconMap[notification.type];
              return (
                <button
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={cn(
                    'w-full flex items-start gap-3 px-5 py-3.5 text-left hover:bg-[var(--card-hover)] transition-colors',
                    !notification.read && 'bg-[var(--accent)]/5'
                  )}
                >
                  <div
                    className={cn(
                      'w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5',
                      iconColorMap[notification.type]
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p
                        className={cn(
                          'text-sm truncate',
                          notification.read ? 'text-[var(--text-secondary)]' : 'font-medium'
                        )}
                      >
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5 truncate">
                      {notification.description}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">
                      {notification.time}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="shrink-0 mt-1">
                      <Check className="w-4 h-4 text-[var(--text-muted)] hover:text-[var(--accent)]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-[var(--border)]">
            <a
              href="/notifications"
              className="block text-center text-sm text-[var(--accent)] hover:underline"
            >
              모든 알림 보기
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
