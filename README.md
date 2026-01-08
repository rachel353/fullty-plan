# FLOW????

1. **get seed_docs from Sales process**
2. **execute planning-workflow @.claude/scripts/workflow**
    
    ```markdown
    execute workflow. @.claude/scripts/workflow/workflow.json with @seed_docs folder.
    don't bother me untill you finish.
    ```
    
    **Phase 1: User Story 생성**
    
    - Skill: `user-story`
    - 입력: `seed-docs/*.md`
    - 출력: `docs/user_stories.md`, `docs/user_stories_data.json`
    - 검증: User Story 3개 이상 ("As a" 패턴)
    
    **Phase 2: Conceptual Model 설계**
    
    - Skill: `conceptual-model`
    - 입력: `docs/user_stories.md`
    - 출력: `docs/conceptual_model.md`, `docs/conceptual_model.json`
    - 검증: Entity 3개 이상
    
    **Phase 3: IA Structure 설계**
    
    - Skill: `ia-structure`
    - 입력: `docs/user_stories.md`, `docs/conceptual_model.md`
    - 출력: `docs/ia_structure.md`, `docs/file_structure.md`
    - 검증: Page/Screen 3개 이상
    
    **Phase 4: Logical Architecture 설계**
    
    - Skill: `logical-architecture`
    - 입력: `docs/user_stories.md`, `docs/conceptual_model.md`, `docs/ia_structure.md`
    - 출력: `docs/logical_architecture.md`
    - 검증: Component 3개 이상
    
    **Phase 5: Dev Plan 수립**
    
    - Skill: `dev-planner`
    - 입력: `docs/ia_structure.md`, `docs/logical_architecture.md`
    - 출력: `docs/dev_plan.md`, `tasks/tasks.json`
    - 검증: Task 5개 이상
3. **edit-planning (HITL)**
    - Skill: `change-doc`
    - 입력: *user message*
    - 출력: 수정된 문서 목록
    - 검증: X
4. **install tweakcn (HITL)**
    
    적절한 tweakcn design 찾아서 설치 
    
5. **디자인 확인 위한 첫 번째 페이지 개발** 
    - Skill: `feature-spec`, `frontend-design`
    - 입력: user message
        
        **DESIGN REQUIREMENTS, DESIGN NOTES는 사용자가 프로젝트에 맞춰서 넣어줘야 함* 
        
        ```markdown
        디자인 검증 화면이 포함된 feature를 우선적으로 개발하고, 로컬 서버를 띄워서 확인시켜줘 
        dependencies 고려해서, 그 feature를 개발해기 위해 필요한 다른 feature들을 선행해서 개발해 
        
        **RULES**
        1. Development is driven strictly by:
           * `@tasks.json`
        2. Execute development **feature by feature**.
           * Tasks must be processed in their defined order and dependencies.
        3. **When starting a new feature**:
           * You MUST run the `/feature-spec` skill first.
           * Do not start any task until the feature plan is generated or updated.
        4. **For each task** within a feature:
           * You MUST use the `/frontend-design` skill.
           * Do not implement tasks without this skill.
        5. Do not skip steps.
           * `feature-spec` → then `frontend-design` per task.
           * No direct coding outside this flow.
           
        **DESIGN REQUIREMENTS**
        * Follow existing design style in /jyageunfriends folder
        * Implement the homepage **component by component**
        * Design should be **minimal, simple, and reactive**
        * Use **monochrome colors only** (no accent colors)
        * Assume real images will be colorful →
          for now, **replace all images with neutral gray boxes**
        * Focus on **layout, hierarchy, spacing, and interaction**, not visuals
        * Follow global.css strictly consistency of design. 
        
        **DESIGN NOTES**
        * Keep styling clean and restrained
        * Avoid decorative elements. 
        * Optimize for later image/content replacement
        
        ```
        
