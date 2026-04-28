"use client";

import { useState } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { cn } from "@/lib/utils";

type Range = "4W" | "3M" | "6M" | "12M";

const DATA: Record<Range, { label: string; gmv: number; count: number }[]> = {
  "4W": [
    { label: "4/1", gmv: 42, count: 18 },
    { label: "4/7", gmv: 58, count: 24 },
    { label: "4/14", gmv: 51, count: 21 },
    { label: "4/21", gmv: 73, count: 31 },
    { label: "4/28", gmv: 67, count: 28 },
  ],
  "3M": [
    { label: "2월 1주", gmv: 38, count: 15 },
    { label: "2월 2주", gmv: 44, count: 19 },
    { label: "2월 3주", gmv: 52, count: 22 },
    { label: "2월 4주", gmv: 49, count: 20 },
    { label: "3월 1주", gmv: 61, count: 26 },
    { label: "3월 2주", gmv: 57, count: 24 },
    { label: "3월 3주", gmv: 70, count: 30 },
    { label: "3월 4주", gmv: 66, count: 28 },
    { label: "4월 1주", gmv: 42, count: 18 },
    { label: "4월 2주", gmv: 58, count: 24 },
    { label: "4월 3주", gmv: 51, count: 21 },
    { label: "4월 4주", gmv: 73, count: 31 },
  ],
  "6M": [
    { label: "11월", gmv: 98, count: 42 },
    { label: "12월", gmv: 142, count: 61 },
    { label: "1월", gmv: 115, count: 49 },
    { label: "2월", gmv: 183, count: 77 },
    { label: "3월", gmv: 254, count: 108 },
    { label: "4월", gmv: 184, count: 79 },
  ],
  "12M": [
    { label: "5월", gmv: 62, count: 26 },
    { label: "6월", gmv: 74, count: 31 },
    { label: "7월", gmv: 89, count: 38 },
    { label: "8월", gmv: 95, count: 41 },
    { label: "9월", gmv: 83, count: 35 },
    { label: "10월", gmv: 107, count: 46 },
    { label: "11월", gmv: 98, count: 42 },
    { label: "12월", gmv: 142, count: 61 },
    { label: "1월", gmv: 115, count: 49 },
    { label: "2월", gmv: 183, count: 77 },
    { label: "3월", gmv: 254, count: 108 },
    { label: "4월", gmv: 184, count: 79 },
  ],
};

const RANGES: { label: string; value: Range }[] = [
  { label: "4주", value: "4W" },
  { label: "3개월", value: "3M" },
  { label: "6개월", value: "6M" },
  { label: "12개월", value: "12M" },
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-background border border-border px-3 py-2 text-xs space-y-1 shadow-md">
      <div className="font-semibold text-sage-ink mb-1">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2">
          <span style={{ color: p.color }}>●</span>
          <span className="text-muted-foreground">{p.name === "gmv" ? "GMV" : "거래 건수"}</span>
          <span className="font-medium ml-auto pl-4">
            {p.name === "gmv" ? `${p.value}백만원` : `${p.value}건`}
          </span>
        </div>
      ))}
    </div>
  );
}

export function TransactionChart() {
  const [range, setRange] = useState<Range>("6M");
  const data = DATA[range];

  return (
    <div className="space-y-4">
      {/* 범위 필터 */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {RANGES.map((r) => (
            <button
              key={r.value}
              onClick={() => setRange(r.value)}
              className={cn(
                "px-3 h-7 text-[11px] border transition-colors",
                range === r.value
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:bg-muted text-muted-foreground"
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 bg-sage-soft border border-sage-ink/30" />
            GMV (백만원)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-6 border-t-2 border-dashed border-sage-deep" />
            거래 건수
          </span>
        </div>
      </div>

      {/* 차트 */}
      <ResponsiveContainer width="100%" height={240}>
        <ComposedChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            yAxisId="gmv"
            orientation="left"
            tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}M`}
            width={36}
          />
          <YAxis
            yAxisId="count"
            orientation="right"
            tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}건`}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--muted)", opacity: 0.5 }} />
          <Bar
            yAxisId="gmv"
            dataKey="gmv"
            name="gmv"
            fill="var(--sage-soft)"
            stroke="var(--sage-ink)"
            strokeWidth={0.5}
            radius={[2, 2, 0, 0]}
            maxBarSize={40}
          />
          <Line
            yAxisId="count"
            dataKey="count"
            name="count"
            stroke="var(--sage-deep)"
            strokeWidth={2}
            dot={{ r: 3, fill: "var(--sage-deep)", strokeWidth: 0 }}
            strokeDasharray="4 2"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
