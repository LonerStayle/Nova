# Nova — ralph harness (v3-classic)

이 하네스는 js-ralph factory 의 template 에서 eject 되었다.
이 파일은 **자가완결**이다 — 부모 저장소를 참조하지 않는다.
Claude Code 가 매 세션 자동 로드하므로, ralph 의 매 iteration fresh context 에 항상 포함된다.

---

## 🔒 onboarding 상태 (gating)

```yaml
onboarded: true
onboarded_at: 2026-05-17T06:16:54Z
```

> `onboarded: false` 이면 ralph 는 매 iteration 첫 응답을 **onboarding 인터뷰**로 시작한다.
> 8 질문 답변 + "확정" 발화 후 onboarding skill 이 위 값을 `true` + ISO 타임스탬프로 갱신하고 아래 "비전 / 사양" 섹션을 채운다.

---

## 비전 / 사양 (대표님 영역 — onboarding 이 채움)

### 1. 비전

한국 AI 업계 출시 톤과 벤치마크 차트 문법을 완벽히 모사한 **가공의 모델 발표 사이트** — 도메인·홈페이지 푸터·About 페이지에 패러디임을 명시한 채로, 그 풍자 완성도만으로 한국 대중을 한 번 흔드는 콘텐츠.

> 본질: "속이는 것이 목적이 아니라, 풍자 완성도로 화제를 만드는 것이 목적". 명시적 패러디 노선 — deception 금지.

### 2. 대상 사용자

3 계층 동시 타겟 (1차 → 2차 → 3차 확산 시나리오):

- **1차 (발견자)**: AI 트렌드에 민감한 직장인·개발자. X(트위터)·GeekNews·뉴스레터 구독자. 풍자 코드를 즉시 캐치하고 RT/공유의 진원지가 되는 층.
- **2차 (확산자)**: 일반 인터넷 커뮤니티 유저 (디시·에펨·뽐뿌·클리앙 등). AI 잘 모르지만 "오 진짜?" → "ㅋㅋ 낚였네" 의 카타르시스가 핵심 동력.
- **3차 (인사이더 바이럴)**: 한국 AI 업계 종사자(엔지니어·PM·연구원). 자기 업계 톤이 풍자된 걸 자조적으로 RT/공유. 이 층의 공유가 발생하면 풍자 완성도 검증 완료 신호.

### 3. 핵심 산출물

**프로덕션급 멀티페이지 풍자 랜딩 사이트** (단일 스크롤 X — 진짜 출시 사이트 형태):

- **페이지 6개** (상단 네비게이션 이동): Home / Benchmarks / Capabilities / Architecture / Security / About
- **콘텐츠 톤**: 가공 벤치마크 차트, 예상 효과(use case), AGI 급 포지셔닝, buzzword 적극 활용 (Multi-Agent, AgentOS, Harness, Orchestration, Security 등). "전세계 최상위" 외형.
- **인터랙티브 데모 위젯**: 하이브리드 retrieval (키워드 유사도 60% + 임베딩 의미검색 40%). 응답풀은 큐레이션된 사전 작성 dataset (초기 200개 launch, 풀 2,000개는 launch 후 추가).
- **패러디 명시 (disclosure)**: About 페이지에 명확한 한 단락 + 모든 페이지 푸터에 한 줄. 옵션 A (찾으려는 사람만 발견하는 위치) — 풍자 완성도와 법적 안전의 균형점.

> **🔥 최우선 원칙 — 프론트엔드 완성도에 올인.**
> 백엔드를 "키 프록시 1함수" 로 의도적으로 축소한 만큼, **남은 모든 자원은 프론트엔드에 집중**한다. 디자인 디테일, 마이크로 인터랙션, 페이지 전환, 타이포그래피·여백·정렬, 차트 비주얼, 반응형, 다크/라이트 톤, 로딩 상태, hover/focus 마저 — *"백엔드 없는 사이트인 게 절대 안 드러날 정도로"* 프로덕션급 *이상* 을 목표한다. 한 페이지 대충 만들고 다음 task 로 넘어가는 것 < 한 페이지를 끝까지 다듬는 것.

### 4. 성공 정의

**정량 지표 없음 — 정성 평가만**:

- 댓글에 *"이거 진짜인 줄 알았다"* 와 *"ㅋㅋㅋ 풍자 수준이 미쳤다"* **둘 다** 나옴
- 한국 AI 업계 인사이더(엔지니어·PM·연구원)가 자조적으로 RT/공유
- 진짜 IT 매체(블로터·전자신문·디지털인사이트 등)에 *잘못* 인용되지 **않음** (= 너무 진지하게 받아들여진 사고는 명시적 패러디 실패 신호)

