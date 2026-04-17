"use client";

import { createContext, useContext, useState } from "react";

type WishlistContextType = {
  wishlist: string[];
  toggle: (id: string) => void;
  isWished: (id: string) => boolean;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);

  function toggle(id: string) {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  function isWished(id: string) {
    return wishlist.includes(id);
  }

  return (
    <WishlistContext.Provider value={{ wishlist, toggle, isWished }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
