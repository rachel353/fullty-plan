"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MOCK_QNA, QnAItem } from "@/lib/qna";

export default function AdminInquiryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [qnaList, setQnaList] = useState<QnAItem[]>(MOCK_QNA);
  const [replyText, setReplyText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const q = qnaList.find((item) => item.id === id);

  if (!q) {
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
    setQnaList((prev) => prev.map((item) =>
      item.id === id
        ? { ...item, status: "답변 완료", answer: replyText, answeredAt: new Date().toISOString().slice(0, 10), answeredBy: "Fullty 운영팀" }
        : item
    ));
    setSubmitted(true);
  }

  const current = qnaList.find((item) => item.id === id)!;

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <Link href="/admin/inquiries" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors">
          <ChevronLeft size={13} /> 1:1 문의
        </Link>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] text-muted-foreground mb-1">{q.productBrand} {q.productName} · {q.author}</div>
            <h2 className="text-lg font-bold leading-snug">{q.question}</h2>
          </div>
          <Badge variant={current.status === "답변 완료" ? "sage" : "default"} className="shrink-0 mt-0.5">
            {current.status}
          </Badge>
        </div>
        <div className="text-[11px] text-muted-foreground mt-2">{q.date}</div>
      </div>

      {/* 기존 답변 */}
      {current.answer && (
        <div className="border border-sage/30 bg-sage-soft/20 p-5 space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-[10px] text-sage-ink tracking-widest uppercase font-medium">{current.answeredBy}</div>
            <div className="text-[11px] text-muted-foreground">{current.answeredAt}</div>
          </div>
          <p className="text-sm leading-relaxed whitespace-pre-line">{current.answer}</p>
        </div>
      )}

      {/* 답변 작성 */}
      {current.status === "답변 대기" && !submitted && (
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
