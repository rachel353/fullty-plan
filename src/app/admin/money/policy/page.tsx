"use client";

import { useState } from "react";
import { Pencil, X, Check, Plus } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type RewardType = "정액" | "정률";

type Rule = {
  id: string;
  trigger: string;
  desc: string;
  type: RewardType;
  amount: number;        // 정액: 원, 정률: %
  cap: number | null;    // 정률일 때 최대 적립 한도 (원), null = 무제한
  expireDays: number;    // 유효기간 (일)
  enabled: boolean;
};

const INITIAL_RULES: Rule[] = [
  {
    id: "r01",
    trigger: "회원가입",
    desc: "신규 가입 시 즉시 지급",
    type: "정액",
    amount: 5000,
    cap: null,
    expireDays: 90,
    enabled: true,
  },
  {
    id: "r02",
    trigger: "첫 구매 완료",
    desc: "첫 구매 확정 시 1회 지급",
    type: "정액",
    amount: 10000,
    cap: null,
    expireDays: 180,
    enabled: true,
  },
  {
    id: "r03",
    trigger: "구매 확정",
    desc: "매 구매 확정마다 결제금액 기준 적립",
    type: "정률",
    amount: 1,
    cap: 50000,
    expireDays: 365,
    enabled: true,
  },
  {
    id: "r04",
    trigger: "렌탈 시작",
    desc: "렌탈 계약 체결 시 지급",
    type: "정액",
    amount: 3000,
    cap: null,
    expireDays: 180,
    enabled: true,
  },
  {
    id: "r05",
    trigger: "리뷰 작성",
    desc: "구매 확정 후 리뷰 등록 시 지급",
    type: "정액",
    amount: 1000,
    cap: null,
    expireDays: 90,
    enabled: true,
  },
  {
    id: "r06",
    trigger: "GET 요청 등록",
    desc: "GET 요청 최초 등록 시 지급",
    type: "정액",
    amount: 500,
    cap: null,
    expireDays: 90,
    enabled: false,
  },
  {
    id: "r07",
    trigger: "SELL 완료",
    desc: "SELL 거래 최종 완료 시 지급",
    type: "정률",
    amount: 0.5,
    cap: 30000,
    expireDays: 365,
    enabled: false,
  },
  {
    id: "r08",
    trigger: "친구 초대",
    desc: "초대한 친구가 첫 구매 완료 시 지급",
    type: "정액",
    amount: 8000,
    cap: null,
    expireDays: 180,
    enabled: false,
  },
];

function formatAmount(rule: Rule) {
  if (rule.type === "정액") return `${rule.amount.toLocaleString()}원`;
  return `${rule.amount}%${rule.cap ? ` (최대 ${rule.cap.toLocaleString()}원)` : ""}`;
}

type EditDraft = Omit<Rule, "id">;

