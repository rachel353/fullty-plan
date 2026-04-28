import { SidebarNav, SidebarSection } from "@/components/SidebarNav";

const sections: SidebarSection[] = [
  {
    title: "회원",
    items: [
      { href: "/admin", label: "운영 대시보드" },
      { href: "/admin/members", label: "일반 회원" },
      { href: "/admin/sellers", label: "셀러 승인 심사" },
    ],
  },
  {
    title: "상품 / 거래",
    items: [
      { href: "/admin/products", label: "상품 관리" },
      { href: "/admin/rentals", label: "렌탈 관리" },
    ],
  },
  {
    title: "GET / SELL",
    items: [
      { href: "/admin/get", label: "GET 관리" },
      { href: "/admin/sell", label: "SELL 관리" },
    ],
  },
  {
    title: "운영",
    items: [
      { href: "/admin/settlements", label: "정산 관리" },
      { href: "/admin/money", label: "풀티머니 관리" },
      { href: "/admin/coupons", label: "쿠폰 관리" },
      { href: "/admin/lounge", label: "리빙 라운지 관리" },
      { href: "/admin/reports", label: "신고 관리" },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-canvas mx-auto px-12 py-16">
      <div className="border-b border-border pb-8 mb-12">
        <div className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase">
          Fullty Admin
        </div>
        <h1 className="font-display text-5xl text-sage-ink mt-3 leading-none">운영 콘솔</h1>
        <div className="text-xs text-muted-foreground mt-3">운영팀 전용</div>
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
