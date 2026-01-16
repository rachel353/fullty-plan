# Information Architecture - 아테나올리바

> Generated from: user_stories_data.json, conceptual_model.json
> Date: 2026-01-07

---

## Platform Definition

| 항목 | 내용 |
|------|------|
| **플랫폼 유형** | Web App (PWA) - 기존 앱스토어 계정으로 업데이트 |
| **주요 사용 환경** | Mobile (스캔 기능 중심), Desktop (관리자) |
| **반응형** | Mobile-first, Desktop 지원 |
| **지원 브라우저** | Chrome, Safari, Samsung Internet |

---

## Visual Site Map

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           아테나올리바 Web App                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        Consumer App (일반 사용자)                     │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │                                                                     │   │
│  │   ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐     │   │
│  │   │   홈    │────▶│  스캔   │────▶│스캔결과 │────▶│상품상세 │     │   │
│  │   │   /     │     │  /scan  │     │/scan/   │     │/products│     │   │
│  │   │         │     │         │     │result   │     │/:id     │     │   │
│  │   └────┬────┘     └─────────┘     └─────────┘     └────┬────┘     │   │
│  │        │                                               │          │   │
│  │        │          ┌─────────────────────────────────────┘          │   │
│  │        │          │                                                │   │
│  │        ▼          ▼                                                │   │
│  │   ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐     │   │
│  │   │장바구니 │────▶│  결제   │────▶│주문완료 │     │주문내역 │     │   │
│  │   │ /cart   │     │/checkout│     │/orders/ │     │/orders  │     │   │
│  │   │         │     │         │     │:id/done │     │         │     │   │
│  │   └─────────┘     └─────────┘     └─────────┘     └─────────┘     │   │
│  │                                                                     │   │
│  │   ┌─────────┐     ┌─────────┐     ┌─────────┐                      │   │
│  │   │ 로그인  │     │회원가입 │     │내 정보  │                      │   │
│  │   │ /login  │     │/signup  │     │/profile │                      │   │
│  │   └─────────┘     └─────────┘     └─────────┘                      │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        Admin Panel (운영 관리자)                      │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │                                                                     │   │
│  │   ┌─────────┐     ┌───────────────────────────────────────────┐    │   │
│  │   │대시보드 │     │                상품 관리                   │    │   │
│  │   │ /admin  │     │  /admin/products                          │    │   │
│  │   │         │     │  ├─ /new (등록)                           │    │   │
│  │   └─────────┘     │  ├─ /:id (상세)                           │    │   │
│  │                   │  └─ /:id/edit (수정)                      │    │   │
│  │                   └───────────────────────────────────────────┘    │   │
│  │                                                                     │   │
│  │   ┌───────────────────────────────────────────────────────────┐    │   │
│  │   │                   라벨 관리                                │    │   │
│  │   │  /admin/labels                                            │    │   │
│  │   │  ├─ /new (등록)                                           │    │   │
│  │   │  └─ /:id/edit (수정)                                      │    │   │
│  │   └───────────────────────────────────────────────────────────┘    │   │
│  │                                                                     │   │
│  │   ┌─────────────────────┐     ┌─────────────────────┐              │   │
│  │   │     회원 관리        │     │     리뷰 관리        │              │   │
│  │   │  /admin/members     │     │  /admin/reviews     │              │   │
│  │   │  └─ /:id (상세)     │     │  (전문가 리뷰 승인)  │              │   │
│  │   └─────────────────────┘     └─────────────────────┘              │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Screen Hierarchy

### Role: 일반 사용자 (Consumer)

#### 1. 홈/메인
| 항목 | 내용 |
|------|------|
| **Route** | `/` |
| **Purpose** | 서비스 메인 화면, 스캔 진입점 |
| **User Stories** | - |
| **Access** | Public (로그인 불필요) |
| **Key Elements** | 스캔 버튼 (CTA), 최근 스캔 제품, 인기 상품 |

---

