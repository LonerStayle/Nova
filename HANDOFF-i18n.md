# HANDOFF — i18n locale 기반 단일 언어 분기

**작성일**: 2026-05-17
**대상**: 다음 ralph 세션 또는 인계받는 개발자
**범위**: 한국인 = 한국어 전용 / 외국인 = 영어 전용 단일 언어 분기 도입

---

## 1. 현재 상태 요약

- ralph 자율 루프 37 iteration 종료 → `<promise>PROJECT_DONE</promise>` 출력
- 이후 대표님 검토 시 "코미디 요소 부족" 피드백 → dry humor 5곳 분포 commit 1회 (`3369a39 feat(comedy):`)
- `IMPLEMENTATION_PLAN.md` 의 Phase 0~5 모두 `[x]`, 풍자 사이트 완성
- 빌드 상태: lint / typecheck / next build 모두 exit 0, 9 페이지 정적 prerendered + Edge `/api/embed` + 5 OG + sitemap + robots

**현재 콘텐츠 언어 상태**: 영문 위주 + 한국어 일부 (혼재).
- `lib/brand.ts` — `tagline.primary` / `primaryKr` 등 일부 필드 한·영 분리
- About 페이지 — Mission 본문 한국어, disclosure 한·영 병기, heading 한국어 우선
- Footer disclosure — 한국어
- DemoWidget UI / 에러 / 5 페이지 본문 / 차트 caption — 영문 위주
- `public/data/qa.json` 200 entries — 모두 영문

---

## 2. 새 요구사항 (대표님 발화)

> "다국어 처리해서 한국인이면 한국어로만 볼 수 있게 외국인이면 영어로만 볼 수 있게"

**핵심**:
- locale 감지 → **단일 언어** 전체 노출 (한·영 동시 표시 금지)
- 한국인 = 한국어, 그 외 = 영어
- 토글 기능 명시 X (사용자가 다른 언어 강제로 보고 싶다면? 결정 필요)

---

## 3. 대표님 결정 사항 — **모두 확정 (2026-05-17)**

> 권장안 5종 (1·2·4·5·7) 일괄 채택 + 3·6 기본값 + qa.ko.json 은 ralph 자동 번역.
> 아래 표는 의사결정 기록용.


| # | 결정 항목 | 옵션 | 권장 |
|---|----------|------|------|
| 1 | locale 감지 | (A) Accept-Language `ko*` → 한국어 / 그 외 영어 <br/> (B) Geo-IP (Vercel Edge geo) <br/> (C) URL prefix `/ko/*` `/en/*` | **A + 사용자 토글 cookie** — SEO 친화 + 헤더 신뢰 가능 |
| 2 | URL 구조 | (A) `app/[locale]/...` 표준 i18n routing <br/> (B) 단일 URL + middleware 가 dictionary 분기 | **A (i18n routing)** — `/ko/benchmarks`, `/en/benchmarks`. SEO + crawler 친화 |
| 3 | fallback | 비-한국어 = 영어 (default) | 그대로 |
| 4 | 토글 UI | (A) 추가 — 헤더 우측에 KR / EN 토글 <br/> (B) 미추가 (자동 감지만) | **A 추가** — 외국인이 한국어 보고 싶을 때 / 한국인이 영어 보고 싶을 때 |
| 5 | qa.json | (A) entry 마다 `answerKr` 필드 추가 <br/> (B) `qa.ko.json` / `qa.en.json` 두 파일 | **B** — 분리, 인덱스 단순 |
| 6 | 임베딩 | 한·영 dataset 둘 다 별도 embeddings.json | 두 파일 (`embeddings.{ko,en}.json`). retrieval 도 locale 별 |
| 7 | i18n 라이브러리 | (A) `next-intl` <br/> (B) `next-translate` <br/> (C) 자체 | **A `next-intl`** — App Router 완전 호환, 활발히 유지, 검증된 표준 |

---

## 4. 권장 기술 접근 (next-intl + App Router)

### 4-1. 의존성 추가
```bash
npm install next-intl
```

### 4-2. 디렉토리 구조 변경

```
app/
  [locale]/
    layout.tsx           ← 기존 app/layout.tsx 옮김
    page.tsx             ← Home
    (routes)/
      benchmarks/page.tsx
      capabilities/page.tsx
      architecture/page.tsx
      security/page.tsx
      about/page.tsx
    not-found.tsx
  api/
    embed/route.ts       ← locale 무관, 그대로
  sitemap.ts             ← locale 별 URL 양산
  robots.ts
i18n/
  routing.ts             ← next-intl 라우팅 설정 (locales: ['ko','en'], defaultLocale: 'en')
  request.ts             ← getRequestConfig
messages/
  ko.json
  en.json
middleware.ts            ← next-intl 미들웨어 (Accept-Language + cookie 우선순위)
```

