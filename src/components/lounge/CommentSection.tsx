"use client";

import { useState } from "react";
import { Flag, CornerDownRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/utils";

type Reply = {
  id: string;
  author: string;
  date: string;
  text: string;
};

type Comment = {
  id: string;
  author: string;
  date: string;
  text: string;
  replies: Reply[];
};

const REPORT_REASONS = [
  "스팸 / 광고",
  "욕설 / 혐오 표현",
  "개인정보 노출",
  "허위 정보",
  "기타",
];

const MOCK_COMMENTS: Comment[] = [
  {
    id: "c1",
    author: "이**",
    date: "2026-04-11",
    text: "저도 같은 제품 렌탈 중인데 정말 만족스럽네요. 등급 표기가 정확하다는 게 구매 결정에 정말 도움이 됐어요.",
    replies: [
      {
        id: "r1",
        author: "박**",
        date: "2026-04-11",
        text: "맞아요, 저도 검수 등급 믿고 구매했는데 기대 이상이었어요.",
      },
    ],
  },
  {
    id: "c2",
    author: "최**",
    date: "2026-04-10",
    text: "배송 포장이 정말 꼼꼼하더라고요. 빈티지 제품 특성상 이동 중 스크래치가 걱정됐는데 전혀 없이 왔어요.",
    replies: [],
  },
];

type ReportTarget = { type: "content" | "comment" | "reply"; label: string } | null;

interface CommentSectionProps {
  contentLabel?: string; // e.g. "이 리뷰" | "이 글"
}

export function CommentSection({ contentLabel = "이 글" }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [newText, setNewText] = useState("");

  // Reply state per comment
  const [replyOpen, setReplyOpen] = useState<Record<string, boolean>>({});
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [showReplies, setShowReplies] = useState<Record<string, boolean>>({});

  // Report modal
  const [reportTarget, setReportTarget] = useState<ReportTarget>(null);
  const [reportReason, setReportReason] = useState("");
  const [reportNote, setReportNote] = useState("");
  const [reportDone, setReportDone] = useState(false);

  function submitComment() {
    if (!newText.trim()) return;
    setComments((prev) => [
      ...prev,
      {
        id: `c${Date.now()}`,
        author: "김풀티",
        date: new Date().toISOString().slice(0, 10),
        text: newText.trim(),
        replies: [],
      },
    ]);
    setNewText("");
  }

  function submitReply(commentId: string) {
    const text = replyText[commentId]?.trim();
    if (!text) return;
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? {
              ...c,
              replies: [
                ...c.replies,
                {
                  id: `r${Date.now()}`,
                  author: "김풀티",
                  date: new Date().toISOString().slice(0, 10),
                  text,
                },
              ],
            }
          : c
      )
    );
    setReplyText((prev) => ({ ...prev, [commentId]: "" }));
    setReplyOpen((prev) => ({ ...prev, [commentId]: false }));
    setShowReplies((prev) => ({ ...prev, [commentId]: true }));
  }

  function openReport(target: ReportTarget) {
    setReportReason("");
    setReportNote("");
    setReportDone(false);
    setReportTarget(target);
  }

  function submitReport() {
    if (!reportReason) return;
    setReportDone(true);
  }

  return (
    <div className="mt-12 space-y-8">
      {/* Section header + report content */}
      <div className="flex items-center justify-between border-t border-border pt-8">
        <div className="text-sm font-semibold text-sage-ink">
          댓글 <span className="text-muted-foreground font-normal">{comments.length}</span>
        </div>
        <button
          onClick={() => openReport({ type: "content", label: contentLabel })}
          className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-sage-deep transition-colors"
        >
          <Flag size={12} strokeWidth={1.5} />
          {contentLabel} 신고
        </button>
      </div>

      {/* Comment list */}
      <div className="space-y-4">
        {comments.map((c) => (
          <div key={c.id} className="border border-border p-4 space-y-3">
            {/* Comment header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-sage/60 flex items-center justify-center text-[10px] text-sage-ink font-medium">
                  {c.author[0]}
                </div>
                <span className="text-xs font-medium text-sage-ink">{c.author}</span>
                <span className="text-[11px] text-muted-foreground">{c.date}</span>
              </div>
              <button
                onClick={() => openReport({ type: "comment", label: "이 댓글" })}
                className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-sage-deep transition-colors"
              >
                <Flag size={11} strokeWidth={1.5} />
                신고
              </button>
            </div>

            {/* Comment text */}
            <p className="text-sm text-sage-ink leading-relaxed">{c.text}</p>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setReplyOpen((prev) => ({ ...prev, [c.id]: !prev[c.id] }))}
                className="text-[11px] text-muted-foreground hover:text-sage-ink transition-colors"
              >
                답글 달기
              </button>
              {c.replies.length > 0 && (
                <button
                  onClick={() => setShowReplies((prev) => ({ ...prev, [c.id]: !prev[c.id] }))}
                  className="text-[11px] text-sage-deep hover:underline"
                >
                  {showReplies[c.id] ? "답글 숨기기" : `답글 ${c.replies.length}개 보기`}
                </button>
              )}
            </div>

            {/* Reply input */}
            {replyOpen[c.id] && (
              <div className="flex gap-2 pt-1">
                <CornerDownRight size={14} className="text-muted-foreground mt-2.5 flex-shrink-0" />
                <input
                  value={replyText[c.id] ?? ""}
                  onChange={(e) => setReplyText((prev) => ({ ...prev, [c.id]: e.target.value }))}
                  onKeyDown={(e) => e.key === "Enter" && submitReply(c.id)}
                  placeholder="답글을 입력하세요"
                  className="flex-1 h-9 px-3 text-sm border border-border bg-background focus:outline-none focus:border-sage-ink/40"
                />
                <Button size="sm" onClick={() => submitReply(c.id)} className="flex-shrink-0">
                  등록
                </Button>
              </div>
            )}

            {/* Replies */}
            {showReplies[c.id] && c.replies.length > 0 && (
              <div className="space-y-3 pt-1 pl-4 border-l border-border">
                {c.replies.map((rp) => (
                  <div key={rp.id} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CornerDownRight size={12} className="text-muted-foreground" />
                        <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[9px] text-sage-ink font-medium">
                          {rp.author[0]}
                        </div>
                        <span className="text-[11px] font-medium text-sage-ink">{rp.author}</span>
                        <span className="text-[10px] text-muted-foreground">{rp.date}</span>
                      </div>
                      <button
                        onClick={() => openReport({ type: "reply", label: "이 답글" })}
                        className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-sage-deep transition-colors"
                      >
                        <Flag size={10} strokeWidth={1.5} />
                        신고
                      </button>
                    </div>
                    <p className="text-[12px] text-sage-ink leading-relaxed pl-7">{rp.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* New comment input */}
      <div className="border border-border p-4 space-y-3">
        <div className="text-xs font-medium text-sage-ink">댓글 작성</div>
        <textarea
          rows={3}
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="댓글을 입력하세요."
          className="w-full p-3 text-sm border border-border bg-background resize-none focus:outline-none focus:border-sage-ink/40"
        />
        <div className="flex justify-end">
          <Button size="sm" onClick={submitComment} disabled={!newText.trim()}>
            댓글 등록
          </Button>
        </div>
      </div>

      {/* 신고 모달 */}
      <Modal
        open={reportTarget !== null}
        onClose={() => !reportDone && setReportTarget(null)}
        title="신고하기"
      >
        <div className="p-6 space-y-5">
          {reportDone ? (
            <div className="py-6 text-center space-y-3">
              <div className="w-10 h-10 mx-auto bg-sage-deep text-background flex items-center justify-center text-xl">
                ✓
              </div>
              <div className="text-sm font-semibold text-sage-ink">신고가 접수되었습니다.</div>
              <div className="text-[11px] text-muted-foreground leading-relaxed">
                검토 후 커뮤니티 가이드라인에 따라 조치하겠습니다.
              </div>
              <Button size="sm" className="mt-2" onClick={() => setReportTarget(null)}>
                확인
              </Button>
            </div>
          ) : (
            <>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-sage-ink">{reportTarget?.label}</span>을 신고하는 이유를 선택해 주세요.
              </div>

              <div className="space-y-2">
                {REPORT_REASONS.map((reason) => (
                  <button
                    key={reason}
                    onClick={() => setReportReason(reason)}
                    className={cn(
                      "w-full text-left border p-3 text-sm transition-colors flex items-center gap-3",
                      reportReason === reason
                        ? "border-sage-ink bg-sage-soft/40"
                        : "border-border hover:bg-muted/40"
                    )}
                  >
                    <div className={cn(
                      "w-4 h-4 rounded-full border-2 flex-shrink-0",
                      reportReason === reason ? "border-sage-ink bg-sage-ink" : "border-border"
                    )} />
                    {reason}
                  </button>
                ))}
              </div>

              <div>
                <div className="text-xs text-muted-foreground mb-2">추가 설명 (선택)</div>
                <textarea
                  rows={3}
                  value={reportNote}
                  onChange={(e) => setReportNote(e.target.value)}
                  placeholder="신고 내용을 자세히 적어주시면 빠른 처리에 도움이 됩니다."
                  className="w-full p-3 text-sm border border-border bg-background resize-none focus:outline-none focus:border-sage-ink/40"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => setReportTarget(null)}>
                  취소
                </Button>
                <Button size="sm" className="flex-1" disabled={!reportReason} onClick={submitReport}>
                  신고 제출
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
