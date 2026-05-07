"use client";

import { useState } from "react";
import { Search, RefreshCw, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const GRADES = [
  { value: "SS", desc: "새상품" },
  { value: "S",  desc: "미사용 전시급 또는 팩토리 톨러런스" },
  { value: "A+", desc: "사용이력이 있는 민트급 상품" },
  { value: "A",  desc: "사용감 있는 양호한 중고 상품" },
  { value: "B",  desc: "사용감이 뚜렷한 중고 상품" },
  { value: "V",  desc: "오리지널 빈티지" },
] as const;
type Grade = typeof GRADES[number]["value"];

const CARRIERS = ["CJ대한통운", "롯데택배", "한진택배", "우체국택배"];
const SHIP_DAYS = ["1일", "2일", "3일", "7일 이내"];

type CrawlSource = { label: string; raw: number; formatted: string };

const CRAWL_MOCK: Record<string, CrawlSource[]> = {
  default: [
    { label: "네이버쇼핑", raw: 1340000, formatted: "1,340,000원" },
    { label: "쿠팡",       raw: 1380000, formatted: "1,380,000원" },
    { label: "브랜드 공식", raw: 1580000, formatted: "1,580,000원" },
  ],
};

function getCrawlSources(brand: string, model: string): CrawlSource[] {
  const key = `${brand}_${model}`.toLowerCase();
  return CRAWL_MOCK[key] ?? CRAWL_MOCK.default;
}

function parsePrice(val: string) {
  const n = Number(val.replace(/,/g, ""));
  return isNaN(n) ? 0 : n;
}

type CrawlState = "idle" | "loading" | "done";

export type ProductFormMode = "seller-individual" | "seller-business" | "admin";

export function ProductForm({ mode }: { mode: ProductFormMode }) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [grade, setGrade] = useState<Grade>("S");
  const [rentalOn, setRentalOn] = useState(false);
  const [carrier, setCarrier] = useState("CJ대한통운");
  const [shipDay, setShipDay] = useState("2일");
  const [crawlState, setCrawlState] = useState<CrawlState>("idle");
  const [crawlSources, setCrawlSources] = useState<CrawlSource[]>([]);
  const [selectedSource, setSelectedSource] = useState<CrawlSource | null>(null);
  const [supplyPrice, setSupplyPrice] = useState("");
  const [price, setPrice] = useState("");
  const [shipping, setShipping] = useState("");

  const isBusiness = mode === "seller-business" || mode === "admin";
  const isAdmin = mode === "admin";
  const canCrawl = brand.trim().length > 0 && model.trim().length > 0;

  function handleCrawl() {
    if (!canCrawl) return;
    setCrawlState("loading");
    setCrawlSources([]);
    setSelectedSource(null);
    setPrice("");
    setTimeout(() => {
      setCrawlSources(getCrawlSources(brand, model));
      setCrawlState("done");
    }, 1600);
  }

  const supplyNum  = parsePrice(supplyPrice);
  const priceNum   = parsePrice(price);
  const shippingNum = parsePrice(shipping);
  const vat        = priceNum > 0 ? Math.floor(priceNum * 0.1) : 0;
  const totalNum   = supplyNum + priceNum + vat + shippingNum;
  const overLimit  = selectedSource !== null && totalNum > 0 && totalNum > selectedSource.raw;
  const settlement = priceNum > 0 ? Math.floor(priceNum * 0.85) : null;

  return (
    <div className="space-y-8">
      {/* 기본 정보 */}
      <Section title="기본 정보">
        <div className="grid grid-cols-2 gap-3">
          <Field label="브랜드" required>
            <input
              value={brand}
              onChange={(e) => { setBrand(e.target.value); setCrawlState("idle"); }}
              placeholder="Herman Miller"
              className="w-full h-11 px-3 text-sm border border-border bg-background outline-none focus:border-sage-ink"
            />
          </Field>
          <Field label="모델명" required>
            <input
              value={model}
              onChange={(e) => { setModel(e.target.value); setCrawlState("idle"); }}
              placeholder="Aeron Chair"
              className="w-full h-11 px-3 text-sm border border-border bg-background outline-none focus:border-sage-ink"
            />
          </Field>
          <SimpleField label="옵션 / 사이즈" placeholder="Size B / Graphite" />
          <SimpleField label="카테고리" placeholder="가구 / 조명 / 테이블웨어 / 홈데코 / 아트" />
        </div>
      </Section>

      {/* 최저가 크롤링 */}
      <Section title="신품 최저가 조회">
        <div className="border border-border p-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 text-sm text-muted-foreground">
              {crawlState === "done"
                ? <span className="flex items-center gap-1.5 text-sage-ink"><Check size={13} /> {brand} {model} 최저가 조회 완료</span>
                : `${brand || "브랜드"}와 ${model || "모델명"}을 입력하면 신품 최저가를 조회할 수 있습니다.`
              }
            </div>
            <button
              onClick={handleCrawl}
              disabled={!canCrawl || crawlState === "loading"}
              className={cn(
                "flex items-center gap-1.5 px-4 h-9 border text-xs font-medium transition-colors flex-shrink-0",
                canCrawl
                  ? "border-sage-ink text-sage-ink hover:bg-sage-soft/30"
                  : "border-border text-muted-foreground cursor-not-allowed"
              )}
            >
              {crawlState === "loading" ? (
                <><RefreshCw size={12} className="animate-spin" /> 조회 중…</>
              ) : crawlState === "done" ? (
                <><RefreshCw size={12} /> 재조회</>
              ) : (
                <><Search size={12} /> 최저가 크롤링</>
              )}
            </button>
          </div>

          {crawlState === "loading" && (
            <div className="grid grid-cols-3 gap-3">
              {["네이버쇼핑", "쿠팡", "브랜드 공식"].map((src) => (
                <div key={src} className="space-y-1.5">
                  <div className="text-[10px] text-muted-foreground">{src}</div>
                  <div className="h-5 bg-muted animate-pulse rounded" />
                </div>
              ))}
            </div>
          )}

          {crawlState === "done" && crawlSources.length > 0 && (
            <>
              <p className="text-[11px] text-muted-foreground -mb-1">
                판매가 상한선으로 사용할 기준을 선택하세요.
              </p>
              <div className="grid grid-cols-3 gap-3">
                {crawlSources.map((src) => {
                  const isSelected = selectedSource?.label === src.label;
                  return (
                    <button
                      key={src.label}
                      type="button"
                      onClick={() => setSelectedSource(src)}
                      className={cn(
                        "border p-3 text-left transition-colors relative",
                        isSelected
                          ? "border-sage-ink bg-sage-soft/20"
                          : "border-border hover:bg-muted/40"
                      )}
                    >
                      {isSelected && (
                        <span className="absolute top-2 right-2 w-4 h-4 bg-sage-ink flex items-center justify-center">
                          <Check size={10} className="text-background" />
                        </span>
                      )}
                      <div className="text-[10px] text-muted-foreground mb-1">{src.label}</div>
                      <div className={cn("text-sm font-semibold", isSelected ? "text-sage-ink" : "text-foreground")}>
                        {src.formatted}
                      </div>
                    </button>
                  );
                })}
              </div>
              {selectedSource && (
                <p className="text-[11px] text-sage-ink">
                  판매가 상한선: {selectedSource.label} 기준 {selectedSource.formatted}
                </p>
              )}
              {!selectedSource && (
                <p className="text-[11px] text-amber-500">
                  기준을 선택해야 판매가를 입력할 수 있습니다.
                </p>
              )}
            </>
          )}
        </div>
      </Section>

      {/* 상태 등급 */}
      <Section title="상태 등급">
        <div className="grid grid-cols-6 gap-2">
          {GRADES.map((g) => (
            <button
              key={g.value}
              onClick={() => setGrade(g.value)}
              className={cn(
                "border p-3 text-left transition-colors",
                grade === g.value
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:bg-muted"
              )}
            >
              <div className="text-sm font-bold">{g.value}</div>
              <div className={cn(
                "text-[10px] mt-1 leading-snug",
                grade === g.value ? "text-background/70" : "text-muted-foreground"
              )}>
                {g.desc}
              </div>
            </button>
          ))}
        </div>
      </Section>

      {/* 가격 */}
      <Section title="가격">
        <div className="grid grid-cols-2 gap-3">
          {/* 공급가 */}
          <PriceField
            label="공급가"
            value={supplyPrice}
            onChange={setSupplyPrice}
            placeholder="900,000"
          />
          {/* 판매가 */}
          <PriceField
            label="판매가"
            value={price}
            onChange={setPrice}
            placeholder="1,280,000"
            disabled={crawlState === "done" && !selectedSource}
          />
          {/* 배송비 */}
          <PriceField
            label={isBusiness ? "배송비 (직접 배송)" : "배송비 (풀티 → 구매자)"}
            value={shipping}
            onChange={setShipping}
            placeholder="35,000"
          />
          {/* VAT */}
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">
              VAT <span className="text-[10px] text-sage-ink">(판매가의 10% 자동 계산)</span>
            </label>
            <div className="flex items-center border border-border bg-muted/30 h-11">
              <input
                readOnly
                value={vat > 0 ? vat.toLocaleString() : ""}
                placeholder="판매가 입력 시 자동 계산"
                className="flex-1 h-full px-3 text-sm bg-transparent text-muted-foreground"
              />
              <span className="text-xs text-muted-foreground px-3">원</span>
            </div>
          </div>
        </div>

        {/* 합산 + 에러 */}
        <div className={cn(
          "border p-4 mt-4",
          overLimit ? "border-red-300 bg-red-50" : "border-border bg-muted/40"
        )}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-muted-foreground">공급가 + 판매가 + VAT + 배송비</span>
            <span className={cn("text-sm font-bold", overLimit ? "text-red-500" : "text-foreground")}>
              {totalNum > 0 ? `${totalNum.toLocaleString()}원` : "—"}
            </span>
          </div>
          {overLimit && selectedSource && (
            <p className="text-[11px] text-red-500 mb-3">
              합산 금액이 선택한 기준({selectedSource.label} {selectedSource.formatted})을 초과합니다.
            </p>
          )}
          <div className="grid grid-cols-3 gap-3 text-xs pt-3 border-t border-border">
            <Stat
              label="신품 최저가 기준"
              value={selectedSource ? selectedSource.formatted : "—"}
            />
            <Stat label={`권장가 (${grade}등급)`} value="1,260,000원" />
            <Stat
              label="실 정산액 (수수료 15%)"
              value={settlement ? `${settlement.toLocaleString()}원` : "—"}
              highlight
            />
          </div>
        </div>
      </Section>

      {/* 배송 — 사업자 / 어드민 */}
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
                        carrier === c
                          ? "border-sage-ink bg-sage-ink text-background"
                          : "border-border hover:bg-muted"
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
                        shipDay === d
                          ? "border-sage-ink bg-sage-ink text-background"
                          : "border-border hover:bg-muted"
                      )}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">반품 배송비</label>
              <div className="flex items-center border border-border h-9 w-40">
                <input placeholder="5,000" className="flex-1 h-full px-3 text-sm bg-transparent" />
                <span className="text-xs text-muted-foreground px-3">원</span>
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* 배송 — 개인 셀러 */}
      {mode === "seller-individual" && (
        <Section title="풀티 검수센터 배송 안내">
          <div className="border border-border p-4 bg-muted/20 space-y-2 text-sm">
            <div className="font-medium">풀티 검수센터</div>
            <div className="text-sm text-muted-foreground">서울특별시 성동구 왕십리로 130, B동 3층</div>
            <div className="text-sm text-muted-foreground">수령인: 풀티 검수팀 · 02-1234-5678</div>
            <div className="mt-3 pt-3 border-t border-border text-[11px] text-muted-foreground space-y-1">
              <div>· 상품 박스 외면에 <strong className="text-sage-ink">등록 신청 번호</strong>를 반드시 기재해주세요.</div>
              <div>· 예상 검수 기간: 수령 후 3~5 영업일</div>
              <div>· 검수 반려 시 반송 처리 (배송비 셀러 부담)</div>
            </div>
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
                <SimpleField label="최소 렌탈 일수" placeholder="7" suffix="일" />
                <SimpleField label="최대 렌탈 일수" placeholder="90" suffix="일" />
              </div>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <Stat label="7일 예상 렌탈료" value="128,000원" />
                <Stat label="30일 예상 렌탈료" value="234,000원" />
                <Stat label="예상 수익 (월)" value="198,900원" highlight />
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* 상품 사진 */}
      <Section title="상품 사진">
        <div className="grid grid-cols-5 gap-2">
          <div className="border border-dashed border-border aspect-square flex items-center justify-center text-xs text-muted-foreground cursor-pointer hover:bg-muted/30 transition-colors">
            + 추가
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border border-border aspect-square bg-muted/20" />
          ))}
        </div>
      </Section>

      {/* 하단 */}
      <div className="border-t border-border pt-6 flex items-center justify-between">
        {isAdmin ? (
          <Badge variant="sage">검수 없이 즉시 노출</Badge>
        ) : isBusiness ? (
          <Badge variant="sage">즉시 노출 · 직접 배송</Badge>
        ) : (
          <Badge variant="muted">검수 대기 → Fullty 검수 → 노출</Badge>
        )}
        <div className="flex gap-2">
          <Button variant="outline">임시저장</Button>
          <Button disabled={overLimit}>{isAdmin ? "즉시 등록" : isBusiness ? "바로 등록" : "등록 요청"}</Button>
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

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs text-muted-foreground mb-1.5 block">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function PriceField({ label, value, onChange, placeholder, disabled }: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string; disabled?: boolean;
}) {
  return (
    <div>
      <label className="text-xs text-muted-foreground mb-1.5 block">{label}</label>
      <div className={cn("flex items-center border bg-background h-11", disabled ? "opacity-40" : "border-border")}>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 h-full px-3 text-sm bg-transparent outline-none focus:border-sage-ink disabled:cursor-not-allowed"
        />
        <span className="text-xs text-muted-foreground px-3">원</span>
      </div>
    </div>
  );
}

function SimpleField({ label, placeholder, suffix }: { label: string; placeholder: string; suffix?: string }) {
  return (
    <div>
      <label className="text-xs text-muted-foreground mb-1.5 block">{label}</label>
      <div className="flex items-center border border-border bg-background h-11">
        <input placeholder={placeholder} className="flex-1 h-full px-3 text-sm bg-transparent outline-none" />
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

function CrawlStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border p-3">
      <div className="text-[10px] text-muted-foreground mb-1">{label}</div>
      <div className="text-sm font-semibold text-sage-ink">{value}</div>
    </div>
  );
}
