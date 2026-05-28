export type BannerStatus = "활성" | "비활성";

export type Banner = {
  id: string;
  imageUrl: string;
  imageName: string;
  linkHref: string;
  status: BannerStatus;
};

const INITIAL_BANNERS: Banner[] = [
  { id: "b001", imageUrl: "", imageName: "hero_spring_2026.jpg", linkHref: "/products", status: "활성" },
  { id: "b002", imageUrl: "", imageName: "promo_get_2026.jpg", linkHref: "/get", status: "활성" },
  { id: "b003", imageUrl: "", imageName: "sell_campaign.jpg", linkHref: "/sell", status: "비활성" },
];

let _banners: Banner[] = [...INITIAL_BANNERS];
const _listeners = new Set<() => void>();

export function getBanners(): Banner[] {
  return _banners;
}

export function setBanners(next: Banner[]): void {
  _banners = next;
  _listeners.forEach((fn) => fn());
}

export function subscribe(fn: () => void): () => void {
  _listeners.add(fn);
  return () => _listeners.delete(fn);
}
