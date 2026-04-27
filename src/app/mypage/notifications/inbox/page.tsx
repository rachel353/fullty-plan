"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Package, RotateCcw, Tag, TrendingUp, MessageSquare, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type NotifCategory = "주문/배송" | "렌탈" | "GET·SELL" | "라운지" | "자산" | "Q&A";

type Notification = {
  id: string;
  category: NotifCategory;
  text: string;
  detail?: string;
  unread: boolean;
  time: string;
  actionLabel?: string;
  actionHref?: string;
};

const MOCK: Notification[] = [
  {
    id: "n1",
    category: "주문/배송",
    text: "Aeron Chair 배송이 시작되었습니다.",
    detail: "CJ대한통운 · 운송장 123456789012",
    unread: true,
    time: "방금 전",
    actionLabel: "배송 조회",
    actionHref: "/mypage/orders",
  },
  {
    id: "n2",
    category: "렌탈",
    text: "Egg Chair 렌탈 종료까지 D-3입니다.",
    detail: "2026.04.20 회수 예정 · 연장 또는 구매 전환이 가능합니다.",
    unread: true,
    time: "1시간 전",
    actionLabel: "렌탈 관리",
    actionHref: "/mypage/rentals",
  },
  {
    id: "n3",
    category: "GET·SELL",
    text: "GET 요청 'Stool 60'에 새 셀러 제안 1건이 도착했습니다.",
    unread: true,
    time: "3시간 전",
    actionLabel: "제안 확인",
    actionHref: "/mypage/get",
  },
  {
    id: "n4",
    category: "GET·SELL",
    text: "SELL 'Embody Chair' 검수 결과가 등록되었습니다.",
    detail: "최종 제안금액이 등록되었습니다. 확인 후 계약을 진행해 주세요.",
    unread: false,
    time: "어제",
    actionLabel: "결과 보기",
    actionHref: "/mypage/sell",
  },
  {
    id: "n5",
    category: "주문/배송",
    text: "CH24 Wishbone 구매 확정이 완료되었습니다.",
    detail: "셀러에게 정산이 진행됩니다. 적립금 9,800원이 지급되었습니다.",
    unread: false,
    time: "3일 전",
    actionLabel: "주문 내역",
    actionHref: "/mypage/orders",
  },
  {
    id: "n6",
    category: "자산",
    text: "Aeron Chair 시세가 전월 대비 4.2% 상승했습니다.",
    detail: "지금이 판매 적기일 수 있습니다. 자산 리포트를 확인해 보세요.",
    unread: false,
    time: "4일 전",
    actionLabel: "자산 보기",
    actionHref: "/mypage/assets",
  },
  {
    id: "nq1",
    category: "Q&A",
    text: "Aeron Chair Q&A에 답변이 등록되었습니다.",
    detail: "\"실제 수령까지 보통 며칠 걸리나요?\" 질문에 Fullty 운영팀이 답변했습니다.",
    unread: true,
    time: "2시간 전",
    actionLabel: "답변 보기",
    actionHref: "/products/p001",
  },
  {
    id: "nq2",
    category: "Q&A",
    text: "Eames Lounge Chair Q&A에 셀러가 답변을 달았습니다.",
    detail: "\"다른 색상 옵션 입고 예정이 있나요?\" 질문에 답변이 등록되었습니다.",
    unread: false,
    time: "2일 전",
    actionLabel: "답변 보기",
    actionHref: "/products/p002",
  },
  {
    id: "n7",
    category: "라운지",
    text: "내 리뷰에 '도움이 돼요' 18명이 눌렀습니다.",
    unread: false,
    time: "5일 전",
    actionLabel: "라운지",
    actionHref: "/mypage/lounge",
  },
  {
    id: "n8",
    category: "주문/배송",
    text: "구매 확정 기한이 D-3 남았습니다.",
    detail: "Egg Chair · 미확정 시 2026.04.20에 자동 구매 확정됩니다.",
    unread: false,
    time: "1주일 전",
    actionLabel: "확정하기",
    actionHref: "/mypage/orders",
  },
];

