import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const grades = [
  { name: "WELCOME", min: 0, benefits: "기본 등급" },
  { name: "BRONZE", min: 1000000, benefits: "쿠폰 월 1매" },
  { name: "SILVER", min: 5000000, benefits: "쿠폰 월 2매 + 렌탈 5% 할인" },
  { name: "GOLD", min: 15000000, benefits: "쿠폰 월 3매 + 렌탈 10% 할인" },
  { name: "PLATINUM", min: 30000000, benefits: "전 카테고리 무료 배송" },
];

const coupons = [
  { id: "c1", name: "신규 가입 5만원 할인", expires: "2026-04-30" },
  { id: "c2", name: "렌탈 첫 주문 10% 할인", expires: "2026-05-15" },
];

export default function GradePage() {
  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold">등급 / 쿠폰 / 풀티머니</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>현재 등급</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between mb-6">
            <div>
              <Badge variant="default">SILVER</Badge>
              <div className="text-2xl font-bold mt-2">누적 구매 7,240,000원</div>
              <div className="text-[11px] text-muted-foreground mt-1">
                다음 등급(GOLD)까지 7,760,000원
              </div>
            </div>
          </div>
          <div className="space-y-2">
            {grades.map((g, i) => (
              <div
                key={g.name}
                className="grid grid-cols-12 items-center border border-border p-3 text-xs"
              >
                <div className="col-span-2 font-semibold">{g.name}</div>
                <div className="col-span-4 text-muted-foreground">
                  {g.min.toLocaleString()}원 이상
                </div>
                <div className="col-span-5 text-muted-foreground">{g.benefits}</div>
                <div className="col-span-1 text-right">
                  {i === 2 && <Badge variant="default">현재</Badge>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>쿠폰 ({coupons.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {coupons.map((c) => (
              <div key={c.id} className="border border-border p-3">
                <div className="text-sm font-medium">{c.name}</div>
                <div className="text-[11px] text-muted-foreground mt-1">~ {c.expires}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>풀티머니</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">124,500원</div>
            <div className="text-[11px] text-muted-foreground mt-1">사용 가능 잔액</div>
            <div className="mt-4 space-y-2 text-xs">
              {[
                { date: "2026-04-08", desc: "구매 적립", amount: "+12,800" },
                { date: "2026-03-25", desc: "리뷰 적립", amount: "+3,000" },
                { date: "2026-03-12", desc: "결제 사용", amount: "-50,000" },
              ].map((row) => (
                <div key={row.date} className="flex items-center justify-between border-b border-border pb-2 last:border-0">
                  <div>
                    <div className="text-[11px] text-muted-foreground">{row.date}</div>
                    <div>{row.desc}</div>
                  </div>
                  <div className="font-medium">{row.amount}원</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
