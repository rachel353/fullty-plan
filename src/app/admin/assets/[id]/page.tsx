"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { assets as initialAssets, Asset } from "@/lib/mock";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

const GRADES = ["SS", "S", "A+", "A", "B"] as const;

export default function AdminAssetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [assetList, setAssetList] = useState<Asset[]>(initialAssets);
  const [priceInput, setPriceInput] = useState("");

  const asset = assetList.find((a) => a.id === id);

  if (!asset) {
    return (
      <div className="space-y-4">
        <Link href="/admin/assets" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink transition-colors">
          <ChevronLeft size={13} /> 자산화 상품 관리
        </Link>
        <p className="text-sm text-muted-foreground">자산 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  function confirmPrice() {
    const value = parseInt(priceInput.replace(/,/g, ""), 10);
    if (!value || value <= 0) return;
    setAssetList((prev) => prev.map((a) => a.id === id ? { ...a, currentValue: value, status: "정상" } : a));
    setPriceInput("");
  }

  const currentAsset = assetList.find((a) => a.id === id)!;

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <Link href="/admin/assets" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors">
          <ChevronLeft size={13} /> 자산화 상품 관리
        </Link>
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold">자산 상세</h2>
            <p className="text-sm text-muted-foreground mt-1">{currentAsset.owner} · {currentAsset.id}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={
              currentAsset.status === "검토 필요" ? "default" :
              currentAsset.status === "판매 전환" ? "muted" : "outline"
            }>
              {currentAsset.status}
            </Badge>
            <Link href={`/admin/members/${currentAsset.ownerId}`}>
              <Button size="sm" variant="ghost">회원 상세</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 검토 필요: 가격 입력 배너 */}
      {currentAsset.status === "검토 필요" && (
        <div className="border border-amber-200 bg-amber-50/30 p-4 space-y-3">
          <p className="text-xs font-medium">가격 미입력 — 관리자 확인 필요</p>
          <p className="text-[11px] text-muted-foreground">회원이 자산 가치를 입력하지 않았습니다. 직접 입력 후 확정해 주세요.</p>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={priceInput}
              onChange={(e) => setPriceInput(e.target.value)}
              placeholder="자산 가치 입력"
              className="h-9 px-3 text-sm border border-border bg-background outline-none focus:border-sage-ink w-48"
            />
            <span className="text-sm text-muted-foreground">원</span>
            <Button
              size="sm"
              disabled={!priceInput || parseInt(priceInput) <= 0}
              onClick={confirmPrice}
            >
              가격 확정
            </Button>
          </div>
        </div>
      )}

      {/* 등록 정보 */}
      <div className="border border-border divide-y divide-border">
        <div className="px-5 py-3 bg-muted/30">
          <span className="text-[10px] tracking-widest uppercase text-muted-foreground">등록 정보</span>
        </div>

        <Row label="브랜드" value={currentAsset.brand} />
        <Row label="모델명 / 상품명" value={currentAsset.name} />
        <Row label="카테고리" value={currentAsset.category} />
        <Row
          label="상태 등급"
          value={
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                {GRADES.map((g) => (
                  <span
                    key={g}
                    className={cn(
                      "w-9 h-9 flex items-center justify-center text-xs border",
                      currentAsset.grade === g
                        ? "border-sage-ink bg-sage-soft/40 text-sage-ink font-semibold"
                        : "border-border text-muted-foreground"
                    )}
                  >
                    {g}
                  </span>
                ))}
              </div>
              <Badge variant="default">{currentAsset.grade}</Badge>
            </div>
          }
        />
        <Row label="취득일" value={currentAsset.acquiredAt} />
        <Row
          label="자산 가치"
          value={
            currentAsset.currentValue > 0
              ? <span className="font-semibold">{formatPrice(currentAsset.currentValue)}</span>
              : <span className="text-muted-foreground text-[11px]">미입력</span>
          }
        />
        <Row
          label="사진"
          value={
            <div className="flex gap-2">
              {["정면", "측면", "상세 / 스크래치"].map((label) => (
                <div key={label} className="w-20 h-20 bg-muted flex items-center justify-center text-[10px] text-muted-foreground">
                  {label}
                </div>
              ))}
            </div>
          }
        />
        <Row
          label="추가 설명"
          value={
            currentAsset.note
              ? <span className="text-sm leading-relaxed">{currentAsset.note}</span>
              : <span className="text-muted-foreground text-[11px]">없음</span>
          }
        />
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[160px_1fr] gap-4 px-5 py-4 items-start">
      <span className="text-xs text-muted-foreground pt-0.5">{label}</span>
      <span className="text-sm">{value}</span>
    </div>
  );
}
