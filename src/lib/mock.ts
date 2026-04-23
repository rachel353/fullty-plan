export type Grade = "SS" | "S" | "A+" | "A" | "B";

export type Availability = "buy" | "rent" | "both";

export type Product = {
  id: string;
  brand: string;
  name: string;
  option: string;
  price: number;
  grade: Grade;
  availability: Availability;
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
    availability: "both",
    category: "가구",
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
    availability: "both",
    category: "가구",
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
    availability: "rent",
    category: "가구",
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
    availability: "both",
    category: "가구",
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
    availability: "rent",
    category: "가구",
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
    availability: "both",
    category: "가구",
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
    availability: "rent",
    category: "가구",
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
    availability: "both",
    category: "가구",
    status: "품절",
    seller: "미드센추리",
  },
  {
    id: "p009",
    brand: "Louis Poulsen",
    name: "PH 5 Pendant",
    option: "Classic White",
    price: 980000,
    grade: "S",
    availability: "buy",
    category: "조명",
    status: "판매중",
    seller: "노르딕홈",
  },
  {
    id: "p010",
    brand: "Flos",
    name: "Arco Floor Lamp",
    option: "Marble Base / Steel Arc",
    price: 3200000,
    grade: "A+",
    availability: "both",
    category: "조명",
    status: "판매중",
    seller: "이태리에디션",
  },
  {
    id: "p011",
    brand: "Iittala",
    name: "Teema Dinnerware Set",
    option: "4인 세트 / White",
    price: 420000,
    grade: "SS",
    availability: "buy",
    category: "테이블웨어",
    status: "판매중",
    seller: "노르딕홈",
  },
  {
    id: "p012",
    brand: "Georg Jensen",
    name: "Cobra Bowl",
    option: "Small / Stainless",
    price: 680000,
    grade: "S",
    availability: "buy",
    category: "테이블웨어",
    status: "판매중",
    seller: "덴마크빈티지",
  },
  {
    id: "p013",
    brand: "Marimekko",
    name: "Unikko Throw",
    option: "Cotton / Red",
    price: 280000,
    grade: "A+",
    availability: "buy",
    category: "홈데코",
    status: "판매중",
    seller: "노르딕홈",
  },
  {
    id: "p014",
    brand: "Alvar Aalto",
    name: "Savoy Vase",
    option: "Large / Clear",
    price: 520000,
    grade: "S",
    availability: "buy",
    category: "홈데코",
    status: "판매중",
    seller: "이태리에디션",
  },
  {
    id: "p015",
    brand: "Tom Wesselmann",
    name: "Still Life Print",
    option: "Framed / Edition of 100",
    price: 2400000,
    grade: "A+",
    availability: "buy",
    category: "아트",
    status: "판매중",
    seller: "오브제 스튜디오",
  },
  {
    id: "p016",
    brand: "Nam June Paik",
    name: "TV Buddha Lithograph",
    option: "Signed / 1985",
    price: 5800000,
    grade: "S",
    availability: "buy",
    category: "아트",
    status: "판매중",
    seller: "오브제 스튜디오",
  },
];

