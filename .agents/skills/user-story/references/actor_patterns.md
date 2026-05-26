# Actor Definition Patterns

## What is an Actor?

An **Actor** is a role that interacts with the system to achieve goals. Actors represent **WHO** uses the system, not specific people.

## Common Actor Types

### 1. Admin Systems

| Actor | Description | Common Permissions |
|-------|-------------|-------------------|
| 시스템 관리자 | 전체 시스템 설정 및 사용자 관리 | 모든 권한, 시스템 설정 |
| 운영 관리자 | 일상적인 비즈니스 데이터 관리 | 데이터 CRUD, 리포트 조회 |
| 조회자 | 데이터 조회만 가능 | 읽기 전용 |
| 승인자 | 요청 승인/반려 권한 | 승인 워크플로우 |
| 감사자 | 시스템 활동 모니터링 | 로그 조회, 리포트 |

### 2. B2C Consumer Apps

| Actor | Description | Common Permissions |
|-------|-------------|-------------------|
| 비회원 | 로그인하지 않은 방문자 | 공개 콘텐츠 조회 |
| 일반 회원 | 기본 서비스 이용자 | 기본 기능 |
| 프리미엄 회원 | 유료 구독자 | 프리미엄 기능 |
| 크리에이터 | 콘텐츠 생성자 | 콘텐츠 CRUD |

### 3. B2B SaaS

| Actor | Description | Common Permissions |
|-------|-------------|-------------------|
| 조직 관리자 | 테넌트 전체 관리 | 조직 설정, 사용자 관리 |
| 팀 관리자 | 팀 단위 관리 | 팀 설정, 팀원 관리 |
| 팀원 | 일반 사용자 | 기본 기능 |
| 외부 협력자 | 제한된 접근 게스트 | 특정 기능만 |

### 4. Marketplace

| Actor | Description | Common Permissions |
|-------|-------------|-------------------|
| 구매자 | 상품 구매 | 상품 조회, 주문, 결제 |
| 판매자 | 상품 판매 | 상품 CRUD, 주문 관리 |
| 플랫폼 관리자 | 마켓플레이스 운영 | 전체 관리 |

## Actor Definition Template

```json
{
  "id": "actor-1",
  "name": "운영 관리자",
  "description": "일상적인 비즈니스 데이터를 관리하는 담당자",
  "permissions": [
    "근로자 정보 CRUD",
    "계약 정보 CRUD",
    "리포트 조회"
  ],
  "goals": [
    "근로자 정보를 정확하게 관리",
    "계약 현황 파악",
    "월별 리포트 생성"
  ],
  "constraints": [
    "시스템 설정 변경 불가",
    "사용자 계정 관리 불가"
  ]
}
```

## Common Pitfalls

### ❌ Bad Actor Definitions

| Bad Example | Problem | Better |
|-------------|---------|--------|
| "사용자" | 너무 모호함 | "운영 관리자", "조회자" |
| "김철수" | 사람 이름, 역할 아님 | "영업 담당자" |
| "Admin" | 범위 불명확 | "시스템 관리자", "운영 관리자" |
| "User" | 모든 사람이 User | 구체적 역할로 분리 |

### ✅ Good Actor Definitions

- 역할 기반 명명
- 명확한 권한 범위
- 구체적인 목표
- 다른 Actor와 구분 가능

## Actor Hierarchy Patterns

### Pattern 1: Role-Based (역할 기반)

```
시스템 관리자
├─ 운영 관리자
│   ├─ 팀 리더
│   └─ 팀원
└─ 조회자
```

### Pattern 2: Permission-Based (권한 기반)

```
Full Access
├─ Write Access
│   └─ Read Access
└─ Limited Access
```

### Pattern 3: Workflow-Based (워크플로우 기반)

```
신청자 → 검토자 → 승인자 → 처리자
```

## Actor vs. User vs. Persona

| Concept | Focus | Example |
|---------|-------|---------|
| **Actor** | 시스템과의 상호작용 역할 | "운영 관리자" |
| **User** | 실제 시스템 사용자 | "김철수 대리" |
| **Persona** | 마케팅/UX 관점의 가상 인물 | "바쁜 30대 직장인 민수" |

User Story에서는 **Actor**를 사용.

## Questions to Define Actors

1. 이 시스템을 사용하는 사람들의 역할은?
2. 각 역할의 주요 목표는?
3. 각 역할이 접근할 수 있는 데이터/기능은?
4. 역할 간 권한 차이는?
5. 외부 시스템이나 자동화도 Actor인가?

## External Actors

사람이 아닌 Actor도 고려:

| Actor | Description |
|-------|-------------|
| 외부 API | 데이터 연동 시스템 |
| 스케줄러 | 배치 작업 실행 |
| 알림 시스템 | 이메일/SMS 발송 |
| 결제 시스템 | PG사 연동 |

## Actor Validation Checklist

- [ ] 모든 Actor가 구체적인 역할명을 가지고 있는가?
- [ ] 각 Actor의 권한 범위가 명확한가?
- [ ] Actor 간 권한 중복이 최소화되어 있는가?
- [ ] 모든 User Story가 특정 Actor에 매핑되는가?
- [ ] 외부 시스템 Actor가 필요한 경우 정의되어 있는가?

