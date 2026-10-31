import type { Project } from "../types";

export const guardLedger: Project = {
  slug: "guard-ledger",
  key: "guardledger",
  mono: "GL",
  title: "guard-ledger",
  titleSub: "구 reject-bench",
  period: "2026.08 —",
  kind: "개인 프로젝트",
  badges: [],
  cardBadges: [],
  description: 'AI 코딩 에이전트에 걸어 둔 가드레일(위험 명령 차단 훅)의 차단 사건을 기록하고, "정책대로 막았나"(LLM 판정)와 "실제 도움이 됐나"(사람 검토)를 분리해 판정하는 도구 — 지표를 먼저 정의하고 기준선을 쟀다',
  links: [{ kind: "external", label: "GitHub", href: "https://github.com/sylee29/guard-ledger" }],
  chips: ["지표 정의", "관찰 프로토콜", "Python", "Claude Code hooks", "MCP"],
  media: {
    card: {
      kind: "terminal",
      ariaLabel: "reject-bench report 명령 출력 (일부)",
      title: "uv run python -m rejectbench.cli report",
      command: "$ uv run python -m rejectbench.cli report  (stdout only, no --out; truncated to first 80 lines)",
      file: "reject-bench-report.txt",
      tag: "CLI 출력 · 2026-10-13",
    },
    gallery: [
      {
        kind: "terminal",
        file: "reject-bench-report.txt",
        command: "$ uv run python -m rejectbench.cli report  (stdout only, no --out; truncated to first 80 lines)",
        title: "uv run python -m rejectbench.cli report",
        cap: "report — 지표·병기 상태 Markdown 보고서",
        thumb: "report",
      },
      {
        kind: "terminal",
        file: "reject-bench-help.txt",
        command: "$ uv run python -m rejectbench.cli --help",
        title: "uv run python -m rejectbench.cli --help",
        cap: "--help — 버전 고정 GuardSpec 등록부 CLI",
        thumb: "--help",
      },
      {
        kind: "terminal",
        file: "reject-bench-list.txt",
        command: "$ uv run python -m rejectbench.cli list",
        title: "uv run python -m rejectbench.cli list",
        cap: "list — 등록된 가드와 버전",
        thumb: "list",
      },
    ],
  },
  sections: [
    {
      label: "한 줄 요약",
      blocks: [
        {
          type: "paragraph",
          variant: "intro",
          text: 'AI 코딩 에이전트에 걸어 둔 가드레일(위험 명령 차단 훅)의 차단 사건을 기록하고, "정책대로 막았나"(LLM 판정)와 "실제 도움이 됐나"(사람 검토)를 분리해 판정하는 도구 — 지표를 먼저 정의하고 기준선을 쟀다.',
        },
        {
          type: "quote",
          text: '"여러 AI 코딩 세션에서 지속형 가드가 남긴 기각(reject) 사건을 심판대(bench)에 올려, 그 증거로 가드를 유지·수정·제거하기로 결정하는 개인 도구 실험입니다."',
          src: "GL/README:3",
        },
        { type: "subLabel", text: "무엇인가 — LLM도 AI 에이전트도 아닌, 에이전트의 가드레일을 평가하는 도구" },
        {
          type: "bullets",
          items: [
            {
              text: "평가 대상은 Claude Code·Codex 같은 AI 코딩 에이전트에 걸어 둔 가드레일 — 위험한 명령이나 편집을 막는 훅 스크립트다. 예: 전역 `block-dangerous-git.sh`(위험 git 명령 차단), reply-gate `protect-live-reports.sh`(커밋된 실측 리포트의 사후 편집 차단).",
              src: "GL/README:20-23",
            },
            {
              text: "Guard Ledger는 그 훅이 막은 사건을 기록하고, 차단마다 두 판단을 따로 받는다 — 정책상 옳은 차단이었나는 독립 LLM이, 실제로 도움이 됐나는 사람이 판단해 가드를 `keep | modify | remove` 한다.",
              src: "GL/README:13-14",
            },
            {
              text: "형태는 Python CLI와 읽기 전용 MCP 서버다. LLM은 판정 단계에서만 쓰는 심판(LLM-as-a-judge)이고, 도구 자체가 LLM이나 에이전트인 것은 아니다.",
            },
          ],
        },
        { type: "paragraph", variant: "role", text: "역할 — 문제 정의 · 조사 · 설계 · 구현 · 검증 (1인)" },
      ],
    },
    {
      label: "문제와 근거",
      blocks: [
        {
          type: "quote",
          text: '"여러 AI 코딩 세션에서 지속형 가드를 운영하는 1인 개발자는, 가드 발동 사건과 당시 맥락이 구조화되어 남지 않아 그 가드가 명시 정책대로 막았는지와 실제로 도움이 됐는지 검증할 수 없고, 결국 기억과 흩어진 오류 로그에 의존해 가드를 유지·수정·제거한다."',
          src: "GL/README:7",
        },
      ],
    },
    {
      label: "가설과 수정",
      blocks: [
        {
          type: "paragraph",
          text: "벤치마크·오탐률 계획은 v7에서 폐기했다. 이름의 bench는 벤치마크가 아니라 판사석 — 기각 사건을 심판대에 올려, 그 증거로 가드를 유지·수정·제거하기로 결정한다.",
          src: "GL/README:3",
        },
      ],
    },
    {
      label: "반증 신호와 대응",
      blocks: [
        {
          type: "quote",
          text: '"정책대로 막았지만 불필요할 수 있고, 정책과 어긋났지만 우연히 도움 될 수도 있으므로 둘을 하나의 오탐률로 합치지 않습니다."',
          src: "GL/README:16",
        },
        {
          type: "paragraph",
          text: "관측 도구를 만드는 세션의 자기차단만으로 성립을 선언하면 대표 주장이 자기생성 증거에 얹힌다 — 사건을 도구개발 / 그-외로 파티션하고 대표값은 그-외로만 센다. 분모 0은 성공이 아니라 미검증이다.",
          src: "cli-demos/reject-bench-report.txt:10, 17-19",
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
              {
                text: "정책 일치성 — 사건 당시 버전으로 고정된 가드 맥락을 받은 독립 LLM이 하나만 판단: `correct_block | incorrect_block | insufficient_context`",
                src: "GL/README:13",
              },
              { text: "실제 유용성 — 사용자가 판단해 `keep | modify | remove`를 결정", src: "GL/README:14" },
            ],
          },
          notMade: {
            items: [
              { text: "두 판단을 합친 하나의 오탐률", src: "GL/README:16" },
              { text: "벤치마크 — v7에서 폐기", src: "GL/README:3" },
            ],
          },
        },
      ],
    },
    {
      label: "성공 지표와 측정 설계",
      blocks: [
        { type: "quote", text: '"증거 기반 결정 완료율 = 결정과 근거가 기록된 판정 가능 가드 / 판정 가능 가드"', src: "cli-demos/reject-bench-report.txt:15" },
        {
          type: "numbers",
          items: [
            { value: "0 / 1", label: "증거 기반 결정 완료율 (0.0%) — 그-외 파티션은 분모 0, 미검증", src: "cli-demos/reject-bench-report.txt:9-10" },
            { value: "67", label: "레코드 67건 (records.jsonl, report 2026-10-13)", src: "cli-demos/reject-bench-report.txt:5" },
            { value: "2", label: "등록된 가드 — block-dangerous-git · protect-live-reports", src: "cli-demos/reject-bench-list.txt" },
          ],
        },
      ],
    },
    {
      label: "직접 구현",
      blocks: [
        {
          type: "chips",
          items: [{ text: "Python" }, { text: "uv" }, { text: "Claude Code hooks" }, { text: "Codex hooks" }, { text: "MCP" }, { text: "LLM 판정" }],
        },
        {
          type: "features",
          items: [
            { text: "기록기 — PreToolUse 훅으로 가드 발동 사건을 기록, 사건 문자열 정화 (판정 번들 1.1)" },
            { text: "조회 MCP 서버" },
            { text: "CLI — validate · register · list · show · judge · review · guard · decide · decisions · report", src: "cli-demos/reject-bench-help.txt" },
          ],
        },
        { type: "numbers", items: [{ value: "557", label: "테스트 557건 통과 (HANDOFF 기준)", src: "reject-bench HANDOFF.md:9" }] },
      ],
    },
    {
      label: "현재 상태와 다음",
      blocks: [
        { type: "paragraph", text: "reject-bench에서 guard-ledger로 개명을 마쳤다 (004 주기 — 저장소·패키지·MCP 서버명).", src: ".dryforge/spec.md:14, 200" },
      ],
    },
  ],
};
