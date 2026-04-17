"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { ImageBox } from "@/components/ImageBox";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { products } from "@/lib/mock";
import { formatPrice } from "@/lib/utils";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(products.slice(0, 6).map((p) => p.id));

  const wishedProducts = products.filter((p) => wishlist.includes(p.id));

  function remove(id: string) {
    setWishlist((prev) => prev.filter((i) => i !== id));
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold">위시리스트</h2>
          <p className="text-sm text-muted-foreground mt-1">{wishedProducts.length}개 상품</p>
        </div>
        {wishedProducts.length > 0 && (
          <button
            onClick={() => setWishlist([])}
            className="text-[11px] text-muted-foreground hover:text-sage-ink underline underline-offset-2 transition-colors"
          >
            전체 삭제
          </button>
        )}
      </div>

      {wishedProducts.length === 0 ? (
        <div className="py-24 flex flex-col items-center gap-4 text-center">
          <Heart size={32} strokeWidth={1} className="text-border" />
          <div className="text-sm text-muted-foreground">위시리스트에 담은 상품이 없습니다.</div>
          <Link href="/products">
            <Button variant="outline" size="sm">쇼핑 계속하기</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {wishedProducts.map((p) => (
            <div key={p.id} className="border border-border group">
              {/* Image + remove */}
              <div className="relative">
                <ImageBox ratio="square" />
                {p.status === "품절" && (
                  <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
                    <span className="text-background text-xs tracking-widest">SOLD OUT</span>
                  </div>
                )}
                <button
                  onClick={() => remove(p.id)}
                  aria-label="위시리스트 삭제"
                  className="absolute top-2 right-2 w-8 h-8 bg-background border border-border flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Heart size={14} className="text-sage-deep fill-sage-deep" />
                </button>
              </div>

              {/* Info */}
              <div className="p-3 space-y-1">
                <div className="text-[11px] text-muted-foreground">{p.brand}</div>
                <div className="text-sm font-medium text-sage-ink">{p.name}</div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="default">{p.grade}</Badge>
                  {p.availability === "rent" && (
                    <Badge variant="outline">렌탈 전용</Badge>
                  )}
                </div>
                <div className="text-sm font-semibold pt-1">{formatPrice(p.price)}</div>
              </div>

              {/* Buttons */}
              <div className="px-3 pb-3 flex gap-2">
                <Link href={`/products/${p.id}`} className="flex-1">
                  <Button size="sm" variant="outline" className="w-full">
                    상품 보기
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  disabled={p.status === "품절"}
                >
                  {p.status === "품절" ? "품절" : "장바구니"}
                </Button>
                <button
                  onClick={() => remove(p.id)}
                  className="w-9 h-9 border border-border flex items-center justify-center text-muted-foreground hover:text-sage-deep hover:border-sage-deep/40 transition-colors text-xs flex-shrink-0"
                  aria-label="삭제"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
