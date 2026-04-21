"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, TrendingDown, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FileUpload } from "@/components/ui/FileUpload";
import { products } from "@/lib/mock";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

const GRADES = ["SS", "S", "A+", "A", "B"] as const;
const CATEGORIES = ["의자", "소파", "테이블", "수납/선반", "조명", "침대/침구", "기타"];

const GRADE_MULTIPLIERS: Record<string, number> = {
  SS: 0.95,
  S: 0.9,
  "A+": 0.85,
  A: 0.8,
  B: 0.7,
};

type PriceResult = {
  source: string;
  grade: string;
  price: number;
  date: string;
  url?: string;
};

function generateMockPrices(brand: string, name: string): PriceResult[] {
  // 풀티 DB에서 일치하는 상품 찾기
  const matched = products.find(
    (p) =>
      p.brand.toLowerCase().includes(brand.toLowerCase()) ||
      p.name.toLowerCase().includes(name.toLowerCase())
  );
  const basePrice = matched ? matched.price : Math.ceil((Math.random() * 2000 + 500) * 1000);

  return [
    {
      source: "Fullty",
      grade: "S",
      price: Math.round(basePrice * 0.92 / 10000) * 10000,
      date: "2026.04.18",
      url: "/products",
    },
    {
      source: "Fullty",
      grade: "A+",
      price: Math.round(basePrice * 0.78 / 10000) * 10000,
      date: "2026.04.15",
      url: "/products",
    },
    {
      source: "중고나라",
      grade: "직거래",
      price: Math.round(basePrice * 0.71 / 10000) * 10000,
      date: "2026.04.12",
    },
    {
      source: "번개장터",
      grade: "상태 불명",
      price: Math.round(basePrice * 0.65 / 10000) * 10000,
      date: "2026.04.10",
    },
    {
      source: "당근마켓",
      grade: "상태 불명",
      price: Math.round(basePrice * 0.58 / 10000) * 10000,
      date: "2026.04.08",
    },
  ].sort((a, b) => a.price - b.price);
}

