---
name: logical-architecture-design
description: Validate component responsibilities in logical architecture design. Ensures each component has a single, clear responsibility following SRP (Single Responsibility Principle). Use when designing or reviewing frontend/backend component architecture.
---

# Component Responsibility Validation

## Overview

This skill validates component role descriptions to ensure they follow the **Single Responsibility Principle (SRP)**. Each component should have exactly one clear, well-defined responsibility.

A good component role description is:
- **Concise** (≤ 100 characters)
- **Singular** (one responsibility, not multiple)
- **Specific** (concrete action, not vague management)
- **Clear** (no conjunctions linking multiple responsibilities)

## Validation Rules

### ❌ 4 Inappropriate Signals

If a component role description has ANY of these signals, it violates SRP:

1. **Length > 100 characters**
   - Indicates multiple responsibilities packed into one component
   - Example: "사용자 인증을 처리하고 세션을 관리하며 권한을 검증하고 로그인 실패 시 알림을 전송하며 비밀번호 재설정 이메일을 발송한다"

2. **Contains conjunctions: "그리고", "또", "및", "~하며"**
   - Links multiple responsibilities with conjunctions
   - Example: "주문을 생성하고 결제를 처리하며 재고를 업데이트한다"

3. **Contains 3 or more commas**
   - Lists multiple separate actions
   - Example: "데이터를 조회하고, 검증하고, 저장하고, 알림을 전송한다"

4. **Uses vague verbs: "관리하다", "처리하다", "다루다", "운영하다"**
   - Vague verbs hide multiple responsibilities
   - Example: "사용자를 관리한다" (does what exactly? CRUD? Auth? Permissions? All?)

### ✅ Appropriate Examples

| Component Role | Why It's Good |
|---------------|---------------|
| "사용자 자격증명을 검증한다" | Specific action, single verb, clear scope |
| "주문 데이터를 저장한다" | Concrete operation, no ambiguity |
| "이메일 알림을 발송한다" | Well-defined single responsibility |

### ❌ Inappropriate Examples

| Component Role | Problem | How to Fix |
|---------------|---------|-----------|
| "사용자를 관리하고, 권한을 체크하며, 로그를 기록한다" | Multiple responsibilities (3), conjunctions, commas | Split into: (1) 사용자 데이터를 조회/수정한다, (2) 사용자 권한을 검증한다, (3) 사용자 활동 로그를 기록한다 |
| "주문 생성, 결제 처리, 재고 업데이트, 배송 상태 변경을 처리한다" | 4 responsibilities, vague "처리하다", 3+ commas | Split into separate components for each domain |
| "데이터를 관리한다" | Vague verb, unclear scope | Specify: "주문 데이터를 PostgreSQL에 저장한다" or "근로자 목록을 조회한다" |

## Single Responsibility Principle (SRP)

**Definition:** A component should have one, and only one, reason to change.

### Why SRP Matters

- **Maintainability**: Changes to one feature don't affect unrelated features
- **Testability**: Each component has a clear, testable contract
- **Reusability**: Single-purpose components are easier to reuse
- **Understandability**: Clear naming and scope reduce cognitive load

### How to Apply SRP

1. **Identify the primary action**: What is the ONE thing this component does?
2. **Remove secondary actions**: If there are multiple actions, create separate components
3. **Use specific verbs**: Replace "관리하다" with "조회하다", "저장하다", "검증하다", etc.
4. **Test the role description**: Can you explain it in one sentence without "and"?

## Validation Workflow

When validating a component role description:

```
1. Check length ≤ 100 characters
   ↓
2. Check for conjunctions (그리고/또/및/~하며)
   ↓
3. Count commas (must be < 3)
   ↓
4. Check for vague verbs (관리/처리/다루다/운영)
   ↓
5. If ANY check fails → FLAG for refactoring
   ↓
6. If all pass → APPROVE
```

## Refactoring Strategies

### Strategy 1: Split by Domain Concept

**Before:**
```
UserAuthManager: "사용자 인증, 권한 관리, 세션 관리를 처리한다"
```

**After:**
```
AuthService: "사용자 자격증명을 검증한다"
PermissionChecker: "사용자 권한을 확인한다"
SessionStore: "세션 데이터를 저장/조회한다"
```

