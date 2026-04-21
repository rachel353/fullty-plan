"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

const rows = [
  { id: "st001", name: "Herman Miller Aeron", type: "판매" as const, sale: 1280000, fee: 192000, payout: 1088000, status: "정산 완료" as const, period: "2026-03" },
  { id: "st002", name: "Fritz Hansen Egg Chair", type: "렌탈" as const, sale: 850000, fee: 127500, payout: 722500, status: "정산 예정" as const, period: "2026-03" },
  { id: "st003", name: "Vitra Panton Chair", type: "위탁" as const, sale: 380000, fee: 76000, payout: 304000, status: "정산 예정" as const, period: "2026-04" },
];

const MONTHLY = [
  { month: "Nov", sell: 1800000, rent: 520000, consign: 280000 },
  { month: "Dec", sell: 3200000, rent: 980000, consign: 750000 },
  { month: "Jan", sell: 1400000, rent: 860000, consign: 630000 },
  { month: "Feb", sell: 3600000, rent: 1120000, consign: 550000 },
  { month: "Mar", sell: 4200000, rent: 1380000, consign: 455000 },
  { month: "Apr", sell: 2480000, rent: 1040000, consign: 320000 },
];

function SettlementChart() {
  const W = 560;
  const H = 180;
  const PAD = { top: 16, right: 16, bottom: 32, left: 60 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const maxV = Math.ceil(Math.max(...MONTHLY.map((d) => d.sell + d.rent + d.consign)) / 1000000) * 1000000;
  const BAR_W = (innerW / MONTHLY.length) * 0.55;
  const BAR_STEP = innerW / MONTHLY.length;

  function yPos(v: number) { return PAD.top + innerH - (v / maxV) * innerH; }
  function barH(v: number) { return (v / maxV) * innerH; }

  const yTicks = [0, 1000000, 2000000, 3000000, 4000000, 5000000, 6000000].filter((v) => v <= maxV);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 180 }}>
      {yTicks.map((v) => (
        <g key={v}>
          <line x1={PAD.left} y1={yPos(v)} x2={PAD.left + innerW} y2={yPos(v)}
            stroke="currentColor" strokeOpacity={0.07} strokeWidth={1} className="text-foreground" />
          <text x={PAD.left - 6} y={yPos(v)} textAnchor="end" dominantBaseline="middle"
            fontSize={9} fill="currentColor" opacity={0.45} className="text-foreground">
            {v === 0 ? "0" : `${v / 10000}만`}
          </text>
        </g>
      ))}

      {MONTHLY.map((d, i) => {
        const x = PAD.left + i * BAR_STEP + (BAR_STEP - BAR_W) / 2;
        const total = d.sell + d.rent + d.consign;
        const sellH = barH(d.sell);
        const rentH = barH(d.rent);
        const consignH = barH(d.consign);
        const isLast = i === MONTHLY.length - 1;

        return (
          <g key={i}>
            {/* 위탁 (bottom) */}
            <rect x={x} y={yPos(d.consign)} width={BAR_W} height={consignH}
              fill="currentColor" opacity={0.25} className="text-sage-ink" />
            {/* 렌탈 (middle) */}
            <rect x={x} y={yPos(d.consign + d.rent)} width={BAR_W} height={rentH}
              fill="currentColor" opacity={0.55} className="text-sage-ink" />
            {/* 판매 (top) */}
            <rect x={x} y={yPos(total)} width={BAR_W} height={sellH}
              fill="currentColor" opacity={isLast ? 1 : 0.85} className="text-sage-deep" />

            {isLast && (
              <text x={x + BAR_W / 2} y={yPos(total) - 6} textAnchor="middle"
                fontSize={9} fontWeight="600" fill="currentColor" className="text-sage-deep">
                {(total / 10000).toFixed(0)}만
              </text>
            )}

            <text x={x + BAR_W / 2} y={PAD.top + innerH + 14} textAnchor="middle"
              fontSize={9} fill="currentColor" opacity={0.5} className="text-foreground">
              {d.month}
            </text>
          </g>
        );
      })}

      <line x1={PAD.left} y1={PAD.top + innerH} x2={PAD.left + innerW} y2={PAD.top + innerH}
        stroke="currentColor" strokeOpacity={0.1} strokeWidth={1} className="text-foreground" />
    </svg>
  );
}

const FILTERS = ["전체", "판매", "렌탈", "위탁"] as const;
type Filter = typeof FILTERS[number];

export default function SettlementsPage() {
  const [filter, setFilter] = useState<Filter>("전체");

  const filtered = rows.filter((r) => filter === "전체" || r.type === filter);

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold">정산 내역</h2>
        <p className="text-sm text-muted-foreground mt-1">셀러 정산: 매월 1회 · 월말 일괄 지급</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Stat label="이번 달 정산 예정" value="3,840,000원" />
        <Stat label="지난 달 지급 완료" value="2,180,000원" />
        <Stat label="누적 정산" value="42,650,000원" />
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>월별 정산 추이</CardTitle>
            <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1"><span className="w-3 h-2 bg-sage-deep inline-block" /> 판매</span>
              <span className="flex items-center gap-1"><span className="w-3 h-2 bg-sage-ink/55 inline-block" /> 렌탈</span>
              <span className="flex items-center gap-1"><span className="w-3 h-2 bg-sage-ink/25 inline-block" /> 위탁</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <SettlementChart />
        </CardContent>
      </Card>

      {/* Filter + Table */}
      <div className="flex items-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 h-9 text-xs font-medium border transition-colors",
              filter === f
                ? "border-foreground bg-foreground text-background"
                : "border-border hover:bg-muted"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted">
              <tr className="text-left text-xs font-medium text-muted-foreground">
                <th className="px-4 py-3">정산 ID</th>
                <th className="px-4 py-3">상품</th>
                <th className="px-4 py-3">유형</th>
                <th className="px-4 py-3">판매가</th>
                <th className="px-4 py-3">수수료 (15%)</th>
                <th className="px-4 py-3">실 정산액</th>
                <th className="px-4 py-3">기간</th>
                <th className="px-4 py-3 text-right">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td className="px-4 py-3 text-[11px] text-muted-foreground">{r.id}</td>
                  <td className="px-4 py-3 font-medium">{r.name}</td>
                  <td className="px-4 py-3"><Badge variant="outline">{r.type}</Badge></td>
                  <td className="px-4 py-3">{r.sale.toLocaleString()}원</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.fee.toLocaleString()}원</td>
                  <td className="px-4 py-3 font-semibold">{r.payout.toLocaleString()}원</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.period}</td>
                  <td className="px-4 py-3 text-right">
                    <Badge variant={r.status === "정산 완료" ? "default" : "outline"}>
                      {r.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border p-5">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className="text-xl font-bold mt-2">{value}</div>
    </div>
  );
}
