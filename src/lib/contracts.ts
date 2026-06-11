export type ContractStatus = "작성중" | "서명 대기" | "서명 완료" | "만료" | "취소됨";

export type ContractType = "렌탈" | "SELL" | "BUY" | "위탁" | "기타";

export type SignatureMethod = "모두싸인 링크로 서명" | "사이트 내 서명 화면으로 연결";

export type ContractFieldType = "text" | "date" | "textarea";

export type ContractField = {
  id: string;
  label: string;
  type: ContractFieldType;
  placeholder?: string;
  required: boolean;
};

export type FieldMapping = {
  docField: string;
  modusignKey: string;
  ourData: string;
  required: boolean;
};

export type ContractTemplate = {
  id: string;
  name: string;
  contractType: ContractType;
  description: string;
  integrationType: string;
  modusignTemplateId: string;
  signerRoleName: string;
  fieldMappingStatus: "완료" | "미완료";
  active: boolean;
  version: string;
  updatedAt: string;
  fields: ContractField[];
  fieldMappings: FieldMapping[];
};

export type ContractMember = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export type LinkableRef = {
  id: string;
  productName: string;
  memberId: string;
};

export type Contract = {
  id: string;
  name: string;
  contractType: ContractType;
  memberId: string;
  memberName: string;
  memberEmail: string;
  memberPhone: string;
  linkedRefId: string;
  linkedProductName: string;
  templateId: string;
  templateName: string;
  status: ContractStatus;
  sentAt?: string;
  completedAt?: string;
  signatureExpiry: string;
  signatureMethod: SignatureMethod;
  messageToSigner: string;
  internalMemo?: string;
  values: Record<string, string>;
};

export const CONTRACT_MEMBERS: ContractMember[] = [
  { id: "m001", name: "김풀티", email: "kim@example.com", phone: "010-0000-0000" },
  { id: "m002", name: "이풀티", email: "lee@example.com", phone: "010-1111-2222" },
  { id: "m003", name: "박빈티지", email: "vintage@example.com", phone: "010-2222-3333" },
  { id: "m004", name: "최가구", email: "furniture@example.com", phone: "010-3333-4444" },
];

export const LINKABLE_REFS: LinkableRef[] = [
  { id: "RENTAL-20260611-001", productName: "USM Haller Cabinet", memberId: "m001" },
  { id: "SELL-20260610-002", productName: "Aeron Chair", memberId: "m002" },
  { id: "RENTAL-20260605-003", productName: "CH24 Wishbone Chair", memberId: "m003" },
  { id: "BUY-20260601-004", productName: "Eames Lounge Chair", memberId: "m004" },
  { id: "SELL-20260528-005", productName: "CH24 Wishbone Chair", memberId: "m003" },
  { id: "RENTAL-20260301-006", productName: "Tulip Table", memberId: "m001" },
];

const RENTAL_FIELDS: ContractField[] = [
  { id: "contract_name", label: "계약명", type: "text", required: true },
  { id: "member_name", label: "계약자명", type: "text", required: true },
  { id: "address", label: "주소", type: "text", required: true },
  { id: "product_name", label: "상품명", type: "text", required: true },
  { id: "brand", label: "브랜드", type: "text", required: true },
  { id: "rental_start_date", label: "렌탈 시작일", type: "date", required: true },
  { id: "rental_end_date", label: "렌탈 종료일", type: "date", required: true },
  { id: "rental_price", label: "렌탈 금액", type: "text", required: true },
  { id: "deposit", label: "보증금", type: "text", required: true },
  { id: "delivery_address", label: "배송지", type: "text", required: true },
  { id: "special_terms", label: "특약사항", type: "textarea", required: false },
];

const RENTAL_MAPPINGS: FieldMapping[] = [
  { docField: "계약자명", modusignKey: "{member_name}", ourData: "회원 이름", required: true },
  { docField: "주소", modusignKey: "{address}", ourData: "회원 주소", required: true },
  { docField: "상품명", modusignKey: "{product_name}", ourData: "상품명", required: true },
  { docField: "렌탈 시작일", modusignKey: "{rental_start_date}", ourData: "렌탈 시작일", required: true },
  { docField: "렌탈 종료일", modusignKey: "{rental_end_date}", ourData: "렌탈 종료일", required: true },
  { docField: "렌탈 금액", modusignKey: "{rental_price}", ourData: "렌탈 금액", required: true },
  { docField: "서명", modusignKey: "{signature}", ourData: "서명 필드", required: true },
];

