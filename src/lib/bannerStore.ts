export type BannerStatus = "활성" | "비활성";

export type Banner = {
  id: string;
  imageUrl: string;
  imageName: string;
  linkHref: string;
  status: BannerStatus;
};

// ── 메인 캐러셀 ──────────────────────────────────────────
const INITIAL_BANNERS: Banner[] = [
  { id: "b001", imageUrl: "", imageName: "hero_spring_2026.jpg", linkHref: "/products", status: "활성" },
  { id: "b002", imageUrl: "", imageName: "promo_get_2026.jpg", linkHref: "/get", status: "활성" },
  { id: "b003", imageUrl: "", imageName: "sell_campaign.jpg", linkHref: "/sell", status: "비활성" },
];

let _banners: Banner[] = [...INITIAL_BANNERS];
const _listeners = new Set<() => void>();

export function getBanners(): Banner[] { return _banners; }
export function setBanners(next: Banner[]): void {
  _banners = next;
  _listeners.forEach((fn) => fn());
}
export function subscribe(fn: () => void): () => void {
  _listeners.add(fn);
  return () => _listeners.delete(fn);
}

// ── 카드뉴스 (고정 4슬롯) ─────────────────────────────────
const INITIAL_CARD_BANNERS: Banner[] = [
  { id: "card1", imageUrl: "", imageName: "card_news_1.jpg", linkHref: "/products", status: "활성" },
  { id: "card2", imageUrl: "", imageName: "card_news_2.jpg", linkHref: "/get", status: "활성" },
  { id: "card3", imageUrl: "", imageName: "card_news_3.jpg", linkHref: "/sell", status: "활성" },
  { id: "card4", imageUrl: "", imageName: "card_news_4.jpg", linkHref: "/mypage/collection", status: "활성" },
];

let _cardBanners: Banner[] = [...INITIAL_CARD_BANNERS];
const _cardListeners = new Set<() => void>();

export function getCardBanners(): Banner[] { return _cardBanners; }
export function setCardBanners(next: Banner[]): void {
  _cardBanners = next;
  _cardListeners.forEach((fn) => fn());
}
export function subscribeCards(fn: () => void): () => void {
  _cardListeners.add(fn);
  return () => _cardListeners.delete(fn);
}
