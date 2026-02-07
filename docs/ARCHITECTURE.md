# Architecture

## Overview

StockPulse는 Next.js 16 App Router 기반의 SPA(Single Page Application)이며,
현재 Phase 1으로 프론트엔드 전용(mock data)으로 동작합니다.

## Layer Diagram

```
┌─────────────────────────────────────────────────┐
│                    Browser                       │
├─────────────────────────────────────────────────┤
│  Next.js App Router                             │
│  ┌─────────────────────────────────────────┐    │
│  │  Layout (Server)                         │    │
│  │  ├── Sidebar (Client)                    │    │
│  │  ├── Header (Client)                     │    │
│  │  └── Page Content                        │    │
│  │      ├── page.tsx (Server) ← metadata    │    │
│  │      └── *Client.tsx (Client) ← UI      │    │
│  └─────────────────────────────────────────┘    │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │  Zustand  │  │  Types   │  │  Utilities   │  │
│  │  Store    │  │  index.ts│  │  utils.ts    │  │
│  └──────────┘  └──────────┘  └──────────────┘  │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │  Mock Data Layer (mockData.ts)            │   │
│  │  → Phase 2에서 API Client로 교체 예정     │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

## Component Hierarchy

```
RootLayout (Server)
├── Sidebar (Client) ─── useStore(sidebarOpen), usePathname()
├── Header (Client) ──── NotificationDropdown
└── {children}
    ├── DashboardPage (Server)
    │   └── DashboardClient (Client)
    │       ├── OverviewCards
    │       ├── AssetTrendChart (Recharts)
    │       ├── AssetAllocationChart (Recharts)
    │       └── RecentTrades
    ├── PortfolioPage (Server)
    ├── TradesPage (Server)
    ├── AnalysisPage (Server)
    ├── MarketPage (Server)
    ├── WatchlistPage (Server)
    ├── SettingsPage (Server)
    ├── LoginPage (Server)
    └── RegisterPage (Server)
```

## Server vs Client Component 분리 원칙

| 구분 | Server Component | Client Component |
|------|-----------------|------------------|
| 위치 | `app/*/page.tsx` | `components/*Client.tsx` |
| 역할 | metadata, SEO, 초기 렌더링 | 사용자 인터랙션, 상태관리 |
| 사용 | `export const metadata` | `'use client'` directive |
| Hooks | 사용 불가 | useState, useEffect 등 |
| 예시 | DashboardPage | DashboardClient |

## Data Flow

```
Mock Data (mockData.ts)
    ↓
Zustand Store (useStore.ts)
    ↓ (selector)
Client Component
    ↓ (props)
Child Components
```

### State 구조 (Zustand Store)

```typescript
interface StoreState {
  // Data
  stocks: Stock[];
  portfolioSummary: PortfolioSummary;
  trades: Trade[];

  // UI
  sidebarOpen: boolean;

  // Actions
  addStock(stock: Stock): void;
  updateStock(id: string, stock: Partial<Stock>): void;
  removeStock(id: string): void;
  addTrade(trade: Trade): void;
  setSidebarOpen(open: boolean): void;
}
```

## Routing Map

| Route | Page | Description |
|-------|------|-------------|
| `/` | Dashboard | 자산 현황 개요, 차트, 최근 거래 |
| `/portfolio` | Portfolio | 보유 종목 관리 (CRUD) |
| `/trades` | Trades | 거래 기록 및 저널링 |
| `/analysis` | Analysis | 성과 분석, 전략 분석 |
| `/market` | Market | 시장 지수, 뉴스 |
| `/watchlist` | Watchlist | 관심 종목 모니터링 |
| `/settings` | Settings | 앱 설정 |
| `/login` | Login | 로그인 |
| `/register` | Register | 회원가입 |

## Phase 2 계획: Backend Integration

현재 `mockData.ts` 기반의 데이터를 실제 API로 교체할 예정입니다.

```
Phase 1 (현재): mockData.ts → Zustand Store → Components
Phase 2 (예정): API Client → React Query/SWR → Zustand(UI state only) → Components
```

교체 시 변경 범위:
- `src/lib/mockData.ts` → `src/lib/api/` (API client 모듈)
- `src/store/useStore.ts` → UI 상태만 유지, 데이터는 서버 상태 관리 라이브러리로 이관
- 각 Client 컴포넌트에 로딩/에러 상태 처리 강화
