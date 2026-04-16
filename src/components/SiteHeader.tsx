import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";

const nav = [
  { href: "/products", label: "SHOP" },
  { href: "/get", label: "GET" },
  { href: "/sell", label: "SELL" },
  { href: "/lounge", label: "LIVING LOUNGE" },
];

const subNav = [
  { href: "/seller", label: "셀러 어드민" },
  { href: "/admin", label: "풀티 어드민" },
];

export function SiteHeader() {
  return (
    <header className="bg-sage sticky top-0 z-40">
      {/* Main row — slim but breathable: 112px header, 40px top / 20px bottom padding */}
      <div
        className="max-w-canvas mx-auto px-12 flex items-center justify-between"
        style={{ paddingTop: 40, paddingBottom: 20, minHeight: 112 }}
      >
        {/* Left — Logo */}
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-display text-3xl font-semibold text-sage-ink tracking-tight">
            Fullty
          </span>
          <span className="text-[10px] text-sage-ink/60 tracking-[0.25em] mt-1 font-medium">
            VINTAGE FURNITURE
          </span>
        </Link>

        {/* Center — Main menu (60px gaps) */}
        <nav
          className="hidden md:flex items-center"
          style={{ columnGap: 60 }}
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] font-medium text-sage-ink tracking-[0.18em] hover:text-sage-deep transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right — Utilities */}
        <div className="flex items-center" style={{ columnGap: 24 }}>
          <button aria-label="search" className="text-sage-ink hover:text-sage-deep transition-colors">
            <Search size={18} strokeWidth={1.5} />
          </button>
          <Link href="/cart" aria-label="cart" className="text-sage-ink hover:text-sage-deep transition-colors">
            <ShoppingBag size={18} strokeWidth={1.5} />
          </Link>
          <Link href="/mypage" aria-label="mypage" className="text-sage-ink hover:text-sage-deep transition-colors">
            <User size={18} strokeWidth={1.5} />
          </Link>
          <div className="hidden md:flex items-center text-[11px] text-sage-ink/70 ml-2 pl-4 border-l border-sage-ink/15" style={{ columnGap: 8 }}>
            <Link href="/login" className="hover:text-sage-deep transition-colors">
              LOGIN
            </Link>
            <span>·</span>
            <Link href="/signup" className="hover:text-sage-deep transition-colors">
              JOIN
            </Link>
          </div>
        </div>
      </div>

      {/* Admin sub-nav strip */}
      <div className="border-t border-sage-ink/10">
        <div className="max-w-canvas mx-auto px-12 flex items-center h-8 text-[10px] text-sage-ink/60 tracking-widest" style={{ columnGap: 24 }}>
          <span>ADMIN ACCESS</span>
          {subNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-sage-deep transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
