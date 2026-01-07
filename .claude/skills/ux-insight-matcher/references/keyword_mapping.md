# Keyword Mapping Reference

Task 텍스트에서 추출한 키워드를 `usage_context` 값과 매칭하기 위한 참조 테이블.

## Domain Mapping

| Task Keywords (한글/영문) | usage_context.domain |
|--------------------------|---------------------|
| 챗봇, Chat, 대화, 메신저, AI, GPT | `ai_chat_interface`, `conversational_ui`, `messenger_app` |
| 검색, Search, 쿼리 | `search_interface` |
| 웹, Web, 랜딩, Landing | `web_application`, `landing_page`, `corporate_website` |
| 대시보드, Dashboard, 통계 | `saas_dashboard`, `admin_panel` |
| 관리자, Admin | `admin_panel` |
| 쇼핑, 상품, 카탈로그, E-commerce | `e_commerce`, `product_showcase` |
| 갤러리, Gallery, 이미지 목록 | `design_asset_gallery`, `image_gallery` |
| 폼, Form, 입력 | `form_interface`, `saas_application` |

## Primary Content Mapping

| Task Keywords | usage_context.primary_content |
|--------------|------------------------------|
| 텍스트, Text, 문자, 폰트 | `text` |
| 채팅, Chat, 메시지, 버블 | `chat_messages` |
| 이미지, Image, 사진, 썸네일 | `images` |
| 카드, Card | `cards` |
| 입력, Input, 필드, Form | `user_input`, `forms` |
| 검색, Search, 결과 | `search_results` |
| 네비게이션, Nav, 메뉴 | `navigation` |
| 업로드, Upload | `file_upload` |
| 버튼, Button, CTA | `buttons`, `cta` |

## User Decision Model Mapping

| Task Keywords | usage_context.user_decision_model |
|--------------|----------------------------------|
| 대화, 질문, 답변 | `conversation_flow`, `question_answer` |
| 스캔, 브라우징, 목록 | `information_scanning`, `visual_browsing` |
| 실행, 완료, 제출 | `task_execution` |
| 비교, 선택 | `comparison_shopping` |
| 분석 | `data_analysis` |

## Page Goal Mapping

| Task Keywords | usage_context.page_goal |
|--------------|------------------------|
| 결과, 표시, 조회 | `information_display` |
| 완료, 제출, 저장 | `task_completion`, `workflow_completion` |
| 대화, 교환 | `information_exchange` |
| 발견, 탐색, 검색 | `discovery`, `search_completion` |
| 소비, 읽기 | `content_consumption` |

## UI Focus Mapping

| Task Keywords | usage_context.ui_focus |
|--------------|----------------------|
| 가독성, 읽기 | `text_readability`, `readability` |
| 정렬, 레이아웃 | `message_alignment`, `layout_clarity` |
| 계층, 구조 | `visual_hierarchy` |
| 여백, 공백 | `whitespace_management` |
| 입력, 필드 | `input_field_clarity` |
| 접근성, 대비 | `accessibility_compliance`, `color_contrast` |

## AcceptanceCriteria Component Mapping

| Component Keywords | Likely Matching Domains |
|-------------------|------------------------|
| ChatContainer, ChatBubble | `conversational_ui`, `ai_chat_interface` |
| SearchBar, SearchInput | `search_interface` |
| Card, CardList | `information_display` |
| Form, Input, Select | `form_interface`, `task_execution` |
| Button, CTA | `task_execution` |
| Table, List | `data_display`, `admin_panel` |
| Modal, Dialog | `task_execution` |
| Upload, Dropzone | `file_upload` |
| Indicator, Progress | `feedback`, `task_execution` |
| Toast, Alert | `feedback` |

## Usage Example

Task:
```json
{
  "description": "챗봇 형태의 진단 플로우 컨테이너",
  "acceptanceCriteria": ["ChatContainer", "ChatBubble", "StepIndicator"]
}
```

1. Extract keywords: `챗봇`, `Chat`, `플로우`, `컨테이너`
2. Map to usage_context:
   - domain: `conversational_ui`, `ai_chat_interface`
   - primary_content: `chat_messages`
   - user_decision_model: `conversation_flow`
3. Find insights with matching `usage_context.applicable_when`
