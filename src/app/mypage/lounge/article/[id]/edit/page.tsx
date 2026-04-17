"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FileUpload } from "@/components/ui/FileUpload";
import { articles } from "@/lib/lounge";
import { cn } from "@/lib/utils";

const TAGS = ["가구", "수납", "케어", "조명", "인테리어", "셀러 스토리"];
const CATEGORIES = [
  { id: "article", label: "정보글", desc: "가구 관련 지식 · 비교 · 구매 가이드" },
  { id: "care", label: "케어 가이드", desc: "소재별 관리법 · 유지보수 팁" },
  { id: "seller", label: "셀러 스토리", desc: "셀러의 컬렉션 · 큐레이션 이야기" },
];

export default function ArticleEditPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const existing = articles.find((a) => a.id === id);

  const [category, setCategory] = useState("article");
  const [tag, setTag] = useState(existing?.tag ?? "");
  const [title, setTitle] = useState(existing?.title ?? "");
  const [body, setBody] = useState(existing?.body.join("\n\n") ?? "");
  const [submitted, setSubmitted] = useState(false);

  const isValid = title.trim() && body.trim();

  function handleSubmit() {
    if (!isValid) return;
    setSubmitted(true);
    setTimeout(() => router.push("/mypage/lounge"), 1200);
  }

  if (!existing) {
    return (
      <div className="py-24 text-center space-y-4">
        <div className="text-sm text-muted-foreground">글을 찾을 수 없습니다.</div>
        <Link href="/mypage/lounge">
          <Button variant="outline" size="sm">돌아가기</Button>
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="py-32 text-center space-y-4">
        <div className="w-12 h-12 mx-auto bg-sage-deep text-background flex items-center justify-center text-2xl font-display">
          ✓
        </div>
        <div className="font-display text-3xl text-sage-ink">수정 완료</div>
        <div className="text-sm text-muted-foreground">잠시 후 리빙 라운지로 이동합니다.</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold">정보글 수정</h2>
          <p className="text-sm text-muted-foreground mt-1">
            작성한 정보글을 수정합니다.
          </p>
        </div>
        <Link href="/mypage/lounge">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            ← 리빙 라운지
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        {/* 카테고리 */}
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">카테고리</label>
          <div className="grid grid-cols-3 gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={cn(
                  "border p-3 text-left transition-colors",
                  category === c.id
                    ? "border-sage-ink bg-sage-soft/40"
                    : "border-border hover:bg-muted/40"
                )}
              >
                <div className="text-sm font-medium text-sage-ink">{c.label}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5 leading-snug">{c.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 태그 */}
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">태그 (선택)</label>
          <div className="flex flex-wrap gap-2">
            {TAGS.map((t) => (
              <button
                key={t}
                onClick={() => setTag(tag === t ? "" : t)}
                className={cn(
                  "px-3 h-8 text-xs border transition-colors",
                  tag === t
                    ? "border-sage-ink bg-sage-ink text-background"
                    : "border-border hover:bg-muted"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* 제목 */}
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">
            제목 <span className="text-sage-deep">*</span>
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-12 px-4 text-sm border border-border bg-background focus:outline-none focus:border-sage-ink/50"
          />
          <div className="text-[10px] text-muted-foreground mt-1 text-right">
            {title.length} / 60
          </div>
        </div>

        {/* 커버 이미지 */}
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">커버 이미지 교체 (선택)</label>
          <FileUpload label="새 이미지 업로드" accept="image/*" />
        </div>

        {/* 본문 */}
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">
            본문 <span className="text-sage-deep">*</span>
          </label>
          <textarea
            rows={14}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-4 text-sm border border-border bg-background resize-none focus:outline-none focus:border-sage-ink/40 leading-relaxed"
          />
          <div className="text-[10px] text-muted-foreground mt-1">
            {body.length}자 입력됨
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2 border-t border-border">
          <Button variant="outline" onClick={() => router.back()}>
            취소
          </Button>
          <Button variant="outline">
            임시 저장
          </Button>
          <Button disabled={!isValid} onClick={handleSubmit}>
            수정 완료
          </Button>
        </div>
      </div>
    </div>
  );
}
