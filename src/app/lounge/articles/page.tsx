import Link from "next/link";
import { ImageBox } from "@/components/ImageBox";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { articles } from "@/lib/lounge";

const TAGS = ["전체", "제품자랑", "인테리어", "일상"];

export default function AllArticlesPage() {
  return (
    <div className="max-w-canvas mx-auto px-12 py-16">
      {/* Header */}
      <div className="border-b border-border pb-8 mb-10">
        <Link
          href="/lounge"
          className="text-[11px] text-muted-foreground tracking-[0.18em] uppercase hover:text-sage-ink transition-colors"
        >
          ← Living Lounge
        </Link>
        <div className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase mt-6 mb-3">
          Journal
        </div>
        <div className="flex items-end justify-between">
          <div>
            <h1 className="font-display text-5xl text-sage-ink leading-none">정보글 · 인사이트</h1>
            <p className="text-sm text-muted-foreground mt-3">총 {articles.length}개의 글</p>
          </div>
          <Link href="/lounge/write">
            <Button variant="outline">정보글 작성</Button>
          </Link>
        </div>
      </div>

      {/* Tag filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        {TAGS.map((t, i) => (
          <button
            key={t}
            className={
              i === 0
                ? "px-4 h-9 text-xs border border-sage-ink bg-sage-ink text-background"
                : "px-4 h-9 text-xs border border-border hover:bg-muted"
            }
          >
            {t}
          </button>
        ))}
      </div>

      {/* Article list */}
      <div className="space-y-px bg-border">
        {articles.map((a) => (
          <Link key={a.id} href={`/lounge/articles/${a.id}`} className="block">
            <article className="bg-background p-6 flex items-center gap-6 hover:bg-sage-soft/30 transition-colors">
              <ImageBox className="w-28 h-28 flex-shrink-0" ratio="square" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{a.tag}</Badge>
                  <span className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                    {a.author}
                  </span>
                </div>
                <div className="font-display text-xl text-sage-ink leading-snug">{a.title}</div>
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-2">
                  <span>{a.date}</span>
                  <span>·</span>
                  <span>조회 {a.views.toLocaleString()}</span>
                  <span>·</span>
                  <span>좋아요 {a.likes}</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