const TABS: { label: string; value: NotifCategory | "전체" | "읽지 않음" }[] = [
  { label: "전체", value: "전체" },
  { label: "읽지 않음", value: "읽지 않음" },
  { label: "주문/배송", value: "주문/배송" },
  { label: "렌탈", value: "렌탈" },
  { label: "GET·SELL", value: "GET·SELL" },
  { label: "라운지", value: "라운지" },
  { label: "자산", value: "자산" },
  { label: "Q&A", value: "Q&A" },
];

function CategoryIcon({ category }: { category: NotifCategory }) {
  const cls = "w-8 h-8 flex items-center justify-center flex-shrink-0";
  if (category === "주문/배송") return <div className={cn(cls, "bg-sage-soft/60")}><Package size={14} className="text-sage-ink" /></div>;
  if (category === "렌탈") return <div className={cn(cls, "bg-muted")}><RotateCcw size={14} className="text-sage-ink" /></div>;
  if (category === "GET·SELL") return <div className={cn(cls, "bg-muted")}><Tag size={14} className="text-sage-ink" /></div>;
  if (category === "자산") return <div className={cn(cls, "bg-sage-soft/60")}><TrendingUp size={14} className="text-sage-ink" /></div>;
  if (category === "Q&A") return <div className={cn(cls, "bg-muted")}><HelpCircle size={14} className="text-sage-ink" /></div>;
  return <div className={cn(cls, "bg-muted")}><MessageSquare size={14} className="text-sage-ink" /></div>;
}

export default function NotificationsInboxPage() {
  const [tab, setTab] = useState<string>("전체");
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  function markRead(id: string) {
    setReadIds((prev) => new Set(prev).add(id));
  }
  function markAllRead() {
    setReadIds(new Set(MOCK.map((n) => n.id)));
  }

  const isRead = (n: Notification) => readIds.has(n.id) || !n.unread;

  const filtered = MOCK.filter((n) => {
    if (tab === "전체") return true;
    if (tab === "읽지 않음") return !isRead(n);
    return n.category === tab;
  });

  const unreadCount = MOCK.filter((n) => !isRead(n)).length;

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold">알림</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {unreadCount > 0 ? `읽지 않은 알림 ${unreadCount}개` : "모든 알림을 확인했습니다."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-[11px] text-muted-foreground hover:text-sage-ink underline underline-offset-2 transition-colors"
            >
              모두 읽음
            </button>
          )}
          <Link href="/mypage/notifications">
            <Button variant="ghost" size="sm" className="text-muted-foreground text-[11px]">
              알림 설정
            </Button>
          </Link>
        </div>
      </div>

      {/* Tab filter */}
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={cn(
              "px-3 h-8 text-xs border transition-colors",
              tab === t.value
                ? "border-sage-ink bg-sage-ink text-background"
                : "border-border hover:bg-muted"
            )}
          >
            {t.label}
            {t.value === "읽지 않음" && unreadCount > 0 && (
              <span className="ml-1.5 bg-sage-deep text-background text-[9px] px-1.5 py-0.5">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notification list */}
      {filtered.length === 0 ? (
        <div className="py-20 flex flex-col items-center gap-3 text-center">
          <Bell size={28} strokeWidth={1} className="text-border" />
          <div className="text-sm text-muted-foreground">알림이 없습니다.</div>
        </div>
      ) : (
        <div className="divide-y divide-border border border-border">
          {filtered.map((n) => (
            <div
              key={n.id}
              className={cn(
                "p-4 flex gap-3 items-start transition-colors",
                !isRead(n) ? "bg-sage-soft/20" : "bg-background hover:bg-muted/30"
              )}
              onClick={() => markRead(n.id)}
            >
              <CategoryIcon category={n.category} />

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className={cn("text-sm leading-relaxed", !isRead(n) ? "font-medium text-sage-ink" : "text-sage-ink")}>
                      {n.text}
                    </p>
                    {n.detail && (
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                        {n.detail}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] text-muted-foreground">{n.time}</span>
                      <span className="text-[10px] text-muted-foreground">·</span>
                      <span className="text-[10px] text-muted-foreground">{n.category}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {!isRead(n) && (
                      <div className="w-2 h-2 rounded-full bg-sage-deep" />
                    )}
                  </div>
                </div>

                {n.actionLabel && n.actionHref && (
                  <Link
                    href={n.actionHref}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-block mt-2 px-3 h-7 border border-border text-[11px] text-sage-ink hover:bg-muted transition-colors leading-7"
                  >
                    {n.actionLabel} →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
