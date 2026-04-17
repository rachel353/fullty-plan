"use client";

import { ReviewProvider } from "@/lib/review-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ReviewProvider>{children}</ReviewProvider>;
}