### 5. 금지 / 범위 밖

이 7개는 절대 만들지 않는다 (풍자 면책 범위 + 사용자 안전):

1. **실존 회사·임원·제품명 직접 모사** — "OpenAI 능가", "네이버 클로바보다 ~%" 같은 비교 금지. 명예훼손 리스크.
2. **실존 인물 사진·이름** — 팀 페이지 멤버는 전부 가공 (AI 생성 이미지 + 가공 이름).
3. **실제 사용자 데이터 수집** — 이메일·전화·결제정보 입력 폼 금지. 데모 위젯은 입력 즉시 폐기, 서버 저장 X.
4. **결제·구독·투자 페이지** — "Pro 플랜 ₩99,000/월" 같은 가격 표기 금지. 사기로 분류될 수 있음.
5. **가짜 논문 arXiv·Google Scholar 업로드** — 사이트 내 가짜 "논문 abstract" 는 허용, 단 실제 학술 인덱스 오염 행위는 금지.
6. **진짜 매체·기자 보도자료 직접 발송** — PR 시도 금지. 자연 발견·유저 공유로만 확산.
7. **실존 신뢰성 신호 위조** — 실존 VC·인큐베이터·학회 로고 도용 ("Backed by Y Combinator" 류) 금지.

### 6. 외부 의존

| 항목 | 선택 |
|------|------|
| 임베딩 모델 | **Voyage AI `voyage-4`** (Anthropic 공식 파트너, 평생 누적 200M 토큰 무료. 현 시나리오 영구 무료 예상) |
| 데모 응답 dataset | 큐레이션 사전 작성 — 초기 200 doc, 풀 2,000 doc 은 launch 후 |
| 팀 페이지 인물 이미지 | thispersondoesnotexist.com 또는 FLUX 로 사전 생성 → 정적 자산 |
| 차트 라이브러리 | Recharts (클라이언트 렌더링) |
| 폰트·아이콘 | Google Fonts + Lucide Icons |
| 호스팅 | Vercel (무료 tier) |
| 방문자 분석 | **Vercel Analytics** (basic 무료, 별도 백엔드 불필요) |
| 도메인 | 당분간 Vercel 기본 도메인. 런칭 시점 직전 별도 구매 (대표님 영역) |

### 7. 규모·일정·비용 cap

| 축 | cap |
|----|-----|
| 페이지 수 | **6개** (Home / Benchmarks / Capabilities / Architecture / Security / About). 추가 증식 금지 |
| 데모 dataset | **초기 200개 launch 임계치**, 풀 2,000개는 launch *후* 추가. 2,000개 완성 전에 사이트가 안 떠는 사태 방지 |
| 개발 기간 | ralph iteration **150회 이내** *또는* **2주** — 둘 중 먼저 도달 |
| 운영 비용 | **월 ₩10,000 이하** (Voyage 200M 무료 + Vercel free tier 안에서 종료. 사실상 ₩0 예상) |

### 8. 기술 스택

factory 디폴트 (Python+uv+FastAPI + Vite React) **override** — 풀스택 단일 배포·SEO·관리비용 0 을 위해 다음으로 확정:

```
Frontend  : Next.js (App Router, TypeScript)
Styling   : Tailwind CSS + shadcn/ui
Charts    : Recharts
Embedding : Voyage AI voyage-4
Backend   : Next.js Route Handler 1개 — Voyage API 키 프록시 전용
            (별도 서버 X. 같은 repo 안 함수일 뿐)
Storage   : 정적 JSON 파일 (public/data/, 빌드타임 사전 계산)
Analytics : Vercel Analytics
Hosting   : Vercel (무료 tier)
DB        : 없음
```

원칙: **"백엔드는 정확히 키 보호 프록시 한 함수만"**. 그 외 모든 dynamic 처리는 빌드타임 사전계산 + 정적 JSON + 클라이언트 사이드 로직.

---

## 공통 — 5 파일 (Geoffrey 정석 4 + Claude Code 자동 로드 1)

| 파일 | 무엇 | 누가 만드나 |
|------|------|------------|
| 이 `CLAUDE.md` | **비전 + 환경 컨텍스트 + 호칭 톤** (Claude Code 자동 로드) | onboarding 이 자동 합성 (위 섹션) |
| `PROMPT.md` | ralph 행동 매뉴얼 (도구 중립) | factory 가 박아둠. 사용자는 `<!-- signs -->` 표지판 한 줄만 누적 |
| `AGENTS.md` | 빌드/검증 명령 (60줄 이하) | 대표님 또는 ralph 첫 iteration |
| `IMPLEMENTATION_PLAN.md` | 현재 TODO 체크리스트 | ralph 99% 자동. 사람은 빈 파일만 시작 |
| `specs/*.md` | (선택) 도메인 추가 사양 — api.md / ui.md / data.md 등 | 대표님 또는 ralph 첫 iteration |

