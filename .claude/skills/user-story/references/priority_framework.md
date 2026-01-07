# User Story Priority Framework

## Priority Levels

| Priority | Label | Meaning | Examples |
|----------|-------|---------|----------|
| **P1** | Must Have | Core functionality, MVP 필수 | 로그인, 데이터 조회, 핵심 CRUD |
| **P2** | Should Have | 중요하지만 MVP 이후 가능 | 고급 필터, 엑셀 다운로드, 알림 |
| **P3** | Nice to Have | 편의 기능, 추후 개선 | 다크모드, 즐겨찾기, 커스텀 대시보드 |

## Decision Framework

### Primary Decision Tree

```
이 기능 없이 시스템이 작동할 수 있는가?
├─ 아니오 → P1 (Must Have)
│   예: 로그인, 핵심 데이터 CRUD, 필수 비즈니스 로직
│
└─ 예
   └─ 이 기능 없으면 사용자 워크플로우가 심각하게 방해받는가?
      ├─ 예 → P2 (Should Have)
      │   예: 검색/필터, 알림, 권한 관리
      │
      └─ 아니오 → P3 (Nice to Have)
          예: UI 커스터마이징, 고급 리포트, 편의 기능
```

### Secondary Criteria

P1/P2 경계가 모호할 때:

| Criteria | P1 | P2 |
|----------|----|----|
| 법적/규제 요구사항 | ✅ | |
| 데이터 무결성 | ✅ | |
| 보안 필수 기능 | ✅ | |
| 핵심 비즈니스 로직 | ✅ | |
| 사용자 편의 | | ✅ |
| 성능 최적화 | | ✅ |
| 리포팅/분석 | | ✅ |

## Domain-Specific Patterns

### 1. Admin/Back-office Systems

```
P1 (Must Have):
├─ 로그인/인증
├─ 핵심 데이터 CRUD (생성, 조회, 수정, 삭제)
├─ 기본 권한 분리 (관리자 vs 일반)
└─ 필수 비즈니스 검증

P2 (Should Have):
├─ 검색/필터
├─ 대량 작업 (일괄 수정, 일괄 삭제)
├─ 엑셀 다운로드
├─ 상세 권한 관리
└─ 알림 (이메일, 푸시)

P3 (Nice to Have):
├─ 대시보드 커스터마이징
├─ 고급 리포트
├─ 감사 로그 상세
├─ 다크모드
└─ 즐겨찾기/북마크
```

### 2. B2C Consumer Apps

```
P1 (Must Have):
├─ 회원가입/로그인
├─ 핵심 서비스 이용
├─ 결제 (유료 서비스인 경우)
└─ 기본 프로필 관리

P2 (Should Have):
├─ 소셜 로그인
├─ 푸시 알림
├─ 히스토리/이력 조회
├─ 검색
└─ 공유 기능

P3 (Nice to Have):
├─ 개인화 추천
├─ 위시리스트/즐겨찾기
├─ 리뷰/평점
├─ 소셜 기능
└─ 게이미피케이션
```

### 3. B2B SaaS

```
P1 (Must Have):
├─ 테넌트/조직 관리
├─ 사용자 초대/권한
├─ 핵심 기능 CRUD
├─ 기본 리포트
└─ 데이터 보안

P2 (Should Have):
├─ API 연동
├─ 고급 권한 (역할 기반)
├─ 감사 로그
├─ 데이터 내보내기
└─ 알림 설정

P3 (Nice to Have):
├─ 화이트라벨링
├─ 커스텀 필드
├─ 고급 분석
├─ 자동화 워크플로우
└─ 외부 서비스 연동
```

### 4. E-commerce/Marketplace

```
P1 (Must Have):
├─ 상품 조회/검색
├─ 장바구니
├─ 결제
├─ 주문 관리
└─ 회원 관리

P2 (Should Have):
├─ 리뷰/평점
├─ 위시리스트
├─ 쿠폰/할인
├─ 배송 추적
└─ 고객 문의

P3 (Nice to Have):
├─ 추천 시스템
├─ 소셜 공유
├─ 포인트/적립
├─ 정기 구독
└─ 라이브 커머스
```

## Priority Distribution Guidelines

### Healthy Distribution

```
P1: 20-30% (핵심만)
P2: 40-50% (중요 기능)
P3: 20-30% (편의 기능)
```

### Warning Signs

| Sign | Problem | Solution |
|------|---------|----------|
| P1 > 50% | 모든 것이 필수 | 강제 순위 매기기 |
| P1 < 10% | MVP 범위 불명확 | 핵심 기능 재검토 |
| P3 = 0% | 범위 과대 | 편의 기능 식별 |
| 모두 같은 우선순위 | 우선순위 무의미 | 재평가 필요 |

## Force Ranking

모든 것이 P1처럼 보일 때:

1. **MoSCoW 재적용**: Must / Should / Could / Won't
2. **100달러 테스트**: 100달러를 기능에 배분한다면?
3. **출시 지연 테스트**: 이 기능 없이 출시할 수 있는가?
4. **사용자 영향도**: 몇 %의 사용자가 영향받는가?

## MVP Scope Validation

P1 스토리들만으로:

- [ ] 사용자가 핵심 목표를 달성할 수 있는가?
- [ ] 시스템이 의미 있는 가치를 제공하는가?
- [ ] 비즈니스 핵심 요구사항이 충족되는가?
- [ ] 법적/규제 요구사항이 충족되는가?

모두 "예"라면 MVP 범위가 적절함.

