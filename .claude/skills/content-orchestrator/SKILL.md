---
name: content-orchestrator
description: raw 텍스트 한 덩어리를 받아 글과 이미지가 적절히 섞인 잘 정돈된 한국어 기술 블로그를 한 번에 만드는 슈퍼바이저 스킬. 블로그 생성자가 먼저 본문을 쓰면서 글로 설명하기 어려운 지점에 이미지 슬롯(`<!--IMAGE_SLOT:id-->`)을 삽입하면, 이미지 생성자가 슬롯별 명세에 따라 다이어그램·일러스트·스크린샷 목업을 생성하고, 오케스트레이터가 placeholder를 실제 이미지로 치환해 통합본을 완성한 뒤 검수자가 단계별(blog_draft → images_only → integrated)로 점검한다. 사용자가 "이 텍스트로 기술 블로그 만들어줘", "글이랑 이미지 같이", "다이어그램 들어간 블로그", "콘텐츠 패키지", "/content-orchestrator" 등을 요청하거나 raw 텍스트 → 시각자료 포함 블로그가 필요한 모든 상황에서 반드시 트리거.
---

# content-orchestrator 스킬

raw 텍스트 한 덩어리 → **글로 설명하기 어려운 지점에 이미지가 자연스럽게 들어간** 한국어 기술 블로그를 한 번에 만드는 감독자 스킬.

**Announce at start:** "content-orchestrator로 글 + 이미지 통합 기술 블로그를 작성하겠습니다."

## 핵심 원칙

이미지를 위한 이미지를 만들지 않는다. **블로그가 먼저, 이미지는 보강.** 글이 도달하기 어려운 지점(여러 컴포넌트 상호작용 / 시간 변화 / 공간 구조 / 결과 시각화)에서만 이미지가 등장하고, 이미지 직전·직후 단락이 그 이미지를 자연스럽게 받아 흐름이 끊기지 않게 한다.

## 팀 구성

| 에이전트 | 정의 파일 | 역할 |
|---------|---------|------|
| `text-to-blog-generator` | `.claude/agents/text-to-blog-generator.md` | raw → 블로그 draft + `<!--IMAGE_SLOT:id-->` placeholder + image_slots 명세 |
| `text-to-image-generator` | `.claude/agents/text-to-image-generator.md` | 슬롯별 이미지 생성 (일러스트/다이어그램/UI 목업 7가지 타입) |
| `content-reviewer` | `.claude/agents/content-reviewer.md` | stage별 검수 (blog_draft → images_only → integrated) + 흐름 정합성 |

**실행 모드**: 에이전트 팀 (TeamCreate). 모든 에이전트는 `model: "opus"`. 통신은 모두 오케스트레이터 경유 (생성자끼리 직접 호출 안 함, 모든 검수도 오케스트레이터가 stage별로 트리거 — 단계별 통제가 핵심).

## 아키텍처

```
raw_text + context
        │
        ▼
[Orchestrator]
        │ Phase A. 블로그 draft + 슬롯 결정
        ├─TaskCreate─▶ [text-to-blog-generator]
        │                     │ draft.md + image_slots
        │ ◀───────────────────┘
        │
        │ Phase B. blog_draft 검수 (슬롯 결정 적정성)
        ├─TaskCreate─▶ [content-reviewer stage=blog_draft]
        │ ◀── verdict
        │   (revise면 Phase A 재실행, 슬롯 추가/삭제 포함)
        │
        │ Phase C. 슬롯별 이미지 병렬 생성 (N개 슬롯 = N개 task)
        ├─TaskCreate(병렬)──▶ [text-to-image-generator] (slot 1)
        ├─TaskCreate(병렬)──▶ [text-to-image-generator] (slot 2)
        ├─TaskCreate(병렬)──▶ [text-to-image-generator] (slot 3)
        │ ◀── 모든 슬롯 완료 보고
        │
        │ Phase D. images_only 검수 (슬롯-이미지 일치)
        ├─TaskCreate─▶ [content-reviewer stage=images_only]
        │ ◀── verdict
        │   (특정 슬롯만 revise/regenerate면 Phase C 부분 재실행)
        │
        │ Phase E. placeholder 치환 → 통합본 완성
        │   (오케스트레이터가 직접 수행, 에이전트 호출 없음)
        │
        │ Phase F. integrated 검수 (흐름 정합성 + 통합본 가독성)
        ├─TaskCreate─▶ [content-reviewer stage=integrated]
        │ ◀── final verdict
        │   (revise면 흐름 문제 부위 지적 → Phase A 또는 C 부분 재실행)
        │
        ▼
사용자에게 통합본 + 워크스페이스 + 검수 보고 제시
```

