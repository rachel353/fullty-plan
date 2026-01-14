# Fetch Company Info

## Overview
회사 폴더 내의 대화 내역(quotes, meeting_scripts)을 분석하여 찾으려는 회사의 비즈니스 프로필을 요약하고, Perplexity API를 사용하여 매출, 연혁, 주요 사업 등 구체적인 정보를 수집하여 `company_info.md`를 생성합니다.

## Steps
1. **분석 및 프로필 추론**: 클라이언트 폴더(`YY_MM_CLIENT_NAME/`) 내의 `quotes/`, `meeting_scripts/` 등을 읽어 외주 개발 맥락을 제외한 순수 비즈니스 분석을 수행합니다.
2. **대상 회사 확정 검색**: 추론한 키워드를 바탕으로 웹 검색을 진행하여 실제 대상 회사를 확정합니다.
3. **Perplexity 기반 정보 수집**: 
   - `python3 .cursor/scripts/perplexity_search.py "[회사명] 회사 개요 매출 연혁 직원 수 주소"`
   - `python3 .cursor/scripts/perplexity_search.py "[회사명] 주요 사업 분야 및 서비스 상세 정보"`
4. **`company_info.md` 생성**: 수집된 정보를 바탕으로 지정된 포맷에 맞춰 파일을 생성합니다.
5. (변경사항이 생긴 경우) `git status` 확인 → `git add` → `git commit -m "docs: add company info for [회사명]"`

## Output Format
```markdown
# [회사명] 회사 정보

_Last updated: YYYY-MM-DD_

## 회사 개요
- 회사명: [공식 법인명 또는 서비스명]
- 업종/사업 분야: [업종]
- 대표자: [대표자명]
- 설립일: [YYYY-MM-DD]

## 비즈니스 프로필 (추론 기반)
- 주요 서비스: [서비스 명칭 및 핵심 기능]
- 타겟 고객: [주요 고객층]
- 비즈니스 모델: [수익 구조 또는 서비스 형태]

## 매출 및 규모
- 최근 매출: [매출 정보]
- 직원 수: [인원 정보]
- 본사 위치: [상세 주소]

## 회사 연혁
- [YYYY.MM] [주요 사건]
- [YYYY.MM] [주요 사건]

## 주요 사업 및 서비스
- **[서비스/사업명 1]**: [상세 설명]
- **[서비스/사업명 2]**: [상세 설명]

## 정보 출처
- 웹사이트: [URL]
- 검색 전략 및 키워드:
  - 프로필 추론 키워드: [키워드 1, 키워드 2...]
  - Perplexity 쿼리: [사용된 쿼리]
- 참고: [유사 회사 정보를 사용한 경우 해당 사유 명시]
```

## Checklist
- [ ] 외주 개발 맥락을 제외한 순수 비즈니스 프로필을 작성했는가?
- [ ] 추론된 키워드로 대상 회사를 특정하기 위한 검색을 수행했는가?
- [ ] Perplexity API를 통해 구체적인 수치(매출, 인원 등)를 조회했는가?
- [ ] `company_info.md`를 지정된 포맷에 맞춰 생성했는가?
- [ ] (변경사항이 생긴 경우) 커밋까지 완료했는가?

