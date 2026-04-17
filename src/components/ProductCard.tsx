"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { ImageBox } from "./ImageBox";
import { Badge } from "./ui/Badge";
import { Product } from "@/lib/mock";
import { formatPrice } from "@/lib/utils";
import { useWishlist } from "@/lib/wishlist-context";

export function ProductCard({ product }: { product: Product }) {
  const { toggle, isWished } = useWishlist();
  const wished = isWished(product.id);

  return (
    <div className="group block relative">
      <Link href={`/products/${product.id}`} className="block">
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

      {/* 위시리스트 버튼 */}
      <button
        onClick={() => toggle(product.id)}
        aria-label={wished ? "위시리스트 제거" : "위시리스트 추가"}
        className="absolute top-3 right-3 w-8 h-8 bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors"
      >
        <Heart
          size={14}
          className={wished ? "fill-sage-deep text-sage-deep" : "text-muted-foreground"}
        />
      </button>
    </div>
  );
}
