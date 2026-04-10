import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ImageBox } from "@/components/ImageBox";

export default function OrderCompletePage() {
  return (
    <div className="max-w-3xl mx-auto px-12 py-20">
      {/* Confirmation header */}
      <div className="text-center pb-12 border-b border-border">
        <Badge variant="sage" className="mb-6">
          ORDER CONFIRMED
        </Badge>
        <h1 className="font-display text-5xl text-sage-ink leading-[0.95]">
          주문이 완료되었습니다.
        </h1>
        <p className="text-sm text-muted-foreground mt-5 leading-relaxed">
          결제가 정상적으로 처리되었습니다.
          <br />
          배송 시작 시 알림톡과 이메일로 안내드립니다.
        </p>
      </div>

      {/* Order summary */}
      <div className="mt-12 space-y-1">
        <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-4">
          Order Summary
        </div>

        <div className="border border-border">
          <div className="grid grid-cols-2 divide-x divide-border">
            <Cell label="주문 번호" value="FUL-2026-04-10-1042" />
            <Cell label="결제 금액" value="2,245,000원" />
            <Cell label="결제 수단" value="신용/체크카드" />
            <Cell label="예상 배송 시작" value="2026-04-13" />
          </div>
        </div>
      </div>

      {/* Order items */}
      <div className="mt-10">
        <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-4">
          Items (2)
        </div>

        <div className="border border-border divide-y divide-border">
          {[
            {
              brand: "Herman Miller",
              name: "Aeron Chair",
              option: "Size B / Graphite",
              type: "구매",
              price: "1,280,000원",
            },
            {
              brand: "Carl Hansen",
              name: "CH24 Wishbone",
              option: "Oak Soap / Natural Paper Cord",
              type: "구매",
              price: "980,000원",
            },
          ].map((item) => (
            <div key={item.name} className="p-4 flex gap-4">
              <ImageBox className="w-20 h-20 flex-shrink-0" ratio="square" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Badge variant="muted">{item.type}</Badge>
                </div>
                <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground mt-2">
                  {item.brand}
                </div>
                <div className="text-sm font-medium">{item.name}</div>
                <div className="text-[11px] text-muted-foreground">{item.option}</div>
              </div>
              <div className="text-sm font-medium">{item.price}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery address */}
      <div className="mt-10">
        <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-4">
          Shipping
        </div>
        <div className="border border-border p-5 text-sm space-y-2">
          <div className="font-medium">홍길동 · 010-1234-5678</div>
          <div className="text-muted-foreground">서울특별시 마포구 와우산로 ...</div>
          <div className="text-[11px] text-muted-foreground">표준 배송 (3~5일) · 문 앞에 놓아주세요</div>
        </div>
      </div>

      {/* Next steps */}
      <div className="mt-12 bg-sage-soft/40 border border-sage/40 p-6">
        <div className="text-[10px] tracking-[0.25em] uppercase text-sage-ink mb-3">
          Next Steps
        </div>
        <ul className="space-y-2 text-xs text-sage-ink">
          <li className="flex items-start gap-2">
            <span className="font-display text-base leading-none">·</span>
            <span>배송 단계는 마이페이지 &gt; 주문 조회에서 실시간으로 확인할 수 있습니다.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-display text-base leading-none">·</span>
            <span>배송 완료 후 7일이 지나면 자동으로 구매 확정됩니다.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-display text-base leading-none">·</span>
            <span>구매 확정 후 가구를 자산으로 등록하면 시세 변동을 추적할 수 있습니다.</span>
          </li>
        </ul>
      </div>

      {/* CTA */}
      <div className="mt-12 grid grid-cols-2 gap-3">
        <Link href="/mypage/orders" className="block">
          <Button variant="outline" size="lg" className="w-full">
            주문 내역 보기
          </Button>
        </Link>
        <Link href="/products" className="block">
          <Button size="lg" className="w-full">
            계속 쇼핑하기
          </Button>
        </Link>
      </div>
    </div>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-5">
      <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">{label}</div>
      <div className="text-sm font-medium mt-1">{value}</div>
    </div>
  );
}
