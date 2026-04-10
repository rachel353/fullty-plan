import { ImageBox } from "@/components/ImageBox";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { assets, products } from "@/lib/mock";
import { formatPrice } from "@/lib/utils";

export default function CollectionPage() {
  const totalValue = assets.reduce((sum, a) => sum + a.currentValue, 0);
  const wishlist = products.slice(0, 4);

  return (
    <div className="space-y-10">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold">컬렉션</h2>
        <p className="text-sm text-muted-foreground mt-1">
          위시리스트와 자산 리포트를 한 곳에서 관리합니다.
        </p>
      </div>

      {/* Asset summary */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle>자산 리포트</CardTitle>
            <div className="text-xs text-muted-foreground mt-1">
              풀티에서 구매했거나 직접 등록한 가구의 실시간 시세
            </div>
          </div>
          <Button size="sm" variant="outline">
            가구 등록하기
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="border border-border p-4">
              <div className="text-[11px] text-muted-foreground">총 자산 가치</div>
              <div className="text-2xl font-bold mt-2">{formatPrice(totalValue)}</div>
              <div className="text-[11px] text-muted-foreground mt-1">전월 대비 +2.4%</div>
            </div>
            <div className="border border-border p-4">
              <div className="text-[11px] text-muted-foreground">보유 가구</div>
              <div className="text-2xl font-bold mt-2">{assets.length}점</div>
              <div className="text-[11px] text-muted-foreground mt-1">평균 등급 S</div>
            </div>
            <div className="border border-border p-4">
              <div className="text-[11px] text-muted-foreground">예상 렌탈 수익 / 월</div>
              <div className="text-2xl font-bold mt-2">128,000원</div>
              <div className="text-[11px] text-muted-foreground mt-1">렌탈 활성화 시</div>
            </div>
          </div>

          <ImageBox ratio="wide" label="보유 가구 합산 가치 추이 차트" />

          <div className="mt-6 divide-y divide-border border-t border-border">
            {assets.map((a) => (
              <div key={a.id} className="py-4 grid grid-cols-12 gap-4 items-center text-sm">
                <div className="col-span-1">
                  <div className="w-12 h-12 bg-muted" />
                </div>
                <div className="col-span-4">
                  <div className="text-[11px] text-muted-foreground">{a.brand}</div>
                  <div className="font-medium">{a.name}</div>
                </div>
                <div className="col-span-2">
                  <Badge variant="default">{a.grade}</Badge>
                </div>
                <div className="col-span-2 text-xs text-muted-foreground">{a.acquiredAt}</div>
                <div className="col-span-2 font-medium">{formatPrice(a.currentValue)}</div>
                <div className="col-span-1 text-right">
                  <Badge variant="muted">{a.source}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Wishlist */}
      <Card>
        <CardHeader>
          <CardTitle>위시리스트</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
                <div className="text-sm font-semibold mt-1">{formatPrice(p.price)}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
