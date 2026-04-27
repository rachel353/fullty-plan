"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type AdjustType = "지급" | "차감" | "만료 처리";

type Member = {
  id: string;
  name: string;
  email: string;
  balance: number;
};

type HistoryItem = {
  date: string;
  type: string;
  amount: number;
  reason: string;
  by: string;
};

const MEMBERS: Record<string, Member> = {
  m001: { id: "m001", name: "김풀티", email: "kimfullty@gmail.com", balance: 124500 },
  m002: { id: "m002", name: "이가구", email: "leeg@kakao.com", balance: 48200 },
  m003: { id: "m003", name: "박빈티", email: "park@gmail.com", balance: 0 },
};

const HISTORY: Record<string, HistoryItem[]> = {
  m001: [
    { date: "2026-04-13", type: "적립", amount: 12800, reason: "구매 적립", by: "시스템" },
    { date: "2026-04-05", type: "프로모션", amount: 30000, reason: "신규 가입 혜택", by: "admin@fullty.co.kr" },
    { date: "2026-03-20", type: "사용", amount: -18300, reason: "결제 사용", by: "시스템" },
  ],
  m002: [
    { date: "2026-04-10", type: "사용", amount: -50000, reason: "결제 사용", by: "시스템" },
    { date: "2026-03-28", type: "적립", amount: 98200, reason: "구매 적립", by: "시스템" },
  ],
  m003: [
    { date: "2026-04-08", type: "수동 조정", amount: 10000, reason: "운영팀 보정", by: "admin@fullty.co.kr" },
    { date: "2026-04-08", type: "사용", amount: -10000, reason: "결제 사용", by: "시스템" },
  ],
};

const REASONS: Record<AdjustType, string[]> = {
  "지급": ["프로모션 지급", "CS 보상", "운영팀 보정", "오류 정정", "이벤트 당첨", "기타"],
  "차감": ["잘못 지급된 금액 회수", "운영팀 보정", "정책 위반", "기타"],
  "만료 처리": ["유효기간 만료", "계정 정지", "운영 정책", "기타"],
};

