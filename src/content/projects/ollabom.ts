import type { Project } from "../types";
import { ollabomShots as s } from "../images";

const alt = {
  ob13: "올라봄 시작 화면: 오늘은 어떤 산을 만날까요, 카카오로 시작하기와 Apple로 시작하기 버튼",
  ob04: "올라봄 코스 탐색 탭: 산 이름·코스·지역 검색, 가까운 산 코스 카드 목록",
  ob05: "올라봄 코스 상세: 북한산성 입구에서 백운대, 거리 3.7km, 예상 시간 2시간 20분, 누적 상승 765m, 정상 836m",
  ob01: "올라봄 지도 탭: 가장 가까운 인증 대상 봉우리 북한산 직선 91m, 자유 기록 시작 버튼",
  ob02: "올라봄 기록 중 화면: 북한산 지도 위에 기록 중 00:00:03, GPS ±12m, 정상 인증 촬영 버튼",
  ob03: "올라봄 기록 일시정지 화면: 일시정지 00:00:00, 재개와 종료 버튼",
  ob09: "올라봄 인증 저장됨 화면: 북한산 836m, 이 폰에 저장됨, 정상 사진과 기록으로 돌아가기 버튼",
  ob07: "올라봄 인증 모아보기: 100대명산 2/100 진행 바, 지금 인증하기 버튼, 인증 사진 목록",
  ob08: "올라봄 인증 상세: 남산(서울 중구) 262m, 사진 인증, 완료·백업 완료, 카드 만들기 버튼",
  ob06: "올라봄 인증 대상 찾기: 전체 8봉 중 8건 가까운 순 목록, 북한산 836m 반경 100m 등",
  ob12: "올라봄 내 기록 목록: 북한산 2026.09.06 9.8km 04:02:00 인증 2, 관악산 등 백업 완료 표시",
  ob11: "올라봄 마이 탭: 등산 횟수 4회, 누적 거리 20.2km, 누적 상승 1252m, 100대명산 2/100",
};