### 4-3. 메시지 추출 (단계적)

`messages/en.json` / `messages/ko.json` 양쪽 동일 키.

추출 대상:
- `lib/brand.ts` 의 영/한 분리 필드 — 이미 분리되어 있어 통합 쉬움
- `components/sections/hero.tsx` 의 capability tags (영문 hard-coded)
- `components/sections/key-metrics.tsx`, `trusted-by.tsx`, `capability-card.tsx`
- `components/charts/chart-card.tsx` + 모든 caption (in 페이지 source)
- `components/demo/demo-widget.tsx` (placeholder, sample queries, 에러 toast, sample query 3 — 한국어 버전 필요)
- `components/layout/site-nav.tsx`, `site-footer.tsx` (footer disclosure 는 brand.ts 의 disclosure.short 참조 중 → en/ko 분기)
- `components/layout/theme-toggle.tsx` aria-label
- 5 페이지 + Home 의 SectionHeading text + body
- `lib/og/page-image-template.tsx` (OG 도 locale 별로 — 추가 작업)
- `app/not-found.tsx`

### 4-4. dataset 분리

`public/data/qa.ko.json` 신규 작성 (200 entries 한국어 번역) + `public/data/qa.en.json` (기존 qa.json 이름 변경).

`lib/retrieval/bm25.ts` + `hybrid.ts` 가 locale prop 받아 적절한 dataset 사용. `loadEmbeddings()` 도 `/data/embeddings.{locale}.json` 분기.

### 4-5. middleware

```ts
// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
export default createMiddleware(routing);
export const config = { matcher: ['/((?!api|_next|.*\\..*).*)'] };
```

Accept-Language `ko*` → `/ko/...` redirect, 그 외 → `/en/...`.

### 4-6. 토글 UI

SiteNav 우측 (ThemeToggle 옆) 에 `<LocaleToggle>` 추가 — Pill 형태로 "KR / EN" 표시. 클릭 시 `Set-Cookie: NEXT_LOCALE=...` + redirect.

---

## 5. 영향받는 파일 목록 (변경 우선순위)

### High (필수)
- `middleware.ts` (신규)
- `i18n/routing.ts` (신규)
- `i18n/request.ts` (신규)
- `messages/en.json`, `messages/ko.json` (신규)
- `app/[locale]/layout.tsx` (이동 + 수정)
- `app/[locale]/page.tsx` 외 5 페이지 (이동 + 메시지 키 사용)
- `app/[locale]/not-found.tsx`
- `app/sitemap.ts` (locale 별 URL 양산)
- `lib/brand.ts` (한/영 필드 통합 또는 messages 로 이동)
- `lib/retrieval/{bm25,hybrid}.ts` (locale prop)
- `public/data/qa.ko.json` (신규 200 entries 번역)

### Medium
- 5 차트 caption 추출
- DemoWidget UI 메시지 추출
- Site footer / nav 의 모든 텍스트 추출
- LocaleToggle 컴포넌트 신규
- 임베딩 precompute 스크립트 — 두 dataset 처리

### Low
- OG image template — locale 별 텍스트 분기
- 코미디 dry humor 메시지 — 한·영 두 톤 모두 풍자 보존 (번역 시 미묘함 주의)
- 404 페이지 텍스트
- ThemeToggle aria-label

### 변경 없음
- `app/api/embed/route.ts` (locale 무관)
- `app/robots.ts`
- `app/icon.tsx`, `app/apple-icon.tsx`
- `tailwind.config.ts`, `globals.css`, `components/ui/*` (디자인 시스템)
- `lib/charts/style.ts`

---

## 6. 풍자 톤 보존 주의사항 (번역 시)

**한국어 우선 농담들** (이미 한국어로 자연스러운 부분 — 영어로 옮길 때 미묘함 손실 우려):
- About disclosure: "이 사이트는 패러디입니다." → 영어 "This entire site is a parody." (이미 부제로 있음, 한·영 모두 같은 강도)
- Mission 본문 — 한국어가 더 자연스럽게 패러디 톤. 영어 번역은 비교적 generic 해질 위험.