export default function MoneyAdjustPage() {
  const { id } = useParams<{ id: string }>();
  const member = MEMBERS[id];
  const memberHistory = HISTORY[id] ?? [];

  const [adjustType, setAdjustType] = useState<AdjustType>("지급");
  const [amount, setAmount] = useState("");
  const [reasonPreset, setReasonPreset] = useState("");
  const [reasonCustom, setReasonCustom] = useState("");
  const [memo, setMemo] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [localHistory, setLocalHistory] = useState<HistoryItem[]>(memberHistory);
  const [localBalance, setLocalBalance] = useState(member?.balance ?? 0);

  if (!member) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        회원을 찾을 수 없습니다.
        <Link href="/admin/money" className="block mt-3 text-sage-ink underline">목록으로</Link>
      </div>
    );
  }

  const parsedAmount = Number(String(amount).replace(/,/g, ""));
  const reason = reasonCustom || reasonPreset;
  const canSubmit = parsedAmount > 0 && reason;

  function handleSubmit() {
    const delta = adjustType === "차감" || adjustType === "만료 처리" ? -parsedAmount : parsedAmount;
    setLocalBalance((prev) => Math.max(0, prev + delta));
    setLocalHistory((prev) => [
      { date: "2026-04-27", type: adjustType === "지급" ? "수동 지급" : adjustType, amount: delta, reason, by: "admin@fullty.co.kr" },
      ...prev,
    ]);
    setAmount("");
    setReasonPreset("");
    setReasonCustom("");
    setMemo("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  }

  return (
    <div className="space-y-8 max-w-xl">
      {/* 헤더 */}
      <div className="border-b border-border pb-4">
        <Link href="/admin/money" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors">
          <ChevronLeft size={13} /> 풀티머니 관리
        </Link>
        <h2 className="text-xl font-bold">풀티머니 조정</h2>
        <p className="text-[11px] text-muted-foreground mt-1">{member.id} · {member.name} · {member.email}</p>
      </div>

      {/* 저장 완료 */}
      {submitted && (
        <div className="border border-sage-deep/30 bg-sage-soft/10 px-5 py-3 text-sm font-medium">
          조정이 완료되었습니다.
        </div>
      )}

      {/* 현재 잔액 */}
      <section className="border border-border px-5 py-5 flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">현재 잔액</div>
          <div className="text-2xl font-bold">{localBalance.toLocaleString()}원</div>
        </div>
        <div className="text-[11px] text-muted-foreground text-right space-y-0.5">
          <div>{member.name}</div>
          <div>{member.email}</div>
        </div>
      </section>

      {/* 조정 폼 */}
      <section className="space-y-5">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">조정 내용</div>

        {/* 조정 유형 */}
        <div className="space-y-1.5">
          <label className="text-[11px] text-muted-foreground">조정 유형</label>
          <div className="flex gap-2">
            {(["지급", "차감", "만료 처리"] as AdjustType[]).map((t) => (
              <button
                key={t}
                onClick={() => { setAdjustType(t); setReasonPreset(""); setReasonCustom(""); }}
                className={cn(
                  "flex-1 h-9 text-sm font-medium border transition-colors",
                  adjustType === t
                    ? t === "차감" || t === "만료 처리"
                      ? "border-red-400 bg-red-500 text-white"
                      : "border-foreground bg-foreground text-background"
                    : "border-border hover:bg-muted"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* 금액 */}
        <div className="space-y-1.5">
          <label className="text-[11px] text-muted-foreground">
            금액 <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center border border-border focus-within:border-sage-ink">
            <span className={cn(
              "px-3 text-sm h-10 flex items-center border-r border-border font-medium w-8 justify-center",
              adjustType === "지급" ? "text-sage-ink" : "text-red-500"
            )}>
              {adjustType === "지급" ? "+" : "−"}
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="flex-1 h-10 px-3 text-sm bg-background outline-none"
            />
            <span className="px-3 text-sm text-muted-foreground border-l border-border h-10 flex items-center">원</span>
          </div>
          {adjustType === "차감" && parsedAmount > localBalance && (
            <p className="text-[11px] text-red-500">현재 잔액({localBalance.toLocaleString()}원)을 초과합니다.</p>
          )}
          {parsedAmount > 0 && (
            <p className="text-[11px] text-muted-foreground">
              조정 후 잔액:{" "}
              <span className="font-medium">
                {Math.max(0, localBalance + (adjustType === "지급" ? parsedAmount : -parsedAmount)).toLocaleString()}원
              </span>
            </p>
          )}
        </div>

        {/* 사유 */}
        <div className="space-y-1.5">
          <label className="text-[11px] text-muted-foreground">
            사유 <span className="text-red-500">*</span>
          </label>
          <select
            value={reasonPreset}
            onChange={(e) => { setReasonPreset(e.target.value); setReasonCustom(""); }}
            className="w-full h-10 border border-border px-3 text-sm bg-background outline-none focus:border-sage-ink"
          >
            <option value="">사유 선택</option>
            {REASONS[adjustType].map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
          <input
            value={reasonCustom}
            onChange={(e) => { setReasonCustom(e.target.value); setReasonPreset(""); }}
            placeholder="직접 입력 (선택 시 위 항목 무시)"
            className="w-full h-10 border border-border px-3 text-sm bg-background outline-none focus:border-sage-ink"
          />
        </div>

        {/* 메모 */}
        <div className="space-y-1.5">
          <label className="text-[11px] text-muted-foreground">관리자 메모 (선택)</label>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="내부 메모 (회원에게 노출되지 않음)"
            className="w-full border border-border px-3 py-2.5 text-sm bg-background resize-none h-20 outline-none focus:border-sage-ink"
          />
        </div>

        <Button className="w-full" disabled={!canSubmit} onClick={handleSubmit}>
          {adjustType} 처리
        </Button>
      </section>

      {/* 이력 */}
      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">조정 이력</div>
        {localHistory.length === 0 ? (
          <div className="border border-border px-5 py-8 text-center text-sm text-muted-foreground">이력 없음</div>
        ) : (
          <div className="border border-border">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted">
                <tr className="text-left text-xs font-medium text-muted-foreground">
                  <th className="px-4 py-3">일자</th>
                  <th className="px-4 py-3">구분</th>
                  <th className="px-4 py-3">사유</th>
                  <th className="px-4 py-3 text-right">금액</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {localHistory.map((h, i) => (
                  <tr key={i} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 text-muted-foreground">{h.date}</td>
                    <td className="px-4 py-3">
                      <Badge variant={h.amount < 0 ? "muted" : "default"}>{h.type}</Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-[11px]">{h.reason}</td>
                    <td className={cn(
                      "px-4 py-3 text-right font-medium",
                      h.amount < 0 ? "text-muted-foreground" : "text-foreground"
                    )}>
                      {h.amount > 0 ? "+" : ""}{h.amount.toLocaleString()}원
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <div className="border-t border-border pt-6 flex justify-end">
        <Link href="/admin/money"><Button variant="outline">목록으로</Button></Link>
      </div>
    </div>
  );
}
