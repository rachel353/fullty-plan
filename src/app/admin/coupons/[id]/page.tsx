"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

type DiscountType = "정액" | "정률";
type CouponTarget = "전체" | "GOLD 이상" | "PLATINUM 이상" | "신규 가입";
type CouponStatus = "활성" | "비활성" | "예정" | "종료";

type Coupon = {
  id: string;
  name: string;
  code: string;
  discountType: DiscountType;
  discountValue: number;
  target: CouponTarget;
  maxIssue: number | null;
  issued: number;
  used: number;
  startDate: string;
  endDate: string;
  status: CouponStatus;
};

const COUPONS: Record<string, Coupon> = {
  c001: {
    id: "c001",
    name: "신규 가입 5만원 할인",
    code: "WELCOME50",
    discountType: "정액",
    discountValue: 50000,
    target: "신규 가입",
    maxIssue: null,
    issued: 1284,
    used: 642,
    startDate: "2026-01-01",
    endDate: "2026-06-30",
    status: "활성",
  },
  c002: {
    id: "c002",
    name: "렌탈 첫 주문 10% 할인",
    code: "RENT10",
    discountType: "정률",
    discountValue: 10,
    target: "전체",
    maxIssue: 1000,
    issued: 820,
    used: 301,
    startDate: "2026-02-01",
    endDate: "2026-05-15",
    status: "활성",
  },
  c003: {
    id: "c003",
    name: "GOLD 등급 전용 15% 할인",
    code: "GOLD15",
    discountType: "정률",
    discountValue: 15,
    target: "GOLD 이상",
    maxIssue: 100,
    issued: 48,
    used: 12,
    startDate: "2026-03-01",
    endDate: "2026-07-01",
    status: "활성",
  },
  c004: {
    id: "c004",
    name: "1월 프로모션 2만원",
    code: "JAN20K",
    discountType: "정액",
    discountValue: 20000,
    target: "전체",
    maxIssue: 500,
    issued: 500,
    used: 487,
    startDate: "2026-01-01",
    endDate: "2026-02-28",
    status: "종료",
  },
};

function generateCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] text-muted-foreground tracking-widest uppercase">
        {label} {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function CouponFormPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const isNew = id === "new";
  const existing = isNew ? null : (COUPONS[id] ?? null);

  const [name, setName] = useState(existing?.name ?? "");
  const [code, setCode] = useState(existing?.code ?? "");
  const [discountType, setDiscountType] = useState<DiscountType>(existing?.discountType ?? "정액");
  const [discountValue, setDiscountValue] = useState(String(existing?.discountValue ?? ""));
  const [target, setTarget] = useState<CouponTarget>(existing?.target ?? "전체");
  const [hasLimit, setHasLimit] = useState(existing?.maxIssue != null);
  const [maxIssue, setMaxIssue] = useState(String(existing?.maxIssue ?? ""));
  const [startDate, setStartDate] = useState(existing?.startDate ?? "");
  const [endDate, setEndDate] = useState(existing?.endDate ?? "");
  const [status, setStatus] = useState<CouponStatus>(existing?.status ?? "활성");
  const [saved, setSaved] = useState(false);

  if (!isNew && !existing) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        쿠폰을 찾을 수 없습니다.
        <Link href="/admin/coupons" className="block mt-3 text-sage-ink underline">목록으로</Link>
      </div>
    );
  }

  const canSave = name && code && discountValue && startDate && endDate;

  function handleSave() {
    setSaved(true);
    setTimeout(() => router.push("/admin/coupons"), 800);
  }

  return (
    <div className="space-y-8 max-w-xl">
      {/* 헤더 */}
      <div className="border-b border-border pb-4">
        <Link href="/admin/coupons" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors">
          <ChevronLeft size={13} /> 쿠폰 관리
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold">{isNew ? "쿠폰 생성" : "쿠폰 수정"}</h2>
            {!isNew && <p className="text-[11px] text-muted-foreground mt-1">{existing!.id}</p>}
          </div>
          {!isNew && (
            <Badge variant={status === "활성" ? "default" : status === "종료" ? "muted" : "outline"}>
              {status}
            </Badge>
          )}
        </div>
      </div>

      {/* 저장 완료 배너 */}
      {saved && (
        <div className="border border-sage-deep/30 bg-sage-soft/10 px-5 py-3 text-sm font-medium">
          저장되었습니다. 목록으로 이동합니다…
        </div>
      )}

      {/* 기본 정보 */}
      <section className="space-y-5">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">기본 정보</div>

        <Field label="쿠폰 이름" required>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예: 신규 가입 할인 쿠폰"
            className="w-full h-10 border border-border px-3 text-sm bg-background outline-none focus:border-sage-ink"
          />
        </Field>

        <Field label="쿠폰 코드" required>
          <div className="flex gap-2">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="예: WELCOME50"
              className="flex-1 h-10 border border-border px-3 text-sm font-mono bg-background outline-none focus:border-sage-ink"
            />
            <Button variant="outline" size="sm" onClick={() => setCode(generateCode())}>
              자동 생성
            </Button>
          </div>
        </Field>
      </section>

      {/* 할인 설정 */}
      <section className="space-y-5">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">할인 설정</div>

        <Field label="할인 유형" required>
          <div className="flex gap-2">
            {(["정액", "정률"] as DiscountType[]).map((t) => (
              <button
                key={t}
                onClick={() => setDiscountType(t)}
                className={cn(
                  "flex-1 h-10 text-sm font-medium border transition-colors",
                  discountType === t
                    ? "border-foreground bg-foreground text-background"
                    : "border-border hover:bg-muted"
                )}
              >
                {t === "정액" ? "정액 (원)" : "정률 (%)"}
              </button>
            ))}
          </div>
        </Field>

        <Field label="할인 값" required>
          <div className="flex items-center border border-border focus-within:border-sage-ink">
            <input
              type="number"
              value={discountValue}
              onChange={(e) => setDiscountValue(e.target.value)}
              placeholder={discountType === "정액" ? "50000" : "10"}
              className="flex-1 h-10 px-3 text-sm bg-background outline-none"
            />
            <span className="px-3 text-sm text-muted-foreground border-l border-border h-10 flex items-center">
              {discountType === "정액" ? "원" : "%"}
            </span>
          </div>
          {discountType === "정률" && Number(discountValue) > 100 && (
            <p className="text-[11px] text-red-500 mt-1">100% 이하로 입력하세요.</p>
          )}
        </Field>
      </section>

      {/* 발행 조건 */}
      <section className="space-y-5">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">발행 조건</div>

        <Field label="대상 회원">
          <select
            value={target}
            onChange={(e) => setTarget(e.target.value as CouponTarget)}
            className="w-full h-10 border border-border px-3 text-sm bg-background outline-none focus:border-sage-ink"
          >
            <option>전체</option>
            <option>신규 가입</option>
            <option>GOLD 이상</option>
            <option>PLATINUM 이상</option>
          </select>
        </Field>

        <Field label="최대 발행 수량">
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <div
                onClick={() => setHasLimit(!hasLimit)}
                className={cn(
                  "w-4 h-4 border flex items-center justify-center flex-shrink-0 cursor-pointer",
                  !hasLimit ? "border-sage-ink bg-sage-ink" : "border-border"
                )}
              >
                {!hasLimit && <span className="text-background text-[10px] font-bold">✓</span>}
              </div>
              <span className="text-sm text-muted-foreground">무제한</span>
            </label>
            {hasLimit && (
              <div className="flex items-center border border-border focus-within:border-sage-ink">
                <input
                  type="number"
                  value={maxIssue}
                  onChange={(e) => setMaxIssue(e.target.value)}
                  placeholder="예: 1000"
                  className="flex-1 h-10 px-3 text-sm bg-background outline-none"
                />
                <span className="px-3 text-sm text-muted-foreground border-l border-border h-10 flex items-center">장</span>
              </div>
            )}
          </div>
        </Field>
      </section>

      {/* 유효 기간 */}
      <section className="space-y-5">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">유효 기간</div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="시작일" required>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full h-10 border border-border px-3 text-sm bg-background outline-none focus:border-sage-ink"
            />
          </Field>
          <Field label="종료일" required>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full h-10 border border-border px-3 text-sm bg-background outline-none focus:border-sage-ink"
            />
          </Field>
        </div>
      </section>

      {/* 상태 (수정 시만) */}
      {!isNew && (
        <section className="space-y-3">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">상태</div>
          <div className="flex gap-2">
            {(["활성", "비활성"] as CouponStatus[]).map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={cn(
                  "px-5 h-9 text-sm font-medium border transition-colors",
                  status === s
                    ? "border-foreground bg-foreground text-background"
                    : "border-border hover:bg-muted"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* 발행 통계 (수정 시만) */}
      {!isNew && existing && (
        <section className="space-y-3">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">발행 현황</div>
          <div className="border border-border divide-y divide-border text-sm">
            <div className="px-4 py-3 flex items-center justify-between">
              <span className="text-muted-foreground text-[11px]">발행</span>
              <span className="font-medium">{existing.issued.toLocaleString()}장</span>
            </div>
            <div className="px-4 py-3 flex items-center justify-between">
              <span className="text-muted-foreground text-[11px]">사용</span>
              <span className="font-medium">{existing.used.toLocaleString()}장</span>
            </div>
            <div className="px-4 py-3 flex items-center justify-between">
              <span className="text-muted-foreground text-[11px]">잔여</span>
              <span className="font-medium text-sage-ink">{(existing.issued - existing.used).toLocaleString()}장</span>
            </div>
          </div>
        </section>
      )}

      {/* 하단 버튼 */}
      <div className="border-t border-border pt-6 flex items-center justify-between">
        <Link href="/admin/coupons"><Button variant="outline">취소</Button></Link>
        <Button disabled={!canSave || saved} onClick={handleSave}>
          {isNew ? "쿠폰 생성" : "저장"}
        </Button>
      </div>
    </div>
  );
}
