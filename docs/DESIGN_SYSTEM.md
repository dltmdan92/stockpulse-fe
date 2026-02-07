# Design System

StockPulse의 디자인 시스템을 정의합니다.
모든 UI 구현은 이 문서의 토큰과 패턴을 따라야 합니다.

## Theme

- **Mode**: Dark only (현재)
- **Feel**: 프로페셔널 금융 대시보드
- **Font**: Geist Sans (본문), Geist Mono (숫자/코드)

## Color Tokens

### CSS Variables (`globals.css`)

| Token | Hex | Usage |
|-------|-----|-------|
| `--background` | `#0f172a` | 페이지 배경 |
| `--foreground` | `#f8fafc` | 기본 텍스트 |
| `--card` | `#1e293b` | 카드/패널 배경 |
| `--card-hover` | `#334155` | 카드 호버 상태 |
| `--border` | `#334155` | 테두리 |
| `--accent` | `#3b82f6` | 주요 액센트 (파란색) |
| `--accent-hover` | `#2563eb` | 액센트 호버 |
| `--positive` | `#22c55e` | 수익/상승 (초록색) |
| `--negative` | `#ef4444` | 손실/하락 (빨간색) |
| `--text-secondary` | `#94a3b8` | 보조 텍스트 |
| `--text-muted` | `#64748b` | 약한 텍스트 |

### Tailwind에서 사용

```tsx
// CSS 변수 직접 사용 (권장)
className="bg-[var(--card)] text-[var(--foreground)]"

// Tailwind theme 매핑 사용
className="bg-card text-foreground"
```

### 금융 데이터 색상 규칙

- 수익/상승: `var(--positive)` 또는 `text-green-500`
- 손실/하락: `var(--negative)` 또는 `text-red-500`
- 변동 없음: `text-slate-400`
- 항상 +/- 기호를 함께 표시

## Spacing Scale

Tailwind 기본 spacing 사용:

| Usage | Value | Tailwind |
|-------|-------|----------|
| 컴포넌트 내부 패딩 | 16px / 24px | `p-4` / `p-6` |
| 카드 간 간격 | 16px / 24px | `gap-4` / `gap-6` |
| 섹션 간 간격 | 24px | `space-y-6` |
| 페이지 패딩 | 24px | `p-6` |

## Component Patterns

### Card

```tsx
<div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6">
  <h3 className="text-lg font-semibold mb-4">카드 제목</h3>
  {/* content */}
</div>
```

### Card with Hover

```tsx
<div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 card-hover">
  {/* content */}
</div>
```

### Glass Card (Overlay)

```tsx
<div className="glass rounded-xl p-4">
  {/* content */}
</div>
```

### Primary Button

```tsx
<button className="px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-xl transition-colors font-medium">
  버튼 텍스트
</button>
```

### Icon Button

```tsx
<button className="p-2.5 hover:bg-[var(--card-hover)] rounded-xl transition-colors">
  <Icon className="w-5 h-5 text-[var(--text-secondary)]" />
</button>
```

### Input Field

```tsx
<input
  type="text"
  placeholder="플레이스홀더"
  className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all"
/>
```

### Badge / Tag

```tsx
<span className="px-2 py-1 text-xs font-medium rounded-lg bg-blue-500/10 text-blue-400">
  #태그
</span>
```

### Stats Display

```tsx
<div>
  <p className="text-sm text-[var(--text-muted)]">레이블</p>
  <p className="text-2xl font-bold">{formatCurrency(value)}</p>
  <p className={cn("text-sm", getReturnColor(change))}>
    {formatPercent(change)}
  </p>
</div>
```

## Border Radius

| Element | Radius | Tailwind |
|---------|--------|----------|
| Card | 16px | `rounded-2xl` |
| Button | 12px | `rounded-xl` |
| Input | 12px | `rounded-xl` |
| Badge | 8px | `rounded-lg` |
| Avatar | 12px | `rounded-xl` |
| Tooltip | 8px | `rounded-lg` |

## Utility Classes

| Class | Effect |
|-------|--------|
| `.glass` | 반투명 배경 + backdrop-blur (오버레이용) |
| `.gradient-primary` | 파란색→보라색 그라디언트 (브랜드) |
| `.gradient-success` | 초록색 그라디언트 (수익) |
| `.gradient-danger` | 빨간색 그라디언트 (손실) |
| `.card-hover` | 호버 시 살짝 올라가는 애니메이션 |
| `.pulse-dot` | 실시간 표시 깜박임 |
| `.shimmer` | 스켈레톤 로딩 애니메이션 |

## Responsive Breakpoints

| Breakpoint | Size | Usage |
|-----------|------|-------|
| Default | < 640px | 모바일: 사이드바 숨김, 단일 컬럼 |
| `sm` | >= 640px | 작은 태블릿 |
| `lg` | >= 1024px | 데스크톱: 사이드바 표시, 멀티 컬럼 |

### Layout Behavior
- **Mobile**: 사이드바 숨김, 하단 FAB으로 토글
- **Desktop (lg+)**: 사이드바 고정 (w-64), 컨텐츠 `ml-64`
- **Grid**: 1 → 2 → 4 컬럼 반응형 (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`)

## Typography

| Element | Size | Weight | Class |
|---------|------|--------|-------|
| Page Title | 24px | Bold | `text-2xl font-bold` |
| Section Title | 18px | Semibold | `text-lg font-semibold` |
| Card Title | 16px | Semibold | `text-base font-semibold` |
| Body | 14px | Normal | `text-sm` |
| Caption | 12px | Normal | `text-xs` |
| Large Number | 24px+ | Bold | `text-2xl font-bold` |

## Icons

Lucide React 사용. 일관된 크기 적용:

| Context | Size | Class |
|---------|------|-------|
| Navigation | 20px | `w-5 h-5` |
| Button Icon | 16px | `w-4 h-4` |
| Feature Icon | 20px | `w-5 h-5` |
| Hero/Empty State | 32px | `w-8 h-8` |
