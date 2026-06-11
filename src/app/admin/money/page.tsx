"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Settings, Check, X } from "lucide-react";
import { INITIAL_PENDING, type PendingApproval } from "@/lib/money";

const INITIAL_BALANCES = [
  { id: "m001", name: "김풀티", email: "kimfullty@gmail.com", balance: 124500 },
  { id: "m002", name: "이가구", email: "leeg@kakao.com", balance: 48200 },
  { id: "m003", name: "박빈티", email: "park@gmail.com", balance: 0 },
];

const INITIAL_HISTORY = [
  { date: "2026-04-13", member: "김풀티", type: "적립" as const, amount: 12800, reason: "구매 적립" },
  { date: "2026-04-10", member: "이가구", type: "사용" as const, amount: -50000, reason: "결제 사용" },
  { date: "2026-04-08", member: "박빈티", type: "수동 조정" as const, amount: 10000, reason: "운영팀 보정" },
  { date: "2026-04-05", member: "김풀티", type: "프로모션" as const, amount: 30000, reason: "신규 가입 혜택" },
];

type ConfirmAction = { type: "approve" | "reject"; item: PendingApproval };

export default function AdminMoneyPage() {
  const [balances, setBalances] = useState(INITIAL_BALANCES);
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [pending, setPending] = useState<PendingApproval[]>(INITIAL_PENDING);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(null);

  function handleApprove(item: PendingApproval) {
    setBalances((prev) =>
      prev.map((b) => (b.id === item.memberId ? { ...b, balance: b.balance + item.amount } : b))
    );
    setHistory((prev) => [
      { date: item.date, member: item.member, type: "적립" as const, amount: item.amount, reason: item.reason },
      ...prev,
    ]);
    setPending((prev) => prev.filter((p) => p.id !== item.id));
  }

  function handleReject(id: string) {
    setPending((prev) => prev.filter((p) => p.id !== id));
  }

  function handleConfirm() {
    if (!confirmAction) return;
    if (confirmAction.type === "approve") {
      handleApprove(confirmAction.item);
    } else {
      handleReject(confirmAction.item.id);
    }
    setConfirmAction(null);
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold">풀티머니 관리</h2>
          <p className="text-sm text-muted-foreground mt-1">
            회원별 잔액 · 적립/사용 이력 · 관리자 수동 조정 · 프로모션 지급
          </p>
        </div>
        <Link href="/admin/money/policy">
          <Button variant="outline" size="sm" className="flex items-center gap-1.5">
            <Settings size={12} /> 적립 정책 설정
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Stat label="총 발행액" value="12,840,000원" />
        <Stat label="총 사용액" value="8,210,000원" />
        <Stat label="총 잔액" value="4,630,000원" />
        <Stat label="이번 달 적립" value="840,000원" />
      </div>

      {/* 적립 승인 대기 */}
      <div>
        <div className="flex items-end justify-between mb-3">
          <div className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            적립 승인 대기
          </div>
          {pending.length > 0 && <Badge variant="sage">{pending.length}건 대기</Badge>}
        </div>
        {pending.length === 0 ? (
          <div className="border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
            승인 대기 중인 적립 요청이 없습니다.
          </div>
        ) : (
          <div className="border border-border">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted">
                <tr className="text-left text-xs font-medium text-muted-foreground">
                  <th className="px-4 py-3">신청일</th>
                  <th className="px-4 py-3">회원</th>
                  <th className="px-4 py-3">사유</th>
                  <th className="px-4 py-3 text-right">금액</th>
                  <th className="px-4 py-3">만료 예정일</th>
                  <th className="px-4 py-3 text-right">작업</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {pending.map((p) => (
                  <tr key={p.id}>
                    <td className="px-4 py-3 text-muted-foreground">{p.date}</td>
                    <td className="px-4 py-3 font-medium">{p.member}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline">{p.reason}</Badge>
                      <div className="text-[11px] text-muted-foreground mt-1">{p.orderId}</div>
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      +{p.amount.toLocaleString()}원
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{p.expiresAt}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1.5">
                        <Link href={`/admin/money/approvals/${p.id}`}>
                          <Button size="sm" variant="ghost">
                            상세
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setConfirmAction({ type: "reject", item: p })}
                        >
                          <X size={12} className="mr-1" /> 거절
                        </Button>
                        <Button size="sm" onClick={() => setConfirmAction({ type: "approve", item: p })}>
                          <Check size={12} className="mr-1" /> 승인
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Balances */}
      <div>
        <div className="flex items-end justify-between mb-3">
          <div className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            회원 잔액 조회
          </div>
          <div className="flex gap-2">
            <input
              placeholder="회원 검색"
              className="h-9 px-3 text-xs border border-border bg-background w-60"
            />
            <Link href="/admin/money/m001"><Button size="sm">수동 조정</Button></Link>
          </div>
        </div>
        <div className="border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted">
              <tr className="text-left text-xs font-medium text-muted-foreground">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">이름</th>
                <th className="px-4 py-3">이메일</th>
                <th className="px-4 py-3 text-right">잔액</th>
                <th className="px-4 py-3 text-right">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {balances.map((b) => (
                <tr key={b.id}>
                  <td className="px-4 py-3 text-[11px] text-muted-foreground">{b.id}</td>
                  <td className="px-4 py-3 font-medium">{b.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{b.email}</td>
                  <td className="px-4 py-3 text-right font-medium">
                    {b.balance.toLocaleString()}원
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/money/${b.id}`}>
                      <Button size="sm" variant="ghost">조정</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* History */}
      <div>
        <div className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-3">
          적립 / 사용 이력
        </div>
        <div className="border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted">
              <tr className="text-left text-xs font-medium text-muted-foreground">
                <th className="px-4 py-3">일자</th>
                <th className="px-4 py-3">회원</th>
                <th className="px-4 py-3">구분</th>
                <th className="px-4 py-3">사유</th>
                <th className="px-4 py-3 text-right">금액</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {history.map((h, i) => (
                <tr key={i}>
                  <td className="px-4 py-3 text-muted-foreground">{h.date}</td>
                  <td className="px-4 py-3 font-medium">{h.member}</td>
                  <td className="px-4 py-3">
                    <Badge variant={h.amount < 0 ? "muted" : "default"}>{h.type}</Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{h.reason}</td>
                  <td
                    className={
                      h.amount < 0
                        ? "px-4 py-3 text-right font-medium text-muted-foreground"
                        : "px-4 py-3 text-right font-medium"
                    }
                  >
                    {h.amount > 0 ? "+" : ""}
                    {h.amount.toLocaleString()}원
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 승인/거절 확인 모달 */}
      {confirmAction && (
        <Modal
          title={confirmAction.type === "approve" ? "적립 승인" : "적립 거절"}
          onClose={() => setConfirmAction(null)}
        >
          {confirmAction.type === "approve" ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">{confirmAction.item.member}</span>님의{" "}
                <span className="font-semibold text-foreground">&quot;{confirmAction.item.reason}&quot;</span> 적립 요청을
                승인합니다. 회원 잔액에{" "}
                <span className="font-semibold text-foreground">
                  +{confirmAction.item.amount.toLocaleString()}원
                </span>
                이 적립되고, 적립/사용 이력에 기록됩니다.
              </p>
              <dl className="text-[11px] text-muted-foreground border border-border divide-y divide-border">
                <div className="flex justify-between px-3 py-2">
                  <dt>관련 주문</dt>
                  <dd className="text-foreground">{confirmAction.item.orderId}</dd>
                </div>
                <div className="flex justify-between px-3 py-2">
                  <dt>만료 예정일</dt>
                  <dd className="text-foreground">{confirmAction.item.expiresAt}</dd>
                </div>
              </dl>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">{confirmAction.item.member}</span>님의{" "}
              <span className="font-semibold text-foreground">&quot;{confirmAction.item.reason}&quot;</span> 적립 요청
              (+{confirmAction.item.amount.toLocaleString()}원)을 거절합니다. 거절된 요청은 복구할 수 없습니다.
            </p>
          )}
          <div className="flex gap-2 mt-6">
            <Button variant="outline" className="flex-1" onClick={() => setConfirmAction(null)}>
              취소
            </Button>
            {confirmAction.type === "approve" ? (
              <Button className="flex-1" onClick={handleConfirm}>승인</Button>
            ) : (
              <Button
                className="flex-1 border-red-400 bg-red-500 text-white hover:bg-red-600 hover:border-red-500"
                onClick={handleConfirm}
              >
                거절
              </Button>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-md p-6 space-y-1 z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold">{title}</h3>
        </div>
        {children}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border p-5">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className="text-xl font-bold mt-2">{value}</div>
    </div>
  );
}
