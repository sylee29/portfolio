export type Tile = { mark: string; markClass: string; name: string; sub: string };

export const skills: { title: string; tiles: Tile[] }[] = [
  {
    title: "제품",
    tiles: [
      { mark: "Rs", markClass: "m-rs", name: "문제 정의·리서치", sub: "스토어 리뷰 전수 분석, 사용자 인터뷰" },
      { mark: "Kp", markClass: "m-kp", name: "지표 설계", sub: "7일 리텐션·성사 모임 수, Mixpanel 이벤트" },
      { mark: "Sc", markClass: "m-sc", name: "범위 결정", sub: "판단 기준·v2 목록" },
      { mark: "Dr", markClass: "m-dr", name: "의사결정 기록", sub: "문제정의 문서·ADR·보완기록" },
    ],
  },
  {
    title: "직접 구현",
    tiles: [
      { mark: "TS", markClass: "m-ts", name: "TypeScript", sub: "올라봄" },
      { mark: "RN", markClass: "m-rn", name: "Expo / React Native", sub: "올라봄" },
      { mark: "Py", markClass: "m-py", name: "Python", sub: "reply-gate · guard-ledger" },
      { mark: "SB", markClass: "m-sb", name: "Supabase · Postgres/PostGIS", sub: "올라봄" },
      { mark: "AI", markClass: "m-llm", name: "LLM 평가·RAG", sub: "reply-gate · guard-ledger" },
    ],
  },
];
