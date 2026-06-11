"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Settings, Check, X } from "lucide-react";

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

type PendingApproval = {
  id: string;
  memberId: string;
  member: string;
  reason: string;
  amount: number;
  date: string;
  orderId: string;
  expiresAt: string;
  reviewText: string;
  reviewImages: number;
};

const INITIAL_PENDING: PendingApproval[] = [
  {
    id: "pa001",
    memberId: "m001",
    member: "김풀티",
    reason: "구매평 작성",
    amount: 2000,
    date: "2026-04-27",
    orderId: "ORD-20260420-001",
    expiresAt: "2026-07-26",
    reviewText: "거실에 두니 분위기가 확 살아났어요. 포장도 꼼꼼하고 배송도 빨랐습니다. 만족스러운 구매였어요!",
    reviewImages: 0,
  },
  {
    id: "pa002",
    memberId: "m001",
    member: "김풀티",
    reason: "포토 구매평 추가지급",
    amount: 1000,
    date: "2026-04-27",
    orderId: "ORD-20260420-001",
    expiresAt: "2026-07-26",
    reviewText: "사진 추가로 올려요! 실제 색감은 사진보다 더 따뜻한 느낌이에요. 거실 인테리어랑 잘 어울립니다.",
    reviewImages: 3,
  },
  {
    id: "pa003",
    memberId: "m002",
    member: "이가구",
    reason: "구매평 작성",
    amount: 2000,
    date: "2026-04-26",
    orderId: "ORD-20260418-002",
    expiresAt: "2026-07-25",
    reviewText: "생각보다 무게감이 있어서 고급스러운 느낌입니다. 다만 다리 부분에 약간의 스크래치가 있었어요.",
    reviewImages: 1,
  },
  {
    id: "pa004",
    memberId: "m003",
    member: "박빈티",
    reason: "장문 구매평 추가지급",
    amount: 500,
    date: "2026-04-25",
    orderId: "ORD-20260415-003",
    expiresAt: "2026-07-24",
    reviewText:
      "처음 받았을 때 포장 상태가 정말 꼼꼼해서 운송 중 손상 걱정이 전혀 없었습니다. 원목 특유의 결과 색감이 사진보다 훨씬 고급스러웠고, 마감 처리도 매끄러워서 손에 닿는 느낌이 좋았어요. 거실에 배치하니 공간 분위기가 한층 따뜻해진 느낌이고, 좌석 쿠션감도 적당해서 오래 앉아 있어도 편안합니다. 빈티지 가구 특유의 매력을 잘 살린 제품이라 다음 구매도 고려하고 있어요.",
    reviewImages: 1,
  },
];

type ConfirmAction = { type: "approve" | "reject"; item: PendingApproval };

export default function AdminMoneyPage() {
  const [balances, setBalances] = useState(INITIAL_BALANCES);
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [pending, setPending] = useState<PendingApproval[]>(INITIAL_PENDING);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(null);
  const [detailItem, setDetailItem] = useState<PendingApproval | null>(null);

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

  function openConfirmFromDetail(type: "approve" | "reject", item: PendingApproval) {
    setDetailItem(null);
    setConfirmAction({ type, item });
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
                        <Button size="sm" variant="ghost" onClick={() => setDetailItem(p)}>
                          상세
                        </Button>
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

      {/* 적립 승인 대기 상세 모달 */}
      {detailItem && (
        <Modal title="적립 승인 대기 상세" onClose={() => setDetailItem(null)}>
          <div className="space-y-4">
            <dl className="text-[11px] text-muted-foreground border border-border divide-y divide-border">
              <div className="flex justify-between px-3 py-2">
                <dt>회원</dt>
                <dd className="text-foreground">
                  {detailItem.member} ({detailItem.memberId})
                  {(() => {
                    const email = balances.find((b) => b.id === detailItem.memberId)?.email;
                    return email ? ` · ${email}` : "";
                  })()}
                </dd>
              </div>
              <div className="flex justify-between px-3 py-2">
                <dt>적립 사유</dt>
                <dd className="text-foreground">{detailItem.reason}</dd>
              </div>
              <div className="flex justify-between px-3 py-2">
                <dt>관련 주문</dt>
                <dd className="text-foreground">{detailItem.orderId}</dd>
              </div>
              <div className="flex justify-between px-3 py-2">
                <dt>신청일</dt>
                <dd className="text-foreground">{detailItem.date}</dd>
              </div>
              <div className="flex justify-between px-3 py-2">
                <dt>적립 예정 금액</dt>
                <dd className="text-foreground">+{detailItem.amount.toLocaleString()}원</dd>
              </div>
              <div className="flex justify-between px-3 py-2">
                <dt>만료 예정일</dt>
                <dd className="text-foreground">{detailItem.expiresAt}</dd>
              </div>
            </dl>

            <div>
              <div className="text-[11px] text-muted-foreground mb-1.5">리뷰 내용</div>
              <div className="border border-border p-3 text-sm leading-relaxed bg-muted/30">
                {detailItem.reviewText}
              </div>
              <div className="flex gap-3 mt-1.5 text-[11px] text-muted-foreground">
                <span>글자수 {detailItem.reviewText.length}자</span>
                <span>첨부 이미지 {detailItem.reviewImages}장</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <Button
              variant="outline"
              className="flex-1 border-red-400 text-red-500 hover:bg-red-50"
              onClick={() => openConfirmFromDetail("reject", detailItem)}
            >
              <X size={12} className="mr-1" /> 거절
            </Button>
            <Button className="flex-1" onClick={() => openConfirmFromDetail("approve", detailItem)}>
              <Check size={12} className="mr-1" /> 승인
            </Button>
          </div>
        </Modal>
      )}

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
