#!/bin/sh
set -eu
BASE_URL="${BASE_URL:-http://localhost:3000}"
echo "[1/3] researcher projects"
curl -fsS "$BASE_URL/api/projects" >/dev/null
echo "[2/3] eligible respondent feed"
curl -fsS "$BASE_URL/api/respondent?respondentId=demo-seoul-29" >/dev/null
echo "[3/3] admin ledger"
curl -fsS "$BASE_URL/api/admin" >/dev/null
echo "Bottari smoke test: OK"
