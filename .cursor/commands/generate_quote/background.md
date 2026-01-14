# Generate Quote Background

## Overview
견적서의 배경 정보 파일을 생성합니다. 프로젝트 개요, 서비스 배경, 목표, 범위, 기술적 고려사항을 포함합니다.

## Steps
1. 클라이언트 폴더 찾기 (`YY_MM_CLIENT_NAME/`)
2. `quotes/[MM.DD]/note.md` 확인 (존재 시 최우선)
3. 필수 파일 읽기:
   - `quotes/[MM.DD]/guide.md` (필수)
   - `meeting_scripts/[MM.DD]/requirements.md` (필수)
   - `meeting_scripts/[MM.DD]/summary.md` (필수)
   - `meeting_scripts/[MM.DD]/script.md` (선택)
   - 이전 견적서 파일들
   - `appendix/requirements.md` (존재 시 필수)
4. 다음 정보 추출 및 정리:
   - 프로젝트 개요 및 핵심 가치 제안
   - 서비스 배경 및 비즈니스 Pain Point
   - 프로젝트 목표 (정량/정성)
   - 개발 범위 및 결과물
   - 기술적/기획적 고려사항
5. `quotes/[MM.DD]/background.md` 생성 (기존 파일 덮어쓰기)

## Output Format

파일은 다음 구조를 따라야 합니다:

```markdown
## 0) 개편안 정리 핵심

(최종 합의 내용을 바탕으로 기존 요구사항과 IA의 핵심 변경 사항들과 협의사항을 정리하고 개편안에 대한 계획과 주안점을 정리. 특히, 기존의 견적 범위가 협의안을 초과하는 경우 견적 범위에 맞출 수 있는 안을 계획하고 이에 맞추어 제거 요구사항을 정리합니다.)

## 1) 프로젝트 개요

(요구사항 기반 핵심 가치·범위 요약)

## 2) 서비스 배경 및 필요성

(해결하려는 비즈니스 Pain Point, 시장·운영 상의 문제, 도입 필요성)

## 3) 프로젝트 주요 목표

(시스템 구축을 통해 달성해야 하는 비즈니스 성과, 정량·정성 목표)

## 4) 개발 범위 및 결과물

(제공될 기능 범위, 산출물, 인수인계 범위, 운영 단계 포함 여부)

## 5) 유의할 기술적/기획적 포인트

(아키텍처 제약, 외부 연동 리스크, 성능 요구사항, 운영·보안 고려사항)
```

## Checklist
- [ ] note.md가 읽혔는가? (존재 시)
- [ ] guide.md가 읽혔는가?
- [ ] appendix/requirements.md가 읽혔는가? (존재 시)
- [ ] background.md가 올바른 구조로 생성되었는가?
