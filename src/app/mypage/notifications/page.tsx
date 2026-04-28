"use client";

import { useState } from "react";

const groups = [
  {
    title: "주문 / 배송",
    items: [
      { id: "n1", label: "결제 완료 알림", desc: "주문 결제가 완료되면 알림을 받습니다." },
      { id: "n2", label: "배송 상황 알림", desc: "배송 단계 변경 시 알림을 받습니다." },
      { id: "n3", label: "구매 확정 D-N 알림", desc: "자동 확정 4일 전부터 카운트다운." },
    ],
  },
  {
    title: "렌탈",
    items: [
      { id: "n4", label: "렌탈 종료 알림", desc: "기본: 종료 7일 전 · 7일 렌탈은 종료 3일 전 알림." },
      { id: "n4b", label: "렌탈 D-1 재알림", desc: "종료 전일까지 연장·구매 전환·반납 액션이 없으면 D-1 자동 재알림." },
      { id: "n5", label: "구매 전환 안내", desc: "차액 결제 잔여 시 푸시 발송." },
    ],
  },
  {
    title: "GET / SELL",
    items: [
      { id: "n6", label: "GET 셀러 제안 알림", desc: "내 요청에 셀러 제안이 도착하면 알림." },
      { id: "n7", label: "SELL 진행 단계 알림", desc: "픽업 / 검수 / 금액 제안 단계 변경 시." },
    ],
  },
  {
    title: "Q&A",
    items: [
      { id: "nq1", label: "Q&A 답변 알림", desc: "내가 남긴 Q&A에 셀러 또는 운영팀이 답변하면 알림." },
    ],
  },
  {
    title: "가구 자산화",
    items: [
      {
        id: "n8",
        label: "지금 판매/렌탈 추천 알림",
        desc: "보유 가구 시세 변동 시 수익화 시점 추천.",
      },
    ],
  },
];

export default function NotificationsPage() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    n1: true,
    n2: true,
    n3: true,
    n4: true,
    n4b: true,
    n5: false,
    n6: true,
    n7: true,
    nq1: true,
    n8: false,
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold">알림 설정</h2>
        <p className="text-sm text-muted-foreground mt-1">
          알림톡 / 푸시로 받을 알림을 카테고리별로 관리합니다.
        </p>
      </div>

      <div className="space-y-8">
        {groups.map((group) => (
          <div key={group.title}>
            <div className="text-xs font-semibold tracking-widest text-muted-foreground mb-3">
              {group.title}
            </div>
            <div className="border border-border divide-y divide-border">
              {group.items.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted"
                >
                  <div>
                    <div className="text-sm font-medium">{item.label}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{item.desc}</div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setEnabled((prev) => ({ ...prev, [item.id]: !prev[item.id] }));
                    }}
                    className={
                      enabled[item.id]
                        ? "w-10 h-6 bg-foreground relative"
                        : "w-10 h-6 bg-muted border border-border relative"
                    }
                  >
                    <span
                      className={
                        enabled[item.id]
                          ? "absolute top-0.5 left-5 w-5 h-5 bg-background"
                          : "absolute top-0.5 left-0.5 w-5 h-5 bg-background border border-border"
                      }
                    />
                  </button>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
