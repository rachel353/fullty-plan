# 서브에이전트

> Claude Code에서 특화된 AI 서브에이전트를 생성하고 사용하여 작업별 워크플로우 및 개선된 컨텍스트 관리를 수행합니다.

Claude Code의 커스텀 서브에이전트는 특정 유형의 작업을 처리하기 위해 호출할 수 있는 특화된 AI 어시스턴트입니다. 이들은 커스터마이즈된 시스템 프롬프트, 도구 및 별도의 컨텍스트 윈도우를 제공하는 작업별 구성을 통해 더 효율적인 문제 해결을 가능하게 합니다.

## 서브에이전트란 무엇인가요?

서브에이전트는 Claude Code가 작업을 위임할 수 있는 사전 구성된 AI 성격입니다. 각 서브에이전트는:

* 특정 목적과 전문 분야를 가지고 있습니다
* 주 대화와 분리된 자체 컨텍스트 윈도우를 사용합니다
* 사용할 수 있는 특정 도구로 구성할 수 있습니다
* 동작을 안내하는 커스텀 시스템 프롬프트를 포함합니다

Claude Code가 서브에이전트의 전문 분야와 일치하는 작업을 만나면, 그 작업을 특화된 서브에이전트에 위임할 수 있으며, 서브에이전트는 독립적으로 작동하고 결과를 반환합니다.

## 주요 이점

<CardGroup cols={2}>
  <Card title="컨텍스트 보존" icon="layer-group">
    각 서브에이전트는 자체 컨텍스트에서 작동하여 주 대화의 오염을 방지하고 고수준 목표에 집중된 상태를 유지합니다.
  </Card>

  <Card title="특화된 전문성" icon="brain">
    서브에이전트는 특정 도메인에 대한 상세한 지침으로 미세 조정될 수 있으며, 지정된 작업에서 더 높은 성공률을 이끌어냅니다.
  </Card>

  <Card title="재사용성" icon="rotate">
    한 번 생성되면, 서브에이전트는 다양한 프로젝트에서 사용될 수 있으며 팀과 공유하여 일관된 워크플로우를 구현할 수 있습니다.
  </Card>

  <Card title="유연한 권한" icon="shield-check">
    각 서브에이전트는 다양한 도구 접근 수준을 가질 수 있으므로, 강력한 도구를 특정 서브에이전트 유형으로 제한할 수 있습니다.
  </Card>
</CardGroup>

## 빠른 시작

첫 번째 서브에이전트를 생성하려면:

<Steps>
  <Step title="서브에이전트 인터페이스 열기">
    다음 명령을 실행하세요:

    ```
    /agents
    ```
  </Step>

  <Step title="'Create New Agent' 선택">
    프로젝트 수준 또는 사용자 수준 서브에이전트를 생성할지 선택하세요
  </Step>

  <Step title="서브에이전트 정의">
    * **권장**: Claude로 먼저 생성한 다음 커스터마이즈하여 자신의 것으로 만드세요
    * 서브에이전트를 상세히 설명하고 언제 사용해야 하는지 명시하세요
    * 접근 권한을 부여할 도구를 선택하세요 (또는 모든 도구를 상속받으려면 비워두세요)
    * 인터페이스는 모든 사용 가능한 도구를 표시하여 선택을 쉽게 합니다
    * Claude로 생성하는 경우, `e`를 눌러 자신의 편집기에서 시스템 프롬프트를 편집할 수도 있습니다
  </Step>

  <Step title="저장 및 사용">
    서브에이전트가 이제 사용 가능합니다! Claude는 적절할 때 자동으로 사용하거나 명시적으로 호출할 수 있습니다:

    ```
    > Use the code-reviewer subagent to check my recent changes
    ```
  </Step>
</Steps>

## 서브에이전트 구성

### 파일 위치

서브에이전트는 YAML 프론트매터가 있는 마크다운 파일로 두 가지 가능한 위치에 저장됩니다:

| 유형              | 위치                  | 범위              | 우선순위 |
| :-------------- | :------------------ | :-------------- | :--- |
| **프로젝트 서브에이전트** | `.claude/agents/`   | 현재 프로젝트에서 사용 가능 | 최고   |
| **사용자 서브에이전트**  | `~/.claude/agents/` | 모든 프로젝트에서 사용 가능 | 낮음   |