export default function AssetRegisterPage() {
  const router = useRouter();
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [grade, setGrade] = useState<string>("");
  const [category, setCategory] = useState("");
  const [acquiredAt, setAcquiredAt] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // 시세 조회
  const [priceResults, setPriceResults] = useState<PriceResult[] | null>(null);
  const [searching, setSearching] = useState(false);
  const [priceOpen, setPriceOpen] = useState(true);

  const isValid = brand.trim() && name.trim() && grade && acquiredAt && purchasePrice;
  const canSearch = brand.trim().length >= 2 && name.trim().length >= 2;

  function handleSearch() {
    if (!canSearch) return;
    setSearching(true);
    setPriceResults(null);
    setPriceOpen(true);
    // 300ms 딜레이로 검색 흉내
    setTimeout(() => {
      setPriceResults(generateMockPrices(brand, name));
      setSearching(false);
    }, 800);
  }

  function applyPrice(price: number) {
    setPurchasePrice(String(price));
    // 스크롤을 구입금액 필드 쪽으로
    document.getElementById("purchase-price-field")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function handleSubmit() {
    if (!isValid) return;
    setSubmitted(true);
    setTimeout(() => router.push("/mypage/assets"), 1200);
  }

  if (submitted) {
    return (
      <div className="py-32 text-center space-y-4">
        <div className="w-12 h-12 mx-auto bg-sage-deep text-background flex items-center justify-center text-2xl font-display">
          ✓
        </div>
        <div className="font-display text-3xl text-sage-ink">등록 완료</div>
        <div className="text-sm text-muted-foreground">잠시 후 자산 리포트로 이동합니다.</div>
      </div>
    );
  }

  const lowestPrice = priceResults ? priceResults[0].price : null;

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold">가구 등록하기</h2>
          <p className="text-sm text-muted-foreground mt-1">
            보유한 가구를 등록하면 실시간 시세를 확인할 수 있습니다.
          </p>
        </div>
        <Link href="/mypage/assets">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            ← 자산 리포트
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        {/* 브랜드 */}
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">
            브랜드 <span className="text-sage-deep">*</span>
          </label>
          <input
            value={brand}
            onChange={(e) => { setBrand(e.target.value); setPriceResults(null); }}
            placeholder="예: Herman Miller, Vitra, USM"
            className="w-full h-11 px-4 text-sm border border-border bg-background focus:outline-none focus:border-sage-ink/50"
          />
        </div>

        {/* 모델명 + 시세 조회 버튼 */}
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">
            모델명 / 상품명 <span className="text-sage-deep">*</span>
          </label>
          <div className="flex gap-2">
            <input
              value={name}
              onChange={(e) => { setName(e.target.value); setPriceResults(null); }}
              placeholder="예: Aeron Chair Size B, Eames Lounge Chair"
              className="flex-1 h-11 px-4 text-sm border border-border bg-background focus:outline-none focus:border-sage-ink/50"
            />
            <button
              onClick={handleSearch}
              disabled={!canSearch || searching}
              className={cn(
                "h-11 px-4 flex items-center gap-2 text-xs border transition-colors flex-shrink-0",
                canSearch && !searching
                  ? "border-sage-ink bg-sage-ink text-background hover:bg-sage-deep"
                  : "border-border text-muted-foreground cursor-not-allowed"
              )}
            >
              {searching ? (
                <>
                  <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                  검색 중
                </>
              ) : (
                <>
                  <Search size={13} />
                  시세 조회
                </>
              )}
            </button>
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">
            브랜드와 모델명 입력 후 시세 조회로 현재 최저가를 확인할 수 있습니다.
          </div>
        </div>

        {/* 시세 조회 결과 */}
        {priceResults && (
          <div className="border border-border">
            <button
              onClick={() => setPriceOpen((v) => !v)}
              className="w-full flex items-center justify-between px-4 py-3 bg-sage-soft/30 hover:bg-sage-soft/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <TrendingDown size={14} className="text-sage-deep" />
                <span className="text-xs font-semibold text-sage-ink">
                  시세 조회 결과 — {brand} {name}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  ({priceResults.length}건)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-sage-deep font-semibold">
                  최저가 {formatPrice(lowestPrice!)}
                </span>
                {priceOpen ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
              </div>
            </button>

            {priceOpen && (
              <div className="divide-y divide-border">
                {priceResults.map((r, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3",
                      i === 0 && "bg-sage-soft/10"
                    )}
                  >
                    {/* 순위 */}
                    <div className={cn(
                      "w-5 h-5 flex items-center justify-center text-[10px] font-bold flex-shrink-0",
                      i === 0 ? "bg-sage-deep text-background" : "bg-muted text-muted-foreground"
                    )}>
                      {i + 1}
                    </div>

                    {/* 출처 */}
                    <div className="w-20 flex-shrink-0">
                      <div className="text-xs font-medium text-sage-ink">{r.source}</div>
                      <div className="text-[10px] text-muted-foreground">{r.grade}</div>
                    </div>

                    {/* 가격 */}
                    <div className="flex-1">
                      <span className={cn(
                        "text-sm font-semibold",
                        i === 0 ? "text-sage-deep" : "text-sage-ink"
                      )}>
                        {formatPrice(r.price)}
                      </span>
                      {i === 0 && (
                        <span className="ml-2 text-[10px] bg-sage-deep text-background px-1.5 py-0.5">
                          최저
                        </span>
                      )}
                    </div>

                    {/* 날짜 */}
                    <div className="text-[10px] text-muted-foreground w-20 text-right flex-shrink-0">
                      {r.date}
                    </div>

                    {/* 액션 */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {r.url ? (
                        <Link href={r.url} className="text-[11px] text-sage-ink hover:text-sage-deep flex items-center gap-0.5">
                          보기 <ExternalLink size={10} />
                        </Link>
                      ) : (
                        <span className="w-10" />
                      )}
                      <button
                        onClick={() => applyPrice(r.price)}
                        className={cn(
                          "h-7 px-2.5 text-[11px] border transition-colors",
                          purchasePrice === String(r.price)
                            ? "border-sage-ink bg-sage-ink text-background"
                            : "border-border hover:border-sage-ink hover:text-sage-ink"
                        )}
                      >
                        {purchasePrice === String(r.price) ? "적용됨" : "적용"}
                      </button>
                    </div>
                  </div>
                ))}

                <div className="px-4 py-2.5 bg-muted/30 text-[10px] text-muted-foreground">
                  * 시세는 최근 거래 데이터 기반 참고값입니다. 실제 거래가와 차이가 있을 수 있습니다.
                </div>
              </div>
            )}
          </div>
        )}

        {/* 카테고리 */}
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">카테고리</label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(category === c ? "" : c)}
                className={cn(
                  "px-3 h-8 text-xs border transition-colors",
                  category === c
                    ? "border-sage-ink bg-sage-ink text-background"
                    : "border-border hover:bg-muted"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* 등급 */}
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">
            상태 등급 <span className="text-sage-deep">*</span>
          </label>
          <div className="grid grid-cols-5 gap-2">
            {GRADES.map((g) => {
              const multiplier = GRADE_MULTIPLIERS[g];
              const calcPrice = lowestPrice ? Math.round(lowestPrice * multiplier / 10000) * 10000 : null;
              const isSelected = grade === g;
              return (
                <button
                  key={g}
                  onClick={() => {
                    const next = grade === g ? "" : g;
                    setGrade(next);
                    if (next && lowestPrice) {
                      const p = Math.round(lowestPrice * GRADE_MULTIPLIERS[next] / 10000) * 10000;
                      setPurchasePrice(String(p));
                    }
                  }}
                  className={cn(
                    "border py-3 flex flex-col items-center gap-0.5 transition-colors",
                    isSelected
                      ? "border-sage-ink bg-sage-soft/40"
                      : "border-border hover:bg-muted/40"
                  )}
                >
                  <span className={cn("text-sm font-semibold", isSelected ? "text-sage-ink" : "text-muted-foreground")}>
                    {g}
                  </span>
                  {calcPrice && lowestPrice && (
                    <span className={cn("text-[10px]", isSelected ? "text-sage-deep font-medium" : "text-muted-foreground")}>
                      {(lowestPrice * multiplier / 10000).toFixed(0)}만
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="mt-2 text-[10px] text-muted-foreground leading-relaxed">
            SS ×0.95 &nbsp;·&nbsp; S ×0.9 &nbsp;·&nbsp; A+ ×0.85 &nbsp;·&nbsp; A ×0.8 &nbsp;·&nbsp; B ×0.7 &nbsp;
            {lowestPrice && <span className="text-sage-deep">(최저가 {formatPrice(lowestPrice)} 기준)</span>}
          </div>
        </div>

        {/* 가구 금액 */}
        <div id="purchase-price-field">
          <label className="text-xs text-muted-foreground mb-2 block">
            가구 금액 (원) <span className="text-sage-deep">*</span>
          </label>
          {/* 계산식 표시 */}
          {lowestPrice && grade && (
            <div className="mb-2 px-3 py-2 bg-sage-soft/30 border border-sage/30 text-[11px] text-sage-ink flex items-center gap-1.5">
              <span className="text-muted-foreground">최저가</span>
              <span className="font-medium">{formatPrice(lowestPrice)}</span>
              <span className="text-muted-foreground">×</span>
              <span className="font-medium">{GRADE_MULTIPLIERS[grade]} ({grade}등급)</span>
              <span className="text-muted-foreground">=</span>
              <span className="font-semibold text-sage-deep">
                {formatPrice(Math.round(lowestPrice * GRADE_MULTIPLIERS[grade] / 10000) * 10000)}
              </span>
            </div>
          )}
          <div className="relative">
            <input
              type="number"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              placeholder="등급을 선택하면 자동 계산됩니다"
              min={0}
              className="w-full h-11 px-4 text-sm border border-border bg-background focus:outline-none focus:border-sage-ink/50"
            />
            {purchasePrice && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground pointer-events-none">
                {formatPrice(Number(purchasePrice))}
              </div>
            )}
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">
            직접 수정도 가능합니다. 현재 시세 추정에 활용됩니다.
          </div>
        </div>

        {/* 취득일 */}
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">
            취득일 <span className="text-sage-deep">*</span>
          </label>
          <input
            type="date"
            value={acquiredAt}
            onChange={(e) => setAcquiredAt(e.target.value)}
            className="w-full h-11 px-4 text-sm border border-border bg-background focus:outline-none focus:border-sage-ink/50"
          />
        </div>

        {/* 사진 */}
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">사진 첨부 (선택)</label>
          <div className="grid grid-cols-3 gap-2">
            <FileUpload label="정면" accept="image/*" />
            <FileUpload label="측면" accept="image/*" />
            <FileUpload label="상세 / 스크래치" accept="image/*" />
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">
            사진이 많을수록 정확한 시세 산출에 도움이 됩니다.
          </div>
        </div>

        {/* 추가 설명 */}
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">추가 설명 (선택)</label>
          <textarea
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="구매처, 옵션 정보, 특이사항 등을 자유롭게 입력하세요."
            className="w-full p-4 text-sm border border-border bg-background resize-none focus:outline-none focus:border-sage-ink/40 leading-relaxed"
          />
        </div>

        {/* 안내 */}
        <div className="bg-sage-soft/30 border border-sage/30 p-4 text-[11px] text-sage-ink leading-relaxed">
          <div className="font-semibold mb-1">등록 안내</div>
          <div>· 직접 등록 가구는 풀티 검수를 거치지 않아 시세는 참고용입니다.</div>
          <div>· 풀티에서 구매한 가구는 주문 완료 시 자동으로 자산에 등록됩니다.</div>
          <div>· 판매 의사가 있으면 자산 리포트에서 바로 셀링 신청이 가능합니다.</div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2 border-t border-border">
          <Button variant="outline" onClick={() => router.back()}>
            취소
          </Button>
          <Button disabled={!isValid} onClick={handleSubmit}>
            등록하기
          </Button>
        </div>
      </div>
    </div>
  );
}
