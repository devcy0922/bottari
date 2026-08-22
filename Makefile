SHELL := /bin/sh
.PHONY: help setup up down restart logs ps test build db-reset smoke
help:
	@echo "Bottari commands"
	@echo "  make setup     Build and start MVP"
	@echo "  make up        Start services"
	@echo "  make down      Stop services"
	@echo "  make restart   Restart services"
	@echo "  make logs      Follow app logs"
	@echo "  make ps        Show service status"
	@echo "  make test      Run domain tests"
	@echo "  make build     Build application image"
	@echo "  make db-reset  Reset local PostgreSQL and seed"
	@echo "  make smoke     Verify core HTTP endpoints"
setup: build up
build:
	docker compose build
up:
	docker compose up -d
	docker compose ps
down:
	docker compose down
restart: down up
logs:
	docker compose logs -f app
ps:
	docker compose ps
test:
	docker compose run --rm --no-deps app sh -c "corepack enable >/dev/null 2>&1 || true; pnpm test"
db-reset:
	docker compose down -v
	docker compose up -d db
	@until docker compose exec -T db pg_isready -U bottari -d bottari >/dev/null 2>&1; do sleep 1; done
	docker compose run --rm app sh -c "npx prisma db push --force-reset && npx prisma db seed"
	docker compose up -d app
smoke:
	@sh scripts/smoke.sh
