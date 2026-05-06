"use client";

import { ProductForm } from "@/components/ProductForm";
import { useSellerType } from "@/lib/seller-context";

export default function NewSellerProductPage() {
  const { sellerType } = useSellerType();
  const mode = sellerType === "사업자" ? "seller-business" : "seller-individual";

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold">상품 등록</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {mode === "seller-business"
            ? "등록 즉시 플랫폼에 노출됩니다. 구매 발생 시 직접 발송하세요."
            : "등록 후 풀티 사전 검수를 거쳐 노출됩니다."}
        </p>
      </div>
      <ProductForm mode={mode} />
    </div>
  );
}
