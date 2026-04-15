import Link from "next/link";
import { ImageBox } from "./ImageBox";
import { Badge } from "./ui/Badge";
import { Product } from "@/lib/mock";
import { formatPrice } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="relative overflow-hidden">
        <div className="transition-transform duration-700 group-hover:scale-[1.02]">
          <ImageBox ratio="portrait" />
        </div>
        {product.status === "품절" && (
          <div className="absolute inset-0 bg-sage-ink/70 flex items-center justify-center">
            <span className="text-background text-xs tracking-[0.3em] font-medium">SOLD OUT</span>
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <Badge variant="default">{product.grade}</Badge>
          {product.availability === "rent" && <Badge variant="sage">RENT ONLY</Badge>}
          {product.availability === "both" && <Badge variant="outline">BUY · RENT</Badge>}
        </div>
      </div>
      <div className="pt-4 space-y-1">
        <div className="text-[10px] text-muted-foreground tracking-[0.18em] uppercase">
          {product.brand}
        </div>
        <div className="font-display text-lg leading-tight group-hover:text-sage-deep transition-colors">
          {product.name}
        </div>
        <div className="text-[11px] text-muted-foreground">{product.option}</div>
        <div className="text-sm font-medium pt-1">{formatPrice(product.price)}</div>
      </div>
    </Link>
  );
}
