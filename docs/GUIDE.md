# Local Guide

## 1. 최초 실행

```bash
cd /srv/moru-org/bottari
cp .env.example .env
make setup
```

## 2. 확인 순서

1. `http://localhost:3000`에서 프로젝트 생성
2. 프로젝트 카드의 `결제하고 모집 시작` 클릭
3. `http://localhost:3000/respondent`에서 조건에 맞는 데모 응답자 선택
4. `참여하기` 클릭
5. 화면에 표시된 demo completion code 입력
6. 검증 후 보상 생성 확인
7. `http://localhost:3000/admin`에서 Reward와 Ledger 확인

## 3. 운영 명령

```bash
make ps
make logs
make test
make smoke
make db-reset
make restart
```

## 4. 로컬 경로의 origin 전환

이 레포의 실제 원격은 다음이어야 한다.

```bash
git remote set-url origin git@github.com:devcy0922/bottari.git
git remote -v
```

HTTPS를 사용한다면:

```bash
git remote set-url origin https://github.com/devcy0922/bottari.git
```

`/srv/moru-org/bottari`라는 로컬 디렉터리명은 그대로 유지해도 Git remote와 무관하다.
