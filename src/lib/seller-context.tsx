"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type SellerType = "개인" | "사업자";

interface SellerTypeContextValue {
  sellerType: SellerType;
  setSellerType: (t: SellerType) => void;
}

const SellerTypeContext = createContext<SellerTypeContextValue>({
  sellerType: "사업자",
  setSellerType: () => {},
});

export function SellerTypeProvider({ children }: { children: ReactNode }) {
  const [sellerType, setSellerType] = useState<SellerType>("사업자");
  return (
    <SellerTypeContext.Provider value={{ sellerType, setSellerType }}>
      {children}
    </SellerTypeContext.Provider>
  );
}

export function useSellerType() {
  return useContext(SellerTypeContext);
}