> v2 의 11 phase / 15 페르소나 / 14 skill / gate-verify framework 는 **의도적으로 제거**됨.

---

## 공통 — 4 원칙 (Geoffrey 정석)

| # | 원칙 | 이 하네스에서 구현 |
|---|------|--------------------|
| 1 | 단일 prompt + 자기 재투입 루프 | ralph-loop 플러그인의 Stop hook 이 매 iteration 동일 prompt 를 fresh context 로 재투입 |
| 2 | 사람이 작성한 파일 spec | 이 CLAUDE.md 의 "비전 / 사양" 섹션 (onboarding 합성 후 동결) + (선택) `specs/*` |
| 3 | fresh context 매 iteration | ralph 는 앞 iteration 을 기억 X. 상태는 git + 4 파일에만 |
| 4 | deterministic backpressure | `AGENTS.md` 의 검증 명령 (lint/typecheck/tests). LLM 채점 없음 |

---

## 공통 — 매 iteration 흐름

`/ralph-loop` 시작 후 매 iteration ralph 가 자동 진행:

```
이 CLAUDE.md (자동 로드) + PROMPT.md (Read) → §1 절차 따라:
  specs/ 읽기 → AGENTS.md 읽기 → IMPLEMENTATION_PLAN.md 읽기
  → 첫 [ ] task 선택 (없으면 비전 기반 plan 보강)
  → 구현
  → AGENTS.md 검증 명령 (모두 exit 0)
  → PASS 면 commit + [ ]→[x]
  → 종료 → Stop hook 재투입
```

종료 조건:
- 모든 비전 항목이 plan 에 반영되고 전부 `[x]` → `PROJECT_DONE` 출력
- `--max-iterations` 도달
- 대표님 명시 정지

---

## 공통 — 사용자 호칭 / 톤

`PROMPT.md` 는 도구 중립이라 "사용자" 라고만 표기한다.
**이 CLAUDE.md 에서 "사용자 = 대표님" 으로 자동 치환**한다.

### 호칭
- 사용자 = **대표님 (방향 결정자)**
- 모든 응답·보고·커밋 메시지에 호칭은 "대표님" 으로 통일

### 톤
- 어투: 경어, 일관된 격식체. 반말 혼용 금지
- 길이: 응답·보고 3~5줄. 불필요한 수식어 제거
- 구조: 한 일 / 결과 / 다음 방향 분리
- 에러 메시지 그대로 노출 금지. "이런 결정이 필요합니다" 로 프레이밍
- 보고 첫 줄에 `대표님께:` prefix 권장 (필수 아님)

### 대표님 개입 시점 (2회)
1. **시작**: onboarding 8 질문 답변 → 위 "비전 / 사양" 자동 합성 → "확정" 발화로 동결
2. **끝**: ralph 가 `PROJECT_DONE` 출력 후 결과물 검토

---

## 공통 — 기본 기술 스택 (factory 디폴트)

위 "8. 기술 스택" 에 override 명시 안 했으면 이 조합으로 진행한다.

| 영역 | 기본 |
|------|------|
| Backend | Python + uv + FastAPI + SQLAlchemy |
| Web Frontend | React (Vite + TypeScript) |
| Mobile App | Android (Kotlin, Android Studio). iOS / Flutter 의도적 포기 |
| Database | Postgres |
| 그 외 (인프라/CI/캐시) | 합리적 기본값 |

---

## 공통 — 신규 시작 체크리스트

- [ ] (1회) Claude Code 에 **ralph-loop 플러그인** 설치 — `/plugin install ralph-loop`
- [ ] `claude` 세션 열기 — ralph 가 자동 onboarding 인터뷰 시작 (위 `onboarded: false` 트리거)
- [ ] 8 질문 답변 후 "확정" 발화 → 이 CLAUDE.md 의 "비전 / 사양" 자동 합성 + `onboarded: true`
- [ ] `AGENTS.md` 의 검증 명령 채우고 로컬에서 1회 exit 0 확인
- [ ] ralph-loop 시작:
  ```
  /ralph-loop "Read PROMPT.md and follow it." --completion-promise "PROJECT_DONE" --max-iterations 150
  ```
- [ ] 첫 iteration 끝나고 `IMPLEMENTATION_PLAN.md` 에 `[ ]` 가 누적되는지 확인

---

## 공통 — 표지판

ralph 가 같은 실수를 반복하면 `PROMPT.md` 의 `<!-- signs -->` 섹션 아래에 한 줄 추가.