#### 2. 라벨 스캔
| 항목 | 내용 |
|------|------|
| **Route** | `/scan` |
| **Purpose** | 카메라로 올리브오일 라벨 촬영 |
| **User Stories** | US-101 |
| **Access** | Public |
| **Key Elements** | 카메라 뷰파인더, 촬영 버튼, 로딩 인디케이터 |

---

#### 3. 스캔 결과
| 항목 | 내용 |
|------|------|
| **Route** | `/scan/result` |
| **Purpose** | 스캔 결과 표시 및 제품 매칭 |
| **User Stories** | US-102 |
| **Access** | Public |
| **Key Elements** | 매칭된 제품 정보, 유사 제품 목록 (매칭 실패 시), '새 제품 요청' 버튼 |

---

#### 4. 상품 상세
| 항목 | 내용 |
|------|------|
| **Route** | `/products/:id` |
| **Purpose** | 제품 상세 정보 및 리뷰 확인 |
| **User Stories** | US-103, US-109 |
| **Access** | Public |
| **Key Elements** | 제품 이미지, 가격/원산지/등급, 장바구니 담기 버튼, 리뷰 목록, 평균 평점 |

---

#### 5. 장바구니
| 항목 | 내용 |
|------|------|
| **Route** | `/cart` |
| **Purpose** | 담은 상품 확인 및 수량 조절 |
| **User Stories** | US-104 |
| **Access** | Auth Required (회원) |
| **Key Elements** | 상품 목록, 수량 변경 (+/-), 삭제 버튼, 총 금액, 결제하기 버튼 |

---

#### 6. 결제
| 항목 | 내용 |
|------|------|
| **Route** | `/checkout` |
| **Purpose** | 주문 정보 입력 및 결제 진행 |
| **User Stories** | US-105 |
| **Access** | Auth Required |
| **Key Elements** | 배송지 입력, 주문 상품 요약, PG 결제창 연동, 결제 버튼 |

---

#### 7. 주문 완료
| 항목 | 내용 |
|------|------|
| **Route** | `/orders/:id/complete` |
| **Purpose** | 결제 완료 확인 |
| **User Stories** | US-105 |
| **Access** | Auth Required |
| **Key Elements** | 주문번호, 결제 금액, 배송 예정일, 주문 내역으로 이동 버튼 |

---

#### 8. 주문 내역
| 항목 | 내용 |
|------|------|
| **Route** | `/orders` |
| **Purpose** | 전체 주문 목록 조회 |
| **User Stories** | US-105 |
| **Access** | Auth Required |
| **Key Elements** | 주문 목록 (날짜, 금액, 상태), 주문 상세로 이동 |

---

#### 9. 주문 상세
| 항목 | 내용 |
|------|------|
| **Route** | `/orders/:id` |
| **Purpose** | 개별 주문 상세 정보 |
| **User Stories** | US-108 |
| **Access** | Auth Required |
| **Key Elements** | 주문 상품 목록, 배송 상태, 리뷰 작성 버튼 (배송 완료 시) |

---

#### 10. 리뷰 작성
| 항목 | 내용 |
|------|------|
| **Route** | `/products/:id/review/new` (Modal or Page) |
| **Purpose** | 구매한 상품 리뷰 작성 |
| **User Stories** | US-108 |
| **Access** | Auth Required + 구매 이력 필요 |
| **Key Elements** | 별점 선택 (1-5), 리뷰 내용 입력 (10자 이상), 등록 버튼 |

---

#### 11. 로그인
| 항목 | 내용 |
|------|------|
| **Route** | `/login` |
| **Purpose** | 회원 로그인 |
| **User Stories** | US-107 |
| **Access** | Public |
| **Key Elements** | 이메일 입력, 비밀번호 입력, 로그인 버튼, 회원가입 링크 |

---

#### 12. 회원가입
| 항목 | 내용 |
|------|------|
| **Route** | `/signup` |
| **Purpose** | 신규 회원 가입 |
| **User Stories** | US-106 |
| **Access** | Public |
| **Key Elements** | 이메일/비밀번호/이름 입력, 유효성 검증, 가입 버튼 |

