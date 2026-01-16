# Conceptual Model - 아테나올리바

> 작성일: 2026-01-07
> 총 Entity: 9개 | Relationship: 12개 | Domain Rule: 10개

---

## Entity Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Core Entities                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌──────────┐      1:N      ┌──────────┐                      │
│   │ Product  │──────────────▶│  Label   │                      │
│   └────┬─────┘               └────┬─────┘                      │
│        │                          │                             │
│        │ 1:N                      │ 1:N                         │
│        ▼                          ▼                             │
│   ┌──────────┐               ┌──────────────┐                  │
│   │  Review  │               │  ScanResult  │                  │
│   └──────────┘               └──────────────┘                  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                       Commerce Entities                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌──────────┐  1:1   ┌──────────┐  1:N   ┌──────────┐        │
│   │   User   │───────▶│   Cart   │───────▶│ CartItem │        │
│   └────┬─────┘        └──────────┘        └──────────┘        │
│        │                                                        │
│        │ 1:N                                                    │
│        ▼                                                        │
│   ┌──────────┐  1:N   ┌───────────┐                            │
│   │  Order   │───────▶│ OrderItem │                            │
│   └──────────┘        └───────────┘                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Entities

### 1. User (회원)
서비스를 이용하는 사용자 (일반 회원, 전문가)

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| id | UUID | ✓ | 고유 식별자 |
| email | String | ✓ | 이메일 (로그인 ID) |
| password | String | ✓ | 비밀번호 (8자 이상) |
| name | String | ✓ | 이름 |
| phone | String | | 연락처 |
| role | Enum | ✓ | CONSUMER, EXPERT, ADMIN |
| status | Enum | ✓ | ACTIVE, INACTIVE |
| createdAt | DateTime | ✓ | 가입일 |

**Related User Stories:** US-106, US-107, US-208, US-209

---

### 2. Product (상품)
판매되는 올리브오일 제품

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| id | UUID | ✓ | 고유 식별자 |
| name | String | ✓ | 상품명 |
| description | String | | 상품 설명 |
| price | Integer | ✓ | 가격 (원) |
| origin | String | ✓ | 원산지 |
| grade | Enum | | EXTRA_VIRGIN, VIRGIN, PURE, LIGHT |
| brand | String | | 브랜드 |
| vintage | String | | 빈티지 (수확 연도) |
| volume | Integer | | 용량 (ml) |
| stock | Integer | ✓ | 재고 수량 |
| images | Array[String] | | 상품 이미지 URL (최대 5장) |
| averageRating | Float | | 평균 평점 (1-5) |
| reviewCount | Integer | | 리뷰 수 |
| status | Enum | ✓ | ACTIVE, INACTIVE, DELETED |

**Related User Stories:** US-103, US-201, US-202, US-203, US-204, US-210

---

### 3. Label (라벨)
OCR 스캔 대상이 되는 올리브오일 라벨 데이터

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| id | UUID | ✓ | 고유 식별자 |
| productId | UUID | ✓ | 연결된 상품 ID |
| imageUrl | String | ✓ | 라벨 이미지 URL |
| brandText | String | | 라벨에서 추출된 브랜드명 |
| productText | String | | 라벨에서 추출된 제품명 |
| vintageText | String | | 라벨에서 추출된 빈티지 |
| ocrData | JSON | | OCR 추출 원본 데이터 |
| embedding | Array[Float] | | RAG 검색용 벡터 임베딩 |

**Related User Stories:** US-205, US-206, US-207

---

### 4. ScanResult (스캔 결과)
사용자가 라벨을 스캔한 결과

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| id | UUID | ✓ | 고유 식별자 |
| userId | UUID | | 스캔한 회원 ID (비회원 가능) |
| imageUrl | String | ✓ | 촬영된 이미지 URL |
| ocrText | String | | OCR 추출 텍스트 |
| matchedLabelId | UUID | | 매칭된 라벨 ID |
| matchedProductId | UUID | | 매칭된 상품 ID |
| matchScore | Float | | 매칭 점수 (0-1) |
| status | Enum | ✓ | MATCHED, PARTIAL, NOT_FOUND |
| responseTimeMs | Integer | | 응답 시간 (밀리초) |
| usedAI | Boolean | ✓ | AI 분석 사용 여부 |

**Related User Stories:** US-101, US-102

---

### 5. Cart (장바구니)
회원의 장바구니

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| id | UUID | ✓ | 고유 식별자 |
| userId | UUID | ✓ | 회원 ID |
| totalAmount | Integer | ✓ | 총 금액 |
| itemCount | Integer | ✓ | 상품 종류 수 |

**Related User Stories:** US-104

---

### 6. CartItem (장바구니 항목)
장바구니에 담긴 개별 상품

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| id | UUID | ✓ | 고유 식별자 |
| cartId | UUID | ✓ | 장바구니 ID |
| productId | UUID | ✓ | 상품 ID |
| quantity | Integer | ✓ | 수량 (1-99) |
| unitPrice | Integer | ✓ | 담은 시점 단가 |

**Related User Stories:** US-104

---

### 7. Order (주문)
결제 완료된 주문

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| id | UUID | ✓ | 고유 식별자 |
| orderNumber | String | ✓ | 주문번호 (표시용) |
| userId | UUID | ✓ | 주문한 회원 ID |
| totalAmount | Integer | ✓ | 총 결제 금액 |
| status | Enum | ✓ | PENDING, PAID, PREPARING, SHIPPED, DELIVERED, CANCELLED, REFUNDED |
| paymentMethod | Enum | | CARD, BANK_TRANSFER, VIRTUAL_ACCOUNT |
| paymentId | String | | PG 결제 ID |
| shippingAddress | JSON | | 배송 주소 |
| paidAt | DateTime | | 결제 완료 시점 |