## 워크스페이스 구조

```
_workspace/{YYYY-MM-DD}-{slug}/
├── 00_input.md                              # raw_text + context 스냅샷
├── 02_blog_{slug}.draft.md                  # placeholder 포함 초안
├── 02_blog_{slug}.meta.json                 # image_slots 명세 포함
├── images/
│   ├── slot_thumbnail.png
│   ├── slot_thumbnail.meta.json
│   ├── slot_request-flow-degradation.svg
│   ├── slot_request-flow-degradation.mmd    # Mermaid 소스
│   ├── slot_request-flow-degradation.meta.json
│   └── ...
├── 02_blog_{slug}.md                        # placeholder 치환 완료된 통합본 (최종)
├── 99_review_blog_draft_1.json/md
├── 99_review_images_only_1.json/md
├── 99_review_integrated_1.json/md
└── 99_review_final.json/md                  # human_review_required 시 누적
```

## 워크플로우 (6 Phase)

### Phase 0: 입력 수집

다음을 받는다(없으면 1회 짧게 질문, 한 번에 3개 이하):

- **raw_text** (필수)
- **target_channel** (선택, 기본 `velog`): velog / medium / tech_blog / dev_to
- **target_length** (선택, 기본 `medium`): short / medium / long
- **enable_image_slots** (선택, 기본 `true`): false면 이미지 없이 글만 (이때 Phase C/D/E 건너뜀)
- **thumbnail_required** (선택, 기본 `true`)
- **style_hint, mood_hint** (선택, 썸네일 기본값)
- **출력 디렉토리** (선택, 기본 `_workspace/{YYYY-MM-DD}-{slug}/`)

raw_text가 PAAR 핵심을 못 채우면 1회 질문하여 보강. 그 외엔 즉시 진행.

### Phase A: 블로그 draft + 슬롯 결정

```yaml
TaskCreate → text-to-blog-generator:
  task_type: blog_generation
  raw_text: <원본>
  context:
    target_length: <옵션>
    target_channel: <옵션>
    audience: developer
    language: ko
    enable_image_slots: <옵션>
    thumbnail_required: <옵션>
  output_dir: _workspace/.../
```

산출: `02_blog_{slug}.draft.md` + `02_blog_{slug}.meta.json` (image_slots 배열 포함).

Phase B로.

### Phase B: blog_draft 검수

```yaml
TaskCreate → content-reviewer:
  task_type: review
  stage: blog_draft
  artifacts:
    raw_text: <원본>
    blog_draft_path: _workspace/.../02_blog_{slug}.draft.md
    blog_meta_path: _workspace/.../02_blog_{slug}.meta.json
  review_round: 1
  output_dir: _workspace/.../
```

verdict:
- `pass` → Phase C로
- `revise` → 보고서의 액션 아이템을 SendMessage로 `text-to-blog-generator`에 전달. 수정본 받으면 Phase B 재검수 (round 2). round 2에서도 실패면 `human_review_required`로 종합 + 사용자 결정 위임.
- `regenerate` → Phase A 재실행 (round 2)
- `human_review_required` → 사용자에게 보고

`enable_image_slots=false`면 검수 통과 즉시 Phase E 없이 종료(draft가 바로 최종).

### Phase C: 슬롯별 이미지 병렬 생성

`02_blog_{slug}.meta.json`의 `image_slots` 배열을 읽어 슬롯마다 1 task 발행 (N개 슬롯 = N개 병렬 TaskCreate):

