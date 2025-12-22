## Build FE Command

## Overview
`build_fe`는 **기획/견적 문서 → FE 문서 + 코드**를 9단계로 만들어가는 워크플로우 커맨드 모음입니다. (Step 4/8은 반복 루프)

## Steps
1. `Build FE for {CLIENT_NAME}` 실행 (기본: 최신 quotes 자동 탐색)
2. 각 Step 완료 시 **Human 승인** 후 다음 Step 진행
3. 필요 시 독립 Step 실행
   - Step 4: Logical Architecture 반복 루프
   - Step 8: 기능(Feature) 단위 반복 개발 루프

## Checklist (선택)
- [ ] Step 산출물 경로가 `docs/`로 일관적인가?
- [ ] Step 4/8 반복 루프가 “적절성 판단/기능 남음” 분기로 동작하는가?
- [ ] 커맨드 문서는 “실행 가이드”만 포함하고, 불필요한 장문 설명이 없는가?
