"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FileUpload } from "@/components/ui/FileUpload";
import { ImageBox } from "@/components/ImageBox";
import { products } from "@/lib/mock";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

const GRADES = ["상관없음", "SS", "S", "A+", "A", "B"];
const DURATIONS = ["3개월", "6개월", "12개월"];

function findMatches(brand: string, model: string) {
  const b = brand.trim().toLowerCase();
  const m = model.trim().toLowerCase();
  if (!b && !m) return [];
  return products.filter(
    (p) =>
      (b ? p.brand.toLowerCase().includes(b) : true) &&
      (m ? p.name.toLowerCase().includes(m) : true) &&
      p.status !== "품절"
  );
}

function Field({ label, required, hint, children }: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1">
        <label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          {label}
        </label>
        {required && <span className="text-red-400 text-xs">*</span>}
      </div>
      {children}
      {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
    </div>
  );
}

export default function NewGetRequestPage() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [option, setOption] = useState("");
  const [grade, setGrade] = useState("상관없음");
  const [memo, setMemo] = useState("");
  const [alert, setAlert] = useState(true);
  const [duration, setDuration] = useState("6개월");
  const [submitted, setSubmitted] = useState(false);

  const matches = findMatches(brand, model);
  const canSubmit = brand.trim() && model.trim();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-12 py-16 text-center">
        <Badge variant="sage" className="mb-6">REQUEST SUBMITTED</Badge>
        <h1 className="font-display text-5xl text-sage-ink leading-[0.95]">
          요청이 등록되었습니다.
        </h1>
        <p className="text-sm text-muted-foreground mt-5 leading-relaxed">
          인증된 셀러에게 자동으로 알림이 발송됩니다.<br />
          셀러 제안은 Fullty 사전 검수 후 알림톡으로 전달됩니다.
        </p>
        <div className="border border-border p-5 text-left text-xs space-y-2 mt-10 mb-10">
          {[
            { label: "브랜드", value: brand },
            { label: "모델명", value: model },
            { label: "옵션", value: option || "-" },
            { label: "선호 등급", value: grade },
            { label: "조건 외 알림", value: alert ? "받기" : "받지 않기" },
            { label: "유지 기간", value: duration },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between">
              <span className="text-muted-foreground">{label}</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/mypage/get"><Button variant="outline" size="lg" className="w-full">GET 내역 보기</Button></Link>
          <Link href="/products"><Button size="lg" className="w-full">쇼핑 계속하기</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-12 py-16">
      {/* 헤더 */}
      <div className="border-b border-border pb-6 mb-10">
        <div className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase mb-1">
          New GET Request
        </div>
        <h1 className="font-display text-4xl text-sage-ink">구해주세요</h1>
        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
          원하는 가구 정보를 입력하면 인증 셀러에게 자동으로 알림이 발송됩니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* 상품 정보 */}
        <section className="space-y-5">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase border-b border-border pb-2">
            상품 정보
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="브랜드" required>
              <input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="예) Herman Miller, Vitra"
                className="w-full h-11 px-3 text-sm border border-border bg-background outline-none focus:border-sage-ink"
              />
            </Field>
            <Field label="모델명" required>
              <input
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="예) Aeron Chair"
                className="w-full h-11 px-3 text-sm border border-border bg-background outline-none focus:border-sage-ink"
              />
            </Field>
          </div>

          <Field label="옵션 / 사이즈" hint="잘 모르시면 비워두셔도 됩니다.">
            <input
              value={option}
              onChange={(e) => setOption(e.target.value)}
              placeholder="예) Size B / Graphite, Walnut / Black"
              className="w-full h-11 px-3 text-sm border border-border bg-background outline-none focus:border-sage-ink"
            />
          </Field>
        </section>

        {/* Fullty 매칭 상품 */}
        {matches.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="text-[10px] text-muted-foreground tracking-widest uppercase">
                현재 Fullty 등록 상품
              </div>
              <Badge variant="sage">{matches.length}개</Badge>
            </div>
            <p className="text-[11px] text-muted-foreground">
              지금 바로 구매할 수 있어요. 조건이 다르면 아래에서 요청을 계속 등록하세요.
            </p>
            <div className="space-y-2">
              {matches.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  className="flex items-center gap-4 border border-border p-3 hover:bg-sage-soft/30 transition-colors"
                >
                  <ImageBox className="w-14 h-14 flex-shrink-0" ratio="square" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Badge variant="default">{p.grade}</Badge>
                      {p.availability === "both" && <Badge variant="outline">BUY·RENT</Badge>}
                      {p.availability === "rent" && <Badge variant="sage">RENT ONLY</Badge>}
                    </div>
                    <div className="text-[10px] text-muted-foreground tracking-widest uppercase">{p.brand}</div>
                    <div className="text-sm font-medium truncate">{p.name}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-medium">{formatPrice(p.price)}</div>
                    <div className="text-[10px] text-sage-deep mt-0.5">구매 →</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 상품 조건 */}
        <section className="space-y-5">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase border-b border-border pb-2">
            상품 조건
          </div>

          <Field label="선호 등급">
            <div className="flex gap-2">
              {GRADES.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGrade(g)}
                  className={cn(
                    "flex-1 h-10 text-xs font-medium border transition-colors",
                    grade === g
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:bg-muted"
                  )}
                >
                  {g}
                </button>
              ))}
            </div>
          </Field>

          <Field label="참고 이미지" hint="찾고 계신 상품 이미지를 첨부하면 셀러가 더 정확히 파악할 수 있어요.">
            <FileUpload label="이미지 첨부" accept="image/*" />
          </Field>

          <Field label="추가 메모" hint="찾는 이유, 용도, 특이 조건 등을 자유롭게 적어주세요.">
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="예) 홈오피스용, 흰색 계열 원해요, 구매 후 렌탈 전환도 고려 중"
              rows={4}
              className="w-full px-3 py-2.5 text-sm border border-border bg-background outline-none focus:border-sage-ink resize-none"
            />
          </Field>
        </section>

        {/* 알림 / 기간 설정 */}
        <section className="space-y-5">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase border-b border-border pb-2">
            알림 · 기간
          </div>

          <Field label="조건 외 셀러 알림" hint="요청 조건과 일부 달라도 셀러 제안 알림을 받을 수 있습니다.">
            <div className="flex gap-2">
              {[true, false].map((v) => (
                <button
                  key={String(v)}
                  type="button"
                  onClick={() => setAlert(v)}
                  className={cn(
                    "flex-1 h-10 text-xs font-medium border transition-colors",
                    alert === v
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:bg-muted"
                  )}
                >
                  {v ? "알림 받기" : "알림 받지 않기"}
                </button>
              ))}
            </div>
          </Field>

          <Field label="요청 유지 기간" hint="선택한 기간이 종료되면 요청이 자동으로 취소됩니다.">
            <div className="flex gap-2">
              {DURATIONS.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDuration(d)}
                  className={cn(
                    "flex-1 h-10 text-xs font-medium border transition-colors",
                    duration === d
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:bg-muted"
                  )}
                >
                  {d}
                </button>
              ))}
            </div>
          </Field>
        </section>

        {/* 제출 */}
        <div className="border-t border-border pt-6 flex items-center justify-between">
          <Link href="/get"><Button variant="outline" type="button">취소</Button></Link>
          <Button type="submit" size="lg" disabled={!canSubmit}>
            요청 등록
          </Button>
        </div>
      </form>
    </div>
  );
}
