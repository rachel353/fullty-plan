"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { notices as INITIAL_NOTICES, type Notice, type NoticeCategory } from "@/lib/notices";

const CATEGORIES: NoticeCategory[] = ["공지", "이벤트", "점검", "업데이트"];

const CATEGORY_VARIANT: Record<NoticeCategory, "default" | "outline" | "muted" | "sage"> = {
  공지: "outline",
  이벤트: "sage",
  점검: "muted",
  업데이트: "default",
};

function emptyNotice(): Notice {
  return {
    id: `nt${Date.now()}`,
    title: "",
    category: "공지",
    pinned: false,
    published: true,
    date: new Date().toISOString().slice(0, 10),
    body: [""],
  };
}

function Toggle({ on, onClick, label }: { on: boolean; onClick: () => void; label: string }) {
  return (
    <button onClick={onClick} aria-label={label} className={cn("w-10 h-6 relative flex-shrink-0", on ? "bg-sage-ink" : "bg-muted border border-border")}>
      <span className={cn("absolute top-0.5 w-5 h-5 bg-background transition-all", on ? "left-5" : "left-0.5 border border-border")} />
    </button>
  );
}

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>(INITIAL_NOTICES);
  const [editTarget, setEditTarget] = useState<Notice | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Notice | null>(null);

  const isNew = !!editTarget && !notices.some((n) => n.id === editTarget.id);
  const publishedCount = notices.filter((n) => n.published).length;
  const pinnedCount = notices.filter((n) => n.pinned).length;

  function saveEdit() {
    if (!editTarget) return;
    setNotices((prev) =>
      prev.some((n) => n.id === editTarget.id)
        ? prev.map((n) => (n.id === editTarget.id ? editTarget : n))
        : [editTarget, ...prev]
    );
    setEditTarget(null);
  }

  function handleDelete(id: string) {
    setNotices((prev) => prev.filter((n) => n.id !== id));
    setDeleteTarget(null);
  }

  function togglePublished(id: string) {
    setNotices((prev) => prev.map((n) => (n.id === id ? { ...n, published: !n.published } : n)));
  }

  function togglePinned(id: string) {
    setNotices((prev) => prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)));
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold">공지사항 관리</h2>
          <p className="text-sm text-muted-foreground mt-1">사용자에게 노출되는 공지 / 이벤트 / 점검 / 업데이트 안내를 관리합니다.</p>
        </div>
        <Button size="sm" onClick={() => setEditTarget(emptyNotice())}>+ 공지 등록</Button>
      </div>

      {/* 요약 */}
      <div className="grid grid-cols-3 gap-3">
        <Stat label="전체 공지" value={`${notices.length}건`} />
        <Stat label="게시 중" value={`${publishedCount}건`} highlight />
        <Stat label="상단 고정" value={`${pinnedCount}건`} />
      </div>

      <p className="text-[11px] text-muted-foreground">
        고정된 공지는 헤더 안내 바와 공지사항 목록 상단에 우선 노출됩니다. 게시 중이 아닌 공지는 사용자 화면에 보이지 않습니다.
      </p>

      {/* 목록 */}
      <div className="border border-border">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted">
            <tr className="text-left text-xs font-medium text-muted-foreground">
              <th className="px-4 py-3">분류</th>
              <th className="px-4 py-3">제목</th>
              <th className="px-4 py-3">고정</th>
              <th className="px-4 py-3">게시 상태</th>
              <th className="px-4 py-3">등록일</th>
              <th className="px-4 py-3 text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {notices.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-16 text-center text-[11px] text-muted-foreground">
                  등록된 공지가 없습니다.
                </td>
              </tr>
            ) : (
              notices.map((n) => (
                <tr key={n.id} className={cn("hover:bg-muted/30 transition-colors", !n.published && "opacity-50")}>
                  <td className="px-4 py-3"><Badge variant={CATEGORY_VARIANT[n.category]}>{n.category}</Badge></td>
                  <td className="px-4 py-3 max-w-[320px] truncate text-sage-ink font-medium">{n.title}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => togglePinned(n.id)}
                      className={cn(
                        "text-[11px] px-2.5 py-1 border transition-colors",
                        n.pinned
                          ? "border-sage-ink bg-sage-soft/50 text-sage-ink"
                          : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                      )}
                    >
                      {n.pinned ? "고정됨" : "고정 안 함"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => togglePublished(n.id)}
                      className="flex items-center gap-2"
                    >
                      <Toggle on={n.published} onClick={() => togglePublished(n.id)} label="게시 여부" />
                      <span className="text-[11px] text-muted-foreground">{n.published ? "게시 중" : "숨김"}</span>
                    </button>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{n.date}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button size="sm" variant="outline" onClick={() => setEditTarget({ ...n, body: [...n.body] })}>편집</Button>
                      <button onClick={() => setDeleteTarget(n)} className="p-1.5 text-muted-foreground hover:text-foreground">
                        <X size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 편집 / 등록 모달 */}
      {editTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setEditTarget(null)} />
          <div className="relative bg-background border border-border w-full max-w-lg p-6 space-y-5 z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">{isNew ? "공지 등록" : "공지 편집"}</h3>
              <button onClick={() => setEditTarget(null)}><X size={16} className="text-muted-foreground" /></button>
            </div>

            {/* 제목 */}
            <div>
              <div className="text-[11px] text-muted-foreground mb-1">제목</div>
              <input
                value={editTarget.title}
                onChange={(e) => setEditTarget({ ...editTarget, title: e.target.value })}
                placeholder="예: Fullty 정기 서버 점검 안내"
                className="h-9 px-3 text-xs border border-border bg-background w-full outline-none focus:border-sage-ink"
              />
            </div>

            {/* 분류 */}
            <div>
              <div className="text-[11px] text-muted-foreground mb-2">분류</div>
              <div className="flex gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setEditTarget({ ...editTarget, category: c })}
                    className={cn(
                      "px-4 py-1.5 text-xs border transition-colors",
                      editTarget.category === c
                        ? "bg-foreground text-background border-foreground"
                        : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* 등록일 */}
            <div>
              <div className="text-[11px] text-muted-foreground mb-1">등록일</div>
              <input
                type="date"
                value={editTarget.date}
                onChange={(e) => setEditTarget({ ...editTarget, date: e.target.value })}
                className="h-9 px-3 text-xs border border-border bg-background w-full outline-none focus:border-sage-ink"
              />
            </div>

            {/* 본문 */}
            <div>
              <div className="text-[11px] text-muted-foreground mb-1">본문 (한 줄당 한 문단)</div>
              <textarea
                value={editTarget.body.join("\n")}
                onChange={(e) => setEditTarget({ ...editTarget, body: e.target.value.split("\n") })}
                rows={6}
                placeholder={"안내드립니다.\n▶ 일시: 2026-06-12 02:00 ~ 04:00\n이용에 참고 부탁드립니다."}
                className="px-3 py-2 text-xs border border-border bg-background w-full outline-none focus:border-sage-ink resize-none leading-relaxed"
              />
            </div>

            {/* 상단 고정 */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] font-medium">상단 고정</div>
                <div className="text-[10px] text-muted-foreground">헤더 안내 바와 목록 상단에 우선 노출됩니다.</div>
              </div>
              <Toggle on={editTarget.pinned} onClick={() => setEditTarget({ ...editTarget, pinned: !editTarget.pinned })} label="상단 고정" />
            </div>

            {/* 게시 여부 */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] font-medium">게시 여부</div>
                <div className="text-[10px] text-muted-foreground">끄면 사용자 화면에서 보이지 않습니다.</div>
              </div>
              <Toggle on={editTarget.published} onClick={() => setEditTarget({ ...editTarget, published: !editTarget.published })} label="게시 여부" />
            </div>

            <div className="flex gap-2 pt-1">
              <Button variant="outline" className="flex-1" onClick={() => setEditTarget(null)}>취소</Button>
              <Button className="flex-1" onClick={saveEdit} disabled={!editTarget.title.trim()}>{isNew ? "등록" : "저장"}</Button>
            </div>
          </div>
        </div>
      )}

      {/* 삭제 확인 */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDeleteTarget(null)} />
          <div className="relative bg-background border border-border w-full max-w-sm p-6 space-y-5 z-10">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">공지 삭제</h3>
              <button onClick={() => setDeleteTarget(null)}><X size={16} className="text-muted-foreground" /></button>
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">"{deleteTarget.title}"</span>을 삭제합니다. 되돌릴 수 없습니다.
            </p>
            <div className="flex gap-2 pt-1">
              <Button variant="outline" className="flex-1" onClick={() => setDeleteTarget(null)}>취소</Button>
              <Button className="flex-1 bg-red-500 hover:bg-red-600" onClick={() => handleDelete(deleteTarget.id)}>삭제</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="border border-border p-4">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className={cn("text-base font-bold mt-1.5", highlight && "text-sage-ink")}>{value}</div>
    </div>
  );
}
