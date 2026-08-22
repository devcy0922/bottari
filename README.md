# Bottari

검증된 실제 응답자를 모집하고, 참여가 확인된 응답자에게 투명하게 보상하는 한국형 **Verified Survey Respondent Marketplace**.

제품 의사결정의 최상위 SSOT는 [`GOAL.md`](./GOAL.md)다.

## 지금 바로 확인

요구사항: Docker + Docker Compose + Make

```bash
cp .env.example .env
make setup
make smoke
```

브라우저:

- `http://localhost:3000` — Researcher Web
- `http://localhost:3000/respondent` — Respondent App MVP (mobile-first web shell)
- `http://localhost:3000/admin` — Reward/Ledger 운영 화면

`make help`로 전체 관리 명령을 확인할 수 있다.

## MVP에서 실제로 연결된 것

```text
Researcher가 외부 설문 URL 등록
-> 비용 breakdown 계산
-> sandbox payment 승인
-> RECRUITING 전환
-> 응답자 프로필 deterministic matching
-> 외부 설문 참여 시작
-> completion code 검증
-> Reward 생성
-> Ledger 기록
-> Admin 조회
```

DB/API는 실제 PostgreSQL을 사용한다. `sandbox`인 것은 외부 계약이 필요한 PG와 본인인증 provider뿐이며 provider 경계 밖의 도메인 상태 전이는 실제 DB transaction으로 수행한다.

## Make commands

```bash
make setup
make up
make down
make restart
make logs
make ps
make test
make build
make db-reset
make smoke
```

## 방향

- Researcher는 Web only
- Respondent는 Mobile App only가 최종 제품 경계
- MVP 확인 편의를 위해 Respondent client를 mobile-first web shell로 먼저 제공
- 다음 vertical slice에서 Expo/React Native 앱을 동일 API contract 위에 추가
- 자체 설문 Builder는 만들지 않는다.

## Production 전 검증 필요

PG/본인인증/출금/세무/App Store/Google Play/개인정보 관련 정책은 `GOAL.md`의 `Needs Verification Before Production` 항목처럼 최신 공식 자료 확인 전까지 확정하지 않는다.
