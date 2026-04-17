"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Review } from "@/lib/lounge";

type ReviewContextValue = {
  userReviews: Review[];
  addReview: (review: Review) => void;
};

const ReviewContext = createContext<ReviewContextValue>({
  userReviews: [],
  addReview: () => {},
});

export function ReviewProvider({ children }: { children: ReactNode }) {
  const [userReviews, setUserReviews] = useState<Review[]>([]);

  function addReview(review: Review) {
    setUserReviews((prev) => [review, ...prev]);
  }

  return (
    <ReviewContext.Provider value={{ userReviews, addReview }}>
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviews() {
  return useContext(ReviewContext);
}
