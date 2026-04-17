import Link from "next/link";
import { ImageBox } from "@/components/ImageBox";
import { Button } from "@/components/ui/Button";
import { products } from "@/lib/mock";
import { formatPrice } from "@/lib/utils";

export default function WishlistPage() {
  const wishlist = products.slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold">위시리스트</h2>
          <p className="text-sm text-muted-foreground mt-1">{wishlist.length}개 상품</p>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground text-sm">
          위시리스트에 담은 상품이 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((p) => (
            <div key={p.id}>
              <div className="relative">
                <ImageBox ratio="square" />
                {p.status === "품절" && (
                  <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
                    <span className="text-background text-xs tracking-widest">SOLD OUT</span>
                  </div>
                )}
              </div>
              <div className="text-[11px] text-muted-foreground mt-2">{p.brand}</div>
              <div className="text-sm font-medium">{p.name}</div>
              <div className="text-sm font-semibold mt-0.5">{formatPrice(p.price)}</div>
              <div className="flex gap-2 mt-2">
                <Link href={`/products/${p.id}`} className="flex-1">
                  <Button size="sm" variant="outline" className="w-full">
                    상품 보기
                  </Button>
                </Link>
                <Button size="sm" variant="ghost" className="px-2 text-muted-foreground hover:text-foreground">
                  ✕
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