function EditModal({
  rule,
  onSave,
  onClose,
}: {
  rule: Rule;
  onSave: (draft: EditDraft) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<EditDraft>({
    trigger: rule.trigger,
    desc: rule.desc,
    type: rule.type,
    amount: rule.amount,
    cap: rule.cap,
    expireDays: rule.expireDays,
    enabled: rule.enabled,
  });

  const set = <K extends keyof EditDraft>(k: K, v: EditDraft[K]) =>
    setDraft((prev) => ({ ...prev, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-sm p-6 space-y-5 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">적립 조건 수정</h3>
          <button onClick={onClose}><X size={15} className="text-muted-foreground" /></button>
        </div>

        <div className="space-y-4">
          {/* 지급 유형 */}
          <div className="space-y-1.5">
            <label className="text-[11px] text-muted-foreground">지급 유형</label>
            <div className="flex gap-2">
              {(["정액", "정률"] as RewardType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => set("type", t)}
                  className={cn(
                    "flex-1 h-9 text-xs font-medium border transition-colors",
                    draft.type === t
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:bg-muted"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* 지급액 */}
          <div className="space-y-1.5">
            <label className="text-[11px] text-muted-foreground">
              {draft.type === "정액" ? "지급 금액 (원)" : "적립률 (%)"}
            </label>
            <input
              type="number"
              value={draft.amount}
              onChange={(e) => set("amount", Number(e.target.value))}
              className="w-full h-10 px-3 text-sm border border-border bg-background outline-none focus:border-sage-ink"
            />
          </div>

          {/* 최대 한도 — 정률만 */}
          {draft.type === "정률" && (
            <div className="space-y-1.5">
              <label className="text-[11px] text-muted-foreground">최대 적립 한도 (원, 비우면 무제한)</label>
              <input
                type="number"
                value={draft.cap ?? ""}
                onChange={(e) =>
                  set("cap", e.target.value === "" ? null : Number(e.target.value))
                }
                placeholder="무제한"
                className="w-full h-10 px-3 text-sm border border-border bg-background outline-none focus:border-sage-ink"
              />
            </div>
          )}

          {/* 유효기간 */}
          <div className="space-y-1.5">
            <label className="text-[11px] text-muted-foreground">유효기간 (일)</label>
            <div className="flex gap-2">
              {[90, 180, 365].map((d) => (
                <button
                  key={d}
                  onClick={() => set("expireDays", d)}
                  className={cn(
                    "flex-1 h-9 text-xs font-medium border transition-colors",
                    draft.expireDays === d
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:bg-muted"
                  )}
                >
                  {d === 365 ? "1년" : `${d}일`}
                </button>
              ))}
              <input
                type="number"
                value={![90, 180, 365].includes(draft.expireDays) ? draft.expireDays : ""}
                onChange={(e) => set("expireDays", Number(e.target.value))}
                placeholder="일"
                className="w-20 h-9 px-2 text-xs border border-border bg-background outline-none focus:border-sage-ink text-center"
              />
            </div>
          </div>

          {/* 설명 */}
          <div className="space-y-1.5">
            <label className="text-[11px] text-muted-foreground">설명 (내부 메모)</label>
            <input
              value={draft.desc}
              onChange={(e) => set("desc", e.target.value)}
              className="w-full h-10 px-3 text-sm border border-border bg-background outline-none focus:border-sage-ink"
            />
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <Button variant="outline" className="flex-1" onClick={onClose}>취소</Button>
          <Button className="flex-1" onClick={() => onSave(draft)}>
            <Check size={13} className="mr-1" /> 저장
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function MoneyPolicyPage() {
  const [rules, setRules] = useState<Rule[]>(INITIAL_RULES);
  const [editing, setEditing] = useState<Rule | null>(null);
  const [saved, setSaved] = useState(false);

  function toggleEnabled(id: string) {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  }

  function saveEdit(draft: EditDraft) {
    setRules((prev) =>
      prev.map((r) => (r.id === editing!.id ? { ...r, ...draft } : r))
    );
    setEditing(null);
  }

  function handleSaveAll() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const activeCount = rules.filter((r) => r.enabled).length;

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold">풀티머니 적립 정책</h2>
          <p className="text-sm text-muted-foreground mt-1">
            조건별 자동 지급 규칙을 설정합니다. 활성화된 조건만 실제 지급됩니다.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-[11px] text-sage-deep flex items-center gap-1">
              <Check size={11} /> 저장됨
            </span>
          )}
          <Button onClick={handleSaveAll}>전체 저장</Button>
        </div>
      </div>

      {/* 요약 */}
      <div className="grid grid-cols-3 gap-3">
        <div className="border border-border p-4">
          <div className="text-[11px] text-muted-foreground">전체 조건</div>
          <div className="text-lg font-bold mt-1">{rules.length}개</div>
        </div>
        <div className="border border-border p-4">
          <div className="text-[11px] text-muted-foreground">활성화</div>
          <div className="text-lg font-bold mt-1 text-sage-ink">{activeCount}개</div>
        </div>
        <div className="border border-border p-4">
          <div className="text-[11px] text-muted-foreground">비활성화</div>
          <div className="text-lg font-bold mt-1 text-muted-foreground">{rules.length - activeCount}개</div>
        </div>
      </div>

      {/* 규칙 목록 */}
      <div className="border border-border divide-y divide-border">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className={cn(
              "px-5 py-4 flex items-center gap-4 transition-colors",
              !rule.enabled && "opacity-50"
            )}
          >
            {/* 토글 */}
            <button
              onClick={() => toggleEnabled(rule.id)}
              className={cn(
                "w-10 h-6 relative flex-shrink-0 transition-colors",
                rule.enabled ? "bg-foreground" : "bg-muted border border-border"
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 w-5 h-5 bg-background transition-all",
                  rule.enabled ? "left-5" : "left-0.5 border border-border"
                )}
              />
            </button>

            {/* 조건명 + 설명 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{rule.trigger}</span>
                <Badge variant={rule.enabled ? "sage" : "muted"}>
                  {rule.enabled ? "활성" : "비활성"}
                </Badge>
              </div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{rule.desc}</div>
            </div>

            {/* 지급 조건 */}
            <div className="text-right flex-shrink-0 space-y-0.5">
              <div className="text-sm font-semibold">{formatAmount(rule)}</div>
              <div className="text-[10px] text-muted-foreground">
                {rule.type} · 유효 {rule.expireDays === 365 ? "1년" : `${rule.expireDays}일`}
              </div>
            </div>

            {/* 수정 버튼 */}
            <button
              onClick={() => setEditing(rule)}
              className="w-8 h-8 flex items-center justify-center border border-border hover:bg-muted transition-colors flex-shrink-0"
            >
              <Pencil size={12} className="text-muted-foreground" />
            </button>
          </div>
        ))}
      </div>

      <div className="border border-border/50 bg-muted/30 px-4 py-3 text-[11px] text-muted-foreground leading-relaxed">
        · 정률 적립은 실결제 금액(배송비 제외) 기준으로 계산됩니다.<br />
        · 지급된 풀티머니는 유효기간 내 사용하지 않으면 자동 소멸됩니다.<br />
        · 전체 저장 버튼을 눌러야 변경사항이 실제 정책에 반영됩니다.
      </div>

      {editing && (
        <EditModal rule={editing} onSave={saveEdit} onClose={() => setEditing(null)} />
      )}
    </div>
  );
}
