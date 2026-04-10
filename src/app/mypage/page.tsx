import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { orders, getRequests, sellRequests, assets } from "@/lib/mock";
import { formatPrice } from "@/lib/utils";

export default function MypageHome() {
  const totalAsset = assets.reduce((sum, a) => sum + a.currentValue, 0);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Stat label="진행 중 주문" value={`${orders.length}건`} />
        <Stat label="GET 요청" value={`${getRequests.length}건`} />
        <Stat label="SELL 진행" value={`${sellRequests.length}건`} />
        <Stat label="총 자산 가치" value={formatPrice(totalAsset)} />
      </div>

      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>최근 주문</CardTitle>
          <Link href="/mypage/orders" className="text-xs hover:underline underline-offset-4">
            전체 보기 →
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {orders.map((o) => (
              <div key={o.id} className="p-5 grid grid-cols-12 gap-4 items-center text-sm">
                <div className="col-span-1 text-[11px] text-muted-foreground">{o.id}</div>
                <div className="col-span-5">
                  <div className="text-[11px] text-muted-foreground">{o.brand}</div>
                  <div className="font-medium">{o.productName}</div>
                </div>
                <div className="col-span-2">
                  <Badge variant={o.type === "렌탈" ? "outline" : "muted"}>{o.type}</Badge>
                </div>
                <div className="col-span-2 font-medium">{formatPrice(o.price)}</div>
                <div className="col-span-2 text-right">
                  <Badge variant="default">{o.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>알림 미확인</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {[
              "Aeron Chair 배송이 시작되었습니다.",
              "Egg Chair 렌탈 종료까지 D-3입니다.",
              "GET 요청 'Stool 60'에 새 셀러 제안 1건",
              "SELL 'Embody Chair' 검수 결과가 등록되었습니다.",
            ].map((n) => (
              <div key={n} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                <div className="w-1.5 h-1.5 rounded-full bg-foreground mt-1.5" />
                <div className="flex-1 text-muted-foreground">{n}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>다음 액션</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <ActionRow label="구매 확정 대기" value="1건" />
            <ActionRow label="렌탈 종료 임박" value="1건 (D-3)" />
            <ActionRow label="검토할 셀러 제안" value="2건" />
            <ActionRow label="자산화 가능 가구" value="1건" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border p-5">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className="text-xl font-bold mt-2">{value}</div>
    </div>
  );
}

function ActionRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center pb-3 border-b border-border last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