export const ollabom: Project = {
  slug: "ollabom",
  key: "ollabom",
  mono: "OB",
  title: "올라봄",
  titleEn: "OllaBom",
  period: "2026.07 —",
  kind: "개인 프로젝트",
  badges: [
    { text: "출시 준비 중", tone: "accent", pulse: true },
    { text: "대표 작업", tone: "wine" },
  ],
  description: "리뷰 19,602건으로 문제를 세 차례 고쳐 쓰고, 정상 인증·기록 하나로 범위를 좁혀 iOS 출시 직전까지 직접 만든 등산 앱",
  descriptionSrc: "OB/docs/0004:5-6 · OB/docs/0005:1",
  links: [
    { kind: "off", label: "ollabom.com · 출시 후 연결", href: "https://ollabom.com" },
    { kind: "note", label: "비공개 저장소 · 면접 시 코드 공유" },
  ],
  chips: ["리서치", "지표 설계", "범위 결정", "Expo", "Supabase", "PostGIS", "Mixpanel"],
  featured: true,
  media: {
    card: {
      kind: "trio",
      shots: [
        { image: s.ob02, alt: alt.ob02 },
        { image: s.ob09, alt: alt.ob09 },
        { image: s.ob05, alt: alt.ob05 },
      ],
      backdrop: s.ob02,
      tag: "iOS 시뮬레이터 캡처",
    },
    /* user-flow order: login → explore → record → certify → review */
    gallery: [
      { kind: "image", image: s.ob13, cap: "로그인", alt: alt.ob13 },
      { kind: "image", image: s.ob04, cap: "코스 탐색", alt: alt.ob04 },
      { kind: "image", image: s.ob05, cap: "코스 상세", alt: alt.ob05 },
      { kind: "image", image: s.ob01, cap: "지도 · 기록 대기", alt: alt.ob01 },
      { kind: "image", image: s.ob02, cap: "기록 중", alt: alt.ob02 },
      { kind: "image", image: s.ob03, cap: "일시정지", alt: alt.ob03 },
      { kind: "image", image: s.ob09, cap: "정상 인증 결과", alt: alt.ob09 },
      { kind: "image", image: s.ob07, cap: "인증 모아보기", alt: alt.ob07 },
      { kind: "image", image: s.ob08, cap: "인증 상세", alt: alt.ob08 },
      { kind: "image", image: s.ob06, cap: "인증 대상 봉우리", alt: alt.ob06 },
      { kind: "image", image: s.ob12, cap: "내 기록", alt: alt.ob12 },
      { kind: "image", image: s.ob11, cap: "마이", alt: alt.ob11 },
    ],
    note: "iOS 시뮬레이터 개발 빌드 캡처 (2026-10-13, fixture 데이터)",
  },
  sections: [
    {
      label: "한 줄 요약",
      blocks: [
        {
          type: "paragraph",
          variant: "intro",
          text: "트랭글 유료화로 갈 곳을 잃은 등산객에게 기록·정상 인증·공유를 무료로 주고, 운영자가 여는 동행 모임으로 사람을 남기는 앱.",
          src: "OB/README:3, 31",
        },
        { type: "paragraph", variant: "role", text: "역할 — 문제 정의 · 조사 · 설계 · 구현 · 검증 (1인)" },
      ],
    },
    {
      label: "문제와 근거",
      blocks: [
        {
          type: "bullets",
          items: [
            { text: "4사 한국어 스토어 리뷰 19,602건 수집·분석 (트랭글 10,941 · 램블러 4,720 · 더트레일 78 · 스트라바 3,863).", src: "OB/docs/0004:5-6, 26" },
            { text: "트랭글 구글플레이 월평균 별점 4.65(2024-06) → 1.22(2026).", src: "OB/docs/0002:12" },
            { text: "2024-07 개편 이후 1~2★ 1,145건의 불만 1·2위는 유료화·구독 반발 26.0%, 업데이트 퇴화·기능 삭제 23.7%.", src: "OB/docs/0002:60, 64-65" },
            { text: "유저가 트랭글을 쓴 이유(4~5★ 6,942건)의 핵심은 배지·레벨 게임화와 기록 누적. 그 둘을 유료화로 잠근 것이 붕괴의 직접 원인.", src: "OB/docs/0002:122, 136" },
            { text: "이주 캐스케이드: 트랭글 → 램블러 → 더트레일.", src: "OB/docs/0003:167" },
            { text: "타깃 규모: 최근 24개월 1~2★ 815건 중 452건이 유료화·탈퇴·갈아탐.", src: "OB/README:31" },
          ],
        },
        { type: "quote", text: '"불만의 1·2위는 기술이 아니라 신뢰다 — ①있던 기능을 없앤 개편 ②쌓아둔 내 기록을 인질로 잡은 과금."', src: "OB/docs/0002:13" },
        { type: "quote", text: '"트랭글 → 램블러 → 더트레일. 한국 등산 앱 유저는 지금 이동 중이고, 승자가 정해지지 않았다."', src: "OB/docs/0003:167" },
      ],
    },
    {
      label: "가설과 수정",
      blocks: [
        {
          type: "timeline",
          rows: [
            {
              label: "0차",
              text: '전국 공공 등산로를 깔고 유저 GPX로 증식하는 트래킹·발견 앱. 사용자 신고 "차별점이 약해 보인다" — 트랭글도 코스 DB가 있어 해자를 설명하지 못했다.',
              src: "OB/docs/0001:11-12",
            },
            {
              label: "1차",
              sub: "2026-08-24",
              text: '사용자 인터뷰 6라운드 뒤 "코스에 고정된 동행"으로 재정의. 상태는 가설 확정·근거 미확보, 검증 게이트 통과 전 앱 코드 금지.',
              src: "OB/docs/0001:1, 3-5",
              quote: { text: '"등산 모임에는 사람이 있는데 코스가 글로만 있고, 등산 앱에는 코스가 있는데 사람이 없다."', src: "OB/docs/0001:37-38" },
            },
            {
              label: "3차",
              sub: "2026-09-07~08",
              text: '리뷰 19,602건에서 "만나서 같이 운동하자"는 1건뿐 → 메인은 정상 인증·기록, 동행은 탭.',
              src: "OB/docs/0005:10-12",
              quote: {
                text: '"OllaOlla v1 = 전국 정상 인증·기록 앱(도구) + 운영자 직접 리딩 동행 탭(사람). "도구로 오게 하고, 사람으로 남긴다.""',
                src: "OB/docs/0005:20-21",
              },
            },
          ],
        },
      ],
    },
    {
      label: "반증 신호와 대응",
      blocks: [
        { type: "quote", text: '"15년, 10,941건, 한국 최대 등산 앱. "같이 갈 사람을 찾게 해달라"는 요구는 0건이다."', src: "OB/docs/0002:171" },
        {
          type: "bullets",
          items: [
            { text: '3사 15,739건에서 "같이 갈 사람 구하기" 1건(0.006%) vs "남의 기록 참고" 183건(1.16%) — 183 : 1.', src: "OB/docs/0003:16, 183" },
            { text: "표본의 한계도 함께 적었다: 리뷰어는 이미 산에 가는 헤비유저이고, 타깃인 입문자는 리뷰를 쓰지 않는다.", src: "OB/docs/0002:185" },
          ],
        },
        { type: "quote", text: '"판정: 반증도 확증도 아니다. 단, "트랭글 유저를 데려오면 된다"는 경로는 이 데이터로 확실히 닫혔다."', src: "OB/docs/0002:188" },
        { type: "paragraph", text: "대응 — 동행 가설을 버리지 않고 검증 시점을 출시 뒤로 미뤘다." },
        { type: "quote", text: '"정직한 평가: 동행 가설은 여전히 미검증이다. 이번 결정은 그 가설을 버린 게 아니라 검증 시점을 출시 뒤로 미룬 것이다."', src: "OB/docs/0005:15-16" },
      ],
    },
    {
      label: "결정 — 만든 것 / 안 만든 것",
      blocks: [
        { type: "subLabel", text: "판단 기준 — 표면별 둘", src: "OB/README:37-40" },
        {
          type: "table",
          widths: ["26%", "48%", "26%"],
          head: ["표면", "질문", "지표"],
          rows: [
            ["기록·인증·공유 카드", "트랭글 난민이 첫 주에 앱을 지우지 않게 하나?", "7일 리텐션"],
            ["동행 탭", "이번 주말 실제로 만나 걷는 산행을 한 건 더 만드나?", "성사된 모임 수"],
          ],
        },
        { type: "quote", text: '"둘 다 아니면 아무리 좋아 보여도 v2다."', src: "OB/README:40" },
        { type: "subLabel", text: "v2로 미룬 것", src: "OB/docs/0005:83-86" },
        {
          type: "chips",
          items: [
            { text: "배지·계급·랭킹" },
            { text: "월별·연별 통계" },
            { text: "앱 안 피드·게시판" },
            { text: "지도 레이어 다양화" },
            { text: "표준 노선 ETL" },
            { text: "유저 개설권" },
            { text: "1:1 산행" },
            { text: "출발·하산 인증" },
            { text: "GPX 가져오기" },
            { text: "수요측 검증 (출시 후 광고)" },
          ],
        },
        { type: "subLabel", text: "폐기한 것", src: "OB/docs/0001:99-101" },
        {
          type: "bullets",
          items: [
            { text: '"트래킹은 되는데 발견이 안 된다"는 문제 정의' },
            { text: "커버리지를 차별점으로 보는 시각" },
            { text: '"걸을 곳을 찾게 하거나, 걸은 걸 남기게 하나?"라는 판단 기준' },
          ],
        },
        { type: "subLabel", text: "경쟁사 무기도 같은 필터로 탈락" },
        { type: "paragraph", text: "더트레일 드론뷰(리뷰 33% 언급)는 우리 필터로는 아니오다.", src: "OB/docs/0003:15, 235-237" },
        { type: "quote", text: '"산행 후 자랑거리이지 이번 주말 산행을 만들지 않는다."', src: "OB/docs/0003:237" },
        { type: "subLabel", text: "스택도 점수표로" },
        {
          type: "paragraph",
          text: "80점 만점, 1인·6개월·백그라운드 위치·Android 먼저 가중 → Expo 64 · Kotlin 57 · Flutter 52. 처음엔 Kotlin을 골랐다가 같은 날 번복한 이유: 운영자 본인이 iPhone 사용자라 iOS가 먼저여야 했다.",
          src: "OB/docs/0005:60-76",
        },
      ],
    },
    {
      label: "성공 지표와 측정 설계",
      blocks: [
        {
          type: "bullets",
          items: [
            { text: "표면별 지표 2개 — 기록·인증·공유 카드는 7일 리텐션, 동행 탭은 성사된 모임 수.", src: "OB/README:37-38" },
            { text: "분석은 Mixpanel 하나로 두고 좌표·사진·이름·이메일은 전송하지 않는다." },
            { text: "동행 가설은 미검증 상태로 출시하고 인스타 광고로 검증.", src: "OB/docs/0005:103" },
            { text: '콜드스타트 대비 — 밀도 확보 설계를 처음부터 넣기로. 모임이 얇으면 "앱을 안 연다"가 된다.', src: "OB/docs/0003:229-233" },
          ],
        },
        {
          type: "quote",
          text: '"…아직 사용자가 많지 않아서여서도 그렇겠지만 등로 기록이 얇으니 램블러 같은 걸 따로 또 켜게 됩니다." — 더트레일 리뷰, 2026-05-10, 5★',
          src: "OB/docs/0003:138-141",
        },
      ],
    },
    {
      label: "직접 구현",
      blocks: [
        {
          type: "chips",
          items: [
            { text: "Expo" },
            { text: "React Native" },
            { text: "TypeScript" },
            { text: "expo-sqlite" },
            { text: "Supabase", sub: "Postgres + PostGIS, Auth, Storage, Edge Functions" },
            { text: "네이버 지도 SDK" },
            { text: "Mixpanel" },
            { text: "EAS / TestFlight" },
          ],
        },
        {
          type: "features",
          items: [
            { text: "오프라인을 정상 경로로 설계 — 판정 시각은 촬영 시각, 좌표·반경은 판정 당시 snapshot으로 저장하고 하산 후 멱등 업로드" },
            { text: "반경 판정을 클라이언트 haversine + 서버 PostGIS `ST_DWithin`으로 이중 검사, 앱 카메라 즉석 촬영만 허용" },
            { text: "산행 규칙을 RN 의존 없는 순수 TS 패키지(`packages/hike-rules`)로 분리해 Node에서 테스트" },
          ],
        },
        {
          type: "numbers",
          items: [
            { value: "79", label: "산행 규칙 테스트" },
            { value: "152", label: "DB 테스트 (pgTAP)" },
            { value: "280", label: "화면 테스트" },
          ],
        },
        { type: "paragraph", variant: "asof", text: "2026-09-13 기준" },
      ],
    },
    {
      label: "현재 상태와 다음",
      blocks: [
        {
          type: "paragraph",
          variant: "todo",
          text: "출시 전. 실기기 30분 화면 잠금 기록, 실계정 로그인·탈퇴, 4시간 실산행 검증은 아직이다. 출시 후 첫 지표는 7일 리텐션과 성사된 모임 수.",
        },
      ],
    },
  ],
};
