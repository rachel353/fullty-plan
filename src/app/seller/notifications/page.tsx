"use client";

import { useState } from "react";

const groups = [
  {
    title: "상품 관리",
    items: [
      { id: "s1", label: "상품 검수 완료 알림", desc: "등록 상품이 검수 통과/반려될 때 알림을 받습니다." },
      { id: "s2", label: "상품 품절 임박 알림", desc: "재고 1개 남았을 때 알림." },
    ],
  },
  {
    title: "GET 매칭",
    items: [
      { id: "s3", label: "신규 GET 요청 알림", desc: "내가 등록한 카테고리·브랜드와 일치하는 GET 요청이 올라오면 알림." },
      { id: "s4", label: "GET 제안 수락/거절 알림", desc: "구매자가 내 제안을 수락하거나 거절하면 알림." },
      { id: "s5", label: "GET 요청 만료 D-1 알림", desc: "제안하지 않은 GET 요청이 만료 전일이면 재알림." },
    ],
  },
  {
    title: "거래 / 정산",
    items: [
      { id: "s6", label: "구매 확정 알림", desc: "구매자 구매 확정 완료 시 정산 예정 안내." },
      { id: "s7", label: "정산 완료 알림", desc: "정산금이 계좌로 입금되면 알림." },
      { id: "s8", label: "반품·취소 접수 알림", desc: "반품 또는 주문 취소가 접수되면 즉시 알림." },
    ],
  },
  {
    title: "렌탈",
    items: [
      { id: "s9", label: "렌탈 회수 일정 알림", desc: "렌탈 종료 3일 전 회수 일정 안내." },
      { id: "s10", label: "렌탈 연장·구매 전환 알림", desc: "구매자가 연장 또는 구매 전환을 신청하면 알림." },
    ],
  },
  {
    title: "운영 공지",
    items: [
      { id: "s11", label: "풀티 운영 공지 알림", desc: "수수료·정책·시스템 점검 등 중요 공지사항." },
      { id: "s12", label: "프로모션 참여 안내", desc: "기획전·할인 이벤트 셀러 참여 모집 안내." },
    ],
  },
];

const DEFAULTS: Record<string, boolean> = {
  s1: true, s2: true,
  s3: true, s4: true, s5: true,
  s6: true, s7: true, s8: true,
  s9: true, s10: true,
  s11: true, s12: false,
};

export default function SellerNotificationsPage() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(DEFAULTS);

  function toggle(id: string) {
    setEnabled((prev) => ({ ...prev, [id]: !prev[id] }));
  }

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
                    onClick={(e) => { e.preventDefault(); toggle(item.id); }}
                    className={
                      enabled[item.id]
                        ? "w-10 h-6 bg-foreground relative flex-shrink-0"
                        : "w-10 h-6 bg-muted border border-border relative flex-shrink-0"
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

      <div className="border border-border p-4 text-[11px] text-muted-foreground leading-relaxed">
        운영 공지 알림은 중요도가 높아 일부 항목은 수신 거부가 제한될 수 있습니다.
      </div>
    </div>
  );
}