export const categories = ["전체", "가구", "조명", "테이블웨어", "홈데코", "아트"];

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
  status: "결제 완료" | "배송 대기" | "배송 준비" | "배송 중" | "배송 완료" | "구매 확정" | "취소" | "반품";
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
    id: "o006",
    productId: "p006",
    productName: "LC4 Chaise Longue",
    brand: "Cassina",
    price: 5400000,
    status: "배송 대기",
    type: "구매",
    date: "2026-04-15",
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
  {
    id: "o004",
    productId: "p003",
    productName: "Haller Sideboard",
    brand: "USM",
    price: 3200000,
    status: "취소",
    type: "구매",
    date: "2026-04-01",
  },
  {
    id: "o005",
    productId: "p002",
    productName: "DSW Side Chair",
    brand: "Vitra",
    price: 560000,
    status: "반품",
    type: "구매",
    date: "2026-03-20",
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

export type ProposalStatus = "풀티 검수 중" | "사용자 확인 대기" | "사용자 수락" | "거절됨";

export type DeliveryStatus = "배송 준비 중" | "배송 중" | "배송 완료";

export type Tracking = {
  carrier: string;
  trackingNo: string;
  status: DeliveryStatus;
  registeredAt: string;
};

export type Proposal = {
  id: string;
  getRequestId: string;
  target: string;
  brand: string;
  model: string;
  option: string;
  budget: number;
  productName: string;
  productBrand: string;
  productGrade: Grade;
  usagePeriod: string;
  price: number;
  note: string;
  status: ProposalStatus;
  sentAt: string;
  reviewedAt?: string;
  rejectionReason?: string;
  // 사업자 셀러: 구매자 직접 배송 운송장
  tracking?: Tracking;
  // 개인 셀러: 셀러→풀티 운송장
  sellerTracking?: Tracking;
  // 개인 셀러: 풀티→구매자 운송장
  fullttiTracking?: Tracking;
};

export const proposals: Proposal[] = [
  { id: "pp001", getRequestId: "g001", target: "Herman Miller Aeron Remastered", brand: "Herman Miller", model: "Aeron Remastered", option: "Size C / Carbon", budget: 1500000, productName: "Aeron Chair", productBrand: "Herman Miller", productGrade: "S", usagePeriod: "1~2년", price: 1380000, note: "직접 구매 후 1년 반 사용. 등판 교체 이력 있음. 구성품 모두 포함.", status: "풀티 검수 중", sentAt: "2026-04-08" },
  { id: "pp002", getRequestId: "g002", target: "Vitra Panton Chair", brand: "Vitra", model: "Panton Chair", option: "Glacier Blue", budget: 380000, productName: "Panton Chair", productBrand: "Vitra", productGrade: "A+", usagePeriod: "2~3년", price: 360000, note: "", status: "사용자 확인 대기", sentAt: "2026-04-06" },
  { id: "pp003", getRequestId: "g003", target: "Artek Stool 60", brand: "Artek", model: "Stool 60", option: "Birch / 3-Legged", budget: 450000, productName: "Stool 60", productBrand: "Artek", productGrade: "A", usagePeriod: "6개월~1년", price: 420000, note: "깨끗하게 사용. 실내 전용.", status: "사용자 수락", sentAt: "2026-04-04", sellerTracking: { carrier: "한진택배", trackingNo: "9876543210", status: "배송 중", registeredAt: "2026-04-05" } },
  { id: "pp004", getRequestId: "g004", target: "USM Haller Trolley", brand: "USM", model: "Haller Trolley", option: "Pure White", budget: 980000, productName: "Haller Trolley", productBrand: "USM", productGrade: "A", usagePeriod: "3년 이상", price: 980000, note: "", status: "거절됨", sentAt: "2026-03-29", reviewedAt: "2026-04-02", rejectionReason: "동일 상품 더 낮은 가격 제안 수락" },
  { id: "pp005", getRequestId: "g001", target: "Fritz Hansen Series 7", brand: "Fritz Hansen", model: "Series 7", option: "Lacquered / Black", budget: 680000, productName: "Series 7", productBrand: "Fritz Hansen", productGrade: "S", usagePeriod: "1~2년", price: 620000, note: "정품 인증서 포함.", status: "사용자 수락", sentAt: "2026-03-25", tracking: { carrier: "CJ대한통운", trackingNo: "1234567890123", status: "배송 중", registeredAt: "2026-03-26" } },
  { id: "pp006", getRequestId: "g002", target: "Knoll Womb Chair", brand: "Knoll", model: "Womb Chair", option: "Cashmere Fabric", budget: 2200000, productName: "Womb Chair", productBrand: "Knoll", productGrade: "A+", usagePeriod: "2~3년", price: 2100000, note: "오토만 포함.", status: "사용자 확인 대기", sentAt: "2026-03-21" },
  { id: "pp007", getRequestId: "g003", target: "Cassina LC2 Sofa", brand: "Cassina", model: "LC2 Sofa", option: "2-seater / White", budget: 3500000, productName: "LC2 Sofa", productBrand: "Cassina", productGrade: "A", usagePeriod: "3년 이상", price: 3400000, note: "", status: "거절됨", sentAt: "2026-03-18", reviewedAt: "2026-03-22", rejectionReason: "상품 상태 사진 불충분" },
  { id: "pp008", getRequestId: "g004", target: "Muuto E27 Lamp", brand: "Muuto", model: "E27 Lamp", option: "White", budget: 200000, productName: "E27 Lamp", productBrand: "Muuto", productGrade: "SS", usagePeriod: "6개월 미만", price: 180000, note: "미개봉 수준.", status: "사용자 수락", sentAt: "2026-03-15", sellerTracking: { carrier: "CJ대한통운", trackingNo: "1122334455667", status: "배송 완료", registeredAt: "2026-03-16" }, fullttiTracking: { carrier: "CJ대한통운", trackingNo: "3344556677889", status: "배송 중", registeredAt: "2026-03-18" } },
  { id: "pp009", getRequestId: "g001", target: "HAY About A Chair", brand: "HAY", model: "About A Chair AAC22", option: "Soft Black", budget: 310000, productName: "About A Chair", productBrand: "HAY", productGrade: "A+", usagePeriod: "1~2년", price: 290000, note: "", status: "풀티 검수 중", sentAt: "2026-03-10" },
  { id: "pp010", getRequestId: "g002", target: "Kartell Louis Ghost", brand: "Kartell", model: "Louis Ghost", option: "Crystal", budget: 260000, productName: "Louis Ghost", productBrand: "Kartell", productGrade: "A", usagePeriod: "6개월~1년", price: 240000, note: "스크래치 없음.", status: "사용자 확인 대기", sentAt: "2026-03-07" },
  { id: "pp011", getRequestId: "g003", target: "Vitra Eames DSW", brand: "Vitra", model: "Eames DSW", option: "White / Maple", budget: 600000, productName: "Eames DSW", productBrand: "Vitra", productGrade: "S", usagePeriod: "6개월~1년", price: 580000, note: "", status: "사용자 수락", sentAt: "2026-03-03", sellerTracking: { carrier: "롯데택배", trackingNo: "5566778899001", status: "배송 완료", registeredAt: "2026-03-04" }, fullttiTracking: { carrier: "CJ대한통운", trackingNo: "9988776655443", status: "배송 완료", registeredAt: "2026-03-06" } },
  { id: "pp013", getRequestId: "g002", target: "HAY Copenhague Desk", brand: "HAY", model: "Copenhague CPH30", option: "Oak / Black", budget: 850000, productName: "Copenhague CPH30", productBrand: "HAY", productGrade: "A", usagePeriod: "1~2년", price: 780000, note: "다리 부분 미세 흠집 있음.", status: "사용자 수락", sentAt: "2026-02-20", sellerTracking: { carrier: "우체국택배", trackingNo: "4433221100998", status: "배송 완료", registeredAt: "2026-02-21" }, fullttiTracking: { carrier: "우체국택배", trackingNo: "9988001122334", status: "배송 완료", registeredAt: "2026-02-24" } },
  { id: "pp012", getRequestId: "g004", target: "Artek 81C Side Table", brand: "Artek", model: "81C Side Table", option: "Birch", budget: 340000, productName: "81C Side Table", productBrand: "Artek", productGrade: "A", usagePeriod: "2~3년", price: 320000, note: "", status: "거절됨", sentAt: "2026-02-28", reviewedAt: "2026-03-03", rejectionReason: "다른 셀러 제안 수락" },
  { id: "pp014", getRequestId: "g001", target: "Herman Miller Aeron Remastered", brand: "Herman Miller", model: "Aeron Remastered", option: "Size C / Carbon", budget: 1500000, productName: "Aeron Chair", productBrand: "Herman Miller", productGrade: "A+", usagePeriod: "1~2년", price: 1420000, note: "정품 보증서 포함. 등판 조절 기능 정상.", status: "사용자 수락", sentAt: "2026-04-20" },
];

export type SettlementStatus = "정산 완료" | "정산 예정" | "보류";

export type Settlement = {
  id: string;
  name: string;
  brand: string;
  type: "판매" | "렌탈" | "위탁";
  sale: number;
  fee: number;
  payout: number;
  status: SettlementStatus;
  period: string;
  orderId: string;
  settledAt?: string;
  bank?: string;
  accountNo?: string;
  memo: string;
};

export const settlements: Settlement[] = [
  { id: "st001", name: "Aeron Chair", brand: "Herman Miller", type: "판매", sale: 1280000, fee: 192000, payout: 1088000, status: "정산 완료", period: "2026-03", orderId: "o001", settledAt: "2026-04-05", bank: "카카오뱅크", accountNo: "333-12-****56", memo: "" },
  { id: "st002", name: "Egg Chair", brand: "Fritz Hansen", type: "렌탈", sale: 850000, fee: 127500, payout: 722500, status: "정산 예정", period: "2026-03", orderId: "o002", bank: "카카오뱅크", accountNo: "333-12-****56", memo: "" },
  { id: "st003", name: "Panton Chair", brand: "Vitra", type: "위탁", sale: 380000, fee: 76000, payout: 304000, status: "정산 예정", period: "2026-04", orderId: "o003", bank: "카카오뱅크", accountNo: "333-12-****56", memo: "" },
  { id: "st004", name: "Haller Sideboard", brand: "USM", type: "판매", sale: 3200000, fee: 480000, payout: 2720000, status: "정산 완료", period: "2026-02", orderId: "o004", settledAt: "2026-03-05", bank: "카카오뱅크", accountNo: "333-12-****56", memo: "3월 초 정산 완료 확인" },
  { id: "st005", name: "LC4 Chaise Longue", brand: "Cassina", type: "위탁", sale: 5400000, fee: 810000, payout: 4590000, status: "정산 완료", period: "2026-02", orderId: "o006", settledAt: "2026-03-05", bank: "카카오뱅크", accountNo: "333-12-****56", memo: "" },
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
