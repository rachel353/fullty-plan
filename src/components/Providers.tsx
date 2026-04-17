"use client";

import { ReviewProvider } from "@/lib/review-context";
import { WishlistProvider } from "@/lib/wishlist-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WishlistProvider>
      <ReviewProvider>{children}</ReviewProvider>
    </WishlistProvider>
  );
}
