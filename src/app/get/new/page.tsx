import { Button } from "@/components/ui/Button";

export default function NewGetRequestPage() {
  return (
    <div className="max-w-3xl mx-auto px-12 py-16">
      <div className="border-b border-border pb-8 mb-8">
        <div className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase mb-3">
          New Request
        </div>
        <h1 className="font-display text-5xl text-sage-ink leading-none">구해주세요 요청 작성</h1>
      </div>
      <p className="text-sm text-muted-foreground mb-8">
        브랜드와 모델을 입력하면 자동완성으로 정확한 매칭을 도와드립니다.
      </p>

      <div className="space-y-6">
        <Field label="브랜드" placeholder="예) Herman Miller" hint="등록된 브랜드 자동완성이 지원됩니다." />
        <Field label="모델명" placeholder="예) Aeron Chair" />
        <Field label="옵션 / 사이즈" placeholder="예) Size B / Graphite" />
        <Field label="희망 가격" placeholder="예) 1,200,000원" />

        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">상태 선호도</label>
          <div className="grid grid-cols-5 gap-2">
            {(["SS", "S", "A+", "A", "B"] as const).map((g) => (
              <button
                key={g}
                className="h-11 text-sm font-medium border border-border hover:bg-muted"
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">참고 이미지 (선택)</label>
          <div className="border border-dashed border-border h-32 flex items-center justify-center text-xs text-muted-foreground">
            클릭하여 이미지 업로드
          </div>
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">메모</label>
          <textarea
            rows={4}
            placeholder="찾는 상품의 디테일, 사용처, 조건 등을 자유롭게 작성하세요."
            className="w-full p-3 text-sm border border-border bg-background resize-none"
          />
        </div>

        <div className="border-t border-border pt-6 flex justify-end gap-2">
          <Button variant="outline">취소</Button>
          <Button>요청 등록</Button>
        </div>

        <div className="border border-border p-4 text-[11px] text-muted-foreground leading-relaxed">
          요청 등록 시 인증된 셀러에게 자동으로 알림이 발송됩니다. 셀러 제안은 풀티의 사전 검수
          후에만 알림톡으로 전달됩니다. 채팅 / 직거래는 지원하지 않습니다.
        </div>
      </div>
    </div>
  );
}

function Field({ label, placeholder, hint }: { label: string; placeholder: string; hint?: string }) {
  return (
    <div>
      <label className="text-xs text-muted-foreground mb-1.5 block">{label}</label>
      <input
        placeholder={placeholder}
        className="w-full h-11 px-3 text-sm border border-border bg-background"
      />
      {hint && <div className="text-[11px] text-muted-foreground mt-1">{hint}</div>}
    </div>
  );
}
