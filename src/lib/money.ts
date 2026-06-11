export type PendingApproval = {
  id: string;
  memberId: string;
  member: string;
  reason: string;
  amount: number;
  date: string;
  orderId: string;
  expiresAt: string;
  reviewText: string;
  reviewImages: number;
};

export const INITIAL_PENDING: PendingApproval[] = [
  {
    id: "pa001",
    memberId: "m001",
    member: "김풀티",
    reason: "구매평 작성",
    amount: 2000,
    date: "2026-04-27",
    orderId: "ORD-20260420-001",
    expiresAt: "2026-07-26",
    reviewText: "거실에 두니 분위기가 확 살아났어요. 포장도 꼼꼼하고 배송도 빨랐습니다. 만족스러운 구매였어요!",
    reviewImages: 0,
  },
  {
    id: "pa002",
    memberId: "m001",
    member: "김풀티",
    reason: "포토 구매평 추가지급",
    amount: 1000,
    date: "2026-04-27",
    orderId: "ORD-20260420-001",
    expiresAt: "2026-07-26",
    reviewText: "사진 추가로 올려요! 실제 색감은 사진보다 더 따뜻한 느낌이에요. 거실 인테리어랑 잘 어울립니다.",
    reviewImages: 3,
  },
  {
    id: "pa003",
    memberId: "m002",
    member: "이가구",
    reason: "구매평 작성",
    amount: 2000,
    date: "2026-04-26",
    orderId: "ORD-20260418-002",
    expiresAt: "2026-07-25",
    reviewText: "생각보다 무게감이 있어서 고급스러운 느낌입니다. 다만 다리 부분에 약간의 스크래치가 있었어요.",
    reviewImages: 1,
  },
  {
    id: "pa004",
    memberId: "m003",
    member: "박빈티",
    reason: "장문 구매평 추가지급",
    amount: 500,
    date: "2026-04-25",
    orderId: "ORD-20260415-003",
    expiresAt: "2026-07-24",
    reviewText:
      "처음 받았을 때 포장 상태가 정말 꼼꼼해서 운송 중 손상 걱정이 전혀 없었습니다. 원목 특유의 결과 색감이 사진보다 훨씬 고급스러웠고, 마감 처리도 매끄러워서 손에 닿는 느낌이 좋았어요. 거실에 배치하니 공간 분위기가 한층 따뜻해진 느낌이고, 좌석 쿠션감도 적당해서 오래 앉아 있어도 편안합니다. 빈티지 가구 특유의 매력을 잘 살린 제품이라 다음 구매도 고려하고 있어요.",
    reviewImages: 1,
  },
];
