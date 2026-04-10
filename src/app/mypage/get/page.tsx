import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getRequests } from "@/lib/mock";

export default function MyGetPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4 flex items-end justify-between">
        <h2 className="text-xl font-bold">GET 내역</h2>
        <Button size="sm">새 요청 작성</Button>
      </div>

      <div className="space-y-3">
        {getRequests.map((req) => (
          <div key={req.id} className="border border-border p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[11px] text-muted-foreground">{req.id} · {req.createdAt}</div>
                <div className="text-[11px] text-muted-foreground mt-2">{req.brand}</div>
                <div className="text-sm font-semibold">{req.model}</div>
                <div className="text-[11px] text-muted-foreground">{req.option}</div>
                <div className="text-sm font-medium mt-2">희망가 {req.budget.toLocaleString()}원</div>
              </div>
              <Badge
                variant={
                  req.status === "거래 완료"
                    ? "muted"
                    : req.status === "셀러 제안"
                    ? "default"
                    : "outline"
                }
              >
                {req.status}
              </Badge>
            </div>

            {req.proposalCount > 0 && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="text-xs font-semibold mb-3">
                  셀러 제안 {req.proposalCount}건 (풀티 검수 완료)
                </div>
                <div className="space-y-2">
                  {Array.from({ length: req.proposalCount }).map((_, i) => (
                    <div
                      key={i}
                      className="border border-border p-3 flex items-center justify-between"
                    >
                      <div>
                        <div className="text-[11px] text-muted-foreground">
                          셀러 #{1000 + i} · 등급 {["S", "A+", "A"][i % 3]}
                        </div>
                        <div className="text-sm font-medium mt-0.5">
                          {(req.budget * (0.92 + i * 0.04)).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          상세
                        </Button>
                        <Button size="sm">결제</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
