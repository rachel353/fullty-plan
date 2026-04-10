import { SidebarNav, SidebarSection } from "@/components/SidebarNav";

const sections: SidebarSection[] = [
  {
    title: "운영",
    items: [
      { href: "/seller", label: "대시보드" },
      { href: "/seller/products", label: "상품 관리" },
      { href: "/seller/products/new", label: "상품 등록" },
    ],
  },
  {
    title: "GET 매칭",
    items: [
      { href: "/seller/get-requests", label: "GET 요청 알림" },
      { href: "/seller/proposals", label: "내 제안 현황" },
    ],
  },
  {
    title: "정산",
    items: [
      { href: "/seller/settlements", label: "정산 내역" },
      { href: "/seller/account", label: "계좌 관리" },
    ],
  },
];

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-canvas mx-auto px-12 py-16">
      <div className="border-b border-border pb-8 mb-12">
        <div className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase">
          Seller Admin
        </div>
        <h1 className="font-display text-5xl text-sage-ink mt-3 leading-none">빈티지 웍스</h1>
        <div className="text-xs text-muted-foreground mt-3">사업자 셀러 · 승인 완료</div>
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
