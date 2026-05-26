export type Inquiry = {
  id: string;
  category: string;
  title: string;
  body: string;
  createdAt: string;
  status: "답변 대기" | "답변 완료";
  reply?: { body: string; repliedAt: string };
};

export const MOCK_INQUIRIES: Inquiry[] = [
  {
    id: "iq001",
    category: "주문 / 결제",
    title: "주문 취소 요청드립니다",
    body: "어제 주문한 Aeron Chair 취소가 가능한지 확인 부탁드립니다. 주문번호는 ord-2026-0421입니다.",
    createdAt: "2026-04-21",
    status: "답변 완료",
    reply: {
      body: "안녕하세요, 풀티 고객센터입니다.\n해당 주문은 이미 배송 준비 단계에 진입하여 취소가 어렵습니다.\n상품 수령 후 반품 신청을 이용해 주시기 바랍니다.\n불편을 드려 죄송합니다.",
      repliedAt: "2026-04-22",
    },
  },
  {
    id: "iq002",
    category: "렌탈",
    title: "렌탈 기간 연장 방법 문의",
    body: "현재 렌탈 중인 상품의 기간을 연장하고 싶은데 어떻게 하면 되나요?",
    createdAt: "2026-04-18",
    status: "답변 완료",
    reply: {
      body: "안녕하세요!\n렌탈 기간 연장은 마이페이지 > 렌탈 중인 상품 > 상세 페이지에서 '기간 연장' 버튼을 통해 신청하실 수 있습니다.\n추가 문의사항이 있으시면 언제든지 남겨주세요.",
      repliedAt: "2026-04-19",
    },
  },
  {
    id: "iq003",
    category: "상품 / 검수",
    title: "상품 상태 등급 기준이 궁금합니다",
    body: "SS, S, A+ 등 등급 기준이 어떻게 되나요? 구매 전에 참고하고 싶습니다.",
    createdAt: "2026-04-25",
    status: "답변 대기",
  },
];
