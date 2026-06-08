import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { notices, type NoticeCategory } from "@/lib/notices";

const CATEGORY_VARIANT: Record<NoticeCategory, "default" | "outline" | "muted" | "sage"> = {
  공지: "outline",
  이벤트: "sage",
  점검: "muted",
  업데이트: "default",
};

export default function NoticeDetailPage({ params }: { params: { id: string } }) {
  const notice = notices.find((n) => n.id === params.id && n.published);
  if (!notice) notFound();

  const visible = notices.filter((n) => n.published);
  const idx = visible.findIndex((n) => n.id === notice.id);
  const prev = idx > 0 ? visible[idx - 1] : null;
  const next = idx < visible.length - 1 ? visible[idx + 1] : null;

  return (
    <div className="max-w-2xl mx-auto px-12 py-16">
      <Link
        href="/notice"
        className="text-[11px] text-muted-foreground tracking-[0.18em] uppercase hover:text-sage-ink transition-colors"
      >
        ← 공지사항
      </Link>

      <div className="mt-8 border-b border-border pb-8 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant={CATEGORY_VARIANT[notice.category]}>{notice.category}</Badge>
          {notice.pinned && (
            <span className="text-[10px] tracking-[0.18em] uppercase text-sage-deep font-semibold">
              PINNED
            </span>
          )}
        </div>
        <h1 className="font-display text-3xl md:text-4xl text-sage-ink leading-snug">
          {notice.title}
        </h1>
        <div className="text-[11px] text-muted-foreground mt-4">{notice.date}</div>
      </div>

      <div className="space-y-4">
        {notice.body.map((paragraph, i) => (
          <p key={i} className="text-sm leading-relaxed text-sage-ink whitespace-pre-line">
            {paragraph}
          </p>
        ))}
      </div>

      {(prev || next) && (
        <div className="mt-12 pt-6 border-t border-border divide-y divide-border">
          {prev && (
            <Link
              href={`/notice/${prev.id}`}
              className="flex items-center gap-3 py-3 group"
            >
              <span className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground flex-shrink-0">이전</span>
              <span className="text-sm text-sage-ink truncate group-hover:text-sage-deep transition-colors">{prev.title}</span>
            </Link>
          )}
          {next && (
            <Link
              href={`/notice/${next.id}`}
              className="flex items-center gap-3 py-3 group"
            >
              <span className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground flex-shrink-0">다음</span>
              <span className="text-sm text-sage-ink truncate group-hover:text-sage-deep transition-colors">{next.title}</span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
