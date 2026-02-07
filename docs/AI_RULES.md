# AI Assistant Rules

이 프로젝트에서 AI 어시스턴트(Claude, Gemini, Copilot 등)가 따라야 할 공통 규칙입니다.

## 1. 안전성 (Zero Harm)

- 명시적 지시 없이 파일 삭제/덮어쓰기 금지
- 파일 경로를 추측하지 않고 반드시 확인 후 사용
- `package.json`에 없는 라이브러리를 임의로 사용하지 않음. 필요 시 먼저 확인

## 2. 정확성 (Zero Hallucination)

- 코드 작성 전 대상 파일 내용을 먼저 확인
- `any` 또는 `@ts-ignore`로 타입 에러를 우회하지 않음. 근본 원인 수정
- import 경로가 실제로 존재하는지 확인

## 3. 사용자 우선

- 요구사항이 모호하면 실행 전에 질문하거나 구체적 계획 제시
- 사용자 선호 존중
- 코드 작성 전 관련 문서(`docs/`) 확인

## 4. 작업 루프

```
Plan → Execute → Verify → Improve → Docs Update → Finalize
```

- "될 것 같다"에서 멈추지 않고 "동작을 확인했다"까지 진행
- 빌드 에러, 타입 에러가 없는 상태에서만 완료 선언

## 5. 문서 정책

코드 변경 시 관련 문서 업데이트 필수:

| 변경 내용 | 업데이트 대상 |
|----------|-------------|
| 새 라이브러리 | `docs/TECH_STACK.md` |
| 파일 구조 변경 | `docs/TECH_STACK.md`, `docs/ARCHITECTURE.md` |
| 새 기능 | `docs/FEATURE_SPEC.md`, `docs/PROJECT_SPEC.md` |
| 새 컨벤션 | `docs/CONVENTIONS.md` |
| 디자인 토큰 변경 | `docs/DESIGN_SYSTEM.md` |
| 도메인 용어 추가 | `docs/DOMAIN.md` |

## 6. 참조 문서 인덱스

| 문서 | 경로 | 내용 |
|------|------|------|
| 프로젝트 개요 | `docs/PROJECT_SPEC.md` | 프로젝트 소개, 핵심 기능, 데이터 모델 |
| 기능 명세 | `docs/FEATURE_SPEC.md` | 페이지별 상세 기능 |
| 도메인 가이드 | `docs/DOMAIN.md` | 투자 도메인 개념, 용어, 규칙 |
| 아키텍처 | `docs/ARCHITECTURE.md` | 시스템 구조, 컴포넌트 계층, 데이터 흐름 |
| 디자인 시스템 | `docs/DESIGN_SYSTEM.md` | 색상, 패턴, 반응형, 타이포그래피 |
| 코딩 컨벤션 | `docs/CONVENTIONS.md` | 코드 스타일, 네이밍, import 규칙 |
| 기술 스택 | `docs/TECH_STACK.md` | 기술 스택, 디렉토리 구조, 설정 |
| 개발 가이드 | `docs/SETUP.md` | 환경 설정, 워크플로우 |
| 로드맵 | `docs/ROADMAP.md` | 개발 로드맵 |