---

#### 13. 내 정보
| 항목 | 내용 |
|------|------|
| **Route** | `/profile` |
| **Purpose** | 회원 정보 확인 및 수정 |
| **User Stories** | US-107 |
| **Access** | Auth Required |
| **Key Elements** | 이메일 (읽기 전용), 이름/연락처 수정, 로그아웃 버튼 |

---

### Role: 운영 관리자 (Admin)

#### 14. 관리자 대시보드
| 항목 | 내용 |
|------|------|
| **Route** | `/admin` |
| **Purpose** | 관리자 메인 화면 및 현황 요약 |
| **User Stories** | US-207 |
| **Access** | Admin Only |
| **Key Elements** | 총 상품 수, 총 회원 수, 총 라벨 수, 최근 주문, 재고 부족 경고 |

---

#### 15. 상품 목록
| 항목 | 내용 |
|------|------|
| **Route** | `/admin/products` |
| **Purpose** | 전체 상품 조회 및 관리 |
| **User Stories** | US-204 |
| **Access** | Admin Only |
| **Key Elements** | 상품 테이블 (이름, 가격, 재고, 상태), 검색/필터, 정렬, 페이지네이션, 등록 버튼 |

---

#### 16. 상품 등록
| 항목 | 내용 |
|------|------|
| **Route** | `/admin/products/new` |
| **Purpose** | 신규 상품 등록 |
| **User Stories** | US-201 |
| **Access** | Admin Only |
| **Key Elements** | 상품명/가격/원산지/등급 입력, 이미지 업로드 (최대 5장), 등록 버튼 |

---

#### 17. 상품 상세 (관리자)
| 항목 | 내용 |
|------|------|
| **Route** | `/admin/products/:id` |
| **Purpose** | 상품 상세 정보 확인 |
| **User Stories** | US-204 |
| **Access** | Admin Only |
| **Key Elements** | 상품 정보 전체, 연결된 라벨 목록, 수정/삭제 버튼 |

---

#### 18. 상품 수정
| 항목 | 내용 |
|------|------|
| **Route** | `/admin/products/:id/edit` |
| **Purpose** | 상품 정보 수정 |
| **User Stories** | US-202, US-210 |
| **Access** | Admin Only |
| **Key Elements** | 모든 필드 수정 가능, 재고 수량 직접 입력, 저장/취소 버튼 |

---

#### 19. 상품 삭제 확인
| 항목 | 내용 |
|------|------|
| **Route** | Modal on `/admin/products/:id` |
| **Purpose** | 상품 삭제 확인 |
| **User Stories** | US-203 |
| **Access** | Admin Only |
| **Key Elements** | "삭제하시겠습니까?" 확인 다이얼로그, 확인/취소 버튼 |

---

#### 20. 라벨 목록
| 항목 | 내용 |
|------|------|
| **Route** | `/admin/labels` |
| **Purpose** | 전체 라벨 데이터 조회 |
| **User Stories** | US-207 |
| **Access** | Admin Only |
| **Key Elements** | 라벨 테이블 (이미지 썸네일, 연결 상품, 등록일), 검색, 페이지네이션 |

---

#### 21. 라벨 등록
| 항목 | 내용 |
|------|------|
| **Route** | `/admin/labels/new` |
| **Purpose** | 신규 라벨 데이터 등록 |
| **User Stories** | US-205 |
| **Access** | Admin Only |
| **Key Elements** | 라벨 이미지 업로드, 연결 상품 선택, 브랜드명/제품명/빈티지 입력, 등록 버튼 |

---

#### 22. 라벨 수정
| 항목 | 내용 |
|------|------|
| **Route** | `/admin/labels/:id/edit` |
| **Purpose** | 라벨 데이터 수정 |
| **User Stories** | US-206 |
| **Access** | Admin Only |
| **Key Elements** | 이미지 교체, 연결 상품 변경, 텍스트 데이터 수정, 저장 버튼 |

