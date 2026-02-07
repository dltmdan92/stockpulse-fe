# Setup & Development Guide

## Prerequisites

- **Node.js** >= 18
- **npm** >= 9 (프로젝트는 npm 사용, yarn/pnpm도 가능)

## Quick Start

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev

# 3. 브라우저에서 확인
open http://localhost:3000
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | 개발 서버 실행 (Hot Reload, localhost:3000) |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 서버 실행 |
| `npm run lint` | ESLint 검사 |

## Project Structure

```
stockpulse-fe/
├── .claude/                # Claude Code AI 설정 (Claude 전용)
├── docs/                   # 프로젝트 문서
├── public/                 # 정적 파일
├── src/
│   ├── app/                # Next.js App Router (페이지)
│   ├── components/         # React 컴포넌트
│   ├── lib/                # 유틸리티, Mock 데이터
│   ├── store/              # Zustand 전역 상태
│   └── types/              # TypeScript 타입 정의
├── package.json
├── tsconfig.json
├── eslint.config.mjs
├── postcss.config.mjs
└── next.config.ts
```

## Development Workflow

### 새 페이지 추가

1. `src/app/{route}/page.tsx` 생성 (Server Component)
2. `src/components/{feature}/{Feature}Client.tsx` 생성 (Client Component)
3. 필요시 `src/components/layout/Sidebar.tsx`의 `navItems`에 네비게이션 추가

### 새 컴포넌트 추가

1. `src/components/{feature}/{ComponentName}.tsx` 파일 생성
2. PascalCase 파일명 사용
3. Props 인터페이스 정의 후 `export default function` 형태로 작성

### 새 타입 추가

`src/types/index.ts`에 interface 추가

### 새 전역 상태 추가

1. `src/types/index.ts`에 타입 정의
2. `src/store/useStore.ts`에 state와 action 추가
3. `src/lib/mockData.ts`에 목업 데이터 추가

## Configuration

### TypeScript

- Strict mode 활성화
- Path alias: `@/*` → `./src/*`
- Target: ES2017
- JSX: react-jsx

### ESLint

- `eslint-config-next/core-web-vitals` 적용
- `eslint-config-next/typescript` 적용

### TailwindCSS

- PostCSS 플러그인으로 구성 (`@tailwindcss/postcss`)
- 커스텀 CSS 변수는 `src/app/globals.css`에 정의
- `@theme inline` 블록으로 Tailwind에 매핑

## Troubleshooting

### 빌드 에러

```bash
# node_modules 재설치
rm -rf node_modules .next
npm install

# TypeScript 타입 체크
npx tsc --noEmit
```

### Port 충돌

```bash
# 다른 포트로 실행
npm run dev -- -p 3001
```

### Tailwind 스타일 미적용

- `globals.css`에 `@import "tailwindcss"` 확인
- `postcss.config.mjs`에 `@tailwindcss/postcss` 플러그인 확인
- `.next` 캐시 삭제 후 재시작
