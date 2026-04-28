"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FileUpload } from "@/components/ui/FileUpload";
import { cn } from "@/lib/utils";

const TAGS = ["제품자랑", "인테리어", "일상"];

export default function WriteArticlePage() {
  const router = useRouter();
  const [category, setCategory] = useState("제품자랑");
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [body, setBody] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    if (!title.trim() || !body.trim()) return;
    setSubmitted(true);
    setTimeout(() => router.push("/lounge"), 1200);
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-12 py-32 text-center space-y-4">
        <div className="w-12 h-12 mx-auto bg-sage-deep text-background flex items-center justify-center text-2xl font-display">
          ✓
        </div>
        <div className="font-display text-3xl text-sage-ink">발행 완료</div>
        <div className="text-sm text-muted-foreground">잠시 후 리빙 라운지로 이동합니다.</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-12 py-16">
      {/* Back */}
      <Link
        href="/lounge"
        className="text-[11px] text-muted-foreground tracking-[0.18em] uppercase hover:text-sage-ink transition-colors"
      >
        ← Living Lounge
      </Link>

      <div className="mt-8 border-b border-border pb-8 mb-10">
        <div className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase mb-3">
          Write
        </div>
        <h1 className="font-display text-4xl text-sage-ink leading-none">정보글 작성</h1>
      </div>

      <div className="space-y-8">
        {/* Category */}
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">카테고리</label>
          <div className="flex gap-2">
            {TAGS.map((t) => (
              <button
                key={t}
                onClick={() => setCategory(t)}
                className={cn(
                  "flex-1 h-10 text-xs font-medium border transition-colors",
                  category === t
                    ? "border-foreground bg-foreground text-background"
                    : "border-border hover:bg-muted"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Tag */}
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

        {/* Title */}
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">제목</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="글 제목을 입력하세요"
            className="w-full h-12 px-4 text-sm border border-border bg-background focus:outline-none focus:border-sage-ink/50"
          />
          <div className="text-[10px] text-muted-foreground mt-1 text-right">
            {title.length} / 60
          </div>
        </div>

        {/* Cover image */}
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">커버 이미지 (선택)</label>
          <FileUpload label="대표 이미지 업로드" accept="image/*" />
        </div>

        {/* Body */}
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">본문</label>
          <textarea
            rows={14}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="가구에 대한 경험, 지식, 팁을 자유롭게 작성해 주세요.&#10;&#10;좋은 정보글은 Fullty 에디터팀이 선정하여 메인에 소개됩니다."
            className="w-full p-4 text-sm border border-border bg-background resize-none focus:outline-none focus:border-sage-ink/40 leading-relaxed"
          />
          <div className="text-[10px] text-muted-foreground mt-1">
            {body.length}자 입력됨
          </div>
        </div>

        {/* Notice */}
        <div className="bg-sage-soft/30 border border-sage/30 p-4 text-[11px] text-sage-ink leading-relaxed">
          <div className="font-semibold mb-1">작성 가이드</div>
          <div>· 허위 정보나 광고성 내용은 운영 기준에 따라 삭제될 수 있습니다.</div>
          <div>· 타인의 저작권을 침해하지 않도록 주의해 주세요.</div>
          <div>· 발행 후 수정은 마이페이지 → 리빙 라운지에서 가능합니다.</div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2 border-t border-border">
          <Button variant="outline" onClick={() => router.back()}>
            취소
          </Button>
          <Button variant="outline">
            임시 저장
          </Button>
          <Button
            disabled={!title.trim() || !body.trim()}
            onClick={handleSubmit}
          >
            발행하기
          </Button>
        </div>
      </div>
    </div>
  );
}
