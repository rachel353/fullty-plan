"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { getRequests, products } from "@/lib/mock";

const PERIODS = ["6개월 미만", "6개월~1년", "1~2년", "2~3년", "3년 이상"];

export default function ProposePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const req = getRequests.find((r) => r.id === id);

  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [useCustom, setUseCustom] = useState(false);
  const [customBrand, setCustomBrand] = useState("");
  const [customModel, setCustomModel] = useState("");
  const [period, setPeriod] = useState("");
  const [price, setPrice] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!req) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        GET 요청을 찾을 수 없습니다.
        <Link href="/seller/get-requests" className="block mt-3 text-sage-ink underline">
          돌아가기
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="py-20 flex flex-col items-center gap-4 text-center">
        <div className="w-12 h-12 border border-sage-deep flex items-center justify-center">
          <span className="text-sage-deep text-xl">✓</span>
        </div>
        <div className="text-base font-semibold">제안이 등록되었습니다</div>
        <p className="text-sm text-muted-foreground">
          풀티 검수 후 사용자에게 전달됩니다. 평균 1~2 영업일 소요됩니다.
        </p>
        <div className="flex gap-2 mt-2">
          <Link href="/seller/get-requests">
            <Button variant="outline">GET 요청 목록</Button>
          </Link>
          <Link href="/seller/proposals">
            <Button>제안 현황 보기</Button>
          </Link>
        </div>
      </div>
    );
  }

  const budgetNum = req.budget;
  const priceNum = parseInt(price.replace(/,/g, ""), 10) || 0;
  const overBudget = priceNum > budgetNum;

  function handlePriceInput(v: string) {
    const num = v.replace(/[^0-9]/g, "");
    setPrice(num ? parseInt(num).toLocaleString() : "");
  }

  function canSubmit() {
    if (useCustom) return customBrand && customModel && period && price;
    return selectedProduct && period && price;
  }

  return (
    <div className="space-y-8">
      {/* 헤더 */}
      <div className="border-b border-border pb-4">
        <Link
          href="/seller/get-requests"
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors"
        >
          <ChevronLeft size={13} /> GET 요청 목록
        </Link>
        <h2 className="text-xl font-bold">제안 작성</h2>
        <p className="text-sm text-muted-foreground mt-1">
          구매자의 조건을 확인하고 보유 상품을 제안하세요.
        </p>
      </div>

      {/* GET 요청 요약 */}
      <div className="border border-border p-5 bg-muted/20 space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">GET 요청 정보</div>
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[11px] text-muted-foreground">{req.brand}</div>
            <div className="text-base font-semibold">{req.model}</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">{req.option}</div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-muted-foreground">구매자 희망가</div>
            <div className="text-lg font-bold text-sage-deep mt-0.5">
              {budgetNum.toLocaleString()}원
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <span>{req.id}</span>
          <span>·</span>
          <span>{req.createdAt} 등록</span>
          {req.proposalCount > 0 && (
            <>
              <span>·</span>
              <span>제안 {req.proposalCount}건 접수됨</span>
            </>
          )}
        </div>
      </div>

      {/* 상품 선택 */}
      <section className="space-y-3">
        <div className="text-xs font-semibold tracking-widest text-muted-foreground">제안 상품</div>
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => setUseCustom(false)}
            className={cn(
              "px-4 h-9 border text-xs transition-colors",
              !useCustom ? "border-foreground bg-foreground text-background" : "border-border hover:bg-muted"
            )}
          >
            등록된 상품에서 선택
          </button>
          <button
            onClick={() => setUseCustom(true)}
            className={cn(
              "px-4 h-9 border text-xs transition-colors",
              useCustom ? "border-foreground bg-foreground text-background" : "border-border hover:bg-muted"
            )}
          >
            직접 입력
          </button>
        </div>

        {!useCustom ? (
          <div className="space-y-2">
            {products.slice(0, 6).map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedProduct(p.id)}
                className={cn(
                  "w-full flex items-center justify-between p-3 border text-sm text-left transition-colors",
                  selectedProduct === p.id
                    ? "border-sage-ink bg-sage-soft/20"
                    : "border-border hover:bg-muted"
                )}
              >
                <div>
                  <span className="text-[11px] text-muted-foreground">{p.brand} · </span>
                  <span className="font-medium">{p.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="default">{p.grade}</Badge>
                  <span className="text-xs text-muted-foreground">{p.price.toLocaleString()}원</span>
                  {selectedProduct === p.id && (
                    <span className="w-4 h-4 bg-sage-ink flex items-center justify-center">
                      <span className="text-background text-[10px]">✓</span>
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <Field label="브랜드" value={customBrand} onChange={setCustomBrand} placeholder="Herman Miller" />
            <Field label="모델명" value={customModel} onChange={setCustomModel} placeholder="Aeron Chair" />
          </div>
        )}
      </section>

      {/* 상품 사진 */}
      <section className="space-y-3">
        <div className="text-xs font-semibold tracking-widest text-muted-foreground">상품 사진</div>
        <div className="grid grid-cols-5 gap-2">
          <div className="border-2 border-dashed border-border aspect-square flex flex-col items-center justify-center text-xs text-muted-foreground gap-1 hover:border-sage-ink/50 transition-colors cursor-pointer">
            <span className="text-lg leading-none">+</span>
            <span>추가</span>
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border border-border aspect-square bg-muted/20" />
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground">실물 사진을 최소 1장 이상 첨부해주세요.</p>
      </section>

      {/* 사용 기간 */}
      <section className="space-y-3">
        <div className="text-xs font-semibold tracking-widest text-muted-foreground">사용 기간</div>
        <div className="flex flex-wrap gap-2">
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                "px-4 h-9 border text-xs transition-colors",
                period === p
                  ? "border-sage-ink bg-sage-ink text-background"
                  : "border-border hover:bg-muted"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </section>

      {/* 제안 가격 */}
      <section className="space-y-3">
        <div className="text-xs font-semibold tracking-widest text-muted-foreground">제안 가격</div>
        <div className="flex items-center border border-border h-12">
          <input
            value={price}
            onChange={(e) => handlePriceInput(e.target.value)}
            placeholder="0"
            className="flex-1 h-full px-4 text-sm bg-transparent"
          />
          <span className="text-sm text-muted-foreground px-4">원</span>
        </div>
        {price && (
          <div className={cn(
            "flex items-center gap-2 text-[11px] px-3 py-2 border",
            overBudget
              ? "border-amber-200 bg-amber-50 text-amber-700"
              : "border-sage-deep/20 bg-sage-deep/5 text-sage-ink"
          )}>
            <span>
              구매자 희망가 {budgetNum.toLocaleString()}원 대비{" "}
              {overBudget
                ? `+${(priceNum - budgetNum).toLocaleString()}원 초과 — 수락 가능성이 낮을 수 있습니다.`
                : `${(budgetNum - priceNum).toLocaleString()}원 이내 — 좋은 조건입니다.`}
            </span>
          </div>
        )}
      </section>

      {/* 추가 메모 */}
      <section className="space-y-3">
        <div className="text-xs font-semibold tracking-widest text-muted-foreground">추가 메모 (선택)</div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="상품 상태, 구성품, 특이사항 등을 자유롭게 입력하세요."
          rows={4}
          className="w-full border border-border px-4 py-3 text-sm bg-transparent resize-none focus:border-sage-ink outline-none transition-colors"
        />
      </section>

      {/* 하단 */}
      <div className="border-t border-border pt-6 flex items-center justify-between">
        <Badge variant="muted">풀티 검수 후 구매자에게 전달됩니다</Badge>
        <div className="flex gap-2">
          <Link href="/seller/get-requests">
            <Button variant="outline">취소</Button>
          </Link>
          <Button
            disabled={!canSubmit()}
            onClick={() => setSubmitted(true)}
          >
            제안 등록
          </Button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label, value, onChange, placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string;
}) {
  return (
    <div>
      <label className="text-xs text-muted-foreground mb-1.5 block">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-border h-11 px-3 text-sm bg-transparent focus:border-sage-ink outline-none transition-colors"
      />
    </div>
  );
}