```yaml
# 슬롯 1개당 1 task
TaskCreate → text-to-image-generator:
  task_type: image_slot_fill
  slot:
    id: <슬롯 id>
    purpose: <명세 그대로>
    intent: <명세 그대로>
    must_show: [<명세 그대로>]
    must_avoid: [<명세 그대로>]
    style_hint: <명세 그대로>
    mood_hint: <명세 그대로>
    aspect_ratio: <명세 그대로>
    diagram_type: <명세 그대로>
    context_excerpt: <명세 그대로>
  blog_meta_path: _workspace/.../02_blog_{slug}.meta.json
  output_dir: _workspace/.../images/
```

모든 task 완료 보고를 기다린 뒤 Phase D로. 일부 task가 1차 실패하면 1회 재시도 → 그래도 실패면 해당 슬롯만 "프롬프트-only 폴백" 처리하고 보고서에 명시.

### Phase D: images_only 검수

```yaml
TaskCreate → content-reviewer:
  task_type: review
  stage: images_only
  artifacts:
    raw_text: <원본>
    blog_meta_path: _workspace/.../02_blog_{slug}.meta.json
    image_slot_paths: { thumbnail: ..., request-flow: ..., ... }
    image_slot_meta_paths: { thumbnail: ..., request-flow: ..., ... }
  review_round: 1
  output_dir: _workspace/.../
```

verdict 분기:
- `pass` → Phase E로
- `revise` → 슬롯별 액션 아이템(특정 슬롯만 v2 재생성)을 SendMessage로 `text-to-image-generator`에 전달. 부분 재생성 후 Phase D 재검수 (round 2).
- `regenerate` → 해당 슬롯 task 다시 발행 (Phase C 부분 재실행)
- `human_review_required` → 사용자 보고

### Phase E: placeholder 치환 → 통합본 완성

오케스트레이터가 직접 수행 (에이전트 호출 없음):

1. `02_blog_{slug}.draft.md` 읽기
2. `<!--IMAGE_SLOT:{id}-->` 패턴 모두 찾기
3. 각 id에 대해 다음 두 출처에서 정보 가져오기:
   - 이미지 파일 경로: `images/slot_{id}.{ext}` (또는 v2 우선)
   - alt 텍스트: `images/slot_{id}.meta.json`의 `alt_text_ko`
4. placeholder를 다음으로 치환:
   ```markdown
   ![{alt_text_ko}](images/slot_{id}.{ext})
   ```
5. 결과를 `02_blog_{slug}.md`로 저장 (draft는 보존)
6. `02_blog_{slug}.meta.json`의 `final_file_path`를 갱신

치환 실패 케이스(이미지 없음 / alt 없음)는 placeholder 자리에 다음을 남기고 Phase F에서 high severity 지적되도록 함:
```markdown
> ⚠️ IMAGE MISSING: slot_id={id}, reason={reason}
```

### Phase F: integrated 검수

```yaml
TaskCreate → content-reviewer:
  task_type: review
  stage: integrated
  artifacts:
    raw_text: <원본>
    blog_draft_path: _workspace/.../02_blog_{slug}.draft.md
    blog_meta_path: _workspace/.../02_blog_{slug}.meta.json
    image_slot_paths: {...}
    image_slot_meta_paths: {...}
    integrated_blog_path: _workspace/.../02_blog_{slug}.md
  review_round: 1
  output_dir: _workspace/.../
```

이 stage는 흐름 정합성을 가장 무겁게 본다 (가중치 0.20). 이미지가 글의 빈 공간을 채우는 형태이거나, 이미지 직전·직후 단락 연결이 어색하면 자동 high severity.

verdict 분기:
- `pass` → Phase 완료, 사용자 보고
- `revise` (흐름 문제) → 슬롯 위치 이동·삭제·추가 권고가 보고서에 있음. `text-to-blog-generator`에 SendMessage로 본문 수정 요청 → Phase A부터 부분 재실행 (단, image_slots 배열 변경 시 Phase C도 영향받는 슬롯만 재생성).
- `revise` (이미지 품질 문제) → 해당 슬롯 v2 (Phase C 부분 재실행) → Phase E 재치환 → Phase F 재검수 (round 2)
- `regenerate` → 전체 Phase A부터 (round 2)
- `human_review_required` → 사용자 보고 + `99_review_final.json` 작성

