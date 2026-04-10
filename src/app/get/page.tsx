import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { getRequests } from "@/lib/mock";

export default function GetListPage() {
  return (
    <div className="max-w-canvas mx-auto px-12 py-16">
      <PageHeader
        eyebrow="GET — Live Requests"
        title="구해주세요"
        description="원하는 가구를 등록하면 인증된 셀러가 직접 제안합니다. 채팅 없이 안전하게."
        actions={
          <Link href="/get/new">
            <Button size="lg">새 요청 작성</Button>
          </Link>
        }
      />

      {/* Info strip */}
      <div className="border border-border p-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "1. 요청 작성",
            desc: "브랜드 / 모델 / 옵션 / 희망 가격을 입력합니다.",
          },
          {
            title: "2. 셀러 제안",
            desc: "관심 카테고리를 등록한 셀러에게 자동 알림이 발송됩니다.",
          },
          {
            title: "3. 풀티 승인 후 거래",
            desc: "셀러 제안은 풀티 사전 검수 후 사용자에게 전달됩니다.",
          },
        ].map((step) => (
          <div key={step.title}>
            <div className="text-xs font-semibold tracking-widest mb-2">{step.title}</div>
            <div className="text-xs text-muted-foreground leading-relaxed">{step.desc}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-4">
        {["전체", "대기중", "셀러 제안", "거래 완료"].map((s, i) => (
          <button
            key={s}
            className={
              i === 0
                ? "px-4 h-9 text-xs font-medium border border-foreground bg-foreground text-background"
                : "px-4 h-9 text-xs font-medium border border-border hover:bg-muted"
            }
          >
            {s}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="border-t border-border">
        {getRequests.map((req) => (
          <div
            key={req.id}
            className="border-b border-border py-5 grid grid-cols-12 gap-4 items-center hover:bg-muted px-3 -mx-3 transition-colors"
          >
            <div className="col-span-1 text-[11px] text-muted-foreground">{req.id}</div>
            <div className="col-span-4">
              <div className="text-[11px] text-muted-foreground">{req.brand}</div>
              <div className="text-sm font-semibold mt-0.5">{req.model}</div>
              <div className="text-[11px] text-muted-foreground">{req.option}</div>
            </div>
            <div className="col-span-2 text-sm">
              <div className="text-[11px] text-muted-foreground">희망가</div>
              <div className="font-medium">{req.budget.toLocaleString()}원</div>
            </div>
            <div className="col-span-2 text-sm">
              <div className="text-[11px] text-muted-foreground">제안</div>
              <div className="font-medium">{req.proposalCount}건</div>
            </div>
            <div className="col-span-2 text-xs text-muted-foreground">{req.createdAt}</div>
            <div className="col-span-1 flex justify-end">
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
          </div>
        ))}
      </div>
    </div>
  );
}
