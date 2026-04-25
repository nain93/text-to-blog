# blog-it 기록 로그

`/blog-it` 실행 후 자동으로 추가되는 요약 인덱스 — **기록 전용**.

- 4단계(발행) 완료 직전에 새 항목을 append만 한다.
- **사용자가 직접 열람을 요청할 때만** 참고. 매 실행 시 자동으로 읽지 않는다.
- 용도: 사용자가 나중에 "지난달에 뭐 썼지?" 확인할 때 훑어볼 수 있는 자기용 인덱스.

## 항목 양식 (PAAR 요약)

```
## YYYY-MM-DD {작업 제목}
- **카테고리**: 트러블슈팅 | 기능 개발 | 마이그레이션 | 최적화
- **P**: {1줄 — 해결해야 했던 문제·배경}
- **A**: {1줄 — 구체적 접근}
- **A(분석)**: {선택 — 왜 통했나 / 트레이드오프}
- **R**: {정량 수치 1줄}
- **사용 기술**: {스택}
- **블로그**: ~/Documents/Obsidian Vault/기술 블로그/{파일명}.md
- **이력서**: 추가됨 ({노션 블록 위치 or 날짜})
- **발행 링크**: (velog URL 수동 추가)
```

## 기록

## 2026-04-14 자연어 한 줄로 풀스택 기능 구현 — Claude Code 하네스 엔지니어링

- **카테고리**: 기능 개발
- **P**: 1인 풀스택 개발의 명세 → 백엔드 → 프론트 컨텍스트 스위칭 비용, 프론트 개발자가 풀스택 기능을 붙이려면 Go API 구조·컨벤션을 먼저 학습해야 하는 진입장벽
- **A**: 메타 레포 + gitignore 패턴(submodule 대신 specs/에이전트만 추적) / 5개 역할 분리 에이전트(spec-writer · backend-dev · backend-reviewer · frontend-dev · frontend-reviewer) / 2개 오케스트레이터 스킬(`fullstack-feature`, `multi-repo-pr`) / 리뷰어가 `flutter analyze` 를 직접 실행해 개발자 자체 보고를 교차 검증 / 허위 보고는 다음 프롬프트에 반영
- **A(분석)**: 게이트는 3곳만(명세 · BE 완료 · FE 완료), 에이전트 간 전달은 파일 경로로만, 리뷰어는 실제 도구를 돌린다, 재시도 최대 2회
- **R**: "DM 수신 토글에 친구 예외 추가" 한 줄 요청으로 명세~Flutter 구현까지 **약 1시간** (이전 5~6시간 규모). 사용자 개입은 게이트 3곳만
- **사용 기술**: Claude Code (Agent/Skill/MCP), Go, PostgreSQL, Flutter, Riverpod, go_router, gh CLI
- **블로그**: ~/Documents/Obsidian Vault/기술 블로그/2026-04-14-fullstack-implement.md
- **이력서**: 추가됨 (Notion "🤖 AI 에이전트" 섹션, 2026.04 / 회사 프로젝트 Piccha)
- **발행 링크**: (velog URL 수동 추가)

## 2026-04-15 GetX 2만 줄 → Riverpod 구조 재설계, 3-에이전트 하네스

- **카테고리**: 마이그레이션
- **P**: `GetxController` 40여 개가 `lib/controller/` 한 폴더에 평평하게 쌓이고 `.to` 한 줄로 어디서든 접근 → "한 화면 전용"인지 "앱 전역 공유"인지 파일 위치로 드러나지 않아 리팩토링 시 런타임에서만 엉킴이 발견
- **A**: 구조 규칙 명문화(view = view_model, 전역은 provider 명명 + 별도 폴더) / **grep 카운트 기반 위치 판정**(사용 양상 추론 금지) / Phase 0~6 + A~E 점진 전환 / Legacy Mirror + Family Provider + `List.from()` + `TODO(getx-removal)` 만료 주석 / 3-에이전트 하네스(migrator · reviewer · tester), reviewer·tester PASS 후에만 커밋
- **A(분석)**: 라이브러리 교체는 수단이고 목적은 "의존 반경을 파일 위치로 드러내기", 임시 회피책엔 만료일을 박는다, 에이전트에게는 코드가 아니라 문서(가이드/체크리스트/프롬프트)를 준다
- **R**: 52개 컨트롤러 / **약 21,316 lines** / BindPage 46 / GetxService 8개 이관 후 **GetX 패키지 자체 제거**. Provider 하나가 어디서 읽히는지 `grep` 한 줄에 드러나는 구조 달성
- **사용 기술**: Flutter, Riverpod, flutter_hooks, riverpod_annotation, get_it, dart analyze, build_runner, idb (iOS simulator 접근성 트리 smoke test)
- **블로그**: ~/Documents/Obsidian Vault/기술 블로그/2026-04-15-getx-to-riverpod-migration.md
- **이력서**: 추가됨 (Notion "🤖 AI 에이전트" 섹션, 2026.04 / 회사 프로젝트 Piccha)
- **발행 링크**: (velog URL 수동 추가)