## 사용자 보고 형식

Phase F 통과 또는 `human_review_required` 도달 시:

```
✅ 통합 블로그: _workspace/{date}-{slug}/02_blog_{slug}.md ({글자수}자, {톤}, 이미지 {N}개 포함)
✅ 이미지 워크스페이스: _workspace/{date}-{slug}/images/ (슬롯 {N}개)
✅ 검수 보고:
   - blog_draft  (round 1): {verdict} (점수 {n.nn})
   - images_only (round 1): {verdict} (점수 {n.nn})
   - integrated  (round 1): {verdict} (점수 {n.nn})

검수 핵심:
- {summary_for_human 1~2줄}

다음 단계 (수동):
1. 통합본 검토 후 발행 (velog/medium 등에 마크다운 그대로 붙여넣기)
2. (선택) 노션 이력서 업데이트는 /blog-it 호출
3. 슬롯 v2 재생성이 필요하면 본 워크스페이스에서 슬롯 명세만 수정 후 본 스킬 재실행
```

`human_review_required` 시:

```
⚠️ 자동 검수 통과 실패 (round 2까지 시도)
산출물: _workspace/{date}-{slug}/02_blog_{slug}.md (불완전 가능)
누적 이슈: _workspace/{date}-{slug}/99_review_final.md

주요 이슈:
1. {high severity issue 1}
2. {high severity issue 2}
...

다음 단계 (수동):
- 위 이슈 직접 수정 후 발행
- 또는 raw_text를 보강해 본 스킬 재실행
```

## 데이터 전달 프로토콜

| 구간 | 방식 | 형태 |
|------|------|------|
| 오케스트레이터 → 모든 에이전트 | TaskCreate | YAML 작업 지시 |
| 모든 에이전트 → 오케스트레이터 | SendMessage + 파일 | 메시지 보고 + `_workspace/`에 산출물 |
| 오케스트레이터 ↔ 사용자 | 텍스트 응답 | 부족 정보 질문, 최종 보고 |
| 에이전트 ↔ 에이전트 | **없음** | 모든 통신은 오케스트레이터 경유 (단계별 통제) |

## 에러 핸들링

| 상황 | 대응 |
|------|------|
| 생성자 "추가 정보 필요" | 즉시 사용자에 1회 질문, 답변 받아 SendMessage 회신 |
| 이미지 슬롯 1개 1차 실패 | 해당 슬롯만 1회 재시도, 재실패 시 프롬프트-only 폴백 + 보고서에 명시 |
| Phase B/D/F revise round 2도 실패 | 해당 stage `human_review_required`, 누적 이슈 종합 |
| Phase E 치환 시 슬롯 이미지 missing | 통합본에 ⚠️ 마커 남기고 Phase F가 high severity로 지적 |
| 워크스페이스 충돌(같은 slug) | slug에 `-2`, `-3` 자동 접미사, 절대 덮어쓰지 않음 |
| `enable_image_slots=false` 인데 본문에 placeholder 발견 | 블로그 생성자에 SendMessage로 placeholder 제거 요청 1회 |

원칙: 1회 재시도 후 재실패 시 그 결과 없이 진행하되 보고서에 누락 명시. 상충 데이터는 삭제하지 않고 출처 병기.

## 안전 규칙

- 사용자 raw_text는 그대로 보존 (`00_input.md`)
- 워크스페이스 외부 파일 절대 수정 금지 (특히 `~/Documents/Obsidian Vault/`, 노션, 외부 저장소)
- 노션 이력서 업데이트는 이 흐름에서 **하지 않음** — 사용자가 별도로 `/blog-it` 호출
- 외부 API 호출은 환경변수 키만 사용, 응답에 키가 노출되지 않게 주의
- Phase E placeholder 치환 시 본문 외 다른 부분 수정 금지

## 사용 예

