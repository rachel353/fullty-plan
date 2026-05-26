"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { assets as initialAssets, Asset } from "@/lib/mock";
import { formatPrice } from "@/lib/utils";

const CHART_DATA = [
  { month: "Nov", value: 1620000 },
  { month: "Dec", value: 2250000 },
  { month: "Jan", value: 3100000 },
  { month: "Feb", value: 3540000 },
  { month: "Mar", value: 4100000 },
  { month: "Apr", value: 4480000 },
];

function AssetChart() {
  const W = 600;
  const H = 200;
  const PAD = { top: 20, right: 24, bottom: 36, left: 64 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const maxV = Math.ceil(Math.max(...CHART_DATA.map((d) => d.value)) / 1000000) * 1000000;

  function xPos(i: number) { return PAD.left + (i / (CHART_DATA.length - 1)) * innerW; }
  function yPos(v: number) { return PAD.top + innerH - (v / maxV) * innerH; }

  const linePath = CHART_DATA.map((d, i) => `${i === 0 ? "M" : "L"} ${xPos(i)} ${yPos(d.value)}`).join(" ");
  const areaPath = `${linePath} L ${xPos(CHART_DATA.length - 1)} ${PAD.top + innerH} L ${xPos(0)} ${PAD.top + innerH} Z`;
  const yTicks = [0, 1000000, 2000000, 3000000, 4000000];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 200 }}>
      {yTicks.map((v) => (
        <g key={v}>
          <line x1={PAD.left} y1={yPos(v)} x2={PAD.left + innerW} y2={yPos(v)}
            stroke="currentColor" strokeOpacity={0.08} strokeWidth={1} className="text-foreground" />
          <text x={PAD.left - 8} y={yPos(v)} textAnchor="end" dominantBaseline="middle"
            fontSize={9} fill="currentColor" opacity={0.45} className="text-foreground">
            {v === 0 ? "0" : `${v / 10000}만`}
          </text>
        </g>
      ))}
      <path d={areaPath} fill="currentColor" opacity={0.06} className="text-sage-deep" />
      <path d={linePath} fill="none" stroke="currentColor" strokeWidth={1.5} className="text-sage-ink" />
      {CHART_DATA.map((d, i) => {
        const x = xPos(i);
        const y = yPos(d.value);
        const isLast = i === CHART_DATA.length - 1;
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={isLast ? 4 : 2.5}
              fill={isLast ? "currentColor" : "white"}
              stroke="currentColor" strokeWidth={1.5}
              className={isLast ? "text-sage-deep" : "text-sage-ink"} />
            {isLast && (
              <text x={x} y={y - 10} textAnchor="middle" fontSize={9} fontWeight="600"
                fill="currentColor" className="text-sage-deep">
                {formatPrice(d.value)}
              </text>
            )}
            <text x={x} y={PAD.top + innerH + 16} textAnchor="middle" fontSize={9}
              fill="currentColor" opacity={0.5} className="text-foreground">
              {d.month}
            </text>
          </g>
        );
      })}
      <line x1={PAD.left} y1={PAD.top + innerH} x2={PAD.left + innerW} y2={PAD.top + innerH}
        stroke="currentColor" strokeOpacity={0.12} strokeWidth={1} className="text-foreground" />
    </svg>
  );
}

export default function AdminAssetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [assetList, setAssetList] = useState<Asset[]>(initialAssets);
  const [priceInput, setPriceInput] = useState("");

  const asset = assetList.find((a) => a.id === id);

  if (!asset) {
    return (
      <div className="space-y-6">
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

  const totalValue = assetList.reduce((s, a) => s + a.currentValue, 0);

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <Link href="/admin/assets" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors">
          <ChevronLeft size={13} /> 자산화 상품 관리
        </Link>
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold">자산 상세</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {asset.owner} · {asset.brand} {asset.name}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={
              asset.status === "검토 필요" ? "default" :
              asset.status === "판매 전환" ? "muted" : "outline"
            }>
              {asset.status}
            </Badge>
            <Link href={`/admin/members/${asset.ownerId}`}>
              <Button size="sm" variant="ghost">회원 상세</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 검토 필요: 가격 입력 배너 */}
      {asset.status === "검토 필요" && (
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

      {/* 요약 스탯 — 유저 가구자산화 페이지와 동일 구조 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-border p-4">
          <div className="text-[11px] text-muted-foreground">현재 자산 가치</div>
          <div className="text-2xl font-bold mt-2">
            {asset.currentValue > 0 ? formatPrice(asset.currentValue) : <span className="text-muted-foreground text-base">미입력</span>}
          </div>
          <div className="text-[11px] text-muted-foreground mt-1">전월 대비 +3.2%</div>
        </div>
        <div className="border border-border p-4">
          <div className="text-[11px] text-muted-foreground">등급</div>
          <div className="text-2xl font-bold mt-2">{asset.grade}</div>
          <div className="text-[11px] text-muted-foreground mt-1">취득일 {asset.acquiredAt}</div>
        </div>
        <div className="border border-border p-4">
          <div className="text-[11px] text-muted-foreground">예상 렌탈 수익 / 월</div>
          <div className="text-2xl font-bold mt-2">
            {asset.currentValue > 0 ? formatPrice(Math.round(asset.currentValue * 0.1)) : "—"}
          </div>
          <div className="text-[11px] text-muted-foreground mt-1">렌탈 활성화 시</div>
        </div>
      </div>

      {/* 시세 추이 차트 */}
      <div className="border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase">
            자산 가치 추이
          </div>
          <div className="text-[10px] text-muted-foreground">2025.11 — 2026.04</div>
        </div>
        <AssetChart />
      </div>

      {/* 자산 정보 — 유저 가구자산화 리스트 항목과 동일 구조 */}
      <div className="border border-border">
        <div className="grid grid-cols-12 gap-4 px-4 py-2 text-[10px] text-muted-foreground tracking-widest uppercase bg-muted/30">
          <div className="col-span-1" />
          <div className="col-span-4">가구</div>
          <div className="col-span-1">등급</div>
          <div className="col-span-2">취득일</div>
          <div className="col-span-3">현재 시세</div>
          <div className="col-span-1" />
        </div>
        <div className="p-4 grid grid-cols-12 gap-4 items-center text-sm">
          <div className="col-span-1">
            <div className="w-12 h-12 bg-muted" />
          </div>
          <div className="col-span-4">
            <div className="text-[11px] text-muted-foreground">{asset.brand}</div>
            <div className="font-medium">{asset.name}</div>
          </div>
          <div className="col-span-1">
            <Badge variant="default">{asset.grade}</Badge>
          </div>
          <div className="col-span-2 text-xs text-muted-foreground">{asset.acquiredAt}</div>
          <div className="col-span-3">
            <div className="font-medium">
              {asset.currentValue > 0 ? formatPrice(asset.currentValue) : <span className="text-muted-foreground">미입력</span>}
            </div>
            {asset.currentValue > 0 && (
              <div className="text-[10px] text-muted-foreground mt-0.5">+3.2% 이번 달</div>
            )}
          </div>
          <div className="col-span-1 flex justify-end">
            <Link href="/admin/sell">
              <Button size="sm" variant="outline">판매 전환</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