서브에이전트 이름이 충돌할 때, 프로젝트 수준 서브에이전트가 사용자 수준 서브에이전트보다 우선합니다.

### 플러그인 에이전트

[플러그인](/ko/plugins)은 Claude Code와 원활하게 통합되는 커스텀 서브에이전트를 제공할 수 있습니다. 플러그인 에이전트는 사용자 정의 에이전트와 동일하게 작동하며 `/agents` 인터페이스에 나타납니다.

**플러그인 에이전트 위치**: 플러그인은 `agents/` 디렉토리에 에이전트를 포함합니다 (또는 플러그인 매니페스트에 지정된 커스텀 경로).

**플러그인 에이전트 사용**:

* 플러그인 에이전트는 `/agents`에 커스텀 에이전트와 함께 나타납니다
* 명시적으로 호출할 수 있습니다: "Use the code-reviewer agent from the security-plugin"
* Claude가 적절할 때 자동으로 호출될 수 있습니다
* `/agents` 인터페이스를 통해 관리할 수 있습니다 (보기, 검사)

플러그인 에이전트 생성에 대한 자세한 내용은 [플러그인 컴포넌트 참조](/ko/plugins-reference#agents)를 참조하세요.

### CLI 기반 구성

`--agents` CLI 플래그를 사용하여 서브에이전트를 동적으로 정의할 수도 있으며, 이는 JSON 객체를 허용합니다:

```bash  theme={null}
claude --agents '{
  "code-reviewer": {
    "description": "Expert code reviewer. Use proactively after code changes.",
    "prompt": "You are a senior code reviewer. Focus on code quality, security, and best practices.",
    "tools": ["Read", "Grep", "Glob", "Bash"],
    "model": "sonnet"
  }
}'
```

**우선순위**: CLI로 정의된 서브에이전트는 프로젝트 수준 서브에이전트보다 낮은 우선순위를 가지지만 사용자 수준 서브에이전트보다는 높은 우선순위를 가집니다.

**사용 사례**: 이 접근 방식은 다음에 유용합니다:

* 서브에이전트 구성의 빠른 테스트
* 저장할 필요가 없는 세션별 서브에이전트
* 커스텀 서브에이전트가 필요한 자동화 스크립트
* 문서 또는 스크립트에서 서브에이전트 정의 공유

JSON 형식 및 모든 사용 가능한 옵션에 대한 자세한 정보는 [CLI 참조 문서](/ko/cli-reference#agents-flag-format)를 참조하세요.

### 파일 형식

각 서브에이전트는 다음 구조의 마크다운 파일에서 정의됩니다:

```markdown  theme={null}
---
name: your-sub-agent-name
description: Description of when this subagent should be invoked
tools: tool1, tool2, tool3  # Optional - inherits all tools if omitted
model: sonnet  # Optional - specify model alias or 'inherit'
---

Your subagent's system prompt goes here. This can be multiple paragraphs
and should clearly define the subagent's role, capabilities, and approach
to solving problems.

Include specific instructions, best practices, and any constraints
the subagent should follow.
```

#### 구성 필드

| 필드            | 필수  | 설명                                                                                                                                             |
| :------------ | :-- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`        | 예   | 소문자 및 하이픈을 사용하는 고유 식별자                                                                                                                         |
| `description` | 예   | 서브에이전트의 목적에 대한 자연어 설명                                                                                                                          |
| `tools`       | 아니오 | 특정 도구의 쉼표로 구분된 목록. 생략하면 주 스레드의 모든 도구를 상속합니다                                                                                                    |
| `model`       | 아니오 | 이 서브에이전트에 사용할 모델. 모델 별칭(`sonnet`, `opus`, `haiku`) 또는 주 대화의 모델을 사용하려면 `'inherit'`일 수 있습니다. 생략하면 [구성된 서브에이전트 모델](/ko/model-config)의 기본값으로 설정됩니다 |

### 모델 선택

`model` 필드를 사용하면 서브에이전트가 사용하는 [AI 모델](/ko/model-config)을 제어할 수 있습니다:

* **모델 별칭**: 사용 가능한 별칭 중 하나를 사용하세요: `sonnet`, `opus`, 또는 `haiku`
* **`'inherit'`**: 주 대화와 동일한 모델을 사용합니다 (일관성을 원할 때 유용함)
* **생략됨**: 지정하지 않으면 서브에이전트에 대해 구성된 기본 모델을 사용합니다 (`sonnet`)

<Note>
  `'inherit'`를 사용하는 것은 서브에이전트가 주 대화의 모델 선택에 적응하도록 하려는 경우 특히 유용하며, 세션 전체에서 일관된 기능과 응답 스타일을 보장합니다.
</Note>

### 사용 가능한 도구

서브에이전트는 Claude Code의 내부 도구에 접근할 수 있습니다. 사용 가능한 도구의 전체 목록은 [도구 문서](/ko/settings#tools-available-to-claude)를 참조하세요.

<Tip>
  **권장**: `/agents` 명령을 사용하여 도구 접근을 수정하세요 - 이는 모든 사용 가능한 도구 (연결된 MCP 서버 도구 포함)를 나열하는 대화형 인터페이스를 제공하여 필요한 도구를 더 쉽게 선택할 수 있습니다.
</Tip>

도구 구성을 위한 두 가지 옵션이 있습니다:

* **`tools` 필드 생략** - 주 스레드의 모든 도구를 상속합니다 (기본값), MCP 도구 포함
* **개별 도구 지정** - 더 세밀한 제어를 위해 쉼표로 구분된 목록으로 지정합니다 (수동으로 또는 `/agents`를 통해 편집 가능)

**MCP 도구**: 서브에이전트는 구성된 MCP 서버의 MCP 도구에 접근할 수 있습니다. `tools` 필드를 생략하면, 서브에이전트는 주 스레드에서 사용 가능한 모든 MCP 도구를 상속합니다.

## 서브에이전트 관리

### /agents 명령 사용 (권장)

`/agents` 명령은 서브에이전트 관리를 위한 포괄적인 인터페이스를 제공합니다:

```
/agents
```

이는 다음을 수행할 수 있는 대화형 메뉴를 엽니다:

* 모든 사용 가능한 서브에이전트 보기 (내장, 사용자, 프로젝트)
* 안내된 설정으로 새 서브에이전트 생성
* 도구 접근을 포함한 기존 커스텀 서브에이전트 편집
* 커스텀 서브에이전트 삭제
* 중복이 존재할 때 활성 서브에이전트 확인
* **완전한 사용 가능한 도구 목록으로 도구 권한 쉽게 관리**

### 직접 파일 관리

서브에이전트 파일로 직접 작업하여 서브에이전트를 관리할 수도 있습니다:

```bash  theme={null}
# 프로젝트 서브에이전트 생성
mkdir -p .claude/agents
echo '---
name: test-runner
description: Use proactively to run tests and fix failures
---

You are a test automation expert. When you see code changes, proactively run the appropriate tests. If tests fail, analyze the failures and fix them while preserving the original test intent.' > .claude/agents/test-runner.md

# 사용자 서브에이전트 생성
mkdir -p ~/.claude/agents
# ... 서브에이전트 파일 생성
```

## 서브에이전트 효과적으로 사용하기

### 자동 위임

Claude Code는 다음을 기반으로 작업을 사전에 위임합니다:

* 요청의 작업 설명
* 서브에이전트 구성의 `description` 필드
* 현재 컨텍스트 및 사용 가능한 도구

<Tip>
  더 많은 사전 서브에이전트 사용을 권장하려면, `description` 필드에 "use PROACTIVELY" 또는 "MUST BE USED"와 같은 구문을 포함하세요.
</Tip>

### 명시적 호출

명령에서 언급하여 특정 서브에이전트를 요청하세요:

```
> Use the test-runner subagent to fix failing tests
> Have the code-reviewer subagent look at my recent changes
> Ask the debugger subagent to investigate this error
```

## 내장 서브에이전트

Claude Code는 기본적으로 사용 가능한 내장 서브에이전트를 포함합니다:

### Plan 서브에이전트

Plan 서브에이전트는 플랜 모드 중에 사용하도록 설계된 특화된 내장 에이전트입니다. Claude가 플랜 모드 (비실행 모드)에서 작동할 때, 플랜을 제시하기 전에 코드베이스에 대한 정보를 조사하고 수집하기 위해 Plan 서브에이전트를 사용합니다.

**주요 특성:**

* **모델**: 더 강력한 분석을 위해 Sonnet을 사용합니다
* **도구**: 코드베이스 탐색을 위해 Read, Glob, Grep, Bash 도구에 접근할 수 있습니다
* **목적**: 파일을 검색하고, 코드 구조를 분석하며, 컨텍스트를 수집합니다
* **자동 호출**: Claude는 플랜 모드에 있고 코드베이스를 조사해야 할 때 자동으로 이 에이전트를 사용합니다

**작동 방식:**
플랜 모드에 있고 Claude가 플랜을 생성하기 위해 코드베이스를 이해해야 할 때, 조사 작업을 Plan 서브에이전트에 위임합니다. 이는 에이전트의 무한 중첩을 방지합니다 (서브에이전트는 다른 서브에이전트를 생성할 수 없음) 동시에 Claude가 필요한 컨텍스트를 수집할 수 있도록 합니다.

**예시 시나리오:**

```
User: [In plan mode] Help me refactor the authentication module

Claude: Let me research your authentication implementation first...
[Internally invokes Plan subagent to explore auth-related files]
[Plan subagent searches codebase and returns findings]
Claude: Based on my research, here's my proposed plan...
```

<Tip>
  Plan 서브에이전트는 플랜 모드에서만 사용됩니다. 일반 실행 모드에서 Claude는 범용 에이전트 또는 생성한 다른 커스텀 서브에이전트를 사용합니다.
</Tip>

## 예시 서브에이전트

### 코드 리뷰어

```markdown  theme={null}
---
name: code-reviewer
description: Expert code review specialist. Proactively reviews code for quality, security, and maintainability. Use immediately after writing or modifying code.
tools: Read, Grep, Glob, Bash
model: inherit
---

You are a senior code reviewer ensuring high standards of code quality and security.

When invoked:
1. Run git diff to see recent changes
2. Focus on modified files
3. Begin review immediately

Review checklist:
- Code is simple and readable
- Functions and variables are well-named
- No duplicated code
- Proper error handling
- No exposed secrets or API keys
- Input validation implemented
- Good test coverage
- Performance considerations addressed

Provide feedback organized by priority:
- Critical issues (must fix)
- Warnings (should fix)
- Suggestions (consider improving)

Include specific examples of how to fix issues.
```

### 디버거

```markdown  theme={null}
---
name: debugger
description: Debugging specialist for errors, test failures, and unexpected behavior. Use proactively when encountering any issues.
tools: Read, Edit, Bash, Grep, Glob
---

You are an expert debugger specializing in root cause analysis.

When invoked:
1. Capture error message and stack trace
2. Identify reproduction steps
3. Isolate the failure location
4. Implement minimal fix
5. Verify solution works

Debugging process:
- Analyze error messages and logs
- Check recent code changes
- Form and test hypotheses
- Add strategic debug logging
- Inspect variable states

For each issue, provide:
- Root cause explanation
- Evidence supporting the diagnosis
- Specific code fix
- Testing approach
- Prevention recommendations

Focus on fixing the underlying issue, not just symptoms.
```

### 데이터 과학자

```markdown  theme={null}
---
name: data-scientist
description: Data analysis expert for SQL queries, BigQuery operations, and data insights. Use proactively for data analysis tasks and queries.
tools: Bash, Read, Write
model: sonnet
---

You are a data scientist specializing in SQL and BigQuery analysis.

When invoked:
1. Understand the data analysis requirement
2. Write efficient SQL queries
3. Use BigQuery command line tools (bq) when appropriate
4. Analyze and summarize results
5. Present findings clearly

Key practices:
- Write optimized SQL queries with proper filters
- Use appropriate aggregations and joins
- Include comments explaining complex logic
- Format results for readability
- Provide data-driven recommendations

For each analysis:
- Explain the query approach
- Document any assumptions
- Highlight key findings
- Suggest next steps based on data

Always ensure queries are efficient and cost-effective.
```

## 모범 사례

* **Claude 생성 에이전트로 시작**: 초기 서브에이전트를 Claude로 생성한 다음 반복하여 개인적으로 만드는 것을 강력히 권장합니다. 이 접근 방식은 최고의 결과를 제공합니다 - 특정 요구에 맞게 커스터마이즈할 수 있는 견고한 기초입니다.

* **집중된 서브에이전트 설계**: 하나의 서브에이전트로 모든 것을 하려고 하기보다는 단일하고 명확한 책임을 가진 서브에이전트를 생성하세요. 이는 성능을 개선하고 서브에이전트를 더 예측 가능하게 만듭니다.

* **상세한 프롬프트 작성**: 시스템 프롬프트에 특정 지침, 예시 및 제약을 포함하세요. 더 많은 지침을 제공할수록 서브에이전트의 성능이 더 좋아집니다.

* **도구 접근 제한**: 서브에이전트의 목적에 필요한 도구만 부여하세요. 이는 보안을 개선하고 서브에이전트가 관련 작업에 집중하도록 도와줍니다.

* **버전 제어**: 프로젝트 서브에이전트를 버전 제어에 체크인하여 팀이 협력적으로 이점을 얻고 개선할 수 있도록 하세요.

## 고급 사용

### 서브에이전트 체이닝

복잡한 워크플로우의 경우, 여러 서브에이전트를 체인할 수 있습니다:

```
> First use the code-analyzer subagent to find performance issues, then use the optimizer subagent to fix them
```

### 동적 서브에이전트 선택

Claude Code는 컨텍스트를 기반으로 지능적으로 서브에이전트를 선택합니다. 최고의 결과를 위해 `description` 필드를 구체적이고 행동 지향적으로 만드세요.

### 재개 가능한 서브에이전트

서브에이전트는 이전 대화를 계속하기 위해 재개될 수 있으며, 이는 여러 호출에 걸쳐 계속되어야 하는 장기 실행 연구 또는 분석 작업에 특히 유용합니다.

**작동 방식:**

* 각 서브에이전트 실행에는 고유한 `agentId`가 할당됩니다
* 에이전트의 대화는 별도의 트랜스크립트 파일에 저장됩니다: `agent-{agentId}.jsonl`
* `resume` 매개변수를 통해 `agentId`를 제공하여 이전 에이전트를 재개할 수 있습니다
* 재개될 때, 에이전트는 이전 대화의 전체 컨텍스트로 계속됩니다

**예시 워크플로우:**

초기 호출:

```
> Use the code-analyzer agent to start reviewing the authentication module

[Agent completes initial analysis and returns agentId: "abc123"]
```

에이전트 재개:

```
> Resume agent abc123 and now analyze the authorization logic as well

[Agent continues with full context from previous conversation]
```

**사용 사례:**

* **장기 실행 연구**: 큰 코드베이스 분석을 여러 세션으로 나누기
* **반복적 개선**: 컨텍스트를 잃지 않고 서브에이전트의 작업을 계속 개선하기
* **다단계 워크플로우**: 서브에이전트가 컨텍스트를 유지하면서 순차적으로 관련 작업을 수행하도록 하기

**기술 세부사항:**

* 에이전트 트랜스크립트는 프로젝트 디렉토리에 저장됩니다
* 메시지 중복을 피하기 위해 재개 중에 기록이 비활성화됩니다
* 동기 및 비동기 에이전트 모두 재개될 수 있습니다
* `resume` 매개변수는 이전 실행의 에이전트 ID를 허용합니다

**프로그래밍 방식 사용:**

Agent SDK를 사용하거나 AgentTool과 직접 상호작용하는 경우, `resume` 매개변수를 전달할 수 있습니다:

```typescript  theme={null}
{
  "description": "Continue analysis",
  "prompt": "Now examine the error handling patterns",
  "subagent_type": "code-analyzer",
  "resume": "abc123"  // Agent ID from previous execution
}
```

<Tip>
  나중에 재개하고 싶을 수 있는 작업의 에이전트 ID를 추적하세요. Claude Code는 서브에이전트가 작업을 완료할 때 에이전트 ID를 표시합니다.
</Tip>

## 성능 고려사항

* **컨텍스트 효율성**: 에이전트는 주 컨텍스트를 보존하는 데 도움이 되어 더 긴 전체 세션을 가능하게 합니다
* **지연**: 서브에이전트는 호출될 때마다 깨끗한 상태로 시작하며 효과적으로 작업을 수행하기 위해 필요한 컨텍스트를 수집할 때 지연을 추가할 수 있습니다.

## 관련 문서

* [플러그인](/ko/plugins) - 플러그인을 통해 Claude Code를 커스텀 에이전트로 확장하기
* [슬래시 명령](/ko/slash-commands) - 다른 내장 명령에 대해 알아보기
* [설정](/ko/settings) - Claude Code 동작 구성하기
* [훅](/ko/hooks) - 이벤트 핸들러로 워크플로우 자동화하기


---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://code.claude.com/docs/llms.txt