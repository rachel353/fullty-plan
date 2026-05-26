export type QnAItem = {
  id: string;
  productId: string;
  productName: string;
  productBrand: string;
  author: string;
  date: string;
  status: "답변 완료" | "답변 대기";
  question: string;
  answer?: string;
  answeredAt?: string;
  answeredBy?: string;
};

export const MOCK_QNA: QnAItem[] = [
  {
    id: "q1",
    productId: "p001",
    productName: "Aeron Chair",
    productBrand: "Herman Miller",
    author: "김**",
    date: "2026-04-05",
    status: "답변 완료",
    question: "실제 수령까지 보통 며칠 걸리나요? 검수 포함해서요.",
    answer: "안녕하세요. 셀러 → Fullty 검수 → 구매자 순으로 진행되며 평균 3~5영업일 내 수령 가능합니다. 검수 일정은 주문 후 마이페이지에서 실시간 확인 가능합니다.",
    answeredAt: "2026-04-06",
    answeredBy: "Fullty 운영팀",
  },
  {
    id: "q2",
    productId: "p003",
    productName: "Eames Lounge Chair",
    productBrand: "Vitra",
    author: "김**",
    date: "2026-04-01",
    status: "답변 완료",
    question: "렌탈로 먼저 사용해보고 구매 전환하는 경우, 차액 계산은 어떻게 되나요?",
    answer: "렌탈 시작 시점의 판매가에서 누적 렌탈료를 차감한 금액이 차액입니다. 구매 전환 버튼을 누르시면 자동으로 계산된 금액이 결제창에 표시됩니다.",
    answeredAt: "2026-04-02",
    answeredBy: "Fullty 운영팀",
  },
  {
    id: "q3",
    productId: "p001",
    productName: "Aeron Chair",
    productBrand: "Herman Miller",
    author: "김**",
    date: "2026-04-20",
    status: "답변 대기",
    question: "사이즈 B와 C의 차이가 어떻게 되나요? 키 180cm 기준으로 어떤 걸 추천하시나요?",
  },
  {
    id: "q4",
    productId: "p002",
    productName: "Series 7",
    productBrand: "Fritz Hansen",
    author: "최**",
    date: "2026-03-28",
    status: "답변 대기",
    question: "옵션이 다른 색상(Polished Aluminum)도 입고 예정이 있을까요?",
  },
  {
    id: "q5",
    productId: "p005",
    productName: "LC2 Armchair",
    productBrand: "Cassina",
    author: "정**",
    date: "2026-03-15",
    status: "답변 완료",
    question: "가죽 표면에 미세 크랙이 있다고 나와있는데 사진으로 확인 가능할까요?",
    answer: "안녕하세요! 추가 사진은 고객센터 채널로 요청주시면 상세 컷 보내드리겠습니다. 불편을 드려 죄송합니다.",
    answeredAt: "2026-03-16",
    answeredBy: "Fullty 운영팀",
  },
];