---

#### 23. 회원 목록
| 항목 | 내용 |
|------|------|
| **Route** | `/admin/members` |
| **Purpose** | 전체 회원 조회 |
| **User Stories** | US-208 |
| **Access** | Admin Only |
| **Key Elements** | 회원 테이블 (이메일, 이름, 가입일, 주문 수), 검색, 정렬, 페이지네이션 |

---

#### 24. 회원 상세
| 항목 | 내용 |
|------|------|
| **Route** | `/admin/members/:id` |
| **Purpose** | 회원 정보 확인 및 수정 |
| **User Stories** | US-209 |
| **Access** | Admin Only |
| **Key Elements** | 회원 정보, 주문 이력, 상태 변경 (활성/비활성), 수정 버튼 |

---

#### 25. 리뷰 관리
| 항목 | 내용 |
|------|------|
| **Route** | `/admin/reviews` |
| **Purpose** | 리뷰 관리 및 전문가 리뷰 승인 |
| **User Stories** | US-110 |
| **Access** | Admin Only |
| **Key Elements** | 리뷰 목록 (전문가/일반 필터), 승인 대기 리뷰, 승인/반려 버튼 |

---

### Role: 전문가 리뷰어 (Expert)

#### 26. 전문가 리뷰 작성
| 항목 | 내용 |
|------|------|
| **Route** | `/products/:id/expert-review/new` |
| **Purpose** | 전문가 리뷰 작성 |
| **User Stories** | US-110 |
| **Access** | Expert Only |
| **Key Elements** | 향/맛/품질/가성비 각 5점 척도, 상세 리뷰 내용, 등록 버튼 |

---

## Route Table

### Consumer Routes

| Route | Screen | User Stories | Access |
|-------|--------|--------------|--------|
| `/` | 홈 | - | Public |
| `/scan` | 라벨 스캔 | US-101 | Public |
| `/scan/result` | 스캔 결과 | US-102 | Public |
| `/products/:id` | 상품 상세 | US-103, US-109 | Public |
| `/products/:id/review/new` | 리뷰 작성 | US-108 | Auth + 구매이력 |
| `/products/:id/expert-review/new` | 전문가 리뷰 작성 | US-110 | Expert |
| `/cart` | 장바구니 | US-104 | Auth |
| `/checkout` | 결제 | US-105 | Auth |
| `/orders` | 주문 내역 | US-105 | Auth |
| `/orders/:id` | 주문 상세 | US-108 | Auth |
| `/orders/:id/complete` | 주문 완료 | US-105 | Auth |
| `/login` | 로그인 | US-107 | Public |
| `/signup` | 회원가입 | US-106 | Public |
| `/profile` | 내 정보 | US-107 | Auth |

### Admin Routes

| Route | Screen | User Stories | Access |
|-------|--------|--------------|--------|
| `/admin` | 대시보드 | US-207 | Admin |
| `/admin/products` | 상품 목록 | US-204 | Admin |
| `/admin/products/new` | 상품 등록 | US-201 | Admin |
| `/admin/products/:id` | 상품 상세 | US-204 | Admin |
| `/admin/products/:id/edit` | 상품 수정 | US-202, US-210 | Admin |
| `/admin/labels` | 라벨 목록 | US-207 | Admin |
| `/admin/labels/new` | 라벨 등록 | US-205 | Admin |
| `/admin/labels/:id/edit` | 라벨 수정 | US-206 | Admin |
| `/admin/members` | 회원 목록 | US-208 | Admin |
| `/admin/members/:id` | 회원 상세 | US-209 | Admin |
| `/admin/reviews` | 리뷰 관리 | US-110 | Admin |

---

## Navigation Structure

### Consumer Navigation

```
Bottom Tab Bar (Mobile)
├── 홈 (/)
├── 스캔 (/scan)
├── 장바구니 (/cart)
└── 마이 (/profile or /login)
    ├── 내 정보 (/profile)
    └── 주문 내역 (/orders)
```

