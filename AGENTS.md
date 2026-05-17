# AGENTS.md — 빌드/검증 명령

> ralph 가 매 iteration 검증에 사용하는 단일 출처.
> 60줄 이하 유지. 명령만. 도메인 설명은 specs/, 환경 컨텍스트는 CLAUDE.md.

---

## 환경 사전조건

- 운영체제: macOS 26.x (개발자 로컬) / Linux (Vercel CI·Production)
- 런타임 버전: **Node.js 22 LTS** (현 v22.22.0)
- 패키지 매니저: **npm 10+** (현 10.9.4)

---

## 셋업 (1회)

```bash
npm ci
```

> 첫 iteration 의 "Next.js 프로젝트 초기화" task 가 끝난 뒤부터 `package.json` 이 존재하므로 `npm ci` 가 의미를 가집니다. 그 이전에는 no-op 으로 간주.

---

## 필수 검증 명령 (ralph 가 매 iteration commit 직전 실행)

모든 명령이 exit 0 이어야 commit 한다.

```bash
# 1) lint (ESLint via Next.js)
npm run lint

# 2) typecheck (tsc --noEmit)
npm run typecheck

# 3) production build (Next.js — 빌드 통과가 가장 강력한 단일 검증)
npm run build
```

> 위 3개 npm 스크립트는 "Next.js 프로젝트 초기화" task 가 `package.json` 의 `scripts` 에 다음과 같이 추가해야 합니다:
> ```json
> "lint": "next lint",
> "typecheck": "tsc --noEmit",
> "build": "next build"
> ```
> 그 task 완료 전까지는 위 검증이 작동하지 않으므로 첫 iteration 은 plan 보강 + 셋업 commit 으로 PASS 처리합니다.

---

## 선택 검증

```bash
# 빌드 산출물 사이즈 / 페이지 수 점검
npm run build && find .next/server/app -name 'page.js' | wc -l

# 데모 위젯 dataset 무결성 (Phase 3 이후)
node scripts/validate-dataset.mjs

# 임베딩 사전계산 (빌드 전 1회, Voyage API 호출 — VOYAGE_API_KEY 필요)
node scripts/precompute-embeddings.mjs
```

---

## 실행 (로컬 확인용)

```bash
npm run dev
# → http://localhost:3000
```
