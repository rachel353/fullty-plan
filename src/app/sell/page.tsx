import { Button } from "@/components/ui/Button";

export default function SellPage() {
  return (
    <div className="max-w-3xl mx-auto px-12 py-16">
      <div className="border-b border-border pb-8 mb-10">
        <div className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase mb-3">
          Sell — 위탁 / 매입
        </div>
        <h1 className="font-display text-5xl text-sage-ink leading-none">Send Yours.</h1>
        <p className="text-sm text-muted-foreground mt-4">
          소유 가구를 풀티에 매입하거나 위탁 판매할 수 있습니다. 신청 후 픽업 → 검수 → 최종 금액
          제안 순서로 진행됩니다.
        </p>
      </div>

      {/* Flow steps */}
      <ol className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-10">
        {["1. 신청", "2. 픽업비 결제", "3. 픽업", "4. 검수", "5. 금액 제안 / 계약"].map((s, i) => (
          <li
            key={s}
            className={
              i === 0
                ? "border border-foreground bg-foreground text-background h-12 flex items-center justify-center text-xs font-medium"
                : "border border-border h-12 flex items-center justify-center text-xs text-muted-foreground"
            }
          >
            {s}
          </li>
        ))}
      </ol>

      <div className="space-y-6">
        <Field label="브랜드" placeholder="예) Herman Miller" />
        <Field label="모델명" placeholder="예) Aeron Chair" />
        <Field label="구매 시기" placeholder="예) 2024년 3월" />

        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">신청 유형</label>
          <div className="grid grid-cols-2 gap-2">
            <button className="h-12 border border-foreground bg-foreground text-background text-sm font-medium">
              위탁 판매
            </button>
            <button className="h-12 border border-border text-sm font-medium hover:bg-muted">
              매입 (풀티가 직접 구매)
            </button>
          </div>
          <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
            위탁: 판매 완료 시 수수료 차감 후 정산 / 매입: 검수 후 풀티가 즉시 구매
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="크기 (가로 × 세로 × 높이 cm)" placeholder="예) 70 × 65 × 110" />
          <Field label="픽업 지역" placeholder="예) 서울 마포구" />
        </div>

        <div className="border border-border p-4 text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">예상 픽업 배송비</span>
            <span className="font-medium">45,000원</span>
          </div>
          <div className="flex justify-between text-[11px] text-muted-foreground">
            <span>* 추가 작업 발생 시 별도 결제 안내</span>
          </div>
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">상품 사진</label>
          <div className="border border-dashed border-border h-32 flex items-center justify-center text-xs text-muted-foreground">
            정면 / 측면 / 디테일 / 라벨 사진을 업로드해 주세요
          </div>
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">상태 메모</label>
          <textarea
            rows={3}
            placeholder="흠집, 사용감, 보관 조건 등 자유롭게 작성"
            className="w-full p-3 text-sm border border-border bg-background resize-none"
          />
        </div>

        <div className="border-t border-border pt-6 flex justify-end gap-2">
          <Button variant="outline">임시 저장</Button>
          <Button>신청 및 픽업비 결제</Button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="text-xs text-muted-foreground mb-1.5 block">{label}</label>
      <input
        placeholder={placeholder}
        className="w-full h-11 px-3 text-sm border border-border bg-background"
      />
    </div>
  );
}
