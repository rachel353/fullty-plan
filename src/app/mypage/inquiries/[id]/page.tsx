"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { MOCK_QNA } from "@/lib/qna";

export default function InquiryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const q = MOCK_QNA.find((item) => item.id === id);

  if (!q) {
    return (
      <div className="space-y-4">
        <Link href="/mypage/inquiries" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink transition-colors">
          <ChevronLeft size={13} /> 1:1 문의
        </Link>
        <p className="text-sm text-muted-foreground">문의를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <Link href="/mypage/inquiries" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors">
          <ChevronLeft size={13} /> 1:1 문의
        </Link>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] text-muted-foreground mb-1">{q.productBrand} {q.productName}</div>
            <h2 className="text-lg font-bold leading-snug">{q.question}</h2>
          </div>
          <Badge variant={q.status === "답변 완료" ? "sage" : "default"} className="shrink-0 mt-0.5">
            {q.status}
          </Badge>
        </div>
        <div className="text-[11px] text-muted-foreground mt-2">{q.date}</div>
      </div>

      {/* 답변 */}
      {q.answer ? (
        <div className="border border-sage/30 bg-sage-soft/20 p-5 space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-[10px] text-sage-ink tracking-widest uppercase font-medium">{q.answeredBy}</div>
            <div className="text-[11px] text-muted-foreground">{q.answeredAt}</div>
          </div>
          <p className="text-sm leading-relaxed whitespace-pre-line">{q.answer}</p>
        </div>
      ) : (
        <div className="border border-border p-5 text-center text-sm text-muted-foreground">
          답변 준비 중입니다. 영업일 기준 1~2일 내 답변 드립니다.
        </div>
      )}

      <Link href={`/products/${q.productId}`} className="block text-xs text-sage-ink hover:text-sage-deep transition-colors">
        상품 보러가기 →
      </Link>
    </div>
  );
}