**Related User Stories:** US-105

---

### 8. OrderItem (주문 항목)
주문에 포함된 개별 상품

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| id | UUID | ✓ | 고유 식별자 |
| orderId | UUID | ✓ | 주문 ID |
| productId | UUID | ✓ | 상품 ID |
| quantity | Integer | ✓ | 수량 |
| unitPrice | Integer | ✓ | 주문 시점 단가 |
| subtotal | Integer | ✓ | 소계 |

**Related User Stories:** US-105

---

### 9. Review (리뷰)
상품에 대한 사용자/전문가 리뷰

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| id | UUID | ✓ | 고유 식별자 |
| productId | UUID | ✓ | 상품 ID |
| userId | UUID | ✓ | 작성자 ID |
| orderId | UUID | | 구매 주문 ID (일반 리뷰) |
| type | Enum | ✓ | CONSUMER, EXPERT |
| rating | Integer | ✓ | 별점 (1-5) |
| content | String | ✓ | 리뷰 내용 (10자 이상) |
| expertRatings | JSON | | 전문가 상세 평가 |
| status | Enum | ✓ | PENDING, APPROVED, REJECTED |

**Related User Stories:** US-108, US-109, US-110

---

## Relationships

| From | To | Cardinality | Description |
|------|----|-----------:|-------------|
| User | Cart | 1:1 | 회원은 하나의 장바구니를 가짐 |
| User | Order | 1:N | 회원은 여러 주문을 할 수 있음 |
| User | Review | 1:N | 회원은 여러 리뷰를 작성할 수 있음 |
| User | ScanResult | 1:N | 회원은 여러 번 스캔할 수 있음 |
| Cart | CartItem | 1:N | 장바구니는 여러 항목을 포함 |
| Product | CartItem | 1:N | 상품은 여러 장바구니에 담길 수 있음 |
| Product | Label | 1:N | 상품은 여러 라벨(빈티지별)을 가질 수 있음 |
| Product | Review | 1:N | 상품은 여러 리뷰를 가짐 |
| Product | OrderItem | 1:N | 상품은 여러 주문에 포함될 수 있음 |
| Order | OrderItem | 1:N | 주문은 여러 항목을 포함 |
| Label | ScanResult | 1:N | 라벨은 여러 스캔 결과와 매칭될 수 있음 |
| Order | Review | 1:N | 주문 기반으로 리뷰 작성 가능 |

---

## Domain Rules

| ID | Rule | Entities | Constraint |
|----|------|----------|------------|
| DR-001 | OCR 응답 시간 제한 | ScanResult | responseTimeMs <= 3000 |
| DR-002 | 비밀번호 최소 길이 | User | password.length >= 8 |
| DR-003 | 장바구니 수량 제한 | CartItem | 1 <= quantity <= 99 |
| DR-004 | 리뷰 작성 조건 | Review, Order | 구매 완료 후만 작성 가능 |
| DR-005 | 전문가 리뷰 승인 | Review | 관리자 승인 후 게시 |
| DR-006 | 리뷰 최소 길이 | Review | content.length >= 10 |
| DR-007 | 재고 부족 경고 | Product | stock <= 10 시 경고 |
| DR-008 | 품절 상품 표시 | Product | stock == 0 시 품절 표시 |
| DR-009 | RAG 우선 검색 | ScanResult, Label | RAG 우선, 실패 시 AI |
| DR-010 | 상품 이미지 제한 | Product | images.length <= 5 |

---

## Data Flows

### DF-001: 스캔 → 구매 플로우 (핵심)
```
User → [Scan Label] → ScanResult
                          ↓
                      [RAG/AI Match]
                          ↓
                        Label → Product
                                   ↓
                             [Add to Cart]
                                   ↓
                             Cart → CartItem
                                       ↓
                                [Checkout]
                                       ↓
                                 Order → OrderItem
                                           ↓
                                    [Payment]
                                           ↓
                                   Order.status = PAID
```

### DF-002: 상품 관리 플로우
```
Admin → [Create Product] → Product
                              ↓
         [Upload Label] → Label (OCR data extracted)
                              ↓
                    [Generate Embedding]
                              ↓
                      Product searchable via scan
```

### DF-003: 리뷰 플로우
```
User → Order (PAID) → [Write Review] → Review
                                          ↓
                               [Update Product Rating]
                                          ↓
                                   Review displayed
```

---

## Glossary

| 용어 | 정의 |
|------|------|
| **라벨 스캔** | 카메라로 올리브오일 라벨을 촬영하여 제품 정보를 인식하는 기능 |
| **RAG** | Retrieval-Augmented Generation. 벡터 임베딩 기반 검색으로 라벨 데이터를 매칭하는 기술 |
| **빈티지** | 올리브오일 원료의 수확 연도. 같은 제품이라도 빈티지에 따라 라벨이 다를 수 있음 |
| **전문가 리뷰** | 올리브오일 전문가가 작성하는 상세 평가 (향, 맛, 품질, 가성비) |
| **PG** | Payment Gateway. 온라인 결제를 처리하는 결제 대행 서비스 |
| **카페24** | 기존에 사용 중인 커머스 플랫폼. POC에서 연동 가능 여부 테스트 예정 |
| **품질 등급** | 올리브오일 등급: Extra Virgin (최상급), Virgin, Pure, Light 순 |
