# BOTTARI /goal

## Problem

한국에서 설문 의뢰자는 필요한 조건의 실제 응답자를 빠르게 모집하기 어렵고, 응답자는 자신이 제공하는 시간과 의견 대비 실제 보상이 얼마나 돌아오는지 알기 어렵다. 기존 리워드/패널 서비스는 플랫폼 수수료와 비용 구조가 사용자에게 충분히 투명하지 않은 경우가 많다.

BOTTARI는 설문 제작 도구가 아니라 **검증된 설문 응답자 모집 마켓플레이스(Verified Survey Respondent Marketplace)**다.

## Target Users

### Researcher
- 설문 응답자를 모집하려는 개인, 연구자, 팀, 기업
- Web만 사용한다.
- 외부 설문 URL을 등록하고 타깃, 인원, 보상을 정한 뒤 비용을 지불한다.

### Respondent
- 설문에 참여하고 확정된 보상을 받는 실제 사람
- Mobile App만 사용한다.
- 본인인증과 기본 프로필을 바탕으로 참여 가능한 조사만 확인한다.

## Core Value

1. **높은 응답자 보상** — 결제/인증/정산/운영에 필요한 최소 비용을 제외하고 가능한 많은 금액을 응답자에게 돌려준다.
2. **Verified Human Pool** — `1 Human = 1 Account`를 장기 핵심 자산으로 삼는다.
3. **투명한 돈의 흐름** — 프로젝트마다 결제액, 응답자 지급액, 결제/정산 비용, 플랫폼 운영비, 실제 지급률을 구분해 보여준다.
4. **빠른 모집** — 설문 제작 기능보다 적합한 실제 응답자에게 배포하고 검증하는 데 집중한다.

## Product Boundary

```text
Researcher (Web)
  -> Survey Project
  -> Targeting / Budget / Payment
  -> Matching
  -> Respondent (Mobile App)
  -> Participation
  -> Verification
  -> Reward Ledger
  -> Withdrawal
```

- Researcher 기능은 Web에만 존재한다.
- Respondent 기능은 Mobile App에만 존재한다.
- 자체 Survey Builder는 MVP에서 만들지 않는다.
- Google Forms, Tally, Typeform, Qualtrics, Naver Form 및 일반 HTTPS URL을 외부 설문으로 취급한다.
- 플랫폼의 핵심은 Survey Builder가 아니라 Distribution Marketplace다.

## Success Condition

MVP 성공은 화면 수나 기능 수가 아니라 다음 실제 거래 흐름을 완주할 수 있는지로 판단한다.

```text
Researcher가 설문 URL을 등록한다.
-> 타깃/인원/보상을 정한다.
-> 비용이 계산된다.
-> 결제 또는 sandbox payment가 승인된다.
-> 프로젝트가 모집 상태가 된다.
-> 조건에 맞는 Respondent에게 노출된다.
-> Respondent가 참여한다.
-> 완료가 검증된다.
-> Reward가 승인된다.
-> Wallet/Ledger에 반영된다.
-> 출금 가능한 상태가 된다.
```

## MVP Definition

MVP는 최소 다음을 실제 실행 가능한 vertical slice로 제공한다.

- Researcher Web: 외부 설문 URL 등록, 타깃/인원/예상시간/1인 보상 설정, 비용 미리보기, 프로젝트 활성화, 모집 현황 확인
- Respondent App: 개발 단계에서는 모바일 우선 Web Shell/PWA로 즉시 확인 가능하게 제공하고, 동일 API contract를 기반으로 Expo/React Native 클라이언트로 교체/추가 가능하게 경계를 유지
- API: Project, Matching, Participation, Verification, Reward, Ledger의 실제 상태 전이
- DB: PostgreSQL
- Payment: provider adapter 경계 + 로컬/sandbox provider. 실제 PG 연동 시 공식 문서를 다시 검증한다.
- Verification: MVP에서는 completion code 기반 deterministic verification을 우선 제공하고 integration별 verification level을 둔다.
- Admin: 핵심 검토/승인 흐름을 최소 UI 또는 API로 제공한다.
- Docker: 로컬 한 번에 실행 가능
- Makefile: setup/up/down/logs/test/lint/db-reset/smoke 등 운영 명령의 단일 진입점