const CONSIGNMENT_FIELDS: ContractField[] = [
  { id: "contract_name", label: "계약명", type: "text", required: true },
  { id: "member_name", label: "위탁자명", type: "text", required: true },
  { id: "address", label: "주소", type: "text", required: true },
  { id: "product_name", label: "상품명", type: "text", required: true },
  { id: "brand", label: "브랜드", type: "text", required: true },
  { id: "evaluation_price", label: "감정가", type: "text", required: true },
  { id: "consignment_price", label: "위탁 매입가", type: "text", required: true },
  { id: "settlement_date", label: "정산 예정일", type: "date", required: true },
  { id: "special_terms", label: "특약사항", type: "textarea", required: false },
];

const CONSIGNMENT_MAPPINGS: FieldMapping[] = [
  { docField: "위탁자명", modusignKey: "{member_name}", ourData: "회원 이름", required: true },
  { docField: "주소", modusignKey: "{address}", ourData: "회원 주소", required: true },
  { docField: "상품명", modusignKey: "{product_name}", ourData: "상품명", required: true },
  { docField: "감정가", modusignKey: "{evaluation_price}", ourData: "감정가", required: true },
  { docField: "위탁 매입가", modusignKey: "{consignment_price}", ourData: "위탁 매입가", required: true },
  { docField: "정산 예정일", modusignKey: "{settlement_date}", ourData: "정산 예정일", required: true },
  { docField: "서명", modusignKey: "{signature}", ourData: "서명 필드", required: true },
];

export const contractTemplates: ContractTemplate[] = [
  {
    id: "tmpl001",
    name: "렌탈 서비스 이용 약정서",
    contractType: "렌탈",
    description: "렌탈 상품 이용 조건 확인 및 전자서명을 위한 표준 약정서입니다.",
    integrationType: "모두싸인 템플릿",
    modusignTemplateId: "template_rental_001",
    signerRoleName: "임차인",
    fieldMappingStatus: "완료",
    active: true,
    version: "v1.0",
    updatedAt: "2026-06-01",
    fields: RENTAL_FIELDS,
    fieldMappings: RENTAL_MAPPINGS,
  },
  {
    id: "tmpl002",
    name: "자산화 위탁 계약서",
    contractType: "SELL",
    description: "자산화 위탁 조건 확인 및 전자서명을 위한 계약서입니다.",
    integrationType: "모두싸인 템플릿",
    modusignTemplateId: "template_consignment_001",
    signerRoleName: "위탁인",
    fieldMappingStatus: "완료",
    active: true,
    version: "v1.0",
    updatedAt: "2026-05-20",
    fields: CONSIGNMENT_FIELDS,
    fieldMappings: CONSIGNMENT_MAPPINGS,
  },
];

