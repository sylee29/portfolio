export type WayBlock = { type: "p" | "quote"; text: string; src?: string };

export const about = {
  quote: { pre: '"', em: "모르는 값은 지어내지 않는다", post: '"는 원칙으로 일합니다.' },
  paragraphs: [
    {
      text: "시장에서 직접 제품을 팔며 실행을 배웠고, 기술·해외영업에서 고객과 조직을 연결하는 법을 배웠습니다. 그 뒤 감에 의존하던 판단을 데이터로 바꾸는 법을 익혔고, 지금은 문제 정의부터 구현·검증까지 직접 합니다.",
      muted: false,
    },
    {
      text: "기능을 늘리기보다 무엇을 만들지 않을지를 먼저 정하고, 가설에 불리한 증거를 먼저 적습니다. 결정은 문서와 테스트로 남깁니다.",
      muted: true,
    },
  ],
  ways: {
    title: "일하는 방식",
    cards: [
      {
        title: "문제를 데이터로 정의한다",
        blocks: [
          {
            type: "p",
            text: '등산 앱 4사 한국어 리뷰 19,602건을 전수 분석해, 트랭글 최근 24개월 1~2★ 815건 중 452건이 유료화·탈퇴·갈아탐이라는 타깃("트랭글 난민")을 정의했다.',
            src: "OB/docs/0004:5-6 · OB/README:31",
          },
        ] as WayBlock[],
      },
      {
        title: "반증을 먼저 적는다",
        blocks: [
          {
            type: "quote",
            text: '"15년, 10,941건, 한국 최대 등산 앱. "같이 갈 사람을 찾게 해달라"는 요구는 0건이다."',
            src: "OB/docs/0002:171",
          },
          {
            type: "p",
            text: "이 신호를 가설에 불리한 것으로 문서 맨 앞에 적고, 동행 가설의 검증 시점을 출시 뒤로 미뤘다.",
            src: "OB/docs/0002:14 · OB/docs/0005:15-16",
          },
        ] as WayBlock[],
      },
      {
        title: "측정이 가설을 바꾸면 따른다",
        blocks: [
          {
            type: "p",
            text: 'reply-gate에서 "LLM이 값을 지어낸다"는 출발 가설이 미끼 95 케이스-실행에서 발화 0회로 나오자, 문제를 "주제를 다루지 않는 인접 근거를 딛고 답하는 것"으로 다시 정의했다.',
            src: "RG/README:15-21",
          },
        ] as WayBlock[],
      },
    ],
  },
  timeline: [
    { when: "2026.07 —", what: "올라봄 iOS 앱", small: "문제 정의·조사·설계·구현·검증 (1인)" },
    { when: "2025.12 — 2026.04", what: "데브코스 데이터 분석 부트캠프 수료", small: "Python · SQL · Tableau · 기초 ML" },
    {
      when: "2025.05 — 2025.07",
      what: "기술·해외영업 — 반도체 장비용 O-ring/FFKM 부품",
      small: "고객 기술 이슈 대응, 대체 소재 샘플 테스트, 자재·생산·QC와 납기 조율",
    },
    {
      when: "2020.05 — 2022.02",
      what: "Amazon 개인 브랜드 / FBA 운영 (1인 사업)",
      small:
        "시장조사·상품기획, 중국 OEM 50곳 이상 접촉 후 핵심 공급사 2곳 확보, FBA 물류·PPC 광고·재고 운영. 첫 달 약 US$10,000 매출, 중기부 계열 Amazon 입점 지원 프로그램 선정.",
      decisions: {
        label: "결정 사례",
        cards: [
          {
            title: "진입 판단을 복기했다",
            text: "셀러 시절에는 키워드 랭킹 상승세와 매트화이트 색상 공백을 보고 Floating Shelves에 진입했다. 나중에 6,200만 건 리뷰로 다시 재보니 그 니치는 906개 중 214위, 수요 −20%의 정체 시장이었다. 단편 신호만으로는 니치 구조를 볼 수 없다는 것이 결론.",
            src: "AZ/README:7-8, 32",
            href: "https://github.com/sylee29/amazon-seller-entry-analysis",
            hrefLabel: "분석 저장소",
          },
        ],
      },
    },
  ],
};
