import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getRequests } from "@/lib/mock";

export default function SellerGetRequestsPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold">GET 요청 알림</h2>
        <p className="text-sm text-muted-foreground mt-1">
          관심 카테고리에 등록된 새로운 구해주세요 요청. 제안 시 풀티 검수 후 사용자에게 전달됩니다.
        </p>
      </div>

      <div className="border border-border p-4 bg-muted/40 text-xs text-muted-foreground">
        관심 키워드 · <strong className="text-foreground">Herman Miller</strong>{" "}
        <strong className="text-foreground">Vitra</strong>{" "}
        <strong className="text-foreground">USM</strong>
        <button className="ml-2 underline">변경</button>
      </div>

      <div className="space-y-3">
        {getRequests.map((req) => (
          <div key={req.id} className="border border-border p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-[11px] text-muted-foreground">
                  {req.id} · {req.createdAt}
                </div>
                <div className="text-[11px] text-muted-foreground mt-2">{req.brand}</div>
                <div className="text-sm font-semibold">{req.model}</div>
                <div className="text-[11px] text-muted-foreground">{req.option}</div>
                <div className="text-sm font-medium mt-2">
                  희망가 {req.budget.toLocaleString()}원
                </div>
              </div>
              <Badge variant={req.proposalCount > 0 ? "default" : "outline"}>
                {req.proposalCount > 0 ? `${req.proposalCount}개 제안 등록됨` : "신규"}
              </Badge>
            </div>
            <div className="border-t border-border pt-4 flex items-center justify-between">
              <div className="text-[11px] text-muted-foreground">
                내가 제시 가능한 가격을 입력하면 풀티 검수 후 사용자에게 전달됩니다.
              </div>
              <Button size="sm">제안 작성</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
