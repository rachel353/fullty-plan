"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { MOCK_QNA } from "@/lib/qna";
import { cn } from "@/lib/utils";

const TABS = ["전체", "답변 대기", "답변 완료"] as const;
type Tab = typeof TABS[number];

export default function AdminInquiriesPage() {
  const [tab, setTab] = useState<Tab>("전체");

  const filtered = tab === "전체" ? MOCK_QNA : MOCK_QNA.filter((q) => q.status === tab);
  const pendingCount = MOCK_QNA.filter((q) => q.status === "답변 대기").length;

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold">1:1 문의</h2>
        <p className="text-sm text-muted-foreground mt-1">상품 Q&A 조회 및 답변 관리</p>
      </div>

      <div className="flex items-center gap-0 border-b border-border">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-5 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors relative",
              tab === t ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {t}
            {t === "답변 대기" && pendingCount > 0 && (
              <span className="ml-1.5 text-[10px] bg-foreground text-background px-1.5 py-0.5">{pendingCount}</span>
            )}
          </button>
        ))}
      </div>

      <div className="border border-border">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted">
            <tr className="text-left text-xs font-medium text-muted-foreground">
              <th className="px-4 py-3">상품</th>
              <th className="px-4 py-3">작성자</th>
              <th className="px-4 py-3">문의 내용</th>
              <th className="px-4 py-3">작성일</th>
              <th className="px-4 py-3">상태</th>
              <th className="px-4 py-3 text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-12 text-center text-[11px] text-muted-foreground">해당 문의가 없습니다.</td></tr>
            ) : filtered.map((q) => (
              <tr key={q.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="text-[11px] text-muted-foreground">{q.productBrand}</div>
                  <div className="font-medium">{q.productName}</div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{q.author}</td>
                <td className="px-4 py-3 max-w-[280px]">
                  <div className="truncate text-sm">{q.question}</div>
                </td>
                <td className="px-4 py-3 text-[11px] text-muted-foreground">{q.date}</td>
                <td className="px-4 py-3">
                  <Badge variant={q.status === "답변 완료" ? "sage" : "default"}>{q.status}</Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/inquiries/${q.id}`} className="text-xs text-sage-ink hover:text-sage-deep transition-colors">
                    {q.status === "답변 대기" ? "답변하기 →" : "상세 →"}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
