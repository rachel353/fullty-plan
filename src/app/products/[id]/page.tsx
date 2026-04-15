import { notFound } from "next/navigation";
import Link from "next/link";
import { ImageBox } from "@/components/ImageBox";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProductDetailTabs } from "@/components/ProductDetailTabs";
import { products, rentalPricing } from "@/lib/mock";
import { formatPrice } from "@/lib/utils";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);
  if (!product) notFound();

  const rentalDays = [7, 14, 30, 60, 90];

  return (
    <div className="max-w-canvas mx-auto px-12 py-16">
      <nav className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-10">
        <Link href="/products" className="hover:text-sage-ink">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span>{product.category}</span>
        <span className="mx-2">/</span>
        <span className="text-sage-ink">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image gallery */}
        <div>
          <ImageBox ratio="square" />
          <div className="grid grid-cols-4 gap-2 mt-2">
            {[1, 2, 3, 4].map((i) => (
              <ImageBox key={i} ratio="square" />
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="default">{product.grade}</Badge>
            {product.rentable && <Badge variant="sage">RENT</Badge>}
            <Badge variant="muted">{product.status}</Badge>
          </div>
          <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
            {product.brand}
          </div>
          <h1 className="font-display text-5xl text-sage-ink mt-2 leading-[0.95]">{product.name}</h1>
          <div className="text-sm text-muted-foreground mt-3">{product.option}</div>

          <div className="mt-8 pb-8 border-b border-border">
            <div className="font-display text-4xl text-sage-ink">{formatPrice(product.price)}</div>
            <div className="text-[11px] text-muted-foreground mt-2">
              신품 최저가 1,580,000원 · 가이드 가격 대비 81%
            </div>
          </div>

          {/* Options */}
          <div className="py-6 border-b border-border space-y-5">
            <div>
              <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground mb-2">
                옵션 선택
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[product.option, "옵션 B", "옵션 C"].map((opt, i) => (
                  <button
                    key={opt}
                    className={
                      i === 0
                        ? "h-11 border border-sage-ink bg-sage-ink text-background text-xs font-medium"
                        : "h-11 border border-border text-xs hover:bg-muted"
                    }
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground mb-2">
                수량
              </div>
              <div className="inline-flex items-center border border-border h-11">
                <button className="w-11 h-full text-sm hover:bg-muted">−</button>
                <div className="w-12 text-center text-sm">1</div>
                <button className="w-11 h-full text-sm hover:bg-muted">+</button>
              </div>
            </div>

            <div className="space-y-2 text-sm pt-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">셀러</span>
                <span>{product.seller}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">등급</span>
                <span>{product.grade} (Fullty 검수 완료)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">배송</span>
                <span>표준 배송 · 35,000원</span>
              </div>
            </div>
          </div>

          {/* Rental block */}
          {product.rentable && (
            <div className="py-6 border-b border-border">
              <div className="text-xs font-semibold tracking-widest mb-3">렌탈로 사용해 보기</div>
              <div className="grid grid-cols-5 gap-2">
                {rentalDays.map((d) => (
                  <button
                    key={d}
                    className="border border-border h-16 flex flex-col items-center justify-center text-xs hover:bg-muted"
                  >
                    <span className="font-medium">{d}일</span>
                    <span className="text-muted-foreground text-[10px] mt-0.5">
                      {rentalPricing(product.price, d).toLocaleString()}원
                    </span>
                  </button>
                ))}
              </div>
              <div className="text-[11px] text-muted-foreground mt-3 leading-relaxed">
                * 선택한 배송 시작일 기준 렌탈 시작. 최대 90일 · 연장 시 추가 최대 90일.
                <br />
                * 종료 7일 전 알림 발송 (7일 렌탈은 3일 전) → 연장 / 구매전환 / 회수 선택
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="pt-6 grid grid-cols-2 gap-2">
            <Link href="/cart" className={product.status === "품절" ? "pointer-events-none" : ""}>
              <Button variant="outline" size="lg" className="w-full" disabled={product.status === "품절"}>
                장바구니 담기
              </Button>
            </Link>
            <Link href="/checkout" className={product.status === "품절" ? "pointer-events-none" : ""}>
              <Button size="lg" className="w-full" disabled={product.status === "품절"}>
                바로 구매
              </Button>
            </Link>
          </div>
          {product.rentable && product.status !== "품절" && (
            <Link href="/checkout" className="block mt-2">
              <Button variant="outline" size="lg" className="w-full">
                렌탈로 시작하기
              </Button>
            </Link>
          )}
        </div>
      </div>

      <ProductDetailTabs product={product} />
    </div>
  );
}
