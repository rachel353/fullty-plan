import { SellerAdminShell } from "@/components/SellerAdminShell";
import { SidebarSection } from "@/components/SidebarNav";

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
  {
    title: "설정",
    items: [
      { href: "/seller/notifications", label: "알림 설정" },
    ],
  },
];

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  return <SellerAdminShell sections={sections}>{children}</SellerAdminShell>;
}
