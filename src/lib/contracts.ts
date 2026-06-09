export type ContractStatus = "대기 중" | "서명 완료" | "만료" | "취소됨";

export type ContractFieldType = "text" | "date-parts" | "signature";

export type ContractField = {
  id: string;
  label: string;
  docLabel?: string;
  type: ContractFieldType;
  variant?: "name-with-seal";
  required: boolean;
};

export type ContractTemplate = {
  id: string;
  name: string;
  fileName: string;
  description: string;
  fields: ContractField[];
  createdAt: string;
};

export type Contract = {
  id: string;
  templateId: string;
  templateName: string;
  userId: string;
  userName: string;
  userEmail: string;
  status: ContractStatus;
  sentAt: string;
  signedAt?: string;
  expiresAt: string;
  note?: string;
  signedValues?: Record<string, string>;
};

const CONTRACT_FIELDS: ContractField[] = [
  { id: "f_date",    label: "날짜",   docLabel: "날    짜",  type: "date-parts", required: true },
  { id: "f_name",    label: "고객명", docLabel: "고 객 명",  type: "text", variant: "name-with-seal", required: true },
  { id: "f_address", label: "주소",   docLabel: "주    소",  type: "text", required: true },
  { id: "f_bank",    label: "은행명", docLabel: "은 행 명",  type: "text", required: true },
  { id: "f_account", label: "계좌번호", docLabel: "계좌번호", type: "text", required: true },
  { id: "f_sig",     label: "서명",   docLabel: "서    명",  type: "signature", required: true },
];

export const contractTemplates: ContractTemplate[] = [
  {
    id: "tmpl001",
    name: "렌탈 서비스 이용 약정서",
    fileName: "rental_agreement_v3.pdf",
    description: "렌탈 상품 수령 후 고객 서명이 필요한 이용 약정서입니다.",
    fields: CONTRACT_FIELDS,
    createdAt: "2026-01-10",
  },
  {
    id: "tmpl002",
    name: "자산화 위탁 계약서",
    fileName: "asset_consignment_v2.pdf",
    description: "자산화 서비스 신청 시 위탁 조건 확인 및 서명이 필요한 계약서입니다.",
    fields: CONTRACT_FIELDS,
    createdAt: "2026-02-14",
  },
];

export const contracts: Contract[] = [
  {
    id: "ct001",
    templateId: "tmpl001",
    templateName: "렌탈 서비스 이용 약정서",
    userId: "u001",
    userName: "김풀티",
    userEmail: "kim@example.com",
    status: "서명 완료",
    sentAt: "2026-05-20",
    signedAt: "2026-05-21",
    expiresAt: "2026-06-20",
    note: "Egg Chair 렌탈 계약",
    signedValues: { f_date: "2026년 5월 21일", f_name: "김풀티", f_address: "서울 강남구 테헤란로 123", f_bank: "카카오뱅크", f_account: "3333-01-1234567", f_sig: "__signed__" },
  },
  {
    id: "ct002",
    templateId: "tmpl002",
    templateName: "자산화 위탁 계약서",
    userId: "u001",
    userName: "김풀티",
    userEmail: "kim@example.com",
    status: "대기 중",
    sentAt: "2026-06-05",
    expiresAt: "2026-06-20",
    note: "Herman Miller Aeron 자산화 신청",
  },
  {
    id: "ct003",
    templateId: "tmpl001",
    templateName: "렌탈 서비스 이용 약정서",
    userId: "u002",
    userName: "이라운지",
    userEmail: "lounge@example.com",
    status: "서명 완료",
    sentAt: "2026-04-10",
    signedAt: "2026-04-11",
    expiresAt: "2026-05-10",
    note: "Tulip Table 렌탈 계약",
    signedValues: { f_date: "2026년 4월 11일", f_name: "이라운지", f_address: "경기도 성남시 분당구 판교로 45", f_bank: "신한은행", f_account: "110-123-456789", f_sig: "__signed__" },
  },
  {
    id: "ct004",
    templateId: "tmpl001",
    templateName: "렌탈 서비스 이용 약정서",
    userId: "u003",
    userName: "박빈티지",
    userEmail: "vintage@example.com",
    status: "만료",
    sentAt: "2026-03-01",
    expiresAt: "2026-03-15",
    note: "CH24 Wishbone 렌탈",
  },
];

export const CONTRACT_BODY: Record<string, string[]> = {
  tmpl001: [
    "제1조 (목적) 본 약정서는 주식회사 풀티(이하 '회사')와 렌탈 서비스를 이용하는 고객(이하 '이용자') 간의 렌탈 서비스 이용에 관한 사항을 규정함을 목적으로 합니다.",
    "제2조 (렌탈 상품) 이용자는 회사가 제공하는 렌탈 상품을 계약 기간 동안 사용할 수 있으며, 계약 종료 시 원상태로 반납하여야 합니다.",
    "제3조 (이용료 및 결제) 렌탈 이용료는 계약 체결 시 확정된 금액으로 하며, 매월 1일 자동 결제됩니다. 이용자는 결제 수단 유효성을 유지할 의무가 있습니다.",
    "제4조 (상품 관리 의무) 이용자는 렌탈 상품을 선량한 관리자의 주의로 사용·보관하여야 하며, 고의 또는 과실로 인한 손상 발생 시 수리비를 부담합니다.",
    "제5조 (계약 해지) 이용자는 렌탈 기간 중 계약 해지를 요청할 수 있으나, 잔여 기간에 대한 위약금이 발생할 수 있습니다. 세부 기준은 서비스 이용약관을 따릅니다.",
    "제6조 (면책) 천재지변, 이용자의 귀책사유로 인한 서비스 중단에 대해 회사는 책임을 지지 않습니다.",
    "본인은 위 약정 내용을 충분히 숙지하였으며 이에 동의하여 아래와 같이 서명합니다.",
  ],
  tmpl002: [
    "제1조 (목적) 본 계약서는 주식회사 풀티(이하 '회사')와 자산화 서비스를 신청한 위탁인(이하 '위탁인') 간의 자산화 위탁에 관한 사항을 규정함을 목적으로 합니다.",
    "제2조 (위탁 내용) 위탁인은 소유 중인 가구를 회사에 위탁하며, 회사는 이를 풀티 플랫폼을 통해 렌탈 또는 판매 서비스에 활용합니다.",
    "제3조 (수익 배분) 위탁 상품에서 발생하는 수익은 회사와 위탁인 간 협의된 비율에 따라 배분됩니다. 수익 정산은 매월 말 기준으로 익월 10일 이내에 이루어집니다.",
    "제4조 (상품 상태 관리) 회사는 위탁 상품의 정상적인 관리 및 보험 가입 의무를 부담합니다. 단, 이용자 과실로 인한 손상 시 회사의 책임 범위는 계약 시 별도 협의합니다.",
    "제5조 (계약 기간 및 해지) 계약 기간은 1년이며, 상호 협의에 의해 연장할 수 있습니다. 위탁인의 계약 해지 요청 시 30일 전 서면 통보를 원칙으로 합니다.",
    "제6조 (상품 반환) 계약 종료 시 회사는 위탁 상품을 위탁인에게 반환합니다. 단, 렌탈 중인 상품은 렌탈 기간 종료 후 반환합니다.",
    "본인은 위 계약 내용을 충분히 숙지하였으며 이에 동의하여 아래와 같이 서명합니다.",
  ],
};
