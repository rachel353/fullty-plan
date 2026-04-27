import Link from "next/link";
import { ImageBox } from "@/components/ImageBox";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { products } from "@/lib/mock";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const cartItems = [
    { product: products[0], qty: 1, type: "구매" as const },
    { product: products[3], qty: 1, type: "렌탈" as const, days: 14 },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price, 0);
  const shipping = 35000;
  const total = subtotal + shipping;

  return (
    <div className="max-w-canvas mx-auto px-12 py-16">
      <div className="border-b border-border pb-8 mb-12">
        <div className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase mb-3">
          Bag
        </div>
        <h1 className="font-display text-5xl text-sage-ink leading-none">장바구니</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item, i) => (
            <div key={i} className="border border-border p-4 flex gap-4">
              <ImageBox className="w-32 h-32 flex-shrink-0" ratio="square" />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="outline">{item.type}</Badge>
                    <div className="text-[11px] text-muted-foreground mt-2">
                      {item.product.brand}
                    </div>
                    <div className="text-sm font-semibold">{item.product.name}</div>
                    <div className="text-[11px] text-muted-foreground">{item.product.option}</div>
                    {item.type === "렌탈" && (
                      <div className="text-[11px] text-muted-foreground mt-1">
                        렌탈 기간: {item.days}일
                      </div>
                    )}
                  </div>
                  <button className="text-xs text-muted-foreground hover:text-foreground">
                    삭제
                  </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-xs text-muted-foreground">수량 {item.qty}</div>
                  <div className="text-sm font-semibold">{formatPrice(item.product.price)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="border border-border p-6 h-fit space-y-3 text-sm">
          <div className="text-base font-semibold pb-3 border-b border-border">결제 정보</div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">상품 금액</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">배송비</span>
            <span>{formatPrice(shipping)}</span>
          </div>
          <div className="flex justify-between pt-3 border-t border-border font-semibold">
            <span>총 결제 금액</span>
            <span className="text-base">{formatPrice(total)}</span>
          </div>
          <Link href="/checkout" className="block">
            <Button size="lg" className="w-full mt-2">
              주문하기
            </Button>
          </Link>
          <Link href="/" className="block mt-2">
            <Button variant="outline" size="lg" className="w-full">
              계속 쇼핑하기
            </Button>
          </Link>
        </aside>
      </div>
    </div>
  );
}
