#!/usr/bin/env python3
"""
Notification Scenario Generator

Transforms user stories into notification scenarios by analyzing actors,
acceptance criteria, and event patterns.
"""

import json
import re
import argparse
from typing import List, Dict, Any, Optional, Set


class NotificationGenerator:
    """Generate notification scenarios from user stories."""

    # Event type classification patterns
    EVENT_PATTERNS = {
        "state_changed": [
            r"상태.*변경",
            r"status.*chang",
            r"상태.*->",
            r"state.*->",
            r"becomes",
        ],
        "action_completed": [
            r"완료\s*(시|했|되)",
            r"완료$",
            r"completed",
            r"done",
            r"finished",
        ],
        "financial_event": [
            r"차감",
            r"환불",
            r"증가",
            r"금액",
            r"정산",
            r"출금",
            r"충전",
            r"deducted",
            r"refund",
            r"amount",
            r"payment",
            r"withdraw",
        ],
        "decision_event": [
            r"승인",
            r"거절",
            r"approved|rejected",
            r"accept|decline",
        ],
        "system_notice": [r"알림\s*발송", r"notify", r"alert"],
    }

    # Notification worthiness criteria
    NOTIFICATION_KEYWORDS = {
        "affects_asset": [
            "잔액",
            "금액",
            "Ink",
            "출금",
            "환불",
            "충전",
            "정산",
            "amount",
            "balance",
            "payment",
        ],
        "affects_status": [
            "상태",
            "변경",
            "approved",
            "rejected",
            "status",
            "published",
        ],
        "async_result": [
            "완료",
            "결과",
            "처리",
            "completed",
            "result",
            "processed",
        ],
        "requires_awareness": [
            "알림",
            "확인",
            "승인 필요",
            "notify",
            "confirm",
        ],
    }

    def __init__(self):
        self.actor_roles: Dict[str, str] = {}
        self.events: Dict[str, Dict[str, Any]] = {}

    def normalize_actor_roles(self, actors: List[Dict[str, Any]]) -> None:
        """
        Normalize actor permissions to abstract roles:
        - end_user: service consumer
        - provider: content/service creator
        - operator: admin/moderator
        """
        for actor in actors:
            actor_id = actor.get("id")
            permissions = actor.get("permissions", [])

            # Determine role based on permissions
            if any(
                keyword in " ".join(permissions).lower()
                for keyword in ["관리", "승인", "제재", "manage", "approve", "admin"]
            ):
                role = "operator"
            elif any(
                keyword in " ".join(permissions).lower()
                for keyword in ["업로드", "제공", "정산", "upload", "provide", "settle"]
            ):
                role = "provider"
            else:
                role = "end_user"

            self.actor_roles[actor_id] = role

    def extract_event_type(self, text: str) -> Optional[str]:
        """Identify event type from text using pattern matching."""
        text_lower = text.lower()

        for event_type, patterns in self.EVENT_PATTERNS.items():
            for pattern in patterns:
                if re.search(pattern, text_lower):
                    return event_type

        return None

    def is_notification_worthy(self, story: Dict[str, Any], ac_list: List[str]) -> bool:
        """
        Determine if an event warrants notification using multiple criteria.
        Returns True if any criterion is met.
        """
        combined_text = (
            f"{story.get('story', '')} {' '.join(ac_list)}".lower()
        )

        # Check against each worthiness criterion
        for criterion, keywords in self.NOTIFICATION_KEYWORDS.items():
            if any(keyword.lower() in combined_text for keyword in keywords):
                return True

        return False

    def determine_notification_target(
        self, story_actor: str, event_type: str
    ) -> List[str]:
        """
        Determine which actors should receive notification based on
        story actor and event type.
        """
        actor_role = self.actor_roles.get(story_actor, "end_user")
        targets = []

        if event_type == "action_completed":
            # User's own action completion
            if actor_role == "end_user":
                targets.append("end_user")
            elif actor_role == "provider":
                targets.append("provider")

        elif event_type == "state_changed":
            # State changes affect different roles
            if actor_role == "end_user":
                targets.append("end_user")
            elif actor_role == "provider":
                targets.append("provider")

        elif event_type == "financial_event":
            # Financial events notify the affected user
            if actor_role == "end_user":
                targets.append("end_user")
            elif actor_role == "provider":
                targets.append("provider")

        elif event_type == "decision_event":
            # Decision results notify the requestor
            # Typically end_user or provider receives decision result
            if actor_role == "end_user":
                targets.append("end_user")
            elif actor_role == "provider":
                targets.append("provider")

        elif event_type == "system_notice":
            # System notices can go to operator or affected user
            targets.append(actor_role)

        return targets if targets else [actor_role]

    def generate_event_name(
        self, story: Dict[str, Any], ac_index: int
    ) -> str:
        """
        Generate event name using pattern: entity_action
        Extract from story context and AC.
        """
        story_text = story.get("story", "")
        domain = story.get("domain", "")

        # Extract entity name from domain or story
        entity = domain.lower().replace(" ", "_") or "action"
        if "/" in entity:
            entity = entity.split("/")[0]

        # Infer action from AC
        action = "triggered"  # default

        # Simple heuristic-based action extraction
        if "완료" in story_text or "completed" in story_text:
            action = "completed"
        elif "승인" in story_text or "approved" in story_text:
            action = "approved"
        elif "거절" in story_text or "rejected" in story_text:
            action = "rejected"
        elif "생성" in story_text or "created" in story_text:
            action = "created"
        elif "변경" in story_text or "changed" in story_text:
            action = "changed"

        return f"{entity}_{action}".lower()

    def generate_template_variables(self, story: Dict[str, Any]) -> Set[str]:
        """Extract common template variables from story."""
        variables = {"entityName", "date"}

        text = f"{story.get('story', '')} {story.get('domain', '')}"

        if any(
            keyword in text.lower()
            for keyword in [
                "금액",
                "Ink",
                "amount",
                "금",
                "출금",
                "충전",
                "환불",
            ]
        ):
            variables.add("amount")

        if any(
            keyword in text.lower()
            for keyword in ["상태", "결과", "status", "result", "approved", "rejected"]
        ):
            variables.add("result")

        if any(
            keyword in text.lower()
            for keyword in ["사유", "이유", "reason", "cause"]
        ):
            variables.add("reason")

        return variables

    def extract_title_from_ac(self, ac_list: List[str]) -> str:
        """Extract a concise title from acceptance criteria."""
        if not ac_list:
            return "Event Notification"

        # Take first AC and extract key phrase
        first_ac = ac_list[0]
        # Remove "AC-N:" prefix
        title = re.sub(r"AC-\d+:\s*", "", first_ac).strip()
        # Truncate to reasonable length
        if len(title) > 60:
            title = title[:57] + "..."

        return title

    def create_notification_scenario(
        self, event_name: str, story: Dict[str, Any], target_role: str
    ) -> Dict[str, Any]:
        """Create a notification scenario object."""
        ac_list = story.get("acceptance_criteria", [])
        title = self.extract_title_from_ac(ac_list)
        variables = self.generate_template_variables(story)

        # Determine channel based on event type
        event_type = self.extract_event_type(" ".join(ac_list))
        if event_type in ["financial_event", "decision_event"]:
            channel = "email"
        elif event_type == "action_completed":
            channel = "optional"
        else:
            channel = "email"

        # Create template with variables
        template_vars = ", ".join(sorted(variables))
        template = f"{{entityName}} notification - {title} [{template_vars}]"

        return {
            "event": event_name,
            "title": title,
            "description": f"{title} for {story.get('domain', 'system')}",
            "channel": channel,
            "template": template,
        }

    def generate_scenarios(self, user_stories_data: Dict[str, Any]) -> Dict[str, Any]:
        """Generate complete notification scenarios from user stories."""
        actors = user_stories_data.get("actors", [])
        stories = user_stories_data.get("user_stories", [])

        # Step 1: Normalize actor roles
        self.normalize_actor_roles(actors)

        # Step 2: Extract and classify events
        scenarios_by_role: Dict[str, List[Dict[str, Any]]] = {
            "end_user": [],
            "provider": [],
            "operator": [],
        }

        processed_events: Set[str] = set()

        for story in stories:
            story_id = story.get("id")
            actor_id = story.get("actor_id")
            ac_list = story.get("acceptance_criteria", [])

            # Check if notification is warranted
            if not self.is_notification_worthy(story, ac_list):
                continue

            # Generate event name
            event_name = self.generate_event_name(story, 0)

            # Avoid duplicates
            if event_name in processed_events:
                continue
            processed_events.add(event_name)

            # Determine targets
            targets = self.determine_notification_target(
                actor_id, self.extract_event_type(" ".join(ac_list)) or "action_completed"
            )

            # Create scenarios for each target
            for target_role in targets:
                scenario = self.create_notification_scenario(event_name, story, target_role)
                scenarios_by_role[target_role].append(scenario)

        # Step 3: Assemble final JSON
        output = {
            "version": "1.0",
            "description": "Generic notification scenarios generated from user stories",
            "channels": ["email", "sms"],
            "scenarios": scenarios_by_role,
        }

        return output


