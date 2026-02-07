# Roadmap

## Phase 1: Frontend Prototype (현재 - 완료)

- [x] 프로젝트 초기 설정 (Next.js 16, TypeScript, TailwindCSS)
- [x] 디자인 시스템 구축 (CSS 변수, 유틸리티 클래스)
- [x] 레이아웃 구조 (Sidebar, Header, 반응형)
- [x] Dashboard 페이지 (차트, 카드, 최근 거래)
- [x] Portfolio 페이지 (보유 종목 관리)
- [x] Trades 페이지 (거래 기록 저널링)
- [x] Analysis 페이지 (성과 분석)
- [x] Market 페이지 (시장 정보)
- [x] Watchlist 페이지 (관심 종목)
- [x] Settings 페이지 (설정)
- [x] Login / Register 페이지 (UI만)
- [x] 에러/로딩 상태 처리
- [x] Mock 데이터 기반 동작

## Phase 2: Backend Integration (예정)

- [ ] API 서버 구축 또는 BaaS 연동 (Supabase / Firebase)
- [ ] 인증 시스템 (NextAuth.js 또는 Supabase Auth)
- [ ] 데이터베이스 연동 (PostgreSQL / Supabase)
- [ ] Mock 데이터 → 실제 API 호출로 교체
- [ ] 서버 상태 관리 (React Query 또는 SWR)
- [ ] 실시간 주가 데이터 연동 (WebSocket / Polling)

## Phase 3: Advanced Features (계획)

- [ ] 실시간 알림 시스템
- [ ] 다크/라이트 테마 토글
- [ ] 고급 차트 (캔들스틱, 기술 지표)
- [ ] 소셜 기능 (전략 공유)
- [ ] 모바일 앱 (React Native / PWA)
- [ ] AI 기반 투자 인사이트

## Development Workflow

```bash
npm run dev      # 개발 서버 (Hot Reload)
npm run lint     # 코드 품질 검사
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버
```
