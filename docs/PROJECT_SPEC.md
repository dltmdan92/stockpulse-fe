# Project Overview

## 프로젝트 소개

**StockPulse**는 투자 포트폴리오 관리 + 저널링 웹 애플리케이션입니다.

> "내 투자를 기록하고, 추적하고, 복기한다"

기존 투자 트래커와의 차별점: 모든 거래에 **"왜?"**를 기록하게 하여 투자 의사결정 능력을 개선합니다.

## 핵심 기능

| 기능 | 라우트 | 설명 |
|------|--------|------|
| 대시보드 | `/` | 자산 현황 개요, 차트, 최근 거래 |
| 포트폴리오 | `/portfolio` | 보유 종목 CRUD, 섹터 배분 |
| 거래 기록 | `/trades` | 매매 저널링 (메모 + 태그) - **핵심** |
| 분석 | `/analysis` | 승률, 수익률, 태그별 성과 분석 |
| 시장 정보 | `/market` | 주요 지수, 뉴스 피드 |
| 관심 종목 | `/watchlist` | 모니터링 종목 |
| 설정 | `/settings` | 앱 설정 |

## 데이터 모델 요약

모든 타입은 `src/types/index.ts`에 정의됩니다.

| 모델 | 핵심 필드 | 용도 |
|------|----------|------|
| `Stock` | symbol, quantity, avgPrice, currentPrice, sector, country | 보유 종목 |
| `Trade` | type(buy/sell), memo, tags, targetPrice, stopLoss | 거래 기록 (핵심) |
| `PortfolioSummary` | totalValue, totalReturn, dailyChange | 포트폴리오 요약 |
| `MarketIndex` | symbol, value, change, changePercent | 시장 지수 |

상세 내용은 아래 문서를 참조하세요:

- 상세 기능 명세: [FEATURE_SPEC.md](./FEATURE_SPEC.md)
- 도메인 개념/용어: [DOMAIN.md](./DOMAIN.md)
- 아키텍처: [ARCHITECTURE.md](./ARCHITECTURE.md)
- 디자인 시스템: [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)

## 현재 상태

- **Phase**: Phase 1 (프론트엔드 프로토타입, Mock 데이터)
- **Version**: 0.1.0
- 향후 계획은 [ROADMAP.md](./ROADMAP.md) 참조