```
사용자: "이 텍스트로 기술 블로그 만들어줘.
        Flutter Riverpod의 StreamProvider에서 메모리 누수 잡은 경험.
        Client → API Gateway → StreamProvider → DB 흐름에서 Subscription이 누적됐고,
        DevTools 메모리 그래프가 우상향이었어. autoDispose 빠뜨린 게 원인이었고
        420ms 평균 응답시간이 68ms로 줄었어."

오케스트레이터:
  Phase 0. raw_text 충분, target=velog (디폴트), length=medium (디폴트)
  Phase A. text-to-blog-generator → draft.md + image_slots 3개:
           - thumbnail
           - request-flow-degradation (sequence diagram)
           - before-after-latency-chart (comparison)
  Phase B. content-reviewer (blog_draft) → pass (점수 0.91)
  Phase C. 3개 슬롯 병렬 생성:
           - thumbnail: FLUX
           - request-flow-degradation: Mermaid sequenceDiagram → SVG
           - before-after-latency-chart: Mermaid xychart 또는 합성 이미지
  Phase D. content-reviewer (images_only) → pass (점수 0.88)
  Phase E. placeholder 치환:
           draft.md의 <!--IMAGE_SLOT:thumbnail--> 등 3곳을
           ![alt](images/slot_*.{ext})로 치환 → 02_blog_*.md 완성
  Phase F. content-reviewer (integrated) → pass (점수 0.89)
           흐름 정합성 0.95: 이미지 직전·직후 단락 모두 자연스럽게 연결
  
  사용자 보고:
  ✅ 통합 블로그: _workspace/2026-04-25-flutter-riverpod-memory-leak/02_blog_*.md (2920자, 스토리텔링, 이미지 3개)
  ✅ images/: thumbnail.png, request-flow-degradation.svg, before-after-latency-chart.svg
  ✅ 검수: 모든 stage pass (총점 0.89)
  다음 단계: 검토 후 velog 붙여넣기, 노션 업데이트는 /blog-it
```

## 테스트 시나리오

### 정상 흐름 (happy path)
위 사용 예 그대로. 모든 Phase round 1 통과.

### 에러 흐름 1: 슬롯 결정 부적절
블로그 생성자가 단순 코드 설명 단락에 슬롯을 끼워넣음 → Phase B에서 `slot_decision_review`가 "remove" 권고 → blog 생성자에 SendMessage → 슬롯 제거 후 Phase B round 2 → pass → 이후 Phase 정상 진행.

### 에러 흐름 2: 다이어그램 라벨 깨짐
이미지 모델이 sequence 다이어그램을 그렸는데 텍스트 라벨이 깨짐 → Phase D에서 high severity 지적 → 이미지 생성자가 같은 슬롯을 Mermaid 코드로 재생성(v2) → Phase D round 2 pass → Phase E 치환 (v2 우선) → Phase F 정상.

### 에러 흐름 3: 흐름 어색
Phase E 통합본에서 이미지 직후 단락이 받지 못함 → Phase F의 흐름 정합성에서 high severity → blog 생성자에 "해당 슬롯 직후 1문단 추가" SendMessage → 본문 수정 후 Phase E 재치환 → Phase F round 2 pass.

## 트리거 가이드

**should-trigger** (이 스킬이 적합):
- "이 텍스트로 기술 블로그 만들어줘"
- "글이랑 이미지 같이"
- "다이어그램 들어간 블로그"
- "트러블슈팅 메모를 시각자료 포함해서 정리"
- "콘텐츠 패키지", "raw → 블로그 + 이미지 통합"
- 슬래시 커맨드 `/content-orchestrator`

**should-NOT-trigger** (다른 스킬/에이전트가 적합):
- "블로그만, 이미지 없이" + 노션 이력서까지 → `/blog-it` 스킬
- "이미지 한 장만 생성" → text-to-image-generator 단독 호출
- "기존 블로그 검수만" → content-reviewer 단독 호출
- "Stitch로 UI 화면 디자인" → Stitch MCP 직접
- "발행까지 자동화" → 본 스킬 + 사용자 수동 발행 (자동 발행은 의도적으로 미지원)
