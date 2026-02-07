# Tech Stack & Dependencies

## Core Stack (v0.1.0)

### Framework & Runtime

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16.1.6 | React 프레임워크 (App Router) |
| React | 19.2.3 | UI 라이브러리 |
| TypeScript | 5+ | 정적 타입 시스템 |
| Node.js | >= 18 | 런타임 환경 |

### Styling & UI

| Technology | Version | Purpose |
|-----------|---------|---------|
| TailwindCSS | 4 | 유틸리티 기반 CSS |
| PostCSS | - | CSS 전처리 (Tailwind 플러그인) |
| Lucide React | 0.563+ | 아이콘 라이브러리 |
| Recharts | 3.7+ | 차트/데이터 시각화 |
| Geist Font | - | 기본 폰트 (Sans + Mono) |

### State & Utilities

| Technology | Version | Purpose |
|-----------|---------|---------|
| Zustand | 5+ | 전역 상태 관리 |
| date-fns | 4+ | 날짜 처리 |
| clsx | 2+ | 조건부 CSS 클래스 |

### Dev Tools

| Technology | Version | Purpose |
|-----------|---------|---------|
| ESLint | 9+ | 코드 린팅 |
| eslint-config-next | 16.1.6 | Next.js ESLint 규칙 |

## Configuration Files

| File | Purpose |
|------|---------|
| `tsconfig.json` | TypeScript 설정 (strict mode, path alias) |
| `next.config.ts` | Next.js 설정 |
| `eslint.config.mjs` | ESLint 설정 (flat config) |
| `postcss.config.mjs` | PostCSS / TailwindCSS 설정 |
| `package.json` | 의존성 및 스크립트 |

## Directory Structure

```
src/
├── app/                    # Next.js App Router (페이지 & 레이아웃)
│   ├── layout.tsx          # 루트 레이아웃 (Sidebar + Header + Font)
│   ├── globals.css         # 글로벌 스타일 & CSS 변수 & Tailwind
│   ├── page.tsx            # 대시보드 페이지 (/)
│   ├── error.tsx           # 글로벌 에러 바운더리
│   ├── loading.tsx         # 글로벌 로딩 스켈레톤
│   ├── portfolio/          # /portfolio
│   ├── trades/             # /trades
│   ├── analysis/           # /analysis
│   ├── market/             # /market
│   ├── watchlist/          # /watchlist
│   ├── settings/           # /settings
│   ├── login/              # /login
│   └── register/           # /register
├── components/
│   ├── layout/             # 레이아웃 (Header, Sidebar, NotificationDropdown)
│   └── dashboard/          # 대시보드 (OverviewCards, Charts, RecentTrades)
├── lib/
│   ├── utils.ts            # 유틸리티 (cn, 포맷팅 함수들)
│   └── mockData.ts         # 개발용 Mock 데이터
├── store/
│   └── useStore.ts         # Zustand 전역 스토어
└── types/
    └── index.ts            # 공유 TypeScript 인터페이스
```

## 라이브러리 추가 정책

1. 기존 `package.json`에 정의된 라이브러리만 사용
2. 새 라이브러리가 필요한 경우 팀/오너에게 먼저 확인
3. 추가 시 이 문서의 테이블 업데이트 필수
