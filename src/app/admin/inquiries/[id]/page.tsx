"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MOCK_INQUIRIES, Inquiry } from "@/lib/inquiries";

export default function AdminInquiryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [inquiries, setInquiries] = useState<Inquiry[]>(MOCK_INQUIRIES);
  const [replyText, setReplyText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const inquiry = inquiries.find((q) => q.id === id);

  if (!inquiry) {
    return (
      <div className="space-y-4">
        <Link href="/admin/inquiries" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink transition-colors">
          <ChevronLeft size={13} /> 1:1 문의
        </Link>
        <p className="text-sm text-muted-foreground">문의를 찾을 수 없습니다.</p>
      </div>
    );
  }

  function handleSubmitReply() {
    if (!replyText.trim()) return;
    setInquiries((prev) => prev.map((q) =>
      q.id === id
        ? { ...q, status: "답변 완료", reply: { body: replyText, repliedAt: new Date().toISOString().slice(0, 10) } }
        : q
    ));
    setSubmitted(true);
  }

  const currentInquiry = inquiries.find((q) => q.id === id)!;

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <Link href="/admin/inquiries" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors">
          <ChevronLeft size={13} /> 1:1 문의
        </Link>
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-bold">{inquiry.title}</h2>
          <Badge variant={currentInquiry.status === "답변 완료" ? "sage" : "default"} className="shrink-0 mt-0.5">
            {currentInquiry.status}
          </Badge>
        </div>
        <div className="flex items-center gap-2 mt-2 text-[11px] text-muted-foreground">
          <span>{inquiry.category}</span>
          <span>·</span>
          <span>접수 {inquiry.createdAt}</span>
        </div>
      </div>

      {/* 문의 내용 */}
      <div className="border border-border p-5 space-y-2">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">문의 내용</div>
        <p className="text-sm leading-relaxed whitespace-pre-line">{inquiry.body}</p>
      </div>

      {/* 기존 답변 */}
      {currentInquiry.reply && (
        <div className="border border-sage/30 bg-sage-soft/20 p-5 space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-[10px] text-sage-ink tracking-widest uppercase font-medium">답변 완료</div>
            <div className="text-[11px] text-muted-foreground">{currentInquiry.reply.repliedAt}</div>
          </div>
          <p className="text-sm leading-relaxed whitespace-pre-line">{currentInquiry.reply.body}</p>
        </div>
      )}

      {/* 답변 작성 — 미답변일 때만 */}
      {currentInquiry.status === "답변 대기" && !submitted && (
        <div className="space-y-3 border border-border p-5">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">답변 작성</div>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="답변 내용을 입력하세요."
            rows={6}
            className="w-full px-4 py-3 text-sm border border-border bg-background resize-none outline-none focus:border-sage-ink leading-relaxed"
          />
          <div className="flex justify-end">
            <Button disabled={!replyText.trim()} onClick={handleSubmitReply}>답변 등록</Button>
          </div>
        </div>
      )}

      {submitted && (
        <div className="border border-sage/30 bg-sage-soft/20 p-4 text-sm text-sage-ink text-center">
          답변이 등록되었습니다.
        </div>
      )}
    </div>
  );
}
