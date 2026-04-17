import { notFound } from "next/navigation";
import Link from "next/link";
import { ImageBox } from "@/components/ImageBox";
import { Badge } from "@/components/ui/Badge";
import { articles } from "@/lib/lounge";

export default function ArticleDetailPage({ params }: { params: { id: string } }) {
  const article = articles.find((a) => a.id === params.id);
  if (!article) notFound();

  return (
    <div className="max-w-2xl mx-auto px-12 py-16">
      {/* Back */}
      <Link
        href="/lounge"
        className="text-[11px] text-muted-foreground tracking-[0.18em] uppercase hover:text-sage-ink transition-colors"
      >
        ← Living Lounge
      </Link>

      {/* Header */}
      <div className="mt-8 border-b border-border pb-8 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline">{article.tag}</Badge>
          <span className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
            {article.author}
          </span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl text-sage-ink leading-snug">
          {article.title}
        </h1>
        <div className="flex items-center gap-3 mt-4 text-[11px] text-muted-foreground">
          <span>{article.date}</span>
          <span>·</span>
          <span>조회 {article.views.toLocaleString()}</span>
          <span>·</span>
          <span>좋아요 {article.likes}</span>
        </div>
      </div>

      {/* Hero image */}
      <ImageBox ratio="wide" className="mb-10" />

      {/* Body */}
      <div className="space-y-5">
        {article.body.map((paragraph, i) => (
          <p key={i} className="text-sm leading-relaxed text-sage-ink">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Like */}
      <div className="mt-12 pt-6 border-t border-border flex items-center justify-between">
        <div className="text-[11px] text-muted-foreground">이 글이 도움이 됐나요?</div>
        <button className="flex items-center gap-2 border border-border px-4 h-9 text-[11px] hover:bg-muted/40 transition-colors">
          ♡ 좋아요 {article.likes}
        </button>
      </div>

      {/* Other articles */}
      <div className="mt-12">
        <div className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase mb-4">
          다른 정보글 보기
        </div>
        <div className="space-y-px bg-border">
          {articles
            .filter((a) => a.id !== article.id)
            .map((a) => (
              <Link
                key={a.id}
                href={`/lounge/articles/${a.id}`}
                className="flex items-center gap-4 bg-background p-4 hover:bg-sage-soft/20 transition-colors"
              >
                <div className="w-14 h-14 bg-muted flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline">{a.tag}</Badge>
                    <span className="text-[10px] text-muted-foreground">{a.author}</span>
                  </div>
                  <div className="text-sm font-medium text-sage-ink leading-snug">{a.title}</div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
