import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { notices, type NoticeCategory } from "@/lib/notices";

const CATEGORY_VARIANT: Record<NoticeCategory, "default" | "outline" | "muted" | "sage"> = {
  공지: "outline",
  이벤트: "sage",
  점검: "muted",
  업데이트: "default",
};

export default function NoticePage() {
  const visible = notices.filter((n) => n.published);
  const pinned = visible.filter((n) => n.pinned);
  const rest = visible.filter((n) => !n.pinned);

  return (
    <div className="max-w-canvas mx-auto px-12 py-16">
      <div className="border-b border-border pb-8 mb-10">
        <div className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase mb-3">
          Notice
        </div>
        <h1 className="font-display text-5xl text-sage-ink leading-none">공지사항</h1>
        <p className="text-sm text-muted-foreground mt-3">총 {visible.length}개의 공지</p>
      </div>

      <div className="space-y-px bg-border">
        {[...pinned, ...rest].map((n) => (
          <Link key={n.id} href={`/notice/${n.id}`} className="block">
            <article className="bg-background px-6 py-5 flex items-center gap-4 hover:bg-sage-soft/30 transition-colors">
              <Badge variant={CATEGORY_VARIANT[n.category]}>{n.category}</Badge>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {n.pinned && (
                    <span className="text-[10px] tracking-[0.18em] uppercase text-sage-deep font-semibold">
                      PINNED
                    </span>
                  )}
                  <div className="font-display text-lg text-sage-ink leading-snug truncate">
                    {n.title}
                  </div>
                </div>
              </div>
              <span className="text-[11px] text-muted-foreground flex-shrink-0">{n.date}</span>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
