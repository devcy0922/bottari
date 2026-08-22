# Bottari Engineering Instructions

## 1. Goal First

`GOAL.md` is the highest-level SSOT. Before adding or changing a feature, verify that it directly contributes to the Goal, MVP Definition, Trust Principle, Money Principle, or Definition of Done.

If not, exclude it from MVP.

## 2. Vertical Slice Before Surface Area

Do not declare a feature complete because a screen exists. Prefer one real E2E path over several mock pages.

Required core path:

```text
Researcher project
-> payment/budget
-> recruiting
-> respondent matching
-> participation
-> verification
-> reward
-> ledger
```

## 3. No Fake Completion

The following are not completion:

- UI backed only by hardcoded arrays
- fake API responses
- TODO in the critical transaction path
- a README claim without executable behavior

External providers that require contracts may use explicit `sandbox` adapters, but domain state and DB transactions must remain real.

## 4. Money Safety

- KRW uses integer units.
- Do not use a mutable balance field as the money SSOT.
- Money-changing requests need idempotency.
- Ledger events must remain explicit and auditable.
- Never silently change payout/fee policy to hit a fixed payout percentage.

## 5. Product Boundary

- Researcher: Web
- Respondent: Mobile App
- MVP may use the mobile-first respondent web shell only as a development preview.
- Do not add a Survey Builder.
- Keep provider integrations behind adapters.

## 6. Deterministic Before AI

Matching and verification start deterministic. Do not add LLM/ML fraud or recommendation systems until data and a concrete need exist.

## 7. Make Is the Local Entry Point

All common local workflows should be reachable through `make`.

At minimum keep these healthy:

```text
make setup
make up
make down
make test
make smoke
make db-reset
```

## 8. Before Merge

Run or verify equivalent CI for:

```text
pnpm test
pnpm build
Docker image build
```

For changes to the core path, also update tests or smoke coverage.
