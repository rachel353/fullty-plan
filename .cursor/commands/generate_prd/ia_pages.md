# Generate PRD IA Pages

## Overview
견적서의 IA 트리를 확장하여 네비게이션, 페이지 책임, 연결된 시스템, 상태 변형을 설명하는 내러티브로 변환합니다.

## Steps
1. IA 계층 구조 파싱 (모듈 → 섹션 → 페이지/화면)
2. 각 노드에 대해 다음 캡처:
   - 목적 및 연결된 REQ ID
   - 진입점 및 종료 목적지
   - 지원되는 사용자 역할 및 권한
   - 연결된 데이터 모델 / 외부 시스템
   - 중요한 상태 / 변형 (빈 상태, 오류, 승인 등)
3. 여러 페이지에 걸친 교차 흐름 요약 (예: 온보딩, 승인)
4. `prd/[MM.DD]/ia_pages.md` 저장
5. `coverage_tracker.md`에서 각 IA 배치 체크

## Output Format

파일은 다음 구조를 따라야 합니다:

```markdown
## 7) IA & Navigation Model
- High-level tree (bulleted or diagram syntax)
- Role-based navigation (who sees which menu)
- Cross-system touchpoints (labeled with API / integration IDs)

## 8) Page Inventory & Flow Notes

### [Module > Page Name]
- **Purpose:** why this page exists (tie to REQ IDs)
- **Entry / Exit:** how users reach/leave the page
- **Key States:** default, empty, error, pending approval, etc.
- **Data & Integrations:** CRUD entities, external APIs, data freshness
- **Related Pages:** upstream/downstream screens with links
- **Prioritization:** Must / Should / Nice (from quote or guide)
- **Metrics / Tracking:** events, funnels, alerts

> Repeat for every page in the IA. Group by module for readability.
```

## Checklist
- [ ] 모든 IA 노드가 파싱되었는가?
- [ ] 각 페이지에 필수 정보가 포함되었는가?
- [ ] REQ ID가 연결되었는가?
- [ ] coverage_tracker.md의 IA 배치가 체크되었는가?