### Admin Navigation

```
Side Navigation (Desktop)
├── 대시보드 (/admin)
├── 상품 관리 (/admin/products)
├── 라벨 관리 (/admin/labels)
├── 회원 관리 (/admin/members)
└── 리뷰 관리 (/admin/reviews)
```

---

## User Story Coverage

| 총 User Stories | 매핑된 화면 | 커버리지 |
|-----------------|------------|----------|
| 20 | 26 (화면) | **100%** ✅ |

### Coverage Details

| User Story | Mapped Screens | Priority |
|------------|---------------|----------|
| US-101 | `/scan` | P1 |
| US-102 | `/scan/result` | P1 |
| US-103 | `/products/:id` | P1 |
| US-104 | `/cart` | P1 |
| US-105 | `/checkout`, `/orders`, `/orders/:id/complete` | P1 |
| US-106 | `/signup` | P1 |
| US-107 | `/login`, `/profile` | P1 |
| US-108 | `/orders/:id`, `/products/:id/review/new` | P2 |
| US-109 | `/products/:id` | P2 |
| US-110 | `/products/:id/expert-review/new`, `/admin/reviews` | P2 |
| US-201 | `/admin/products/new` | P1 |
| US-202 | `/admin/products/:id/edit` | P1 |
| US-203 | `/admin/products/:id` (삭제 모달) | P1 |
| US-204 | `/admin/products`, `/admin/products/:id` | P1 |
| US-205 | `/admin/labels/new` | P1 |
| US-206 | `/admin/labels/:id/edit` | P1 |
| US-207 | `/admin`, `/admin/labels` | P2 |
| US-208 | `/admin/members` | P2 |
| US-209 | `/admin/members/:id` | P2 |
| US-210 | `/admin/products/:id/edit` | P2 |

---

## Core User Flows

### Flow 1: 스캔 → 구매 (핵심 플로우)

```
사용자 → [홈 /]
         → [스캔 버튼 클릭]
         → [스캔 /scan]
         → [라벨 촬영]
         → [스캔 결과 /scan/result]
         → [제품 선택]
         → [상품 상세 /products/:id]
         → [장바구니 담기]
         → [장바구니 /cart]
         → [결제하기]
         → [결제 /checkout]
         → [PG 결제]
         → [주문 완료 /orders/:id/complete]
```

### Flow 2: 상품 관리 (관리자)

```
관리자 → [대시보드 /admin]
         → [상품 관리 클릭]
         → [상품 목록 /admin/products]
         → [신규 등록 버튼]
         → [상품 등록 /admin/products/new]
         → [정보 입력 + 이미지 업로드]
         → [등록 완료]
         → [상품 목록 /admin/products]
```

### Flow 3: 라벨 등록 (관리자)

```
관리자 → [라벨 관리 /admin/labels]
         → [신규 등록 버튼]
         → [라벨 등록 /admin/labels/new]
         → [라벨 이미지 업로드]
         → [상품 선택]
         → [텍스트 데이터 입력]
         → [등록 완료]
         → [라벨 목록 /admin/labels]
```

---

## Access Control Summary

| Role | Accessible Routes |
|------|-------------------|
| **Public (비회원)** | `/`, `/scan`, `/scan/result`, `/products/:id`, `/login`, `/signup` |
| **Consumer (일반 회원)** | Public + `/cart`, `/checkout`, `/orders/*`, `/profile`, `/products/:id/review/new` |
| **Expert (전문가)** | Consumer + `/products/:id/expert-review/new` |
| **Admin (운영 관리자)** | All Consumer + `/admin/*` |

---

## Screen Count Summary

| 영역 | 화면 수 |
|------|---------|
| Consumer (일반 사용자) | 14 |
| Admin (운영 관리자) | 11 |
| Expert (전문가) | 1 |
| **Total** | **26** |
