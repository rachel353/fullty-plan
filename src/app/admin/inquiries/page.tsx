"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { MOCK_INQUIRIES } from "@/lib/inquiries";

const TABS = ["전체", "답변 대기", "답변 완료"] as const;
type Tab = typeof TABS[number];

export default function AdminInquiriesPage() {
  return (
    <InquiriesContent />
  );
}

import { useState } from "react";

function InquiriesContent() {
  const [tab, setTab] = useState<Tab>("전체");

  const filtered = tab === "전체" ? MOCK_INQUIRIES : MOCK_INQUIRIES.filter((q) => q.status === tab);
  const pendingCount = MOCK_INQUIRIES.filter((q) => q.status === "답변 대기").length;

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold">1:1 문의</h2>
        <p className="text-sm text-muted-foreground mt-1">회원 문의 조회 및 답변 관리</p>
      </div>

      {/* 탭 */}
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
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">유형</th>
              <th className="px-4 py-3">제목</th>
              <th className="px-4 py-3">접수일</th>
              <th className="px-4 py-3">상태</th>
              <th className="px-4 py-3 text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-12 text-center text-[11px] text-muted-foreground">해당 문의가 없습니다.</td></tr>
            ) : filtered.map((q) => (
              <tr key={q.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 text-[11px] text-muted-foreground">{q.id}</td>
                <td className="px-4 py-3 text-[11px] text-muted-foreground">{q.category}</td>
                <td className="px-4 py-3 font-medium">{q.title}</td>
                <td className="px-4 py-3 text-[11px] text-muted-foreground">{q.createdAt}</td>
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