export const contracts: Contract[] = [
  {
    id: "ct001",
    name: "렌탈 서비스 이용 약정서_김풀티",
    contractType: "렌탈",
    memberId: "m001",
    memberName: "김풀티",
    memberEmail: "kim@example.com",
    memberPhone: "010-0000-0000",
    linkedRefId: "RENTAL-20260611-001",
    linkedProductName: "USM Haller Cabinet",
    templateId: "tmpl001",
    templateName: "렌탈 서비스 이용 약정서",
    status: "서명 대기",
    sentAt: "2026-06-11",
    signatureExpiry: "2026-06-25",
    signatureMethod: "사이트 내 서명 화면으로 연결",
    messageToSigner: "계약서 내용을 확인하신 후 서명 부탁드립니다.",
    internalMemo: "USM Haller 렌탈 계약 건",
    values: {
      contract_name: "렌탈 서비스 이용 약정서_김풀티",
      member_name: "김풀티",
      address: "서울 강남구 테헤란로 123",
      product_name: "USM Haller Cabinet",
      brand: "USM",
      rental_start_date: "2026-06-15",
      rental_end_date: "2027-06-14",
      rental_price: "89,000원/월",
      deposit: "200,000원",
      delivery_address: "서울 강남구 테헤란로 123",
      special_terms: "배송 전 사전 연락 요망",
    },
  },
  {
    id: "ct002",
    name: "자산화 위탁 계약서_이풀티",
    contractType: "SELL",
    memberId: "m002",
    memberName: "이풀티",
    memberEmail: "lee@example.com",
    memberPhone: "010-1111-2222",
    linkedRefId: "SELL-20260610-002",
    linkedProductName: "Aeron Chair",
    templateId: "tmpl002",
    templateName: "자산화 위탁 계약서",
    status: "서명 완료",
    sentAt: "2026-06-10",
    completedAt: "2026-06-10",
    signatureExpiry: "2026-06-24",
    signatureMethod: "모두싸인 링크로 서명",
    messageToSigner: "계약서 내용을 확인하신 후 서명 부탁드립니다.",
    internalMemo: "Aeron Chair 자산화 위탁 계약 건",
    values: {
      contract_name: "자산화 위탁 계약서_이풀티",
      member_name: "이풀티",
      address: "경기도 성남시 분당구 판교로 45",
      product_name: "Aeron Chair",
      brand: "Herman Miller",
      evaluation_price: "450,000원",
      consignment_price: "380,000원",
      settlement_date: "2026-06-20",
      special_terms: "-",
    },
  },
  {
    id: "ct003",
    name: "렌탈 서비스 이용 약정서_박빈티지",
    contractType: "렌탈",
    memberId: "m003",
    memberName: "박빈티지",
    memberEmail: "vintage@example.com",
    memberPhone: "010-2222-3333",
    linkedRefId: "RENTAL-20260605-003",
    linkedProductName: "CH24 Wishbone Chair",
    templateId: "tmpl001",
    templateName: "렌탈 서비스 이용 약정서",
    status: "작성중",
    signatureExpiry: "",
    signatureMethod: "모두싸인 링크로 서명",
    messageToSigner: "계약서 내용을 확인하신 후 서명 부탁드립니다.",
    internalMemo: "",
    values: {
      contract_name: "렌탈 서비스 이용 약정서_박빈티지",
      member_name: "박빈티지",
      address: "",
      product_name: "CH24 Wishbone Chair",
      brand: "Carl Hansen & Søn",
      rental_start_date: "",
      rental_end_date: "",
      rental_price: "",
      deposit: "",
      delivery_address: "",
      special_terms: "",
    },
  },
  {
    id: "ct004",
    name: "렌탈 서비스 이용 약정서_최가구",
    contractType: "렌탈",
    memberId: "m004",
    memberName: "최가구",
    memberEmail: "furniture@example.com",
    memberPhone: "010-3333-4444",
    linkedRefId: "BUY-20260601-004",
    linkedProductName: "Eames Lounge Chair",
    templateId: "tmpl001",
    templateName: "렌탈 서비스 이용 약정서",
    status: "만료",
    sentAt: "2026-05-01",
    signatureExpiry: "2026-05-15",
    signatureMethod: "모두싸인 링크로 서명",
    messageToSigner: "계약서 내용을 확인하신 후 서명 부탁드립니다.",
    internalMemo: "Eames Lounge Chair 렌탈 계약 건",
    values: {
      contract_name: "렌탈 서비스 이용 약정서_최가구",
      member_name: "최가구",
      address: "서울 마포구 양화로 12",
      product_name: "Eames Lounge Chair",
      brand: "Vitra",
      rental_start_date: "2026-05-10",
      rental_end_date: "2027-05-09",
      rental_price: "120,000원/월",
      deposit: "300,000원",
      delivery_address: "서울 마포구 양화로 12",
      special_terms: "-",
    },
  },
  {
    id: "ct005",
    name: "자산화 위탁 계약서_박빈티지",
    contractType: "SELL",
    memberId: "m003",
    memberName: "박빈티지",
    memberEmail: "vintage@example.com",
    memberPhone: "010-2222-3333",
    linkedRefId: "SELL-20260528-005",
    linkedProductName: "CH24 Wishbone Chair",
    templateId: "tmpl002",
    templateName: "자산화 위탁 계약서",
    status: "취소됨",
    sentAt: "2026-05-28",
    signatureExpiry: "2026-06-11",
    signatureMethod: "사이트 내 서명 화면으로 연결",
    messageToSigner: "계약서 내용을 확인하신 후 서명 부탁드립니다.",
    internalMemo: "고객 요청으로 취소",
    values: {
      contract_name: "자산화 위탁 계약서_박빈티지",
      member_name: "박빈티지",
      address: "부산 해운대구 센텀로 99",
      product_name: "CH24 Wishbone Chair",
      brand: "Carl Hansen & Søn",
      evaluation_price: "180,000원",
      consignment_price: "150,000원",
      settlement_date: "2026-06-10",
      special_terms: "-",
    },
  },
  {
    id: "ct006",
    name: "렌탈 서비스 이용 약정서_김풀티 (Tulip Table)",
    contractType: "렌탈",
    memberId: "m001",
    memberName: "김풀티",
    memberEmail: "kim@example.com",
    memberPhone: "010-0000-0000",
    linkedRefId: "RENTAL-20260301-006",
    linkedProductName: "Tulip Table",
    templateId: "tmpl001",
    templateName: "렌탈 서비스 이용 약정서",
    status: "서명 완료",
    sentAt: "2026-03-01",
    completedAt: "2026-03-02",
    signatureExpiry: "2026-03-15",
    signatureMethod: "모두싸인 링크로 서명",
    messageToSigner: "계약서 내용을 확인하신 후 서명 부탁드립니다.",
    internalMemo: "Tulip Table 렌탈 계약 건",
    values: {
      contract_name: "렌탈 서비스 이용 약정서_김풀티 (Tulip Table)",
      member_name: "김풀티",
      address: "서울 강남구 테헤란로 123",
      product_name: "Tulip Table",
      brand: "Knoll",
      rental_start_date: "2026-03-05",
      rental_end_date: "2027-03-04",
      rental_price: "65,000원/월",
      deposit: "150,000원",
      delivery_address: "서울 강남구 테헤란로 123",
      special_terms: "-",
    },
  },
];

