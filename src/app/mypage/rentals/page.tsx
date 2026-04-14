import { ImageBox } from "@/components/ImageBox";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const rentals = [
  {
    id: "r001",
    brand: "Fritz Hansen",
    name: "Egg Chair",
    period: "2026-03-15 ~ 2026-04-13",
    daysLeft: 3,
    extended: 0,
    rentalFee: 850000,
  },
  {
    id: "r002",
    brand: "Cassina",
    name: "LC4 Chaise Longue",
    period: "2026-03-25 ~ 2026-04-23",
    daysLeft: 13,
    extended: 1,
    rentalFee: 1240000,
  },
];

export default function RentalsPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4 flex items-end justify-between">
        <h2 className="text-xl font-bold">렌탈 중인 상품</h2>
        <div className="text-xs text-muted-foreground">
          기본 최대 90일 · 연장 시 추가 최대 90일
        </div>
      </div>

      <div className="space-y-4">
        {rentals.map((r) => (
          <div key={r.id} className="border border-border p-5">
            <div className="flex gap-5">
              <ImageBox className="w-32 h-32 flex-shrink-0" ratio="square" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">렌탈 중</Badge>
                  {r.extended > 0 && <Badge variant="default">연장 {r.extended}차</Badge>}
                </div>
                <div className="text-[11px] text-muted-foreground">{r.brand}</div>
                <div className="text-sm font-semibold">{r.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{r.period}</div>
                <div className="text-xs text-muted-foreground">렌탈료 {r.rentalFee.toLocaleString()}원</div>

                <div className="mt-3">
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1.5">
                    <span>종료까지</span>
                    <span className="font-medium text-foreground">D-{r.daysLeft}</span>
                  </div>
                  <div className="h-1 bg-muted">
                    <div
                      className="h-1 bg-foreground"
                      style={{ width: `${100 - (r.daysLeft / 30) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {r.daysLeft <= 7 && (
              <div className="mt-5 pt-5 border-t border-border">
                <div className="text-xs font-semibold mb-3">종료 후 다음 단계 선택</div>
                <div className="grid grid-cols-4 gap-2">
                  <Button variant="outline" size="sm" disabled={r.extended >= 1}>
                    연장하기
                  </Button>
                  <Button variant="outline" size="sm">
                    구매 전환 (차액 결제)
                  </Button>
                  <Button variant="outline" size="sm">
                    Fullty 픽업 회수
                  </Button>
                  <Button variant="outline" size="sm">
                    직접 반납
                  </Button>
                </div>
                <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
                  연장은 추가 최대 90일까지 가능하며, 연장 이후에는 구매 전환 또는 회수만
                  가능합니다. 구매 전환 시 <strong>렌탈 시작 시점 판매가 - 누적 렌탈료</strong>를
                  즉시 결제하면 소유권이 이전되고 자산화 등록이 가능합니다.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
