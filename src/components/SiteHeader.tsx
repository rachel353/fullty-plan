"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, User, Bell } from "lucide-react";

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

const notifications = [
  { id: "n1", text: "Aeron Chair 배송이 시작되었습니다.", unread: true, time: "방금 전" },
  { id: "n2", text: "Egg Chair 렌탈 종료까지 D-3입니다.", unread: true, time: "1시간 전" },
  { id: "n3", text: "GET 요청 'Stool 60'에 새 셀러 제안 1건이 도착했습니다.", unread: true, time: "3시간 전" },
  { id: "n4", text: "SELL 'Embody Chair' 검수 결과가 등록되었습니다.", unread: false, time: "어제" },
  { id: "n5", text: "구매하신 CH24 Wishbone 구매 확정이 완료되었습니다.", unread: false, time: "3일 전" },
];

export function SiteHeader() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [bellOpen, setBellOpen] = useState(false);
  const [readAll, setReadAll] = useState(false);
  const bellRef = useRef<HTMLDivElement>(null);

  const unreadCount = readAll ? 0 : notifications.filter((n) => n.unread).length;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
        setBellOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-sage sticky top-0 z-40">
      {/* Main row */}
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

        {/* Center — Main menu */}
        <nav className="hidden md:flex items-center" style={{ columnGap: 60 }}>
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
          <Link
            href={loggedIn ? "/mypage" : "/login"}
            aria-label="mypage"
            className="text-sage-ink hover:text-sage-deep transition-colors"
          >
            <User size={18} strokeWidth={1.5} />
          </Link>

          {/* Bell — only when logged in */}
          {loggedIn && (
            <div ref={bellRef} className="relative">
              <button
                aria-label="notifications"
                onClick={() => setBellOpen((prev) => !prev)}
                className="relative text-sage-ink hover:text-sage-deep transition-colors"
              >
                <Bell size={18} strokeWidth={1.5} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-sage-deep text-background text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification dropdown */}
              {bellOpen && (
                <div className="absolute right-0 top-full mt-3 w-80 bg-background border border-border shadow-xl z-50">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                    <span className="text-xs font-semibold text-sage-ink">알림</span>
                    {unreadCount > 0 && (
                      <button
                        onClick={() => setReadAll(true)}
                        className="text-[11px] text-muted-foreground hover:text-sage-ink transition-colors"
                      >
                        모두 읽음
                      </button>
                    )}
                  </div>
                  <div className="divide-y divide-border max-h-72 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`px-4 py-3 flex gap-3 items-start ${
                          n.unread && !readAll ? "bg-sage-soft/30" : ""
                        }`}
                      >
                        {n.unread && !readAll && (
                          <div className="w-1.5 h-1.5 rounded-full bg-sage-deep mt-1.5 flex-shrink-0" />
                        )}
                        {(!n.unread || readAll) && (
                          <div className="w-1.5 h-1.5 mt-1.5 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="text-xs text-sage-ink leading-relaxed">{n.text}</p>
                          <span className="text-[10px] text-muted-foreground mt-0.5 block">{n.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3 border-t border-border">
                    <Link
                      href="/mypage/notifications/inbox"
                      onClick={() => setBellOpen(false)}
                      className="text-[11px] text-muted-foreground hover:text-sage-ink transition-colors"
                    >
                      알림 전체 보기 →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Auth text */}
          <div className="hidden md:flex items-center text-[11px] text-sage-ink/70 ml-2 pl-4 border-l border-sage-ink/15">
            {loggedIn ? (
              <button
                onClick={() => setLoggedIn(false)}
                className="hover:text-sage-deep transition-colors"
              >
                LOGOUT
              </button>
            ) : (
              <>
                <Link href="/login" className="hover:text-sage-deep transition-colors">
                  LOGIN
                </Link>
                <span className="mx-2">·</span>
                <Link
                  href="/signup"
                  className="hover:text-sage-deep transition-colors"
                  onClick={() => setLoggedIn(true)}
                >
                  JOIN
                </Link>
              </>
            )}
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
