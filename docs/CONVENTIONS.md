# Coding Conventions

## 1. 기본 원칙

- **가독성 우선**: 간결함보다 읽기 쉬운 코드를 작성
- **일관성**: 기존 코드베이스 패턴을 따름
- **타입 안전**: `src/types/index.ts`에 인터페이스 정의. `any` 사용 금지

## 2. 컴포넌트 구조

### 기본 형태

```tsx
'use client'; // Client Component인 경우만

import { SomeIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ComponentNameProps {
  label: string;
  onClick: () => void;
}

export default function ComponentName({ label, onClick }: ComponentNameProps) {
  return <button onClick={onClick}>{label}</button>;
}
```

### 규칙
- **함수 선언**: `export default function Name()` 사용 (arrow function 아님)
- **Props 인터페이스**: 컴포넌트 바로 위에 정의
- **barrel export 금지**: 컴포넌트 폴더에 `index.ts` 사용하지 않음
- **Client 지시어**: hooks/이벤트 핸들러 사용 시에만 `'use client'` 추가

## 3. 파일 네이밍

| 대상 | 규칙 | 예시 |
|------|------|------|
| 컴포넌트 | PascalCase | `StockCard.tsx`, `AssetTrendChart.tsx` |
| 유틸리티 | camelCase | `utils.ts`, `mockData.ts` |
| 훅 | camelCase (use 접두사) | `useStore.ts` |
| 페이지 | Next.js 표준 | `page.tsx`, `layout.tsx`, `error.tsx`, `loading.tsx` |
| 타입 | PascalCase (인터페이스) | `Stock`, `Trade`, `PortfolioSummary` |

## 4. Import 규칙

### 경로
- `@/*` alias 사용 (상대 경로 `../` 금지)
- 예: `import { cn } from '@/lib/utils'`

### 순서
```tsx
// 1. React / Next.js
import { useState } from 'react';
import Link from 'next/link';

// 2. 외부 라이브러리
import { TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

// 3. 내부 모듈 (@/)
import { cn, formatCurrency } from '@/lib/utils';
import { useStore } from '@/store/useStore';

// 4. 타입 (type import)
import type { Stock, Trade } from '@/types';
```

## 5. 스타일링 (TailwindCSS)

- **유틸리티 우선**: 거의 모든 스타일을 Tailwind 클래스로 처리
- **조건부 클래스**: `cn()` 헬퍼 사용 (`@/lib/utils`)
- **CSS 변수**: 색상은 CSS 변수 사용 (예: `bg-[var(--card)]`)
- **인라인 스타일 금지**: `style={{}}` 대신 Tailwind 클래스 사용
- **반응형**: 데스크톱 우선, 모바일 대응 (`lg:` 브레이크포인트 기준)
- **레이아웃**: 메인 콘텐츠 `max-w-7xl mx-auto`

```tsx
// Good
<div className={cn("p-4 rounded-xl", isActive && "bg-[var(--accent)]")}>

// Bad
<div style={{ padding: '16px', borderRadius: '12px' }}>
```

## 6. 상태 관리 (Zustand)

- **단일 스토어**: `src/store/useStore.ts`
- **선택적 구독**: 필요한 상태만 선택 (전체 store 사용 금지)

```tsx
// Good - 필요한 것만 선택
const stocks = useStore((state) => state.stocks);
const addStock = useStore((state) => state.addStock);

// Bad - 전체 store 사용 (불필요한 리렌더링)
const store = useStore();
```

## 7. 데이터 포맷팅

항상 `@/lib/utils`의 헬퍼 함수 사용:

| 함수 | 용도 | 예시 출력 |
|------|------|----------|
| `formatCurrency(value, 'KRW')` | 원화 표시 | ₩75,400 |
| `formatCurrency(value, 'USD')` | 달러 표시 | $189.84 |
| `formatPercent(value)` | 퍼센트 표시 | +19.20% |
| `formatDate(dateString)` | 날짜 표시 | 2024. 02. 29. |
| `formatNumber(value, decimals)` | 숫자 표시 | 1,234.56 |
| `getReturnColor(value)` | 수익률 텍스트 색상 | `text-green-500` |
| `getReturnBgColor(value)` | 수익률 배경 색상 | `bg-green-500/10` |

## 8. Git 커밋 컨벤션

```
feat: 새로운 기능 추가
fix: 버그 수정
refactor: 코드 구조 변경 (기능 변화 없음)
docs: 문서 변경
chore: 빌드/설정 변경
style: 코드 포맷팅 (기능 변화 없음)
```

## 9. 언어 규칙

| 대상 | 언어 | 예시 |
|------|------|------|
| UI 텍스트 | 한국어 | "대시보드", "거래 기록" |
| 코드 식별자 | 영어 | `addStock`, `formatCurrency` |
| 커밋 메시지 | 영어 | `feat: add portfolio page` |
| 주석 | 영어 or 한국어 | 자유 (일관성 유지) |
| 문서 | 한국어 or 영어 | 파일별 일관성 유지 |