6. **create [CLAUDE-FE-DEV.md](http://CLAUDE-FE-DEV.md) & [CLAUDE.md](http://CLAUDE.md)** 
    
    ```markdown
    너가 방금 task 진행하면서, explore project structure, explore types and services 과정을 거쳤는데, 그 결과를 CLAUDE-FE-DEV.md 파일에 넣어서 추후 그 작업을 되풀이하지 않도록 하고 싶어. 
    또한, 개발 시 공통적으로 적용되어야 하는 following requirements 및 notes도 넣어서 디자인 일관성을 유지하고 싶어. 
    context 를 많이 잡아먹는 것을 원하지 않기 때문에, 최대한 concise한 file을 만들어주면 좋겠어. 
    
    **Requirements**
    
    * Follow existing design style in /jyageunfriends folder
    * Implement the homepage **component by component**
    * Design should be **minimal, simple, and reactive**
    * Use **monochrome colors only** (no accent colors)
    * Assume real images will be colorful →
      for now, **replace all images with neutral gray boxes**
    * Focus on **layout, hierarchy, spacing, and interaction**, not visuals
    * Follow global.css strictly consistency of design. 
    
    **Notes**
    
    * Keep styling clean and restrained
    * Avoid decorative elements. 
    * Optimize for later image/content replacement
    ```
    
    ```markdown
    CLAUDE.md에서 개발/코드 작업 요청 시에만!!  
    @CLAUDE-FE-DEV.md 참고하도록 해줘 
    CLAUDE.md 컨택스트를 더 줄이고자 함
    ```
    
    - [CLAUDE.md](http://CLAUDE.md) 예시
        
        ```markdown
        # CLAUDE.md
        
        This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
        
        ## Project: 쟈근친구들 V2 (Jyageunfriends)
        
        웹툰/스토리 플랫폼 프론트엔드 (Next.js 14 + React 19 + TypeScript)
        
        ## References
        
        **코드 작성/개발 요청 시** → `@jyageunfriends/CLAUDE-FE-DEV.md` 참고
        
        **docs 폴더 참고:** 프로젝트 관련 문서는 `@docs` 폴더에서 확인하세요.
        
        **Task 목록 확인** → `@tasks/tasks.json` 참고
        
        ```
        
7. **디자인 검수용 페이지 피드백 (HITL)**
    
    **Phase 1: 변경 요구사항 분석** 
    
    - Skill: `change-analyzer`
    - 입력: *user message*
    - 출력: `docs/changes/YYYY-MM-DD-HHmm.md` `tasks/changes/YYYY-MM-DD-HHmm.json`
    - 검증: 파일 존재 확인
    
    **Phase 2: 기존 문서 업데이트** 
    
    - Skill: `change-doc`
    - 입력: *user message*
    - 출력: 수정된 문서 목록
    - 검증: X
    
    **Phase 3: [CLAUDE-FE-DEV.md](http://CLAUDE-FE-DEV.md) Design requirements/notes 수정?????** 
    
8. tasks.json 파일 feature 단위 개발
    **Phase 1: feature spec 분석** 
    
    - Skill: `feature-spec`
    - 입력: 아래 프롬프트 
    - 출력: `docs/features/FXX_기능명_plan.md` 
    - 검증: 파일 존재 확인
    
    **Phase 2: 기존 문서 업데이트** 
    
    - Skill: `frontend-design`
    - 입력: 아래 프롬프트 
    - 출력: 코드
    - 검증: 
    
    ```
   develop {feature name} feature in @tasks/tasks.json  

   ## Frontend Development Execution Rules (Mandatory)

   1. **Before starting anything**, read and follow:
      * `@CLAUDE-FE-DEV.md`

   2. Development is driven strictly by:
      * `@tasks.json`

   3. Execute development **feature by feature**.
      * Tasks must be processed in their defined order and dependencies.

   4. **When starting a new feature**:
      * You MUST run the `/feature-spec` skill first.
      * Do not start any task until the feature plan is generated or updated.

   5. **For each task** within a feature:
      * You MUST use the `/frontend-design` skill.
      * Do not implement tasks without this skill.

   6. Do not skip steps.
      * `feature-spec` → then `frontend-design` per task.
      * No direct coding outside this flow.

   7. **Any UI or page you build MUST be accessible via a route**:
      * When creating screens, pages, or major UI components, you MUST connect them to a router path.
      * The UI should be directly viewable in the browser without manual mounting.
      * Use temporary or feature-scoped routes if the final route is not yet defined.
      * Purpose: allow human review and visual verification before proceeding.
    ```

9. **Feedback Loop** 
    1. **replan HITL (고객 Confirm)**
        
        **Phase 1: 변경 요구사항 분석** 
        
        - Skill: `change-analyzer`
        - 입력: *user message*
        - 출력: `docs/changes/YYYY-MM-DD-HHmm.md` `tasks/changes/YYYY-MM-DD-HHmm.json`
        - 검증: 파일 존재 확인
        
        **Phase 2: 기존 문서 업데이트** 
        
        - Skill: `change-doc`
        - 입력: *user message*
        - 출력: 수정된 문서 목록
        - 검증: X
      
   2. **develop again**
         
         **Phase 1: feature spec 분석** 
         
         - Skill: `feature-spec`
         - 입력: 아래 프롬프트 
         - 출력: `docs/features/FXX_기능명_plan.md` 
         - 검증: 파일 존재 확인
         
         **Phase 2: 기존 문서 업데이트** 
         
         - Skill: `frontend-design`
         - 입력: 아래 프롬프트 
         - 출력: 코드
         - 검증: 
