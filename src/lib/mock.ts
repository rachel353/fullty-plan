export type Grade = "SS" | "S" | "A+" | "A" | "B";

export type Product = {
  id: string;
  brand: string;
  name: string;
  option: string;
  price: number;
  grade: Grade;
  rentable: boolean;
  category: string;
  status: "판매중" | "렌탈중" | "품절" | "검수중";
  seller: string;
};

export const products: Product[] = [
  {
    id: "p001",
    brand: "Herman Miller",
    name: "Aeron Chair",
    option: "Size B / Graphite",
    price: 1280000,
    grade: "S",
    rentable: true,
    category: "체어",
    status: "판매중",
    seller: "빈티지 웍스",
  },
  {
    id: "p002",
    brand: "Vitra",
    name: "Eames Lounge Chair",
    option: "Walnut / Black Leather",
    price: 8900000,
    grade: "SS",
    rentable: true,
    category: "라운지",
    status: "판매중",
    seller: "오브제 스튜디오",
  },
  {
    id: "p003",
    brand: "USM",
    name: "Haller Sideboard",
    option: "3x1 / Pure White",
    price: 3200000,
    grade: "A+",
    rentable: true,
    category: "수납",
    status: "판매중",
    seller: "모듈러 코리아",
  },
  {
    id: "p004",
    brand: "Carl Hansen",
    name: "CH24 Wishbone",
    option: "Oak Soap / Natural Paper Cord",
    price: 980000,
    grade: "A",
    rentable: true,
    category: "체어",
    status: "판매중",
    seller: "노르딕홈",
  },
  {
    id: "p005",
    brand: "Fritz Hansen",
    name: "Egg Chair",
    option: "Wool Hallingdal 65",
    price: 6500000,
    grade: "S",
    rentable: false,
    category: "라운지",
    status: "렌탈중",
    seller: "덴마크빈티지",
  },
  {
    id: "p006",
    brand: "Cassina",
    name: "LC4 Chaise Longue",
    option: "Pony Hide / Chrome",
    price: 5400000,
    grade: "A+",
    rentable: true,
    category: "라운지",
    status: "판매중",
    seller: "이태리에디션",
  },
  {
    id: "p007",
    brand: "B&B Italia",
    name: "Camaleonda Sofa",
    option: "3-seat / Maxalto Boucle",
    price: 14500000,
    grade: "SS",
    rentable: true,
    category: "소파",
    status: "판매중",
    seller: "오브제 스튜디오",
  },
  {
    id: "p008",
    brand: "Knoll",
    name: "Saarinen Tulip Table",
    option: "Round 120 / Marble",
    price: 4200000,
    grade: "A",
    rentable: true,
    category: "테이블",
    status: "품절",
    seller: "미드센추리",
  },
];

export const categories = ["전체", "체어", "라운지", "소파", "테이블", "수납"];

export type GetRequest = {
  id: string;
  brand: string;
  model: string;
  option: string;
  budget: number;
  status: "대기중" | "셀러 제안" | "거래 완료";
  proposalCount: number;
  createdAt: string;
};

export const getRequests: GetRequest[] = [
  {
    id: "g001",
    brand: "Herman Miller",
    model: "Aeron Remastered",
    option: "Size C / Carbon",
    budget: 1500000,
    status: "셀러 제안",
    proposalCount: 3,
    createdAt: "2026-04-02",
  },
  {
    id: "g002",
    brand: "Vitra",
    model: "Panton Chair",
    option: "Glacier Blue",
    budget: 380000,
    status: "대기중",
    proposalCount: 0,
    createdAt: "2026-04-05",
  },
  {
    id: "g003",
    brand: "Artek",
    model: "Stool 60",
    option: "Birch / 3-Legged",
    budget: 450000,
    status: "셀러 제안",
    proposalCount: 1,
    createdAt: "2026-04-07",
  },
  {
    id: "g004",
    brand: "Louis Poulsen",
    model: "PH 5 Pendant",
    option: "Modern White",
    budget: 720000,
    status: "거래 완료",
    proposalCount: 2,
    createdAt: "2026-03-28",
  },
];

export type SellRequest = {
  id: string;
  brand: string;
  model: string;
  type: "위탁" | "매입";
  status:
    | "접수 완료"
    | "배송비 결제 완료"
    | "픽업 대기"
    | "픽업 완료"
    | "검수 중"
    | "최종 금액 제안"
    | "계약 완료"
    | "반려";
  estimated: number;
  createdAt: string;
};

export const sellRequests: SellRequest[] = [
  {
    id: "s001",
    brand: "Herman Miller",
    model: "Embody Chair",
    type: "위탁",
    status: "검수 중",
    estimated: 1450000,
    createdAt: "2026-04-01",
  },
  {
    id: "s002",
    brand: "USM",
    model: "Haller Trolley",
    type: "매입",
    status: "최종 금액 제안",
    estimated: 980000,
    createdAt: "2026-03-25",
  },
  {
    id: "s003",
    brand: "Knoll",
    model: "Womb Chair",
    type: "위탁",
    status: "픽업 대기",
    estimated: 2100000,
    createdAt: "2026-04-06",
  },
];

export type Order = {
  id: string;
  productId: string;
  productName: string;
  brand: string;
  price: number;
  status: "결제 완료" | "배송 준비" | "배송 중" | "배송 완료" | "구매 확정";
  type: "구매" | "렌탈";
  date: string;
};

export const orders: Order[] = [
  {
    id: "o001",
    productId: "p001",
    productName: "Aeron Chair",
    brand: "Herman Miller",
    price: 1280000,
    status: "배송 중",
    type: "구매",
    date: "2026-04-08",
  },
  {
    id: "o002",
    productId: "p005",
    productName: "Egg Chair",
    brand: "Fritz Hansen",
    price: 850000,
    status: "배송 완료",
    type: "렌탈",
    date: "2026-03-15",
  },
  {
    id: "o003",
    productId: "p004",
    productName: "CH24 Wishbone",
    brand: "Carl Hansen",
    price: 980000,
    status: "구매 확정",
    type: "구매",
    date: "2026-02-28",
  },
];

export type Asset = {
  id: string;
  brand: string;
  name: string;
  grade: Grade;
  acquiredAt: string;
  currentValue: number;
  source: "풀티 구매" | "직접 등록";
};

export const assets: Asset[] = [
  {
    id: "a001",
    brand: "Herman Miller",
    name: "Aeron Chair",
    grade: "S",
    acquiredAt: "2025-09-12",
    currentValue: 1180000,
    source: "풀티 구매",
  },
  {
    id: "a002",
    brand: "Vitra",
    name: "DSW Side Chair",
    grade: "A+",
    acquiredAt: "2025-11-04",
    currentValue: 320000,
    source: "직접 등록",
  },
  {
    id: "a003",
    brand: "USM",
    name: "Haller Sideboard",
    grade: "S",
    acquiredAt: "2026-01-20",
    currentValue: 2980000,
    source: "풀티 구매",
  },
];

export const rentalPricing = (price: number, days: number): number => {
  let raw = 0;
  if (days <= 7) raw = price * 0.1;
  else if (days <= 14) raw = price * 0.0075 * days;
  else if (days <= 30) raw = price * 0.00609 * days;
  else if (days <= 60) raw = price * 0.0046 * days;
  else if (days <= 90) raw = price * 0.00307 * days;
  return Math.ceil(raw / 100) * 100;
};
