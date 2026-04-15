"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    daum?: {
      Postcode: new (options: DaumPostcodeOptions) => { open: () => void };
    };
  }
}

interface DaumPostcodeResult {
  address: string;
  roadAddress: string;
  jibunAddress: string;
  zonecode: string;
  sido: string;
  sigungu: string;
  bname: string;
}

interface DaumPostcodeOptions {
  oncomplete: (data: DaumPostcodeResult) => void;
  width?: string | number;
  height?: string | number;
}

interface AddressSearchProps {
  placeholder?: string;
  className?: string;
  onChange?: (value: { zonecode: string; address: string; detail: string }) => void;
}

const SCRIPT_SRC =
  "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
let scriptLoaded = false;

function loadPostcodeScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (scriptLoaded || typeof window !== "undefined" && window.daum?.Postcode) {
      scriptLoaded = true;
      resolve();
      return;
    }
    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => {
        scriptLoaded = true;
        resolve();
      });
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => {
      scriptLoaded = true;
      resolve();
    };
    script.onerror = () => reject(new Error("Failed to load Daum Postcode"));
    document.head.appendChild(script);
  });
}

export function AddressSearch({
  placeholder = "주소 검색",
  className,
  onChange,
}: AddressSearchProps) {
  const [zonecode, setZonecode] = useState("");
  const [address, setAddress] = useState("");
  const [detail, setDetail] = useState("");

  useEffect(() => {
    onChange?.({ zonecode, address, detail });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zonecode, address, detail]);

  async function openSearch() {
    try {
      await loadPostcodeScript();
      if (!window.daum?.Postcode) return;
      new window.daum.Postcode({
        oncomplete: (data: DaumPostcodeResult) => {
          setZonecode(data.zonecode);
          setAddress(data.roadAddress || data.address);
        },
      }).open();
    } catch {
      // fallback: allow manual typing
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="grid grid-cols-[120px_1fr_auto] gap-2">
        <input
          readOnly
          value={zonecode}
          placeholder="우편번호"
          className="h-11 px-3 text-sm border border-border bg-muted/40 text-sage-ink"
        />
        <input
          readOnly
          value={address}
          placeholder={placeholder}
          className="h-11 px-3 text-sm border border-border bg-muted/40 text-sage-ink"
        />
        <button
          type="button"
          onClick={openSearch}
          className="h-11 px-4 text-xs font-medium border border-sage-ink bg-sage-ink text-background hover:bg-sage-deep hover:border-sage-deep transition-colors inline-flex items-center gap-1.5"
        >
          <Search size={14} strokeWidth={1.5} />
          주소 검색
        </button>
      </div>
      {address && (
        <input
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          placeholder="상세 주소 (동·호수)"
          className="w-full h-11 px-3 text-sm border border-border bg-background"
        />
      )}
    </div>
  );
}
