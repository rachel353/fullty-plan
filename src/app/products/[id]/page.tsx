import { notFound } from "next/navigation";
import Link from "next/link";
import { ImageBox } from "@/components/ImageBox";
import { Badge } from "@/components/ui/Badge";
import { ProductDetailTabs } from "@/components/ProductDetailTabs";
import { ProductPurchasePanel } from "@/components/ProductPurchasePanel";
import { products } from "@/lib/mock";
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

          <ProductPurchasePanel product={product} />
        </div>
      </div>

      <ProductDetailTabs product={product} />
    </div>
  );
}
