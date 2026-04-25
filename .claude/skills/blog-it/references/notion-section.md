# 노션 이력서 "🤖 AI 에이전트" 섹션 관리

## 페이지 정보

- **이력서 페이지 ID**: `02751b8297224773acf5d1e4f5de665b`
- **URL**: https://www.notion.so/02751b8297224773acf5d1e4f5de665b
- **현재 섹션 순서** (2026-04 기준): Stacks → Projects → Career → Others → Education
- **신규 섹션 권장 위치**: Projects 다음, Career 앞

## 섹션 첫 생성 시

헤딩 형식 (다른 섹션과 통일):

```
---
## 🤖 AI 에이전트 (color: orange)
{여기에 첫 항목}
---
```

orange 색은 기존 Stacks/Projects/Career 헤딩과 동일하게.

## 각 항목 추가 형식 (Notion-flavored Markdown)

다른 Projects 섹션의 column 블록과 동일 패턴. bullet은 **PAAR 순서 엄격히**:

```
<columns>
  <column>
    YYYY.MM
    {작업 카테고리: 트러블슈팅 / 기능 개발 / 마이그레이션 / 최적화}
  </column>
  <column>
    ## {작업 제목}
    {1줄 요약 — 무엇을 했는가}

    **사용 기술**: {스택, 쉼표로 구분}

    - **문제(P)**: {해결해야 했던 상황/제약}
    - **행동(A)**: {구체적 접근과 본인의 역할}
    - **분석(A)** (선택): {왜 이 방법이 통했나, 트레이드오프}
    - **결과(R)**: {정량 수치 우선 — 처리 시간, 지표 변화 등}

    📝 블로그 초안: ~/Documents/Obsidian Vault/기술 블로그/{파일명}.md
    🔗 발행 링크: (발행 후 수동 추가)
  </column>
</columns>
```

Result는 수치를 반드시 포함하는 방향으로. 수치가 없으면 1단계(정보 수집)로 돌아가 재확인.

## MCP 호출 순서 (Step-by-step)

### Step 1: 현재 상태 확인

```
mcp__claude_ai_Notion__notion-fetch({id: "02751b8297224773acf5d1e4f5de665b"})
```

응답에서 헤딩 텍스트 중 "AI 에이전트" 또는 "🤖 AI 에이전트" 존재 여부 확인.

### Step 2-A: 섹션 없을 때 (최초 1회)

1. 사용자에게 위치 확인:
   "AI 에이전트 섹션이 없어서 처음 생성합니다. Projects 섹션 다음에 추가할게요. 괜찮을까요?"

2. OK 받으면 `notion-update-page`로 새 헤딩 + 첫 항목 블록 추가
   - 위치: Projects 섹션 종료 직후 (구분선 `---` 다음)
   - 헤딩: `## 🤖 AI 에이전트` (orange)
   - 위·아래 구분선 `---`

### Step 2-B: 섹션 있을 때

1. 섹션 안 마지막 column 블록 위치 파악
2. 그 다음에 새 column 블록 append
3. 페이지 다른 부분 건드리지 않음

## 안전 규칙

- **fetch 없이 update 금지** (현재 구조 파악 필수)
- 다른 섹션의 블록 절대 수정/삭제 금지
- 첫 생성 시 위치는 **반드시 사용자 확인**
- 항목 추가 시 같은 작업이 이미 있는지 제목으로 한 번 체크 (중복 방지)