## Non-Goals

MVP에서 하지 않는다.

- 자체 Survey Builder
- AI 설문 생성
- 커뮤니티/게시판/DM/소셜 피드
- 룰렛/출석/광고 미션
- 복잡한 ML Fraud Detection
- 고급 BI/CRM
- 다중 국가/다중 통화
- Researcher Mobile App
- Respondent Desktop/Web을 정식 제품 채널로 제공하는 것

## Business Constraints

- 한국 시장 우선
- 초기 1~2인 운영이 가능하도록 자동화 우선
- 사무실/대규모 운영인력을 전제로 하지 않는다.
- 플랫폼 목표는 최대 take-rate가 아니라 **신뢰 가능한 marketplace를 유지할 수 있는 최소 take-rate**다.
- 목표 지급률은 가능한 한 85~90% 이상을 지향하지만 숫자를 계약/코드에 고정하지 않는다.
- 실제 비용은 프로젝트별 ledger/fee breakdown으로 계산한다.

## Trust Principle

```text
1 Human = 1 Account
```

- 휴대폰 본인인증을 실제 서비스의 기본 identity verification으로 둔다.
- MVP 로컬 환경은 adapter를 통해 deterministic mock/sandbox identity provider를 사용할 수 있다.
- 중복계정 방지, 인증상태, 품질지표를 확장할 수 있는 데이터 모델을 둔다.
- 민감정보는 타깃팅에 정말 필요한 경우가 아니면 수집하지 않는다.

## Money Principle

- 금액은 KRW integer로 저장한다. floating point를 사용하지 않는다.
- 단일 `balance` 컬럼을 돈의 SSOT로 사용하지 않는다.
- Payment, Project Budget, Respondent Reward, Platform Fee, Processing Cost, Refund, Withdrawal, Adjustment를 ledger event로 추적한다.
- 금전/상태 변경 API는 idempotent해야 한다.
- 돈의 이동과 상태 변경은 audit 가능해야 한다.
- 광고 수익이 생기더라도 Survey Reward Ledger와 분리한다.

## UX Principle

- 첫 화면에서 설명서를 읽게 하지 않는다.
- Researcher: **설문 링크를 넣으면 얼마에 몇 명을 모집할 수 있는지 즉시 보여준다.**
- Respondent: **지금 내가 참여할 수 있는 조사와 보상을 즉시 보여준다.**
- 내부 도메인 용어를 그대로 노출하지 않고 한국 사용자에게 자연스러운 제품 언어를 사용한다.

## Architecture Principle

- `/goal`이 최상위 SSOT다.
- 제품 흐름을 먼저 정의하고 아키텍처를 역산한다.
- Web/App/API가 임의 DTO를 만들지 않도록 API Contract를 SSOT로 관리한다.
- 전체 Mock 화면보다 vertical slice 하나를 실제 E2E로 연결하는 것을 우선한다.
- vendor-specific integration은 adapter 경계 밖으로 새지 않게 한다.

## Needs Verification Before Production

다음은 구현 시점의 최신 공식 문서/법률/세무 자료를 확인하기 전까지 확정 정책으로 취급하지 않는다.

- Apple App Store 정책
- Google Play 정책
- 국내 PG 수수료 및 정산 조건
- 휴대폰 본인인증 비용/계약 조건
- 전자금융 관련 규정
- 리워드 지급의 세무/원천징수 처리
- 개인정보보호법 적용 세부사항
- 미성년자 정책

## Definition of Done

다음은 완료가 아니다.

- 화면만 존재
- Mock API만 존재
- 하드코딩된 가짜 데이터만 표시
- 핵심 흐름이 TODO

완료는 `make up` 후 사용자가 바로 Researcher -> Respondent -> Verification -> Reward 흐름을 재현할 수 있고, `make test` 및 `make smoke`가 같은 계약과 상태 전이를 검증하는 상태다.
