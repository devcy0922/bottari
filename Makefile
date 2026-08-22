SHELL := /bin/sh
REMOTE ?= git@github.com:devcy0922/bottari.git
.PHONY: help setup up down restart logs ps test build db-reset smoke remote-check remote-set
help:
	@echo "Bottari commands"
	@echo "  make setup       Build and start MVP"
	@echo "  make up          Start services"
	@echo "  make down        Stop services"
	@echo "  make restart     Restart services"
	@echo "  make logs        Follow app logs"
	@echo "  make ps          Show service status"
	@echo "  make test        Run domain tests"
	@echo "  make build       Build application image"
	@echo "  make db-reset    Reset local PostgreSQL and seed"
	@echo "  make smoke       Verify core HTTP endpoints"
	@echo "  make remote-check Show git origin"
	@echo "  make remote-set   Set origin to devcy0922/bottari"
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
	docker compose run --rm --no-deps app pnpm test
db-reset:
	docker compose down -v
	docker compose up -d db
	@until docker compose exec -T db pg_isready -U bottari -d bottari >/dev/null 2>&1; do sleep 1; done
	docker compose run --rm app sh -c "pnpm db:push -- --force-reset && pnpm db:seed"
	docker compose up -d app
smoke:
	@sh scripts/smoke.sh
remote-check:
	@git remote -v
remote-set:
	@git remote set-url origin $(REMOTE)
	@git remote -v
