# Find Similar Portfolio

## Overview
현재 프로젝트의 요구사항과 유사한 과거 포트폴리오 사례를 `portfolio/` 디렉토리 내에서 검색하고, 클라이언트 제안용 분석 리포트를 `portfolio_research/` 폴더에 생성합니다.

## Steps
1. `portfolio/` 폴더 내의 하위 디렉토리들을 대상으로 시맨틱 검색 및 그렙(grep)을 수행합니다.
   - 대상 폴더: `portfolio/portfolio_latest/`, `portfolio/portfolio_past/`, `portfolio/portfolio_tirrilee/`
2. 검색된 포트폴리오 중 유사도가 가장 높은 핵심 프로젝트 **2~3개**를 선정합니다.
3. 클라이언트에게 직접 설명하고 설득할 수 있도록 각 포트폴리오의 연관성을 **최대한 구체적이고 상세하게** 분석합니다.
   - **프로젝트명**
   - **핵심 기능 및 기술 상세**: 해당 프로젝트가 해결한 핵심 문제와 적용된 구체적인 기술 스택/로직
   - **현재 프로젝트와의 유사 포인트**: 비즈니스 모델, 데이터 흐름, 운영 환경, 기술적 난이도 등 구체적인 공통점을 짚어 설명
4. 분석된 내용을 바탕으로 `portfolio_research/` 폴더 내에 `[CLIENT_NAME]_portfolio_research.md` 파일을 생성합니다.
   - 해당 폴더가 없는 경우 먼저 생성합니다.
5. `git status` 확인 → `git add` → `git commit`을 수행하여 생성된 리포트를 저장합니다.

## Checklist
- [ ] `portfolio/` 내 모든 하위 폴더(`latest`, `past`, `tirrilee`)가 검색 대상에 포함되었는가?
- [ ] 선정된 포트폴리오가 2~3개 이내로 집중되었는가?
- [ ] `portfolio_research/` 폴더 내에 분석 리포트(.md)가 정상적으로 생성되었는가?
- [ ] 클라이언트에게 제안하기에 충분할 만큼 유사 포인트가 **구체적이고 설득력 있게** 작성되었는가?
- [ ] 커밋까지 완료했는가?