def main():
    parser = argparse.ArgumentParser(
        description="Generate notification scenarios from user stories"
    )
    parser.add_argument(
        "--input",
        default="docs/user_stories_data.json",
        help="Input user stories JSON file",
    )
    parser.add_argument(
        "--output",
        default="docs/notification_scenarios.json",
        help="Output notification scenarios JSON file",
    )

    args = parser.parse_args()

    # Load input
    try:
        with open(args.input, "r", encoding="utf-8") as f:
            user_stories_data = json.load(f)
    except FileNotFoundError:
        print(f"❌ Input file not found: {args.input}")
        return
    except json.JSONDecodeError:
        print(f"❌ Invalid JSON in {args.input}")
        return

    # Generate scenarios
    generator = NotificationGenerator()
    output_data = generator.generate_scenarios(user_stories_data)

    # Write output
    with open(args.output, "w", encoding="utf-8") as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)

    # Summary
    total_scenarios = sum(len(scenarios) for scenarios in output_data["scenarios"].values())
    print(f"✅ Generated {total_scenarios} notification scenarios")
    print(f"   end_user: {len(output_data['scenarios']['end_user'])}")
    print(f"   provider: {len(output_data['scenarios']['provider'])}")
    print(f"   operator: {len(output_data['scenarios']['operator'])}")
    print(f"📄 Output saved to: {args.output}")


if __name__ == "__main__":
    main()
