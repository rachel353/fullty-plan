import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ProductForm } from "@/components/ProductForm";

export default function AdminNewProductPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <Link href="/admin/products" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors">
          <ChevronLeft size={13} /> 상품 관리
        </Link>
        <h2 className="text-xl font-bold">상품 직접 등록</h2>
        <p className="text-sm text-muted-foreground mt-1">
          검수 없이 즉시 플랫폼에 노출됩니다.
        </p>
      </div>
      <ProductForm mode="admin" />
    </div>
  );
}
