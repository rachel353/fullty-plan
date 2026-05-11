"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { products } from "@/lib/mock";
import { useSellerType } from "@/lib/seller-context";

const GRADES = ["SS", "S", "A+", "A", "B"] as const;
type Grade = typeof GRADES[number];
const CARRIERS = ["CJ대한통운", "롯데택배", "한진택배", "우체국택배"];
const SHIP_DAYS = ["1일", "2일", "3일", "7일 이내"];

export default function EditSellerProductPage() {
  const { id } = useParams<{ id: string }>();
  const { sellerType } = useSellerType();
  const isBusiness = sellerType === "사업자";
  const product = products.find((p) => p.id === id);

  const [grade, setGrade] = useState<Grade>((product?.grade as Grade) ?? "S");
  const [rentalOn, setRentalOn] = useState(
    product?.availability === "rent" || product?.availability === "both"
  );
  const [carrier, setCarrier] = useState("CJ대한통운");
  const [shipDay, setShipDay] = useState("2일");
  const [saved, setSaved] = useState(false);

  if (!product) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        상품을 찾을 수 없습니다.
        <Link href="/seller/products" className="block mt-3 text-sage-ink underline">목록으로</Link>
      </div>
    );
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-4">
        <Link href="/seller/products" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors">
          <ChevronLeft size={13} /> 상품 관리
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold">상품 수정</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {isBusiness ? "수정 즉시 반영됩니다." : "수정 후 재검수가 필요할 수 있습니다."}
            </p>
          </div>
          <Badge variant={isBusiness ? "default" : "outline"}>
            {isBusiness ? "사업자 셀러" : "개인 셀러"}
          </Badge>
        </div>
      </div>

      {saved && (
        <div className="border border-sage-deep/30 bg-sage-soft/10 px-5 py-3 text-sm font-medium">
          저장되었습니다.
        </div>
      )}

      {/* 기본 정보 */}
      <Section title="기본 정보">
        <div className="grid grid-cols-2 gap-3">
          <Field label="브랜드" defaultValue={product.brand} />
          <Field label="모델명" defaultValue={product.name} />
          <Field label="옵션 / 사이즈" defaultValue={product.option ?? ""} />
          <Field label="카테고리" defaultValue={product.category ?? ""} />
        </div>
      </Section>

      {/* 상태 등급 */}
      <Section title="상태 등급">
        <div className="grid grid-cols-5 gap-2">
          {GRADES.map((g) => (
            <button
              key={g}
              onClick={() => setGrade(g)}
              className={cn(
                "h-12 border text-sm font-semibold transition-colors",
                grade === g
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:bg-muted"
              )}
            >
              {g}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground mt-2">등급 변경 시 재검수가 요청될 수 있습니다.</p>
      </Section>

      {/* 가격 */}
      <Section title="가격">
        <div className="grid grid-cols-2 gap-3">
          <Field label="공급가" defaultValue={String(Math.round(product.price * 0.7))} suffix="원" />
          <Field label="판매가" defaultValue={String(product.price)} suffix="원" />
          <Field
            label={isBusiness ? "배송비 (직접 배송)" : "배송비 (풀티 → 구매자)"}
            defaultValue="35000"
            suffix="원"
          />
          <Field label="VAT" defaultValue="0" suffix="원" />
        </div>
        <div className="border border-border p-4 mt-4 bg-muted/40">
          <div className="grid grid-cols-3 gap-3 text-xs">
            <Stat label="신품 최저가" value="1,580,000원" />
            <Stat label={`권장가 (${grade}등급)`} value="1,260,000원" />
            <Stat label="실 정산액 (수수료 15%)" value={`${Math.round(product.price * 0.85).toLocaleString()}원`} highlight />
          </div>
        </div>
      </Section>

      {/* 배송 설정 — 사업자 전용 */}
      {isBusiness && (
        <Section title="직접 배송 설정">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">사용 택배사</label>
                <div className="flex flex-wrap gap-2">
                  {CARRIERS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCarrier(c)}
                      className={cn(
                        "px-3 h-9 border text-xs transition-colors",
                        carrier === c ? "border-sage-ink bg-sage-ink text-background" : "border-border hover:bg-muted"
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">출고 소요일</label>
                <div className="flex flex-wrap gap-2">
                  {SHIP_DAYS.map((d) => (
                    <button
                      key={d}
                      onClick={() => setShipDay(d)}
                      className={cn(
                        "px-3 h-9 border text-xs transition-colors",
                        shipDay === d ? "border-sage-ink bg-sage-ink text-background" : "border-border hover:bg-muted"
                      )}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <Field label="반품 배송비" defaultValue="5000" suffix="원" />
          </div>
        </Section>
      )}

      {/* 렌탈 공급 */}
      <Section title="렌탈 공급">
        <div className="border border-border p-4">
          <label className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-medium">렌탈 공급</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">ON 시 사용자가 렌탈로 시작할 수 있습니다.</div>
            </div>
            <button
              onClick={() => setRentalOn(!rentalOn)}
              className={cn("w-10 h-6 relative transition-colors", rentalOn ? "bg-sage-ink" : "bg-border")}
            >
              <span className={cn("absolute top-0.5 w-5 h-5 bg-background transition-all", rentalOn ? "left-5" : "left-0.5")} />
            </button>
          </label>
          {rentalOn && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Field label="최소 렌탈 일수" defaultValue="7" suffix="일" />
                <Field label="최대 렌탈 일수" defaultValue="90" suffix="일" />
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* 상품 사진 */}
      <Section title="상품 사진">
        <div className="grid grid-cols-5 gap-2">
          <div className="border border-dashed border-border aspect-square flex items-center justify-center text-xs text-muted-foreground">
            + 추가
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border border-border aspect-square bg-muted/30" />
          ))}
        </div>
      </Section>

      {/* 하단 */}
      <div className="border-t border-border pt-6 flex items-center justify-between">
        <Link href="/seller/products">
          <Button variant="outline">취소</Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="outline">임시저장</Button>
          <Button onClick={handleSave}>저장</Button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="text-xs font-semibold tracking-widest text-muted-foreground mb-3">{title}</div>
      {children}
    </section>
  );
}

function Field({ label, defaultValue, suffix }: { label: string; defaultValue?: string; suffix?: string }) {
  const [value, setValue] = useState(defaultValue ?? "");
  return (
    <div>
      <label className="text-xs text-muted-foreground mb-1.5 block">{label}</label>
      <div className="flex items-center border border-border bg-background h-11 focus-within:border-sage-ink">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 h-full px-3 text-sm bg-transparent outline-none"
        />
        {suffix && <span className="text-xs text-muted-foreground px-3">{suffix}</span>}
      </div>
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <div className="text-muted-foreground">{label}</div>
      <div className={highlight ? "text-base font-bold mt-1" : "text-sm font-medium mt-1"}>{value}</div>
    </div>
  );
}
