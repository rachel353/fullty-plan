import { Badge } from "@/components/ui/Badge";
import { ImageBox } from "@/components/ImageBox";
import { sellRequests } from "@/lib/mock";

const steps = [
  "접수 완료",
  "배송비 결제 완료",
  "픽업 대기",
  "픽업 완료",
  "검수 중",
  "최종 금액 제안",
  "계약 완료",
];

export default function MySellPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold">SELL 내역</h2>
      </div>

      <div className="space-y-4">
        {sellRequests.map((s) => {
          const currentStep = steps.indexOf(s.status);
          return (
            <div key={s.id} className="border border-border p-5">
              <div className="flex gap-5">
                <ImageBox className="w-28 h-28 flex-shrink-0" ratio="square" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={s.type === "위탁" ? "outline" : "default"}>{s.type}</Badge>
                    <Badge variant="muted">{s.id}</Badge>
                  </div>
                  <div className="text-[11px] text-muted-foreground">{s.brand}</div>
                  <div className="text-sm font-semibold">{s.model}</div>
                  <div className="text-xs text-muted-foreground mt-1">신청일 {s.createdAt}</div>
                  <div className="text-sm font-medium mt-2">
                    예상 금액 {s.estimated.toLocaleString()}원
                  </div>
                </div>
              </div>

              {/* Stepper */}
              <div className="mt-5 pt-5 border-t border-border">
                <div className="grid grid-cols-7 gap-1">
                  {steps.map((step, i) => (
                    <div key={step} className="text-center">
                      <div
                        className={
                          i <= currentStep
                            ? "h-1 bg-foreground"
                            : "h-1 bg-muted"
                        }
                      />
                      <div
                        className={
                          i === currentStep
                            ? "text-[10px] font-semibold mt-2"
                            : "text-[10px] text-muted-foreground mt-2"
                        }
                      >
                        {step}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reject action for '최종 금액 제안' */}
              {s.status === "최종 금액 제안" && (
                <div className="mt-5 pt-5 border-t border-border">
                  <div className="text-xs font-semibold mb-3">제안 확인 필요</div>
                  <div className="grid grid-cols-3 gap-2">
                    <button className="h-10 border border-foreground bg-foreground text-background text-xs">
                      수락
                    </button>
                    <button className="h-10 border border-border text-xs hover:bg-muted">
                      거절 — 가격 낮음
                    </button>
                    <button className="h-10 border border-border text-xs hover:bg-muted">
                      거절 — 기타 사유
                    </button>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
                    거절 시 Fullty 운영팀이 재제안을 드릴 수 있도록 채널톡으로 연결됩니다.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
