import { SidebarNav, SidebarSection } from "@/components/SidebarNav";

const sections: SidebarSection[] = [
  {
    title: "주문 / 거래",
    items: [
      { href: "/mypage", label: "개요" },
      { href: "/mypage/orders", label: "주문 조회" },
      { href: "/mypage/rentals", label: "렌탈 중인 상품" },
      { href: "/mypage/returns", label: "취소 / 반품 내역" },
    ],
  },
  {
    title: "GET / SELL",
    items: [
      { href: "/mypage/get", label: "GET 내역" },
      { href: "/mypage/sell", label: "SELL 내역" },
    ],
  },
  {
    title: "컬렉션",
    items: [
      { href: "/mypage/collection", label: "위시리스트 / 자산" },
      { href: "/mypage/lounge", label: "리빙 라운지" },
    ],
  },
  {
    title: "계정 설정",
    items: [
      { href: "/mypage/settings", label: "계정 정보" },
      { href: "/mypage/notifications", label: "알림 설정" },
      { href: "/mypage/grade", label: "등급 / 쿠폰 / 풀티머니" },
    ],
  },
];

export default function MypageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-canvas mx-auto px-12 py-16">
      <div className="border-b border-border pb-8 mb-12">
        <div className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase">My Page</div>
        <h1 className="font-display text-5xl text-sage-ink mt-3 leading-none">
          Hello, 김풀티<span className="text-sage-deep">.</span>
        </h1>
        <div className="text-xs text-muted-foreground mt-3">S 등급 · 풀티머니 124,500원</div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12">
        <aside>
          <SidebarNav sections={sections} />
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}
