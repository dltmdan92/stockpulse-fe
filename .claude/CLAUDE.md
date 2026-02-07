# StockPulse Frontend - Claude Code Instructions

## Project Summary

StockPulse: 한국어 투자 포트폴리오 관리 + 저널링 웹앱.
Phase 1 완료 (프론트엔드 + Mock 데이터). Phase 2에서 백엔드 연동 예정.

## Quick Commands

```bash
npm run dev      # Dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint check
```

## Documentation Map

상세 내용은 `docs/`의 중립 문서를 참조. 코드 변경 시 관련 문서 업데이트 필수.

| 참조 시점 | 문서 |
|----------|------|
| 항상 | `docs/CONVENTIONS.md` - 코딩 스타일, import, 네이밍 |
| 기능 작업 시 | `docs/FEATURE_SPEC.md` - 페이지별 기능 명세 |
| 도메인 질문 시 | `docs/DOMAIN.md` - 투자 도메인 개념, 한영 용어 매핑 |
| 구조 파악 시 | `docs/ARCHITECTURE.md` - 컴포넌트 계층, 데이터 흐름 |
| UI 작업 시 | `docs/DESIGN_SYSTEM.md` - 색상, 패턴, 반응형, 타이포 |
| 스택 확인 시 | `docs/TECH_STACK.md` - 의존성, 디렉토리 구조 |
| AI 규칙 | `docs/AI_RULES.md` - AI 어시스턴트 공통 행동 규칙 |

## Tech Stack (Quick Reference)

Next.js 16.1.6 (App Router) / React 19.2.3 / TypeScript 5+ / TailwindCSS 4 / Zustand 5+ / Recharts 3.7+ / Lucide React / date-fns 4+ / clsx

## Key Files to Check Before Editing

| 작업 | 확인할 파일 |
|------|-----------|
| 데이터 구조 변경 | `src/types/index.ts` |
| 전역 상태 변경 | `src/store/useStore.ts` |
| 유틸리티 추가 | `src/lib/utils.ts` (이미 있을 수 있음) |
| 테스트 데이터 | `src/lib/mockData.ts` |
| CSS 클래스 추가 | `src/app/globals.css` |
| 네비게이션 추가 | `src/components/layout/Sidebar.tsx` (navItems) |

## Claude-Specific Instructions

### Architecture Pattern
```
Server Component (page.tsx)  →  metadata export + Client Component 렌더링
Client Component (*Client.tsx)  →  'use client' + hooks/인터랙션
```

### Component Template
```tsx
'use client'; // Client Component인 경우만

import { SomeIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MyComponentProps {
  title: string;
}

export default function MyComponent({ title }: MyComponentProps) {
  return (
    <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6">
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  );
}
```

### Essential Rules (빠른 참조)

1. **`any` 금지** - 타입 근본 원인 수정
2. **`@/*` import** - 상대 경로(`../`) 사용 금지
3. **라이브러리 추가 금지** - `package.json` 것만 사용, 필요 시 먼저 확인
4. **한국어 UI** - 사용자 노출 텍스트는 한국어, 코드는 영어
5. **포맷팅 함수** - `formatCurrency()`, `formatPercent()`, `cn()` 사용 (직접 구현 X)
6. **수익 색상** - `getReturnColor()` / `getReturnBgColor()` 사용
7. **CSS 변수** - 색상은 `var(--card)` 등 CSS 변수 사용, 하드코딩 금지
8. **반응형** - Desktop-first, `lg:` breakpoint 기준 사이드바 토글

### Git Commit Convention

`feat:` / `fix:` / `refactor:` / `docs:` / `chore:` / `style:`

### Custom Agents (`.claude/agents/`)

| Agent | 파일 | 용도 |
|-------|------|------|
| Frontend Dev | `frontend-dev.md` | 컴포넌트/페이지 구현 체크리스트 |
| UI Reviewer | `ui-reviewer.md` | UI/UX 디자인 리뷰 기준 |
| Stock Domain | `stock-domain.md` | 투자 도메인 검증 (→ docs/DOMAIN.md 참조) |
| Code Quality | `code-quality.md` | 코드 품질, 보안, 접근성 점검 |
