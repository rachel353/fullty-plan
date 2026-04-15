import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AddressSearch } from "@/components/ui/AddressSearch";

export default function CheckoutPage() {
  return (
    <div className="max-w-5xl mx-auto px-12 py-16">
      <div className="border-b border-border pb-8 mb-12">
        <div className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase mb-3">
          Checkout
        </div>
        <h1 className="font-display text-5xl text-sage-ink leading-none">주문 / 결제</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          <Section title="배송지">
            <div className="space-y-3">
              <Field label="받는 사람" placeholder="홍길동" />
              <Field label="연락처" placeholder="010-0000-0000" />
              <div className="grid grid-cols-4 items-start gap-3">
                <label className="text-xs text-muted-foreground mt-3">주소</label>
                <div className="col-span-3">
                  <AddressSearch placeholder="주소 검색 버튼을 눌러 주소를 입력해 주세요" />
                </div>
              </div>
              <Field label="배송 메모" placeholder="문 앞에 놓아주세요" />
            </div>
          </Section>

          <Section title="배송 옵션">
            <div className="space-y-2">
              {[
                { label: "표준 배송 (3~5일)", price: "35,000원", checked: true },
                { label: "지정일 배송", price: "45,000원" },
                { label: "조립 / 설치 포함", price: "85,000원" },
              ].map((opt) => (
                <label
                  key={opt.label}
                  className="flex items-center justify-between border border-border p-4 cursor-pointer hover:bg-muted"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      defaultChecked={opt.checked}
                      className="accent-foreground"
                    />
                    <span className="text-sm">{opt.label}</span>
                  </div>
                  <span className="text-sm font-medium">{opt.price}</span>
                </label>
              ))}
            </div>
          </Section>

          <Section title="결제 수단">
            <div className="grid grid-cols-3 gap-2">
              {["신용/체크카드", "계좌이체", "네이버페이", "카카오페이", "토스페이", "풀티머니"].map(
                (m, i) => (
                  <button
                    key={m}
                    className={
                      i === 0
                        ? "h-11 text-sm border border-foreground bg-foreground text-background"
                        : "h-11 text-sm border border-border hover:bg-muted"
                    }
                  >
                    {m}
                  </button>
                )
              )}
            </div>
          </Section>
        </div>

        <aside className="border border-border p-6 h-fit space-y-3 text-sm">
          <div className="text-base font-semibold pb-3 border-b border-border">최종 결제 금액</div>
          <Row label="상품 금액" value="2,260,000원" />
          <Row label="배송비" value="35,000원" />
          <Row label="할인" value="-50,000원" />
          <div className="flex justify-between pt-3 border-t border-border font-semibold">
            <span>총 결제 금액</span>
            <span className="text-base">2,245,000원</span>
          </div>
          <Link href="/checkout/complete" className="block">
            <Button size="lg" className="w-full mt-2">
              결제하기
            </Button>
          </Link>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            모든 상품은 Fullty 검수 완료 후 셀러 발송 → Fullty → 구매자 순서로 진행됩니다.
          </p>
        </aside>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-base font-semibold mb-4 pb-2 border-b border-border">{title}</h2>
      {children}
    </section>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div className="grid grid-cols-4 items-center gap-3">
      <label className="text-xs text-muted-foreground">{label}</label>
      <input
        className="col-span-3 h-10 px-3 text-sm border border-border bg-background"
        placeholder={placeholder}
      />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}
