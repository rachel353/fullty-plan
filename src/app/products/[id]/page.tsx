import { notFound } from "next/navigation";
import Link from "next/link";
import { ImageBox } from "@/components/ImageBox";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
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
          <div className="py-6 border-b border-border space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">셀러</span>
              <span>{product.seller}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">등급</span>
              <span>{product.grade} (풀티 검수 완료)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">배송</span>
              <span>표준 배송 · 35,000원</span>
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
              <div className="text-[11px] text-muted-foreground mt-3">
                * 최대 90일까지 렌탈 가능. 종료 7일 전 연장 / 구매전환 / 회수 선택
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="pt-6 grid grid-cols-2 gap-2">
            <Button variant="outline" size="lg" disabled={product.status === "품절"}>
              장바구니 담기
            </Button>
            <Button size="lg" disabled={product.status === "품절"}>
              바로 구매
            </Button>
          </div>
          {product.rentable && product.status !== "품절" && (
            <Button variant="outline" size="lg" className="w-full mt-2">
              렌탈로 시작하기
            </Button>
          )}
        </div>
      </div>

      {/* Detail tabs */}
      <div className="mt-20 border-t border-border pt-12">
        <div className="flex gap-8 border-b border-border mb-8">
          {["상품 정보", "검수 등급", "배송 / 반품", "리뷰"].map((tab, i) => (
            <button
              key={tab}
              className={
                i === 0
                  ? "pb-3 border-b-2 border-foreground text-sm font-semibold"
                  : "pb-3 text-sm text-muted-foreground hover:text-foreground"
              }
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              {product.brand}의 대표작 {product.name}입니다. 풀티 검수팀의 자체 기준에 의해
              {product.grade} 등급으로 평가되었습니다.
            </p>
            <ImageBox ratio="wide" label="상세 이미지 영역" />
            <p>
              사용감과 본래 디자인 의도가 잘 보존된 상태로, 일상에서 매일 사용해도 좋은 컨디션입니다.
              모든 상품은 풀티 검수 후 노출됩니다.
            </p>
          </div>
          <div className="border border-border p-5 h-fit">
            <div className="text-xs font-semibold tracking-widest mb-4">FULLTY 등급 기준</div>
            <ul className="space-y-2 text-xs">
              {(["SS", "S", "A+", "A", "B"] as const).map((g) => (
                <li key={g} className="flex items-center justify-between">
                  <span className="font-medium">{g}</span>
                  <span className="text-muted-foreground">
                    {g === "SS"
                      ? "최상품 / 거의 신품"
                      : g === "S"
                      ? "사용감 매우 적음"
                      : g === "A+"
                      ? "우수한 컨디션"
                      : g === "A"
                      ? "양호한 사용감"
                      : "기능적 사용감"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
