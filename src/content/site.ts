export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const site = {
  title: "Seungyoon Lee — Portfolio",
  name: "SEUNGYOON LEE",
  logo: { text: "SEUNGYOON LEE", dot: "." },
  nav: [
    { id: "intro", label: "INTRO" },
    { id: "about", label: "ABOUT" },
    { id: "skills", label: "SKILLS" },
    { id: "projects", label: "PROJECTS" },
    { id: "contact", label: "CONTACT" },
  ],
  navAria: "주요 메뉴",
  theme: { toLight: "밝은 테마로 전환", toDark: "어두운 테마로 전환" },
  menu: { open: "메뉴 열기", close: "메뉴 닫기" },
  hero: {
    kicker: { name: "SEUNGYOON LEE", year: "2026" },
    title: { line1: "PRODUCT", line2: "BUILDER", dot: "." },
    sub: "PORTFOLIO",
    ko: "문제를 데이터로 정의하고, 직접 만들어 검증하는 프로덕트 빌더입니다.",
    lead: {
      before:
        "경쟁 앱 스토어 리뷰 19,602건을 읽고 문제 정의를 세 차례 고쳐 썼고, 그 결정을 앱과 서버로 직접 구현해 테스트와 기록으로 남깁니다. 지금은 등산 인증 앱 ",
      strong: "올라봄",
      after: "을 첫 iOS 출시 전까지 만들고 있습니다.",
      src: "19,602건 — OB/docs/0004:5-6 · 3차 재정의 — OB/docs/0005:1",
    },
    cta: [
      { label: "대표 작업 보기", href: "#projects", style: "accent" },
      { label: "이력서 PDF", href: "#", style: "line" },
    ],
    scrollDown: { label: "SCROLL DOWN", aria: "아래로 스크롤", href: "#about" },
  },
  sections: {
    about: { num: "01", title: "ABOUT" },
    skills: {
      num: "02",
      title: "SKILLS",
      lead: "기획과 구현을 한 사람이 합니다. 왼쪽은 결정하는 일, 오른쪽은 그 결정을 직접 만드는 일입니다.",
    },
    projects: {
      num: "03",
      title: "PROJECTS",
      lead: '대표 작업 1개와 다른 작업 2개. 카드 제목이나 "자세히 보기"를 누르면 상세가 열립니다.',
    },
    contact: {
      num: "04 · CONTACT",
      title: "함께 일할 팀을 찾고 있습니다.",
      email: { label: "이메일 보내기", href: "mailto:sy3097@gmail.com" },
      linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/seungyoonlee-ax/" },
      github: { label: "GitHub", href: "https://github.com/sylee29" },
    },
  },
  footer: {
    copyright: "© 2026 Seungyoon Lee",
    github: { label: "github.com/sylee29", href: "https://github.com/sylee29" },
  },
  modal: { close: "닫기", more: "자세히 보기", galleryAria: "프로젝트 갤러리", galleryRole: "갤러리" },
} as const;