**영어 우선 농담들** (이미 영문, 한국어로 옮길 때 톤 손실 우려):
- "Hard to lose a benchmark you invented." → "자기가 만든 벤치마크에서 지긴 어렵죠."
- "None of these companies are real. None of this is real, actually. We can explain →" → "이 회사들 다 가짜입니다. 사실 이 사이트 전체가 가짜예요. 자세한 사정은 →"
- "This page doesn't exist. Then again, neither does most of this website." → "이 페이지는 존재하지 않습니다. 사실 이 사이트의 대부분도 존재하지 않습니다만."
- "Build · v1.0.0-frontier · Nexora-1 · (fictional)" → 한국어 버전은 "빌드 · v1.0.0 · Nexora-1 · (가공)" 정도

번역할 때 *직역 X, 문화적 맥락 보존* 우선. 한국 AI 업계 풍자라는 본질이 양쪽 언어에서 모두 살아 있어야.

---

## 7. CLAUDE.md §5 (금지 항목) 재확인

- i18n 도입해도 **실존 회사·인물·제품·인증 직접 모사 금지** 그대로
- 한국어 번역 시 한국 실존 기업명 (네이버·카카오·LG·삼성 등) 모사 절대 금지
- "K-인텔리전스" "한국형 GPT" 같은 클리셰는 풍자성 위해 사용 가능 (단 specific 회사 지칭 X)

---

## 8. 다음 ralph 세션 시작 가이드

### 사전 작업 (대표님)
1. 위 §3 결정 사항 7 항목 모두 결정
2. `PROMPT.md` 의 `<!-- signs -->` 섹션에 표지판 추가:
   ```
   <!-- i18n: locale-based 단일 언어 분기. 자세한 사양은 HANDOFF-i18n.md 참조. middleware Accept-Language + cookie 우선순위. -->
   ```
3. `IMPLEMENTATION_PLAN.md` 의 Phase 6 (이미 한 줄 추가됨) 을 sub-task 로 세분화하거나 ralph 가 §4 plan 보강 모드로 자동 세분화

### ralph-loop 재시작
```
/ralph-loop:ralph-loop "Read PROMPT.md and follow it." --completion-promise "PROJECT_DONE" --max-iterations 60
```

ralph 가 첫 [ ] 픽업하면 이 문서를 첫 iteration 에서 Read 해야 함 — 그 의도로 plan task description 에 "HANDOFF-i18n.md 참조" 명시.

### 첫 iter 권장 작업
1. HANDOFF-i18n.md 읽고 결정사항 반영 가능 여부 확인
2. `next-intl` install + `i18n/routing.ts` + `messages/{ko,en}.json` skeleton
3. middleware.ts
4. 한 페이지 (Home 또는 About) 만 [locale] 디렉토리로 이동 + 메시지 추출 — 마이그레이션 패턴 검증
5. PASS 후 commit, 다음 iter 가 나머지 페이지

### 완료 기준 (PROJECT_DONE 자격)
- `/ko/*` `/en/*` 모든 페이지 동일 콘텐츠 noting 누락
- 자동 감지 동작 (Accept-Language `ko*` → `/ko`)
- 토글 UI 동작 (cookie 저장)
- 풍자 톤 양쪽 언어 보존
- lint / typecheck / build exit 0
- Lighthouse 영향 없음

---

## 9. 참고 — 이번 작업 commit 들

```
3369a39 feat(comedy): dry humor 분포 — 풍자 코드 곳곳에 발견 가능하게
6569a80 feat(launch): disclosure heading 한국어 우선 — 풍자 사이트 종료 준비
a478139 feat(polish): 차트 tooltip 공통 상수 + skip-to-content a11y link
1d202ea fix(a11y): heading hierarchy — 5 페이지 page-level h1 + SectionHeading as prop
20556a2 chore(deploy): vercel.json — framework / icn1 region / build commands
ce759c4 fix(responsive): Hero text mobile-first scale + 4 viewport × 6 페이지 점검
27e0904 feat(polish): RevealOnScroll + 카드 hover transition — 마이크로 인터랙션 패스 1차
b834aa9 feat(transitions): app/template.tsx — fade-in + slide-in 300ms 페이지 전환
b2c0961 feat(seo): sitemap.xml + robots.txt — Next.js metadata routes
4296568 feat(seo): 페이지별 OG 이미지 — 5 페이지 + 공통 generatePageOG template
625b05e feat(analytics): Vercel Analytics 통합 — <Analytics /> RootLayout 삽입
...
```

전체 history 는 `git log --oneline`.
