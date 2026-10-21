import type { Project } from "../types";
import { replyGateGifs as g } from "../images";

const altL1 = "reply-gate 터미널 녹화: API 키 없이 L1 게이트를 단독 실행해 pii_detected, pass, missing_citation·invalid_citation 판정을 출력";

export const replyGate: Project = {
  slug: "reply-gate",
  key: "replygate",
  mono: "RG",
  title: "reply-gate",
  period: "2026.08 — 2026.10",
  kind: "개인 프로젝트",
  badges: [{ text: "사이클 5 · 실측", tone: "wine" }],
  description: '"LLM이 값을 지어낸다"는 가설을 실측으로 수정하고 문제를 다시 정의한 CS 답변 에이전트 — 결정론 게이트와 LLM 판정, 비용·지연까지 측정',
  links: [{ kind: "external", label: "GitHub", href: "https://github.com/sylee29/reply-gate" }],
  chips: ["문제 재정의", "평가 설계", "Python", "RAG", "pgvector", "LLM 판정"],
  media: {
    card: { kind: "image", image: g.rgL1, alt: altL1, wide: true, unoptimized: true, tag: "터미널 녹화 GIF" },
    gallery: [
      { kind: "image", image: g.rgL1, wide: true, unoptimized: true, cap: "L1 게이트 단독 (API 키 없음)", alt: altL1 },
      { kind: "image", image: g.rgPass, unoptimized: true, cap: "통과", alt: "reply-gate 터미널 녹화: 문의가 L1과 L2 게이트를 통과하는 흐름" },
      { kind: "image", image: g.rgL2, unoptimized: true, cap: "L2 기각", alt: "reply-gate 터미널 녹화: L2 LLM 판정에서 답변 초안이 기각되는 흐름" },
      { kind: "image", image: g.rgEsc, unoptimized: true, cap: "사람에게 인계", alt: "reply-gate 터미널 녹화: 답변을 사람에게 인계하는 흐름" },
    ],
  },
  sections: [
    {
      label: "한 줄 요약",
      blocks: [
        {
          type: "paragraph",
          variant: "intro",
          text: "근거 없는 CS 답변을 스스로 기각하는 이커머스 답변 에이전트. 초안을 잘 쓰는 것이 아니라 틀린 초안을 걸러내는 것이 존재 이유.",
        },
        { type: "paragraph", variant: "role", text: "역할 — 문제 정의 · 조사 · 설계 · 구현 · 검증 (1인)" },
      ],
    },
    {
      label: "문제와 근거",
      blocks: [
        {
          type: "quote",
          text: '"LLM 이 만든 CS 답변은 그럴듯하지만 근거가 없을 수 있다. 그리고 그 사실을 LLM 에게 다시 물어보는 것으로는 증명할 수 없다."',
          src: "RG/README:47",
        },
      ],
    },
    {
      label: "가설과 수정",
      blocks: [
        {
          type: "timeline",
          rows: [
            {
              label: "출발 가설",
              text: "LLM은 근거가 없을 때 침묵하지 않고 그럴듯한 값을 채워 넣는다 — 없는 고객센터 번호, 없는 이메일 주소, 정책에 없는 수수료율.",
              src: "RG/problem.md:15-17",
            },
            {
              label: "실측",
              text: "값 날조를 겨냥한 미끼 문의 5건 × 풀셋 라이브 19회(95 케이스-실행)에서 `pii_detected` 발화 0회.",
              src: "RG/problem.md:25-27",
            },
            {
              label: "재정의",
              text: '문제가 사라진 것이 아니라 위치가 이동했다. 채점표 자체가 무너진 가정("모델이 값을 지어낸다") 위에 있었음을 인정.',
              src: "RG/problem.md:28-29, 193-196",
              quote: { text: '"실측에서 재현되는 실패는 값 날조가 아니라 주제를 다루지 않는 인접 근거를 딛고 답하는 것이다."', src: "RG/problem.md:28-29" },
            },
          ],
        },
      ],
    },
    {
      label: "반증 신호와 대응",
      blocks: [
        {
          type: "paragraph",
          text: '사이클 3은 게이트 앞(검색 품질)을 같은 방식으로 재봤다. "못 찾는다"는 질의 재작성이 닫았고, "잘못 찾는다"는 유사도 임계값 한 축으로는 닫히지 않는다는 것이 두 번 실측됐다.',
          src: "RG/README:23-24",
        },
        {
          type: "paragraph",
          text: "대응 — 사이클 4에서 채택 축을 두 겹(질의 축 기권 게이트 + 항목 축 절대 하한)으로 늘리고, 회귀 판정을 사람 눈에서 코드(`regression_guard.py`)로 옮겼다.",
          src: "RG/README:51",
        },
      ],
    },
    {
      label: "결정 — 만든 것 / 안 만든 것",
      blocks: [
        {
          type: "issues",
          made: {
            items: [
              { text: "`claim + citation_ids` 구조의 답변 초안" },
              { text: "LLM 0회 결정론 게이트 L1 — 근거 무결성 판정" },
              { text: "L1 통과분만 L2(LLM-as-a-judge)로" },
              { text: "회귀 가드 코드화 (`regression_guard.py`)" },
            ],
            src: "RG/README:48, 51",
          },
          notMade: {
            items: [
              { text: "하이브리드(BM25+RRF) · LLM 리랭크 · 큰 임베딩 · 고정 크기 청킹 — 넷 다 측정하고 채택하지 않았다", src: "RG/README:52" },
              { text: "LangGraph — 오케스트레이션은 자체 루프", src: "RG/README:50" },
            ],
          },
        },
      ],
    },
    {
      label: "성공 지표와 측정 설계",
      blocks: [
        {
          type: "numbers",
          items: [
            { value: "0.634 → 0.734", label: "질의 재작성 macro F1 — 한 단이 검색 총이익의 85.3% (정답 라벨 30건)", src: "RG/README:52" },
            { value: "$0.014493", label: "문의 1건 비용 — 판정이 그중 71.7%", src: "RG/README:53" },
            { value: "8.7~9.6초", label: "문의 1건 p50 지연", src: "RG/README:54" },
            { value: "0.5 ms", label: "L1 게이트 — L2 판정 한 층은 8.4~10.1초", src: "RG/README:54" },
          ],
        },
        { type: "paragraph", variant: "asof", text: "회귀 가드가 실행마다 두 줄로 보고한다 · 현재 기본값 기준", src: "RG/README:51" },
      ],
    },
    {
      label: "직접 구현",
      blocks: [
        {
          type: "chips",
          items: [{ text: "Python 3.13" }, { text: "FastAPI" }, { text: "Postgres" }, { text: "pgvector" }, { text: "sqlglot" }, { text: "OpenAI" }, { text: "Anthropic" }],
        },
        {
          type: "features",
          items: [
            {
              text: "확률적인 부분(의도 해석·질의 재작성·SQL 생성·초안·L2 판정)과 결정론적인 부분(접수·조회·근거 채택·L1·루프 상한)을 노드 단위로 분리",
              src: "RG/README:50",
            },
            { text: "read-only text-to-SQL — sqlglot AST 검증" },
            { text: "기각 → 사유 피드백 → 재생성 → 통과 루프가 매 실행 재현", src: "RG/problem.md:170-172" },
          ],
        },
        {
          type: "numbers",
          items: [{ value: "2,192", label: "오프라인 테스트 통과 (2026-10-13, DB 제외)", src: "cli-demos/reply-gate-pytest.txt:38" }],
        },
        {
          type: "terminal",
          file: "reply-gate-l1-demo.full.txt",
          title: "L1 게이트 단독 — 서버도 DB도 API 키도 없이 (cli-demos/reply-gate-l1-demo.full.txt)",
        },
      ],
    },
    {
      label: "현재 상태와 다음",
      blocks: [
        {
          type: "paragraph",
          variant: "todo",
          text: "사이클 5 — 현재 기본값으로 풀셋 라이브 3회(90건)를 사서 승격 기준선을 재등재하고, 단계별 지연·캐시 토큰을 처음 실측했다.",
          src: "RG/README:51, 53",
        },
        {
          type: "paragraph",
          variant: "todo",
          text: "이 사이클은 문제정의를 바꾸지 않았다 — 앞의 네 사이클은 매번 문제를 다시 규정했지만, 이번 실측은 1~5절의 어떤 문장도 뒤집지 않았다.",
          src: "RG/problem.md:300-302",
        },
      ],
    },
  ],
};