### Strategy 2: Split by Layer

**Before:**
```
OrderProcessor: "주문을 검증하고, 저장하고, 이메일을 발송한다"
```

**After:**
```
OrderValidator: "주문 데이터의 유효성을 검증한다"
OrderRepository: "주문 데이터를 저장한다"
OrderNotifier: "주문 확인 이메일을 발송한다"
```

### Strategy 3: Replace Vague Verbs

**Before:**
```
DataManager: "데이터를 관리한다"
```

**After:**
```
UserRepository: "사용자 데이터를 조회/저장한다"
CacheManager: "캐시를 갱신/무효화한다"
```

## Component Types & Expected Responsibilities

### Frontend Components

| Type | Typical Responsibilities |
|------|------------------------|
| Page | "특정 URL 경로의 레이아웃을 렌더링한다" |
| Feature Component | "근로자 목록을 표시한다", "계약서 폼을 렌더링한다" |
| UI Component | "버튼을 렌더링한다", "모달을 표시/숨긴다" |
| Hook | "인증 상태를 관리한다", "API 요청을 처리한다" |
| Service | "백엔드 API를 호출한다", "로컬 스토리지를 조회한다" |

### Backend Components

| Type | Typical Responsibilities |
|------|------------------------|
| Controller | "HTTP 요청을 라우팅한다" |
| Service | "비즈니스 로직을 실행한다" (too vague - specify!) |
| Repository | "데이터베이스 쿼리를 실행한다", "엔티티를 저장/조회한다" |
| Validator | "입력 데이터의 유효성을 검증한다" |
| Mapper | "DTO를 엔티티로 변환한다" |

## Common Anti-Patterns

### Anti-Pattern 1: God Component

```
❌ UserManager: "사용자 CRUD, 권한 관리, 인증, 세션 관리, 알림 발송을 처리한다"
```

**Fix:** Split into 5+ components, each with single responsibility

### Anti-Pattern 2: Vague Scope

```
❌ DataHandler: "데이터를 처리한다"
```

**Fix:** Specify data type and operation: "주문 데이터를 PostgreSQL에 저장한다"

### Anti-Pattern 3: Layer Mixing

```
❌ OrderComponent: "주문 폼을 렌더링하고, 유효성을 검증하며, DB에 저장한다"
```

**Fix:** Separate UI, validation, persistence concerns

## Validation Checklist

Before approving a component role description:

- [ ] Length ≤ 100 characters
- [ ] No conjunctions (그리고/또/및/~하며)
- [ ] Fewer than 3 commas
- [ ] No vague verbs (관리/처리/다루다)
- [ ] Describes ONE clear responsibility
- [ ] Uses specific, action-oriented verb
- [ ] Scope is well-defined
- [ ] Can be tested independently

## Examples by Domain

### Admin System

✅ Good:
- "근로자 목록을 조회한다"
- "계약서 PDF를 생성한다"
- "출퇴근 기록을 저장한다"

❌ Bad:
- "근로자를 관리한다" (vague)
- "계약서를 생성하고 이메일을 발송한다" (2 responsibilities)

### E-commerce

✅ Good:
- "장바구니에 상품을 추가한다"
- "결제 정보를 암호화한다"
- "재고 수량을 감소시킨다"

❌ Bad:
- "주문을 처리한다" (vague)
- "상품 조회, 장바구니 관리, 결제 처리를 수행한다" (3 responsibilities)

### B2C App

✅ Good:
- "사용자 프로필 이미지를 업로드한다"
- "푸시 알림을 등록/해제한다"
- "검색 결과를 필터링한다"

❌ Bad:
- "사용자를 관리한다" (vague)
- "프로필 수정, 이미지 업로드, 알림 설정을 관리한다" (3 responsibilities)

## Usage in Logical Architecture Design

This skill should be applied when:

1. **Defining components** - Validate each component's role description
2. **Reviewing architecture** - Check existing component responsibilities
3. **Refactoring** - Identify components that violate SRP
4. **Code review** - Ensure new components follow SRP

The logical-architecture-designer agent should:
- Apply this validation to ALL component role descriptions
- Flag violations with specific signal detected
- Suggest refactoring when violations found
- Ensure 100% compliance before finalizing architecture
