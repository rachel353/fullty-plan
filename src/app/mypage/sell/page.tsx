import Link from "next/link";
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
        <p className="text-sm text-muted-foreground mt-1">
          신청 카드를 클릭하면 현재 단계별 상세 화면으로 이동합니다.
        </p>
      </div>

      <div className="space-y-4">
        {sellRequests.map((s) => {
          const currentStep = steps.indexOf(s.status);
          const needsAction = s.status === "최종 금액 제안";
          return (
            <Link
              key={s.id}
              href={`/mypage/sell/${s.id}`}
              className="block border border-border p-5 hover:bg-sage-soft/30 transition-colors"
            >
              <div className="flex gap-5">
                <ImageBox className="w-28 h-28 flex-shrink-0" ratio="square" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="muted">{s.id}</Badge>
                    {needsAction && <Badge variant="default">확인 필요</Badge>}
                  </div>
                  <div className="text-[11px] text-muted-foreground">{s.brand}</div>
                  <div className="text-sm font-semibold">{s.model}</div>
                  <div className="text-xs text-muted-foreground mt-1">신청일 {s.createdAt}</div>
                  <div className="text-sm font-medium mt-2">
                    예상 금액 {s.estimated.toLocaleString()}원
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                    현재 상태
                  </div>
                  <Badge variant="outline" className="mt-2">
                    {s.status}
                  </Badge>
                  <div className="text-[10px] text-sage-deep mt-3">상세 보기 →</div>
                </div>
              </div>

              {/* Stepper */}
              <div className="mt-5 pt-5 border-t border-border">
                <div className="grid grid-cols-7 gap-1">
                  {steps.map((step, i) => (
                    <div key={step} className="text-center">
                      <div
                        className={
                          i <= currentStep ? "h-1 bg-sage-deep" : "h-1 bg-muted"
                        }
                      />
                      <div
                        className={
                          i === currentStep
                            ? "text-[10px] font-semibold text-sage-ink mt-2"
                            : "text-[10px] text-muted-foreground mt-2"
                        }
                      >
                        {step}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
