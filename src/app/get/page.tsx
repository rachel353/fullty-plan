"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FileUpload } from "@/components/ui/FileUpload";
import { ImageBox } from "@/components/ImageBox";
import { getRequests, products } from "@/lib/mock";
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
  label: string; required?: boolean; hint?: string; children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1">
        <label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">{label}</label>
        {required && <span className="text-red-400 text-xs">*</span>}
      </div>
      {children}
      {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
    </div>
  );
}

function GetForm({ onClose }: { onClose: () => void }) {
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

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-16 space-y-6">
        <Badge variant="sage">REQUEST SUBMITTED</Badge>
        <h2 className="font-display text-4xl text-sage-ink leading-[0.95]">요청이 등록되었습니다.</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          인증된 셀러에게 자동으로 알림이 발송됩니다.<br />
          셀러 제안은 Fullty 사전 검수 후 알림톡으로 전달됩니다.
        </p>
        <div className="border border-border p-5 text-left text-xs space-y-2 w-full">
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
        <div className="grid grid-cols-2 gap-3 w-full">
          <Link href="/mypage/get" onClick={onClose}>
            <Button variant="outline" className="w-full">GET 내역 보기</Button>
          </Link>
          <Button className="w-full" onClick={onClose}>닫기</Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (canSubmit) setSubmitted(true); }} className="flex flex-col h-full">
      {/* 폼 헤더 */}
      <div className="flex items-center justify-between border-b border-border px-6 py-4 flex-shrink-0">
        <div>
          <div className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase">New GET Request</div>
          <h2 className="font-display text-2xl text-sage-ink mt-0.5">구해주세요</h2>
        </div>
        <button type="button" onClick={onClose} className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors">
          <X size={16} className="text-muted-foreground" />
        </button>
      </div>

      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
        {/* 상품 정보 */}
        <section className="space-y-4">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase border-b border-border pb-2">상품 정보</div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="브랜드" required>
              <input value={brand} onChange={(e) => setBrand(e.target.value)}
                placeholder="예) Herman Miller" className="w-full h-10 px-3 text-sm border border-border bg-background outline-none focus:border-sage-ink" />
            </Field>
            <Field label="모델명" required>
              <input value={model} onChange={(e) => setModel(e.target.value)}
                placeholder="예) Aeron Chair" className="w-full h-10 px-3 text-sm border border-border bg-background outline-none focus:border-sage-ink" />
            </Field>
          </div>
          <Field label="옵션 / 사이즈" hint="잘 모르시면 비워두셔도 됩니다.">
            <input value={option} onChange={(e) => setOption(e.target.value)}
              placeholder="예) Size B / Graphite" className="w-full h-10 px-3 text-sm border border-border bg-background outline-none focus:border-sage-ink" />
          </Field>
        </section>

        {/* 현재 Fullty 매칭 */}
        {matches.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="text-[10px] text-muted-foreground tracking-widest uppercase">현재 Fullty 등록 상품</div>
              <Badge variant="sage">{matches.length}개</Badge>
            </div>
            <p className="text-[11px] text-muted-foreground">지금 바로 구매할 수 있어요. 조건이 다르면 아래에서 요청을 등록하세요.</p>
            <div className="space-y-2">
              {matches.map((p) => (
                <Link key={p.id} href={`/products/${p.id}`} onClick={onClose}
                  className="flex items-center gap-3 border border-border p-3 hover:bg-sage-soft/30 transition-colors">
                  <ImageBox className="w-12 h-12 flex-shrink-0" ratio="square" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-0.5">
                      <Badge variant="default">{p.grade}</Badge>
                    </div>
                    <div className="text-[10px] text-muted-foreground">{p.brand}</div>
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
        <section className="space-y-4">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase border-b border-border pb-2">상품 조건</div>
          <Field label="선호 등급">
            <div className="flex gap-1.5">
              {GRADES.map((g) => (
                <button key={g} type="button" onClick={() => setGrade(g)}
                  className={cn("flex-1 h-9 text-xs font-medium border transition-colors",
                    grade === g ? "border-foreground bg-foreground text-background" : "border-border hover:bg-muted")}>
                  {g}
                </button>
              ))}
            </div>
          </Field>
          <Field label="참고 이미지">
            <FileUpload label="이미지 첨부" accept="image/*" />
          </Field>
          <Field label="추가 메모">
            <textarea value={memo} onChange={(e) => setMemo(e.target.value)}
              placeholder="찾는 이유, 용도, 특이 조건 등을 자유롭게 적어주세요."
              rows={3} className="w-full px-3 py-2.5 text-sm border border-border bg-background outline-none focus:border-sage-ink resize-none" />
          </Field>
        </section>

        {/* 알림·기간 */}
        <section className="space-y-4">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase border-b border-border pb-2">알림 · 기간</div>
          <Field label="조건 외 셀러 알림">
            <div className="flex gap-2">
              {([true, false] as const).map((v) => (
                <button key={String(v)} type="button" onClick={() => setAlert(v)}
                  className={cn("flex-1 h-9 text-xs font-medium border transition-colors",
                    alert === v ? "border-foreground bg-foreground text-background" : "border-border hover:bg-muted")}>
                  {v ? "알림 받기" : "받지 않기"}
                </button>
              ))}
            </div>
          </Field>
          <Field label="요청 유지 기간" hint="선택한 기간 종료 시 자동 취소됩니다.">
            <div className="flex gap-2">
              {DURATIONS.map((d) => (
                <button key={d} type="button" onClick={() => setDuration(d)}
                  className={cn("flex-1 h-9 text-xs font-medium border transition-colors",
                    duration === d ? "border-foreground bg-foreground text-background" : "border-border hover:bg-muted")}>
                  {d}
                </button>
              ))}
            </div>
          </Field>
        </section>
      </div>

      {/* 하단 고정 */}
      <div className="border-t border-border px-6 py-4 flex-shrink-0">
        <Button type="submit" size="lg" className="w-full" disabled={!canSubmit}>
          요청 등록
        </Button>
      </div>
    </form>
  );
}

export default function GetListPage() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className="max-w-canvas mx-auto px-12 py-16">
      <PageHeader
        eyebrow="GET — Live Requests"
        title="구해주세요"
        description="원하는 가구를 등록하면 인증된 셀러가 직접 제안합니다. 채팅 없이 안전하게."
        actions={
          <Button size="lg" onClick={() => setFormOpen(true)}>새 요청 작성</Button>
        }
      />

      <div className="border border-border p-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "1. 요청 작성", desc: "브랜드 / 모델 / 옵션 / 희망 가격을 입력합니다." },
          { title: "2. 셀러 제안", desc: "관심 카테고리를 등록한 셀러에게 자동 알림이 발송됩니다." },
          { title: "3. 풀티 승인 후 거래", desc: "셀러 제안은 풀티 사전 검수 후 사용자에게 전달됩니다." },
        ].map((step) => (
          <div key={step.title}>
            <div className="text-xs font-semibold tracking-widest mb-2">{step.title}</div>
            <div className="text-xs text-muted-foreground leading-relaxed">{step.desc}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mb-4">
        {["전체", "대기중", "셀러 제안", "거래 완료"].map((s, i) => (
          <button key={s}
            className={i === 0
              ? "px-4 h-9 text-xs font-medium border border-foreground bg-foreground text-background"
              : "px-4 h-9 text-xs font-medium border border-border hover:bg-muted"}>
            {s}
          </button>
        ))}
      </div>

      <div className="border-t border-border">
        {getRequests.map((req) => (
          <div key={req.id}
            className="border-b border-border py-5 grid grid-cols-12 gap-4 items-center hover:bg-muted px-3 -mx-3 transition-colors">
            <div className="col-span-1 text-[11px] text-muted-foreground">{req.id}</div>
            <div className="col-span-4">
              <div className="text-[11px] text-muted-foreground">{req.brand}</div>
              <div className="text-sm font-semibold mt-0.5">{req.model}</div>
              <div className="text-[11px] text-muted-foreground">{req.option}</div>
            </div>
            <div className="col-span-2 text-sm">
              <div className="text-[11px] text-muted-foreground">희망가</div>
              <div className="font-medium">{req.budget.toLocaleString()}원</div>
            </div>
            <div className="col-span-2 text-sm">
              <div className="text-[11px] text-muted-foreground">제안</div>
              <div className="font-medium">{req.proposalCount}건</div>
            </div>
            <div className="col-span-2 text-xs text-muted-foreground">{req.createdAt}</div>
            <div className="col-span-1 flex justify-end">
              <Badge variant={req.status === "거래 완료" ? "muted" : req.status === "셀러 제안" ? "default" : "outline"}>
                {req.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {/* 폼 오버레이 */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setFormOpen(false)} />
          <div className="relative ml-auto w-full max-w-md bg-background flex flex-col h-full shadow-xl">
            <GetForm onClose={() => setFormOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
