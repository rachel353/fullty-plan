export type BillingStatus = "대기 중" | "결제 완료" | "연체" | "취소됨";

export type BillingRequest = {
  id: string;
  rentalId: string;
  productName: string;
  brand: string;
  userId: string;
  userName: string;
  userEmail: string;
  reason: string;
  amount: number;
  status: BillingStatus;
  requestedAt: string;
  dueDate: string;
  paidAt?: string;
  memo?: string;
};

export const BILLING_REASONS = [
  "상품 손상 수리비",
  "연체료",
  "세척 / 클리닝 비용",
  "분실 배상금",
  "기타",
];

// 청구 발송 시 선택 가능한 렌탈 건 (간이 참조용)
export const RENTAL_OPTIONS = [
  { rentalId: "rt001", productName: "Fritz Hansen Egg Chair", brand: "Fritz Hansen", userId: "u001", userName: "김풀티", userEmail: "kim@example.com" },
  { rentalId: "rt002", productName: "Cassina LC4 Chaise", brand: "Cassina", userId: "u002", userName: "이라운지", userEmail: "lounge@example.com" },
  { rentalId: "rt003", productName: "USM Haller Sideboard", brand: "USM", userId: "u003", userName: "박빈티지", userEmail: "vintage@example.com" },
];

export const billingRequests: BillingRequest[] = [
  {
    id: "bl001",
    rentalId: "rt003",
    productName: "USM Haller Sideboard",
    brand: "USM",
    userId: "u003",
    userName: "박빈티지",
    userEmail: "vintage@example.com",
    reason: "상품 손상 수리비",
    amount: 85000,
    status: "대기 중",
    requestedAt: "2026-06-08",
    dueDate: "2026-06-15",
    memo: "회수 검수 중 도어 패널 스크래치 확인 (B등급 처리)",
  },
  {
    id: "bl002",
    rentalId: "rt001",
    productName: "Fritz Hansen Egg Chair",
    brand: "Fritz Hansen",
    userId: "u001",
    userName: "김풀티",
    userEmail: "kim@example.com",
    reason: "연체료",
    amount: 35000,
    status: "결제 완료",
    requestedAt: "2026-05-02",
    dueDate: "2026-05-09",
    paidAt: "2026-05-05",
  },
  {
    id: "bl003",
    rentalId: "rt002",
    productName: "Cassina LC4 Chaise",
    brand: "Cassina",
    userId: "u002",
    userName: "이라운지",
    userEmail: "lounge@example.com",
    reason: "세척 / 클리닝 비용",
    amount: 45000,
    status: "연체",
    requestedAt: "2026-05-20",
    dueDate: "2026-05-27",
  },
  {
    id: "bl004",
    rentalId: "rt001",
    productName: "Fritz Hansen Egg Chair",
    brand: "Fritz Hansen",
    userId: "u001",
    userName: "김풀티",
    userEmail: "kim@example.com",
    reason: "상품 손상 수리비",
    amount: 120000,
    status: "대기 중",
    requestedAt: "2026-06-09",
    dueDate: "2026-06-16",
    memo: "팔걸이 가죽 부분 손상 확인",
  },
];