export const CONTRACT_BODY: Record<string, string[]> = {
  tmpl001: [
    "제1조 (목적) 본 약정서는 주식회사 풀티(이하 '회사')와 렌탈 서비스를 이용하는 회원(이하 '이용자') 간의 렌탈 서비스 이용에 관한 사항을 규정함을 목적으로 합니다.",
    "제2조 (렌탈 상품) 이용자는 본 계약에 명시된 상품을 계약 기간 동안 사용할 수 있으며, 계약 종료 시 원상태로 반납하여야 합니다.",
    "제3조 (이용료 및 결제) 렌탈 이용료는 본 계약에 명시된 금액으로 하며, 매월 1일 자동 결제됩니다. 이용자는 결제 수단 유효성을 유지할 의무가 있습니다.",
    "제4조 (상품 관리 의무) 이용자는 렌탈 상품을 선량한 관리자의 주의로 사용·보관하여야 하며, 고의 또는 과실로 인한 손상 발생 시 수리비를 부담합니다.",
    "제5조 (계약 해지) 이용자는 렌탈 기간 중 계약 해지를 요청할 수 있으나, 잔여 기간에 대한 위약금이 발생할 수 있습니다. 세부 기준은 서비스 이용약관을 따릅니다.",
    "제6조 (면책) 천재지변, 이용자의 귀책사유로 인한 서비스 중단에 대해 회사는 책임을 지지 않습니다.",
    "본인은 위 약정 내용을 충분히 숙지하였으며 이에 동의하여 전자서명으로 계약을 체결합니다.",
  ],
  tmpl002: [
    "제1조 (목적) 본 계약서는 주식회사 풀티(이하 '회사')와 자산화 서비스를 신청한 위탁인(이하 '위탁인') 간의 자산화 위탁에 관한 사항을 규정함을 목적으로 합니다.",
    "제2조 (위탁 내용) 위탁인은 본 계약에 명시된 상품을 회사에 위탁하며, 회사는 이를 풀티 플랫폼을 통해 매각 또는 운용합니다.",
    "제3조 (위탁 매입가 및 정산) 위탁 매입가는 본 계약에 명시된 금액으로 하며, 정산은 본 계약에 명시된 정산 예정일에 위탁인 명의 계좌로 지급됩니다.",
    "제4조 (상품 상태 관리) 회사는 위탁 상품의 정상적인 관리 의무를 부담합니다. 단, 위탁인 과실로 인한 손상 시 회사의 책임 범위는 계약 시 별도 협의합니다.",
    "제5조 (계약 해지) 위탁인의 계약 해지 요청 시 30일 전 서면 통보를 원칙으로 하며, 이미 진행 중인 매각 절차에는 영향을 미치지 않습니다.",
    "제6조 (상품 반환) 계약 해지 시 회사는 위탁 상품을 위탁인에게 반환합니다. 단, 매각이 완료된 상품은 반환 대상에서 제외됩니다.",
    "본인은 위 계약 내용을 충분히 숙지하였으며 이에 동의하여 전자서명으로 계약을 체결합니다.",
  ],
};
