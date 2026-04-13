export function SiteFooter() {
  return (
    <footer className="mt-32 bg-sage-ink text-background">
      <div className="max-w-canvas mx-auto px-12 py-20 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <div className="font-display text-3xl text-background mb-3 leading-none">Fullty</div>
          <p className="text-xs leading-relaxed max-w-xs">
            프리미엄 빈티지 가구를 사고, 빌리고, 자산이 되게 하는 라이프스타일 플랫폼.
          </p>
          <div className="mt-8 text-[10px] tracking-[0.2em]">
            © 2026 FULLTY
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="text-[10px] tracking-[0.2em] mb-4">SHOP</div>
          <ul className="space-y-2.5 text-xs">
            <li>구매 / 렌탈</li>
            <li>구해주세요</li>
            <li>위탁 / 매입</li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <div className="text-[10px] tracking-[0.2em] mb-4">SUPPORT</div>
          <ul className="space-y-2.5 text-xs">
            <li>공지사항</li>
            <li>FAQ</li>
            <li>1:1 문의</li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <div className="text-[10px] tracking-[0.2em] mb-4">ABOUT</div>
          <ul className="space-y-2.5 text-xs">
            <li>회사 소개</li>
            <li>이용약관</li>
            <li>개인정보처리방침</li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <div className="text-[10px] tracking-[0.2em] mb-4">JOURNAL</div>
          <p className="text-[11px] leading-relaxed">
            새로운 셀렉션과 가구 이야기를 매주 받아보세요.
          </p>
          <div className="mt-3 flex items-center border-b border-background/30 pb-1.5">
            <input
              placeholder="email@example.com"
              className="flex-1 bg-transparent text-xs text-background placeholder:text-background/40 outline-none"
            />
            <button className="text-[10px] tracking-[0.2em]">→</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

