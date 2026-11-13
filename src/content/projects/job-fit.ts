import type { Project } from "../types";
import { jobFitShots as s } from "../images";

const alt = {
  jf01: "취업핏 소개 화면: 내 조건으로 매긴 점수가 높은 공고부터 보여 드려요, 회계 담당·서울·경력 2년 예시 조건과 칸마다 점수 근거가 보이는 공고 표",
  jf02: "취업핏 대화 화면: '서울에서 백엔드 개발 일 찾아요, 경력 2년이에요'를 직무·지역·경력의 확인 전 조건 초안으로 정리하고 '이 조건으로 비교하기' 버튼을 보여 줌",
  jf03: "취업핏 비교표: 조건 적용 뒤 맞는 공고 5199개, 점수 높은 순으로 직무·경력·역량·지역 칸마다 맞음·정보 없음을 표시",
  jf04: "취업핏 공고 상세: 클라우드 개발자 채용 83점, 원문에서 지원하기, 지원 준비, 직무·근무·고용 형태·경력·급여·마감 정보",
};

export const jobFit: Project = {
  slug: "job-fit",
  key: "jobfit",
  mono: "JF",
  title: "취업핏",
  titleEn: "job-fit",
  period: "2026.10 —",
  kind: "2인 팀 프로젝트",
  badges: [{ text: "운영 중", tone: "accent", pulse: true }],
  description:
    "이력서와 희망 조건으로 채용공고를 점수 순으로 비교하고, 조건마다 맞는 근거와 모르는 부분을 함께 보여 주는 웹 서비스 — AI를 어디에 쓸지 72번 호출 비교 실험으로 정했다",
  descriptionSrc: "JF/README:5 · JF/PRODUCT.md:25-26",
  links: [
    { kind: "external", label: "jobfit-dev-143b3.web.app", href: "https://jobfit-dev-143b3.web.app" },
    { kind: "note", label: "비공개 팀 저장소 · 면접 시 코드 공유" },
  ],
  chips: ["실험 설계", "AI 적용 범위 결정", "React", "Firebase", "DeepSeek", "개인정보 가림"],
  media: {
    card: { kind: "image", image: s.jf03, alt: alt.jf03, wide: true, tag: "운영 사이트 캡처 · 2026-11-13" },
    /* user-flow order: landing → chat draft → comparison table → job detail */
    gallery: [
      { kind: "image", image: s.jf01, wide: true, cap: "소개 · 점수 예시", alt: alt.jf01 },
      { kind: "image", image: s.jf02, wide: true, cap: "대화로 조건 초안", alt: alt.jf02 },
      { kind: "image", image: s.jf03, wide: true, cap: "점수 순 비교표", alt: alt.jf03 },
      { kind: "image", image: s.jf04, wide: true, cap: "공고 상세", alt: alt.jf04 },
    ],
    note: "로그인 없이 쓰는 화면만 캡처했습니다. 로그인 전 대화는 브라우저의 규칙 해석기가 답합니다.",
  },
  sections: [
    {
      label: "한 줄 요약",
      blocks: [
        {
          type: "paragraph",
          variant: "intro",
          text: "구직자가 공고를 하나씩 열어 보지 않아도, 내 조건으로 매긴 점수 순으로 공고를 비교하고 칸마다 왜 그 점수인지 확인하게 하는 웹 서비스. 점수는 규칙으로 매기고 합격 확률처럼 표현하지 않는다.",
          src: "JF/PRODUCT.md:15, 37",
        },
        {
          type: "paragraph",
          variant: "role",
          text: "역할 — 2인 팀(파트너 mhju0). 이력서 분석 · AI 연동(Gemini → DeepSeek) · 상담 챗봇 서버 · 추천 방식 비교 실험 · 점수 규칙 `rule-v9` · 지원 준비 체크리스트 담당. 공고 수집·정리와 운영 게시는 파트너 담당",
          src: "JF/docs/AI_LOG.md · JF/docs/STATUS.md:42",
        },
      ],
    },
    {
      label: "문제와 근거",
      blocks: [
        {
          type: "quote",
          text: '"공고를 하나씩 열어 보는 대신, 내 조건에 맞는 공고와 그 이유를 빨리 알고 싶은 상황이다."',
          src: "JF/PRODUCT.md:15",
        },
        {
          type: "paragraph",
          text: "두 번째 목표는 팀이 AI를 쓸모가 분명한 곳에만 쓴다는 것을 보여 주는 것. 규칙으로 충분한 곳(추천 점수)은 규칙으로 두고, 시도와 실패를 근거와 함께 기록한다.",
          src: "JF/README:10 · JF/docs/AI_LOG.md:7",
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
              text: "대화에만 나온 조건(신입 가능, 재택 섞임, 인턴 등)은 AI가 추천에 더 깊이 관여할수록 잘 반영된다. ① 규칙 상위 5개 + AI 설명, ② 규칙 상위 20개 안에서 AI 조정, ③ AI가 전체 공고에서 직접 고르기를 가상 구직자 8명으로 비교했다.",
              src: "JF/docs/DECISIONS.md:213-215",
            },
            {
              label: "실측 1",
              text: "72번 모두 성공, 없는 공고·회사·지역을 지어낸 사례는 세 방식 모두 0건. 그러나 반복 일관성은 ① 1.00 · ② 0.75 · ③ 0.58이었고, ③은 호출당 입력 약 5만 토큰에 20초 안팎이 걸렸다.",
              src: "JF/docs/AI_LOG.md:109",
            },
            {
              label: "발견",
              text: "모델의 생각 모드가 기본으로 켜져 있었고 출력 토큰 대부분이 생각 글이었다. 끄고 다시 돌리니 비용 상한은 0.27 → 0.12달러, ③ 호출 시간은 평균 2.9초, 일관성은 ① 1.00 · ② 0.90 · ③ 0.74가 됐다. 대신 맥락 반영은 조금 줄었다.",
              src: "JF/docs/AI_LOG.md:128-140",
            },
            {
              label: "재정의",
              text: "약점은 AI의 고르는 능력보다 후보 집합에 있었다. 경력은 100점 중 15점이라 업무·기술이 맞으면 신입에게도 경력 5년 이상 공고가 올라왔다. 경력 요구가 내 경력보다 3년 이상 많으면 후보에서 빼자(`rule-v9`) ②가 가장 좋아졌다.",
              src: "JF/docs/DECISIONS.md:324-325 · JF/docs/AI_LOG.md:168",
              quote: {
                text: '"경력이 크게 모자란 공고가 후보에서 빠지자 ②가 가장 좋아졌다. 1번 상황은 세 방식 모두 O가 됐다."',
                src: "JF/docs/AI_LOG.md:168",
              },
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
          text: '자동 사실 검사가 0건이어도 추천 이유 글은 지어낸다. 8번 상황에서 "신규 영업 목표 없이"라는 이유가 여러 방식에서 나왔지만 공고 자료에 근거가 없었다. 자동 검사는 이런 문장을 잡지 못한다.',
          src: "JF/docs/AI_LOG.md:123, 141",
        },
        {
          type: "paragraph",
          text: "대응 — 방식마다 공고 120개를 하나씩 '대화에 맞나'로 판정했다(Claude 판정, 사람 평가가 아님을 명시). 지어낸 말은 ① 21 · ② 22 · ③ 29건으로 AI 관여가 클수록 늘었다. 방식이 정해지기 전에는 서비스 동작을 바꾸지 않았다.",
          src: "JF/docs/AI_LOG.md:160-162 · JF/docs/DECISIONS.md:215",
        },
        {
          type: "paragraph",
          text: "남은 구멍 — 경력 숫자는 0인데 상세 조건에 경력이 적힌 공고는 점수로 잡히지 않는다. 자료를 고치는 대신 찾아내는 도구를 만들어 공고 1,035개 중 3개를 찾았다.",
          src: "JF/docs/DECISIONS.md:326",
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
              { text: "AI가 정리한 조건은 수정 가능한 초안 — 사용자가 적용해야 추천에 반영", src: "JF/PRODUCT.md:25" },
              { text: "로그인 전 대화는 규칙 해석기, 로그인 후 대화만 AI(`chat-v1`)", src: "JF/docs/DECISIONS.md:197" },
              { text: "AI는 서버 함수에서만 호출 · 60초 제한 · 다시 시도와 다른 모델로 넘어가기 없음", src: "JF/docs/DECISIONS.md:190" },
              { text: "AI에 보내는 글은 서버에서 한 번 더 가림 (웹과 같은 규칙, 시험으로 일치 확인)", src: "JF/docs/foundation/architecture.md:14" },
              { text: "점수 `rule-v9` — 경력 3년 이상 모자란 공고 제외, 상세에 이유 표시", src: "JF/docs/DECISIONS.md:324" },
            ],
          },
          notMade: {
            items: [
              { text: "추천 순위를 AI에 넘기기 — 세 방식 중 선택은 사람이 하고, 그 전엔 동작을 바꾸지 않음", src: "JF/docs/DECISIONS.md:215" },
              { text: "비싼 모델 비교 — 비용 때문에 빠른 모델만 사용", src: "JF/docs/DECISIONS.md:215" },
              { text: "경력 어긋남 자동 수정 — 도구는 찾기만 하고 자료는 고치지 않음", src: "JF/docs/DECISIONS.md:326" },
            ],
          },
        },
      ],
    },
    {
      label: "성공 지표와 측정 설계",
      blocks: [
        {
          type: "paragraph",
          text: "판단 기준 세 가지 — 대화에 맞는가(공고별 판정), 사실을 지어내지 않았는가(자동 검사), 반복해도 같은가(상위 5개 겹침). 성공의 기준은 사용자가 조건을 직접 확인한 뒤 납득할 수 있는 공고를 저장하거나 지원 판단을 내리는 것.",
          src: "JF/docs/DECISIONS.md:215 · JF/PRODUCT.md:20",
        },
        {
          type: "numbers",
          items: [
            { value: "0.27 → 0.12달러", label: "비교 실험 72번 호출 비용 상한 — 생각 모드 끔", src: "JF/docs/AI_LOG.md:134" },
            { value: "208,450 → 28,142", label: "같은 실험의 출력 토큰", src: "JF/docs/AI_LOG.md:135" },
            { value: "② 9/24 → 12/23", label: "대화에 맞는 묶음 — `rule-v9` 적용 뒤, 안 맞는 공고는 21 → 12개", src: "JF/docs/AI_LOG.md:161, 168" },
            { value: "0건", label: "첫 두 실행에서 없는 공고·회사·지역·연봉을 지어낸 사례 (자동 검사) — `rule-v9` 재실행에서는 ③이 없는 공고 ID를 2번 지어냄", src: "JF/docs/AI_LOG.md:109, 138, 167" },
          ],
        },
        {
          type: "paragraph",
          variant: "asof",
          text: "'대화에 맞나'는 Claude 판정이며 사람 평가가 아님 · 실험은 저장소 공고 1,035개 기준",
          src: "JF/docs/AI_LOG.md:162",
        },
      ],
    },
    {
      label: "직접 구현",
      blocks: [
        {
          type: "chips",
          items: [
            { text: "React" },
            { text: "TypeScript" },
            { text: "Vite" },
            { text: "Firebase", sub: "Hosting · Firestore · Functions" },
            { text: "DeepSeek" },
          ],
        },
        {
          type: "features",
          items: [
            {
              text: "이력서 분석 — 브라우저에서 PDF·DOCX·TXT 글자를 뽑고 개인정보를 가린 뒤 서버가 AI로 프로필 항목을 정리. 출력은 허용값 목록으로 고정하고 서버에서 다시 검사해 모양이 틀리면 실패 처리",
              src: "JF/docs/AI_LOG.md:30",
            },
            {
              text: "상담 챗봇 서버 `chatReply` — 질문은 하나씩, 조건은 초안으로. 위기 신호가 있으면 서버가 고정 안내 문구를 붙이고, 하루 50개 · 2,000자 한도",
              src: "JF/docs/DECISIONS.md:197-199",
            },
            {
              text: "AI 호출을 Gemini에서 DeepSeek 공식 API로 전환하고(잔액 소액 충전을 비용 상한으로 사용), 생각 모드를 꺼 상담 답 2~4초",
              src: "JF/docs/DECISIONS.md:190, 227-228",
            },
            {
              text: "지원 준비 체크리스트 — AI는 서버가 만든 조건 후보·출처 ID와 정확한 인용만 고르고, 서버가 근거를 검증해 저장. 해석이 불분명하면 '모름'으로 두고 지원 자격을 보증하지 않음",
              src: "JF/docs/AI_LOG.md:195",
            },
            {
              text: "내 데이터 전체 삭제를 서버로 옮김 — 브라우저 삭제의 500개 한도와 답을 기다리던 대화가 지운 뒤 다시 생기는 경합을 막음",
              src: "JF/docs/DECISIONS.md:218-221",
            },
          ],
        },
        {
          type: "numbers",
          items: [
            { value: "웹 241 · Functions 203", label: "지원 준비 구현 시점 자동 시험 통과 (도구 29, lint·build 포함)", src: "JF/docs/AI_LOG.md:197" },
          ],
        },
      ],
    },
    {
      label: "현재 상태와 다음",
      blocks: [
        {
          type: "paragraph",
          variant: "todo",
          text: "운영 중 — 공고 329,266개와 지원 준비 기능을 2026-11-10 운영 배포했다. 사이트 첫 화면에서는 28개 직군 공고 7,733개를 한 기준으로 비교한다(2026-11-13 확인).",
          src: "JF/docs/STATUS.md:17",
        },
        {
          type: "paragraph",
          variant: "todo",
          text: "남은 것 — 대화 안 추천 방식(①②③)은 사람이 고른다. 로그인 후 상담·이력서·삭제 흐름의 실제 운영 화면 확인과 개인정보 처리방침의 빈칸 4개를 채우는 것이 정식 공개 전 조건이다.",
          src: "JF/docs/STATUS.md:34, 36, 40",
        },
      ],
    },
  ],
};
