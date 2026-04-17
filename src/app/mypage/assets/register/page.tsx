"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FileUpload } from "@/components/ui/FileUpload";
import { cn } from "@/lib/utils";

const GRADES = ["SS", "S", "A+", "A", "B"] as const;
const CATEGORIES = ["의자", "소파", "테이블", "수납/선반", "조명", "침대/침구", "기타"];

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

  const isValid = brand.trim() && name.trim() && grade && acquiredAt && purchasePrice;

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
            onChange={(e) => setBrand(e.target.value)}
            placeholder="예: Herman Miller, Vitra, USM"
            className="w-full h-11 px-4 text-sm border border-border bg-background focus:outline-none focus:border-sage-ink/50"
          />
        </div>

        {/* 모델명 */}
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">
            모델명 / 상품명 <span className="text-sage-deep">*</span>
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예: Aeron Chair Size B, Eames Lounge Chair"
            className="w-full h-11 px-4 text-sm border border-border bg-background focus:outline-none focus:border-sage-ink/50"
          />
        </div>

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
            {GRADES.map((g) => (
              <button
                key={g}
                onClick={() => setGrade(grade === g ? "" : g)}
                className={cn(
                  "border py-3 text-sm font-semibold transition-colors",
                  grade === g
                    ? "border-sage-ink bg-sage-soft/40 text-sage-ink"
                    : "border-border hover:bg-muted/40 text-muted-foreground"
                )}
              >
                {g}
              </button>
            ))}
          </div>
          <div className="mt-2 text-[10px] text-muted-foreground leading-relaxed">
            SS: 거의 새것 수준 &nbsp;·&nbsp; S: 미세 사용감 &nbsp;·&nbsp; A+: 소량 사용감 &nbsp;·&nbsp; A: 일반 빈티지 &nbsp;·&nbsp; B: 눈에 띄는 흔적
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

        {/* 구입 금액 */}
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">
            구입 금액 (원) <span className="text-sage-deep">*</span>
          </label>
          <input
            type="number"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
            placeholder="0"
            min={0}
            className="w-full h-11 px-4 text-sm border border-border bg-background focus:outline-none focus:border-sage-ink/50"
          />
          <div className="text-[10px] text-muted-foreground mt-1">
            구입 당시 금액 기준 (현재 시세 추정에 활용됩니다)
          </div>
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
