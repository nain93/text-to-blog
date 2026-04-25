# Stitch Designs — text-to-image

Stitch MCP `generate_screen_from_text`로 생성된 대표 스크린 3종. 각 화면은 reference 디자인이며, 실제 코드 구현 시에는 반드시 **shadcn-ui 스킬**로 컴포넌트를 찾아 조합해 옮긴다.

| Screen | App Route | Stitch Screen ID | Files | Device |
|---|---|---|---|---|
| Marketing Landing | `(marketing)/page.tsx` | `a9afc5d0c34e412fb9aa7c151978ff10` | `landing.html`, `landing.png` | DESKTOP |
| Paper→Figure Workspace | `(app)/paper-to-figure/page.tsx` | `f047281992d64a7dba7abe308fdd89d6` | `workspace.html`, `workspace.png` | DESKTOP |
| Library | `(app)/library/page.tsx` | `482d48b74da640c2b6d74dd9a544e539` | `library.html`, `library.png` | DESKTOP |

## Stitch Project

- Project ID: `5941339104426296696`
- Design System Asset: `assets/2493843944968742247` (v1)

## How to use

1. `*.html` — Stitch가 만든 raw HTML+CSS 레퍼런스. 이 코드를 그대로 src/에 옮기지 말 것.
2. `*.png` — 실제 디자인 시안 스크린샷. 이미지를 보고 의도를 파악한 뒤,
3. shadcn 컴포넌트(`Card`, `Tabs`, `Badge`, `Button`, `Textarea`, `Sheet` 등)와
   `globals.css`의 토큰(`--primary`, `--secondary`, `--research`)으로 재구성.
4. `Dev Log → Blog` 라우트(`(app)/blog-writer`)는 Workspace와 동일 패턴이므로 별도 시안 없이 Workspace 디자인을 참고해 구현.
