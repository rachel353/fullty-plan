import { Button } from "@/components/ui/Button";
import { ImageBox } from "@/components/ImageBox";
import { Badge } from "@/components/ui/Badge";

export default function NewSellerProductPage() {
  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold">상품 등록</h2>
        <p className="text-sm text-muted-foreground mt-1">
          등록 후 풀티 사전 검수를 거쳐 노출됩니다.
        </p>
      </div>

      <Section title="기본 정보">
        <div className="grid grid-cols-2 gap-3">
          <Field label="브랜드" placeholder="Herman Miller" />
          <Field label="모델명" placeholder="Aeron Chair" />
          <Field label="옵션 / 사이즈" placeholder="Size B / Graphite" />
          <Field label="카테고리" placeholder="가구 / 조명 / 테이블웨어 / 홈데코 / 아트" />
        </div>
      </Section>

      <Section title="상태 등급">
        <div className="grid grid-cols-5 gap-2">
          {(["SS", "S", "A+", "A", "B"] as const).map((g, i) => (
            <button
              key={g}
              className={
                i === 1
                  ? "h-12 border border-foreground bg-foreground text-background text-sm font-semibold"
                  : "h-12 border border-border text-sm font-medium hover:bg-muted"
              }
            >
              {g}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground mt-2">
          등급 선택 시 권장 판매가 가이드가 표시됩니다.
        </p>
      </Section>

      <Section title="가격">
        <div className="grid grid-cols-2 gap-3">
          <Field label="공급가" placeholder="900,000" suffix="원" />
          <Field label="판매가" placeholder="1,280,000" suffix="원" />
          <Field label="배송비" placeholder="35,000" suffix="원" />
          <Field label="VAT" placeholder="0" suffix="원" />
        </div>
        <div className="border border-border p-4 mt-4 bg-muted/40">
          <div className="grid grid-cols-3 gap-3 text-xs">
            <Stat label="신품 최저가" value="1,580,000원" />
            <Stat label="권장가 (S등급)" value="1,260,000원" />
            <Stat label="실 정산액 (수수료 15%)" value="1,088,000원" highlight />
          </div>
          <p className="text-[11px] text-muted-foreground mt-3">
            S등급 가격이 신품 최저가를 초과하면 등록이 제한됩니다.
          </p>
        </div>
      </Section>

      <Section title="렌탈 공급">
        <div className="border border-border p-4">
          <label className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-medium">렌탈 공급</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                ON 시 사용자가 렌탈로 시작할 수 있습니다.
              </div>
            </div>
            <button className="w-10 h-6 bg-foreground relative">
              <span className="absolute top-0.5 left-5 w-5 h-5 bg-background" />
            </button>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <Field label="최소 렌탈 일수" placeholder="7" suffix="일" />
            <Field label="최대 렌탈 일수" placeholder="90" suffix="일" />
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4 text-xs">
            <Stat label="7일 예상 렌탈료" value="128,000원" />
            <Stat label="30일 예상 렌탈료" value="234,000원" />
            <Stat label="예상 수익 (월)" value="198,900원" highlight />
          </div>
        </div>
      </Section>

      <Section title="상품 사진">
        <div className="grid grid-cols-5 gap-2">
          <div className="border border-dashed border-border aspect-square flex items-center justify-center text-xs text-muted-foreground">
            + 추가
          </div>
          {[1, 2, 3, 4].map((i) => (
            <ImageBox key={i} ratio="square" />
          ))}
        </div>
      </Section>

      <div className="border-t border-border pt-6 flex items-center justify-between">
        <Badge variant="muted">검수 대기 → Fullty 검수 → 노출 (반려 시 반송)</Badge>
        <div className="flex gap-2">
          <Button variant="outline">임시저장</Button>
          <Button>등록 요청</Button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="text-xs font-semibold tracking-widest text-muted-foreground mb-3">
        {title}
      </div>
      {children}
    </section>
  );
}

function Field({ label, placeholder, suffix }: { label: string; placeholder: string; suffix?: string }) {
  return (
    <div>
      <label className="text-xs text-muted-foreground mb-1.5 block">{label}</label>
      <div className="flex items-center border border-border bg-background h-11">
        <input placeholder={placeholder} className="flex-1 h-full px-3 text-sm bg-transparent" />
        {suffix && <span className="text-xs text-muted-foreground px-3">{suffix}</span>}
      </div>
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <div className="text-muted-foreground">{label}</div>
      <div className={highlight ? "text-base font-bold mt-1" : "text-sm font-medium mt-1"}>
        {value}
      </div>
    </div>
  );
}
