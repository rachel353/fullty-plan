"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { reviews, articles } from "@/lib/lounge";
import { cn } from "@/lib/utils";

type Tab = "리뷰" | "정보글";

const REVIEW_TAGS = ["전체", "별점 5", "별점 4 이하", "신고됨"];
const ARTICLE_TAGS = ["전체", "제품자랑", "인테리어", "일상"];

function DeleteModal({
  label,
  onConfirm,
  onClose,
}: {
  label: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-xs p-6 space-y-5 z-10">
        <h3 className="text-base font-semibold">게시글 삭제</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <span className="font-semibold text-foreground">{label}</span>을(를) 삭제합니다.<br />
          삭제 후 복구할 수 없습니다.
        </p>
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={onClose}>취소</Button>
          <Button className="flex-1 bg-red-500 hover:bg-red-600" onClick={onConfirm}>삭제</Button>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoungePage() {
  const [tab, setTab] = useState<Tab>("리뷰");
  const [filter, setFilter] = useState("전체");
  const [query, setQuery] = useState("");
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; label: string } | null>(null);

  function handleDelete(id: string) {
    setDeletedIds((prev) => new Set(prev).add(id));
    setDeleteTarget(null);
  }

  const visibleReviews = reviews
    .filter((r) => !deletedIds.has(r.id))
    .filter((r) => {
      if (filter === "별점 5") return r.rating === 5;
      if (filter === "별점 4 이하") return r.rating <= 4;
      return true;
    })
    .filter((r) => !query || r.product.includes(query) || r.author.includes(query));

  const visibleArticles = articles
    .filter((a) => !deletedIds.has(a.id))
    .filter((a) => filter === "전체" || a.tag === filter)
    .filter((a) => !query || a.title.includes(query) || a.author.includes(query));

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold">리빙 라운지 관리</h2>
        <p className="text-sm text-muted-foreground mt-1">
          유저가 작성한 리뷰 · 정보글을 조회하고 관리합니다.
        </p>
      </div>

      {/* 요약 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="전체 리뷰" value={`${reviews.length}건`} />
        <Stat label="전체 정보글" value={`${articles.length}건`} />
        <Stat label="이번 달 신규" value="6건" />
        <Stat label="신고 접수" value="2건" accent />
      </div>

      {/* 탭 */}
      <div className="flex items-center gap-0 border-b border-border">
        {(["리뷰", "정보글"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setFilter("전체"); setQuery(""); }}
            className={cn(
              "px-5 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors",
              tab === t
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {t}
            <span className="ml-1.5 text-[10px] text-muted-foreground">
              {t === "리뷰" ? reviews.filter((r) => !deletedIds.has(r.id)).length : articles.filter((a) => !deletedIds.has(a.id)).length}
            </span>
          </button>
        ))}
      </div>

      {/* 필터 + 검색 */}
      <div className="flex items-center gap-2 flex-wrap">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={tab === "리뷰" ? "상품명 / 작성자 검색" : "제목 / 작성자 검색"}
          className="h-9 px-3 text-xs border border-border bg-background w-52 outline-none focus:border-sage-ink"
        />
        {(tab === "리뷰" ? REVIEW_TAGS : ARTICLE_TAGS).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-3 h-9 text-xs border transition-colors",
              filter === f
                ? "border-foreground bg-foreground text-background"
                : "border-border hover:bg-muted"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* 리뷰 테이블 */}
      {tab === "리뷰" && (
        <div className="border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted">
              <tr className="text-left text-xs font-medium text-muted-foreground">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">작성자</th>
                <th className="px-4 py-3">상품</th>
                <th className="px-4 py-3">등급</th>
                <th className="px-4 py-3">별점</th>
                <th className="px-4 py-3 text-right">도움돼요</th>
                <th className="px-4 py-3">작성일</th>
                <th className="px-4 py-3 text-right">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {visibleReviews.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-[11px] text-muted-foreground">
                    검색 결과가 없습니다.
                  </td>
                </tr>
              ) : visibleReviews.map((r) => (
                <tr key={r.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-[11px] text-muted-foreground">{r.id}</td>
                  <td className="px-4 py-3 font-medium">{r.author}</td>
                  <td className="px-4 py-3 text-muted-foreground max-w-[180px] truncate">{r.product}</td>
                  <td className="px-4 py-3"><Badge variant="default">{r.grade}</Badge></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map((s) => (
                        <span key={s} className={s <= r.rating ? "text-xs text-sage-ink" : "text-xs text-border"}>★</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{r.helpful}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.date}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setDeleteTarget({ id: r.id, label: `${r.author}의 리뷰` })}
                      className="w-7 h-7 flex items-center justify-center border border-border hover:bg-red-50 hover:border-red-200 transition-colors ml-auto"
                    >
                      <Trash2 size={12} className="text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 정보글 테이블 */}
      {tab === "정보글" && (
        <div className="border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted">
              <tr className="text-left text-xs font-medium text-muted-foreground">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">작성자</th>
                <th className="px-4 py-3">제목</th>
                <th className="px-4 py-3">태그</th>
                <th className="px-4 py-3 text-right">조회수</th>
                <th className="px-4 py-3 text-right">좋아요</th>
                <th className="px-4 py-3">작성일</th>
                <th className="px-4 py-3 text-right">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {visibleArticles.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-[11px] text-muted-foreground">
                    검색 결과가 없습니다.
                  </td>
                </tr>
              ) : visibleArticles.map((a) => (
                <tr key={a.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-[11px] text-muted-foreground">{a.id}</td>
                  <td className="px-4 py-3 font-medium">{a.author}</td>
                  <td className="px-4 py-3 max-w-[220px] truncate text-sage-ink">{a.title}</td>
                  <td className="px-4 py-3"><Badge variant="outline">{a.tag}</Badge></td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{a.views.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{a.likes}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.date}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setDeleteTarget({ id: a.id, label: `"${a.title}"` })}
                      className="w-7 h-7 flex items-center justify-center border border-border hover:bg-red-50 hover:border-red-200 transition-colors ml-auto"
                    >
                      <Trash2 size={12} className="text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteTarget && (
        <DeleteModal
          label={deleteTarget.label}
          onConfirm={() => handleDelete(deleteTarget.id)}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="border border-border p-4">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className={cn("text-lg font-bold mt-1.5", accent && "text-red-500")}>{value}</div>
    </div>
  );
}
