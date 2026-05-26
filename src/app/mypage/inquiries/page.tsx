"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { MOCK_QNA } from "@/lib/qna";

const MY_QNA = MOCK_QNA.filter((q) => q.author === "김**");

export default function InquiriesPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold">1:1 문의</h2>
        <p className="text-sm text-muted-foreground mt-1">상품 Q&A 내역 · 총 {MY_QNA.length}건</p>
      </div>

      <div className="divide-y divide-border border border-border">
        {MY_QNA.length === 0 ? (
          <div className="py-16 text-center text-sm text-muted-foreground">
            문의 내역이 없습니다.
          </div>
        ) : MY_QNA.map((q) => (
          <Link key={q.id} href={`/mypage/inquiries/${q.id}`} className="block px-5 py-4 hover:bg-muted/30 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-muted-foreground">{q.productBrand} {q.productName}</span>
                  <Badge variant={q.status === "답변 완료" ? "sage" : "default"}>
                    {q.status}
                  </Badge>
                </div>
                <div className="font-medium text-sm truncate">{q.question}</div>
                <div className="text-[11px] text-muted-foreground">{q.date}</div>
              </div>
              <span className="text-muted-foreground text-xs shrink-0 mt-1">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
