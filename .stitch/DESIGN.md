# text-to-image — Design System

> 자동 생성된 디자인 시스템 문서. Stitch MCP `create_design_system` 호출 결과를 사람이 읽기 좋은 형태로 정리.

## 1. Concept

논문을 그림으로(figures, diagrams, hero illustrations), 개발 기록·트러블슈팅을 기술 블로그 초안으로 변환하는 AI 라이팅·시각화 워크스페이스.

### Target Users
- 연구원·대학원생: 논문 figure / 학회 포스터용 시각자료를 빠르게 받고 싶다.
- 개발자: 작업 로그·에러 메시지·디버깅 흔적을 다듬어진 한국어 기술 블로그로 자동 변환하고 싶다.
- 테크 라이터: 트러블슈팅 노트를 SEO·가독성을 갖춘 포스트로 1차 초안화하고 싶다.

## 2. Voice & Atmosphere

- 차분하고 신뢰감 있는 **AI 연구실** 톤. 화려하지 않지만 똑똑해 보여야 한다.
- 텍스트와 시각자료가 동등한 비중. 좌측 입력 / 우측 결과의 **split workspace** 패턴이 기본.
- 어두운 보라·인디고 그라디언트 + 종이 질감의 라이트 배경 대비. 학술적이지만 갇히지 않은 느낌.

## 3. Color Tokens

| Token | Hex | 용도 |
|---|---|---|
| Primary | `#6366F1` Indigo | CTA, 활성 상태, 링크 |
| Secondary | `#8B5CF6` Violet | AI 강조(생성 버튼, 진행 상태) |
| Accent / Tertiary | `#F59E0B` Amber | 논문·리서치 컨텍스트 하이라이트(인용, 태그) |
| Surface (Light) | `#FFFFFF` / `#F8FAFC` / `#F1F5F9` | 본문 / 보조 패널 / 코드 블록 |
| Ink | `#0F172A` / `#475569` | 본문 / 부가 텍스트 |
| Success | `#10B981` | 블로그 발행·저장 성공 |
| Danger | `#EF4444` | LLM 호출 실패, rate limit |

## 4. Typography

- **Headlines / Body**: Geist — 기술 문서·코드와 가장 잘 어울리는 모노 친화 sans.
- **Labels / UI Chrome**: Inter — 버튼·태그·테이블 헤더의 가독성 보강.
- **Code / Logs**: 후속 단계에서 Geist Mono 또는 JetBrains Mono 적용.

## 5. Shape & Layout

- Roundness: **ROUND_TWELVE** (카드, 인풋, 버튼). 칩·뱃지는 `rounded-full` 허용.
- Workspace: 좌측 입력 패널(논문 PDF 업로드 / 트러블슈팅 텍스트 입력) + 우측 결과 패널(생성된 다이어그램, 블로그 마크다운 프리뷰) 50:50 또는 40:60 split.
- Marketing: `max-width: 1200px` hero, 3-up feature grid, side-by-side before/after 데모.

## 6. Components Direction (shadcn 기반)

핵심: `Tabs`, `Textarea`, `Card`, `Dialog`, `Sheet`, `Button`, `Badge`, `Skeleton`, `Sonner`, `DropdownMenu`, `Tooltip`, `ScrollArea`.

- 결과 미리보기: `Tabs` (Diagram / Markdown / Raw JSON) + `Card` 컨테이너.
- 라이브러리: `Card` 그리드 + `HoverCard`로 미리보기.
- **모든 커스텀 UI는 shadcn 컴포넌트 변형(variants / className 조합)으로만 만든다.**

## 7. Accessibility

- Primary on white 대비 4.5:1 이상 유지. CTA는 아이콘 보조 포함.
- 코드/마크다운 블록 line-height ≥ 1.6, 한국어/영어 혼용 fallback 폰트 지정.
- 모든 폼은 `Label` + `aria-describedby` 패턴 강제.

## 8. Imagery

- 논문 figure 톤의 아이소메트릭 다이어그램, 색은 Indigo·Violet 기반 단색 톤. 사진 일러스트는 지양.
- 마케팅 hero는 종이 그리드 위에 떠 있는 다이어그램 카드 콜라주 컨셉.

## 9. Spacing Scale

`xs 4px · sm 8px · md 16px · lg 24px · xl 32px · 2xl 48px`

## 10. References (Stitch MCP)

- Project ID: `5941339104426296696`
- Design System Asset: `assets/2493843944968742247` (version 1)
