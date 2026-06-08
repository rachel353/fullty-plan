export type NoticeCategory = "공지" | "이벤트" | "점검" | "업데이트";

export type Notice = {
  id: string;
  title: string;
  category: NoticeCategory;
  pinned: boolean;
  published: boolean;
  date: string;
  body: string[];
};

export const notices: Notice[] = [
  {
    id: "nt001",
    title: "Fullty 정기 서버 점검 안내 (6/12 02:00 ~ 04:00)",
    category: "점검",
    pinned: true,
    published: true,
    date: "2026-06-08",
    body: [
      "안녕하세요, Fullty입니다.",
      "보다 안정적인 서비스 제공을 위해 아래와 같이 정기 점검을 진행합니다.",
      "▶ 점검 일시: 2026년 6월 12일(금) 02:00 ~ 04:00 (약 2시간)",
      "▶ 영향 범위: 전체 서비스 일시 이용 제한 (구매, 렌탈, GET·SELL, 라운지 등)",
      "점검 시간 동안 서비스 이용이 원활하지 않을 수 있는 점 양해 부탁드립니다. 더 나은 서비스로 찾아뵙겠습니다.",
    ],
  },
  {
    id: "nt002",
    title: "여름맞이 빈티지 가구 페어 개최 안내",
    category: "이벤트",
    pinned: true,
    published: true,
    date: "2026-06-05",
    body: [
      "Fullty와 함께하는 여름맞이 빈티지 가구 페어가 시작됩니다.",
      "▶ 기간: 2026년 6월 8일(월) ~ 6월 21일(일)",
      "▶ 혜택: 전 카테고리 최대 20% 할인 + 구매 인증 시 풀티머니 추가 적립",
      "다양한 빈티지 셀렉션을 합리적인 가격에 만나보세요.",
    ],
  },
  {
    id: "nt003",
    title: "개인정보처리방침 개정 안내 (2026.06.01 시행)",
    category: "공지",
    pinned: false,
    published: true,
    date: "2026-05-28",
    body: [
      "이용자 보호 강화를 위해 개인정보처리방침 일부 내용이 개정되어 안내드립니다.",
      "▶ 시행일: 2026년 6월 1일",
      "▶ 주요 변경 사항: 위탁·매입 절차상 수집 항목 명시, 보관 기간 조정",
      "자세한 내용은 [이용약관 / 개인정보처리방침] 페이지에서 확인하실 수 있습니다.",
    ],
  },
  {
    id: "nt004",
    title: "GET·SELL 검수 프로세스 업데이트 안내",
    category: "업데이트",
    pinned: false,
    published: true,
    date: "2026-05-20",
    body: [
      "보다 정확한 등급 산정을 위해 GET·SELL 검수 프로세스가 업데이트되었습니다.",
      "▶ 검수 항목 세분화: 외관 / 기능 / 구성품 3개 영역으로 구분해 등급 산정",
      "▶ 검수 결과 리포트 제공: 등급 산정 근거를 사진과 함께 마이페이지에서 확인 가능",
      "더 신뢰할 수 있는 거래 환경을 위해 계속 노력하겠습니다.",
    ],
  },
  {
    id: "nt005",
    title: "추석 연휴 배송 / 고객센터 운영 안내",
    category: "공지",
    pinned: false,
    published: false,
    date: "2026-05-15",
    body: [
      "연휴 기간 배송 및 고객센터 운영 일정을 안내드립니다.",
      "▶ 배송 휴무: 9월 X일 ~ 9월 X일 (순차 발송)",
      "▶ 고객센터: 연휴 기간 1:1 문의 답변이 다소 지연될 수 있습니다.",
      "이용에 참고 부탁드리며, 즐거운 명절 보내시길 바랍니다.",
    ],
  },
];
