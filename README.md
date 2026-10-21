# portfolio

Seungyoon Lee의 포트폴리오. Next.js 16 (App Router, `src/`), React 19, TypeScript, Tailwind v4 (유틸리티만). 모든 라우트는 빌드 시 정적으로 생성된다.

## 실행

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # 정적 생성 (/, /projects/*, sitemap, robots, OG 이미지)
npm run start
npm run lint
```

사이트 URL은 `NEXT_PUBLIC_SITE_URL`(없으면 Vercel의 `VERCEL_PROJECT_PRODUCTION_URL`, 그것도 없으면 `http://localhost:3000`)에서 읽어 sitemap/robots/OG에 쓴다.

## 어디에 뭐가 있나

- `src/content/` — 모든 텍스트와 사실. 디자인 원본은 `content/reference/e4-pm.html`, 사실 출처는 `content/reference/{e4-spec,pm-facts}.md`.
  - `site.ts` 히어로·내비·연락처, `about.ts` 소개·일하는 방식·타임라인, `skills.ts` 타일
  - `projects/*.ts` 프로젝트 4개, `projects/index.ts` 카드 순서 + 8개 섹션 순서 검증
  - `types.ts` 콘텐츠 모델 (`Project`, `Block`, 8개 섹션 튜플 `CaseSections`)
  - `images.ts` `public/images/*` 정적 import (next/image가 크기를 알도록)
- `content/cli-demos/*.txt` — 터미널 목업에 그대로 들어가는 CLI 출력. 빌드 시 `src/lib/cli.ts`가 읽는다.
- `src/app/globals.css` — E4 CSS를 그대로 옮긴 것 (팔레트 teal만).
- `src/app/@modal/(.)projects/[slug]` — 홈에서 카드를 누르면 같은 케이스 스터디가 바텀시트 모달로 열린다 (intercepting route). 새로고침·직접 링크는 `src/app/projects/[slug]` 전체 페이지.
- 클라이언트 컴포넌트는 `Nav`, `Effects`, `Gallery`, `Modal` 넷뿐이다.

## 프로젝트 추가

1. `src/content/projects/<slug>.ts`에 `Project` 객체를 만든다. `sections`는 `한 줄 요약 → 문제와 근거 → 가설과 수정 → 반증 신호와 대응 → 결정 — 만든 것 / 안 만든 것 → 성공 지표와 측정 설계 → 직접 구현 → 현재 상태와 다음` 순서의 8개여야 한다 (타입과 빌드 시 검증이 둘 다 막는다).
2. 이미지는 `public/images/<slug>/`에 두고 `src/content/images.ts`에서 import한다. GIF는 `unoptimized: true`.
3. 터미널 출력은 `content/cli-demos/<name>.txt`에 넣고 `{ type: "terminal", file, title, command? }` 블록으로 참조한다.
4. `src/content/projects/index.ts`의 `projects` 배열에 추가한다. 카드·모달·페이지·sitemap이 모두 여기서 나온다.
