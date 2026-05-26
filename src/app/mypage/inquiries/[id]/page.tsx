"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { MOCK_INQUIRIES } from "@/lib/inquiries";

export default function InquiryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const inquiry = MOCK_INQUIRIES.find((q) => q.id === id);

  if (!inquiry) {
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
          <h2 className="text-xl font-bold">{inquiry.title}</h2>
          <Badge variant={inquiry.status === "답변 완료" ? "sage" : "default"} className="shrink-0 mt-0.5">
            {inquiry.status}
          </Badge>
        </div>
        <div className="flex items-center gap-2 mt-2 text-[11px] text-muted-foreground">
          <span>{inquiry.category}</span>
          <span>·</span>
          <span>{inquiry.createdAt}</span>
        </div>
      </div>

      {/* 문의 내용 */}
      <div className="border border-border p-5 space-y-2">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">문의 내용</div>
        <p className="text-sm leading-relaxed whitespace-pre-line">{inquiry.body}</p>
      </div>

      {/* 답변 */}
      {inquiry.reply ? (
        <div className="border border-sage/30 bg-sage-soft/20 p-5 space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-[10px] text-sage-ink tracking-widest uppercase font-medium">풀티 답변</div>
            <div className="text-[11px] text-muted-foreground">{inquiry.reply.repliedAt}</div>
          </div>
          <p className="text-sm leading-relaxed whitespace-pre-line">{inquiry.reply.body}</p>
        </div>
      ) : (
        <div className="border border-border p-5 text-center text-sm text-muted-foreground">
          답변 준비 중입니다. 영업일 기준 1~2일 내 답변 드립니다.
        </div>
      )}
    </div>
  );
}
