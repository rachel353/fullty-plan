"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { assets } from "@/lib/mock";
import { formatPrice } from "@/lib/utils";

const CHART_DATA = [
  { month: "Sep", value: 980000 },
  { month: "Oct", value: 1300000 },
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

  const minV = 0;
  const maxV = Math.ceil(Math.max(...CHART_DATA.map((d) => d.value)) / 1000000) * 1000000;

  function xPos(i: number) {
    return PAD.left + (i / (CHART_DATA.length - 1)) * innerW;
  }
  function yPos(v: number) {
    return PAD.top + innerH - ((v - minV) / (maxV - minV)) * innerH;
  }

  const linePath = CHART_DATA.map((d, i) => `${i === 0 ? "M" : "L"} ${xPos(i)} ${yPos(d.value)}`).join(" ");
  const areaPath = `${linePath} L ${xPos(CHART_DATA.length - 1)} ${PAD.top + innerH} L ${xPos(0)} ${PAD.top + innerH} Z`;

  const yTicks = [0, 1000000, 2000000, 3000000, 4000000];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 200 }}>
      {/* Y grid lines */}
      {yTicks.map((v) => (
        <g key={v}>
          <line
            x1={PAD.left} y1={yPos(v)}
            x2={PAD.left + innerW} y2={yPos(v)}
            stroke="currentColor" strokeOpacity={0.08} strokeWidth={1}
            className="text-foreground"
          />
          <text
            x={PAD.left - 8} y={yPos(v)}
            textAnchor="end" dominantBaseline="middle"
            fontSize={9} fill="currentColor" opacity={0.45}
            className="text-foreground"
          >
            {v === 0 ? "0" : `${v / 10000}만`}
          </text>
        </g>
      ))}

      {/* Area fill */}
      <path d={areaPath} fill="currentColor" opacity={0.06} className="text-sage-deep" />

      {/* Line */}
      <path d={linePath} fill="none" stroke="currentColor" strokeWidth={1.5} className="text-sage-ink" />

      {/* Dots + labels */}
      {CHART_DATA.map((d, i) => {
        const x = xPos(i);
        const y = yPos(d.value);
        const isLast = i === CHART_DATA.length - 1;
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={isLast ? 4 : 2.5}
              fill={isLast ? "currentColor" : "white"}
              stroke="currentColor" strokeWidth={1.5}
              className={isLast ? "text-sage-deep" : "text-sage-ink"}
            />
            {isLast && (
              <text x={x} y={y - 10} textAnchor="middle" fontSize={9} fontWeight="600"
                fill="currentColor" className="text-sage-deep">
                {formatPrice(d.value)}
              </text>
            )}
            {/* X axis label */}
            <text x={x} y={PAD.top + innerH + 16} textAnchor="middle" fontSize={9}
              fill="currentColor" opacity={0.5} className="text-foreground">
              {d.month}
            </text>
          </g>
        );
      })}

      {/* X axis base line */}
      <line
        x1={PAD.left} y1={PAD.top + innerH}
        x2={PAD.left + innerW} y2={PAD.top + innerH}
        stroke="currentColor" strokeOpacity={0.12} strokeWidth={1}
        className="text-foreground"
      />
    </svg>
  );
}

export default function AssetsPage() {
  const totalValue = assets.reduce((sum, a) => sum + a.currentValue, 0);

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold">자산 리포트</h2>
          <p className="text-sm text-muted-foreground mt-1">
            직접 등록한 가구의 실시간 시세
          </p>
        </div>
        <Link href="/mypage/assets/register">
          <Button size="sm" variant="outline">
            가구 등록하기
          </Button>
        </Link>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-border p-4">
          <div className="text-[11px] text-muted-foreground">총 자산 가치</div>
          <div className="text-2xl font-bold mt-2">{formatPrice(totalValue)}</div>
          <div className="text-[11px] text-muted-foreground mt-1">전월 대비 +2.4%</div>
        </div>
        <div className="border border-border p-4">
          <div className="text-[11px] text-muted-foreground">보유 가구</div>
          <div className="text-2xl font-bold mt-2">{assets.length}점</div>
          <div className="text-[11px] text-muted-foreground mt-1">평균 등급 S</div>
        </div>
        <div className="border border-border p-4">
          <div className="text-[11px] text-muted-foreground">예상 렌탈 수익 / 월</div>
          <div className="text-2xl font-bold mt-2">128,000원</div>
          <div className="text-[11px] text-muted-foreground mt-1">렌탈 활성화 시</div>
        </div>
      </div>

      {/* Chart */}
      <div className="border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase">
            보유 가구 합산 가치 추이
          </div>
          <div className="text-[10px] text-muted-foreground">2025.09 — 2026.04</div>
        </div>
        <AssetChart />
      </div>

      {/* Asset list */}
      <div className="divide-y divide-border border border-border">
        <div className="grid grid-cols-12 gap-4 px-4 py-2 text-[10px] text-muted-foreground tracking-widest uppercase bg-muted/30">
          <div className="col-span-1" />
          <div className="col-span-4">가구</div>
          <div className="col-span-1">등급</div>
          <div className="col-span-2">취득일</div>
          <div className="col-span-3">현재 시세</div>
          <div className="col-span-1" />
        </div>
        {assets.map((a) => (
          <div key={a.id} className="p-4 grid grid-cols-12 gap-4 items-center text-sm">
            <div className="col-span-1">
              <div className="w-12 h-12 bg-muted" />
            </div>
            <div className="col-span-4">
              <div className="text-[11px] text-muted-foreground">{a.brand}</div>
              <div className="font-medium">{a.name}</div>
            </div>
            <div className="col-span-1">
              <Badge variant="default">{a.grade}</Badge>
            </div>
            <div className="col-span-2 text-xs text-muted-foreground">{a.acquiredAt}</div>
            <div className="col-span-3">
              <div className="font-medium">{formatPrice(a.currentValue)}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">+3.2% 이번 달</div>
            </div>
            <div className="col-span-1 flex justify-end">
              <Link href="/sell">
                <Button size="sm" variant="outline">
                  판매
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
