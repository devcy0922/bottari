# Architecture

## MVP shape

```text
Browser / Mobile Web Shell
        |
        v
Next.js UI + Route Handlers
        |
        v
Domain rules + Prisma
        |
        v
PostgreSQL
```

외부 provider는 현재 sandbox이며 향후 adapter로 교체한다.

## Core state

```text
Project: DRAFT -> RECRUITING -> COMPLETED
Participation: STARTED -> APPROVED -> REWARDED
Reward: PENDING -> APPROVED
```

## Money

Balance 숫자 하나를 SSOT로 사용하지 않는다. Researcher payment, project budget, processing cost, platform fee, respondent reward를 각각 LedgerEntry로 기록하며 idempotency key를 unique constraint로 강제한다.

## Next split

제품 검증 후 다음 경계를 분리한다.

```text
apps/researcher-web
apps/respondent-app
apps/api
packages/contracts
packages/domain
```

현재 MVP는 vertical slice 속도를 위해 Next.js 단일 deployable에 묶되 DB/domain boundary는 분리한다.
