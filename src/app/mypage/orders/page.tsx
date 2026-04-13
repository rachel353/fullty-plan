import { ImageBox } from "@/components/ImageBox";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { orders } from "@/lib/mock";
import { formatPrice } from "@/lib/utils";

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between border-b border-border pb-4">
        <h2 className="text-xl font-bold">주문 조회</h2>
        <div className="flex items-center gap-2">
          <Select placeholder="최근 3개월" options={["최근 3개월", "최근 6개월", "최근 1년"]} className="w-32" />
          <Select placeholder="전체 상태" options={["전체 상태", "배송 준비", "배송 중", "배송 완료", "구매 확정"]} className="w-32" />
        </div>
      </div>

      <div className="space-y-3">
        {orders.map((o) => (
          <div key={o.id} className="border border-border p-4">
            <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
              <div className="text-xs text-muted-foreground">{o.date} · 주문번호 {o.id}</div>
              <Badge variant="default">{o.status}</Badge>
            </div>
            <div className="flex gap-4">
              <ImageBox className="w-24 h-24 flex-shrink-0" ratio="square" />
              <div className="flex-1">
                <div className="text-[11px] text-muted-foreground">{o.brand}</div>
                <div className="text-sm font-semibold">{o.productName}</div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={o.type === "렌탈" ? "outline" : "muted"}>{o.type}</Badge>
                  <span className="text-sm font-medium">{formatPrice(o.price)}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button size="sm" variant="outline">
                  배송 조회
                </Button>
                {o.status === "배송 완료" && <Button size="sm">구매 확정 (D-5)</Button>}
                {o.status === "구매 확정" && (
                  <Button size="sm" variant="outline">
                    리뷰 작성
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
