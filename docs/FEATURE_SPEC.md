# Feature Specification - 기능 명세

## 페이지별 기능 상세

### 1. Dashboard (`/`)

**목적**: 투자 현황을 한눈에 파악

#### 구성 요소
| 컴포넌트 | 설명 | 데이터 |
|---------|------|--------|
| OverviewCards | 핵심 지표 4개 (총 자산, 총 수익, 일일 변동, 총 거래) | PortfolioSummary |
| AssetTrendChart | 자산 추이 라인 차트 (30일) | AssetHistory[] |
| AssetAllocationChart | 섹터별 자산 배분 파이 차트 | SectorAllocation[] |
| RecentTrades | 최근 거래 목록 | Trade[] (최근 5건) |

#### Overview Cards 상세
1. **총 자산**: 현재 포트폴리오 가치 (KRW)
2. **총 수익**: 총 수익금과 수익률 (%)
3. **일일 변동**: 당일 변동액과 변동률 (%)
4. **총 거래 수**: 전체 거래 횟수

---

### 2. Portfolio (`/portfolio`)

**목적**: 보유 종목 관리 및 현황 확인

#### 기능
- 보유 종목 테이블 뷰
  - 컬럼: 종목명, 코드, 수량, 평균매수가, 현재가, 수익률, 섹터
- 종목 추가 (Add)
- 종목 수정 (Edit)
- 종목 삭제 (Delete)
- 섹터별 필터링

#### 정렬 옵션
- 수익률 순 (기본)
- 보유 금액 순
- 종목명 순

---

### 3. Trades (`/trades`)

**목적**: 거래 기록 및 투자 저널링 (핵심 기능)

#### 거래 추가 Form
| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| symbol | text | O | 종목 코드 |
| type | select | O | 매수(buy) / 매도(sell) |
| quantity | number | O | 수량 |
| price | number | O | 거래가 |
| date | date | O | 거래일 |
| memo | textarea | O | 투자 근거 (핵심) |
| tags | tag-input | O | 전략 태그 (#접두사) |
| targetPrice | number | X | 목표가 |
| stopLoss | number | X | 손절가 |

#### 필터 & 검색
- 거래 유형별 필터 (매수/매도/전체)
- 태그별 필터
- 종목별 검색
- 기간별 필터

#### 거래 목록 표시
- 카드 또는 테이블 형식
- 각 거래에 메모 미리보기
- 태그 뱃지 표시
- 수익/손실 색상 표시

---

### 4. Analysis (`/analysis`)

**목적**: 투자 성과 분석 및 전략 평가

#### 구성 요소
1. **성과 통계 카드**
   - 총 거래 수
   - 승률 (Win Rate)
   - 평균 수익률
   - 평균 보유 기간
   - 최대 수익 / 최대 손실

2. **태그별 성과 테이블**
   - 태그명
   - 거래 수
   - 승률
   - 평균 수익률
   - 성과 순 정렬

3. **시각화 차트**
   - 월별 수익률 바 차트
   - 태그별 성과 비교 차트

---

### 5. Market (`/market`)

**목적**: 시장 동향 및 뉴스 확인

#### 구성 요소
1. **주요 지수 카드**
   - S&P 500, NASDAQ 100, KOSPI, Dow Jones
   - 현재값, 변동액, 변동률
   - 실시간 표시 (pulse-dot)

2. **뉴스 피드**
   - 최신 금융 뉴스
   - 관련 종목 태그
   - 출처, 날짜

---

### 6. Watchlist (`/watchlist`)

**목적**: 관심 종목 모니터링

#### 기능
- 관심 종목 추가/삭제
- 현재가 표시
- 변동률 표시
- 알림 설정 (Phase 2)

---

### 7. Settings (`/settings`)

**목적**: 앱 설정 관리

#### 설정 항목
- 프로필 정보
- 기본 통화 (KRW/USD)
- 알림 설정
- 테마 설정 (Phase 2: 라이트 모드)

---

### 8. Login / Register (`/login`, `/register`)

**목적**: 사용자 인증

#### Phase 1 (현재)
- UI 구조만 구현
- 실제 인증 없음

#### Phase 2 (예정)
- NextAuth.js 또는 Supabase Auth 연동
- 소셜 로그인 (Google, GitHub)

---

## 공통 UI 패턴

### Loading State
- 모든 데이터 의존 컴포넌트에 스켈레톤 로딩 적용
- `shimmer` 클래스 사용

### Error State
- 에러 발생 시 한국어 메시지 + 재시도 버튼
- 글로벌 error boundary (`app/error.tsx`)

### Empty State
- 데이터 없을 때 안내 메시지 + 추가 유도 CTA
- 예: "아직 거래 기록이 없습니다. 첫 거래를 기록해보세요!"

### Toast / Notification
- 작업 성공/실패 알림
- NotificationDropdown으로 알림 목록 표시

## 데이터 모델 (TypeScript)

모든 타입은 `src/types/index.ts`에 정의됩니다.

```typescript
Stock         // 보유 종목
Trade         // 거래 기록
JournalEntry  // 저널 엔트리
PortfolioSummary  // 포트폴리오 요약
SectorAllocation  // 섹터 배분
AssetHistory      // 자산 추이
TradeStats        // 거래 통계
TagPerformance    // 태그별 성과
MarketIndex       // 시장 지수
NewsItem          // 뉴스 항목
```

상세 필드 정의는 `src/types/index.ts` 소스 코드를 참조하세요.
