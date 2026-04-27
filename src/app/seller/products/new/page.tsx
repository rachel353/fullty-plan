"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { useSellerType } from "@/lib/seller-context";

const GRADES = ["SS", "S", "A+", "A", "B"] as const;
type Grade = typeof GRADES[number];

const CARRIERS = ["CJ대한통운", "롯데택배", "한진택배", "우체국택배"];
const SHIP_DAYS = ["1일", "2일", "3일", "7일 이내"];

export default function NewSellerProductPage() {
  const { sellerType } = useSellerType();
  const [grade, setGrade] = useState<Grade>("S");
  const [rentalOn, setRentalOn] = useState(false);
  const [carrier, setCarrier] = useState("CJ대한통운");
  const [shipDay, setShipDay] = useState("2일");

  const isBusiness = sellerType === "사업자";

  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold">상품 등록</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {isBusiness
            ? "등록 즉시 플랫폼에 노출됩니다. 구매 발생 시 직접 발송하세요."
            : "등록 후 풀티 사전 검수를 거쳐 노출됩니다."}
        </p>
      </div>

      {/* 셀러 유형 배지 */}
      <div className={cn(
        "flex items-center gap-3 p-4 border text-sm",
        isBusiness ? "border-sage-deep/30 bg-sage-deep/5" : "border-border bg-muted/30"
      )}>
        <Badge variant={isBusiness ? "default" : "outline"}>
          {isBusiness ? "사업자 셀러" : "개인 셀러"}
        </Badge>
        <span className="text-xs text-muted-foreground">
          {isBusiness
            ? "검수 없이 즉시 노출 · 직접 배송 · 수수료 15%"
            : "풀티 검수 후 노출 · 풀티 발송 대행 · 수수료 15%"}
        </span>
      </div>

      {/* 기본 정보 */}
      <Section title="기본 정보">
        <div className="grid grid-cols-2 gap-3">
          <Field label="브랜드" placeholder="Herman Miller" />
          <Field label="모델명" placeholder="Aeron Chair" />
          <Field label="옵션 / 사이즈" placeholder="Size B / Graphite" />
          <Field label="카테고리" placeholder="가구 / 조명 / 테이블웨어 / 홈데코 / 아트" />
        </div>
      </Section>

      {/* 상태 등급 */}
      <Section title="상태 등급">
        <div className="grid grid-cols-5 gap-2">
          {GRADES.map((g) => (
            <button
              key={g}
              onClick={() => setGrade(g)}
              className={cn(
                "h-12 border text-sm font-semibold transition-colors",
                grade === g
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:bg-muted"
              )}
            >
              {g}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground mt-2">
          등급 선택 시 권장 판매가 가이드가 표시됩니다.
        </p>
      </Section>

      {/* 가격 */}
      <Section title="가격">
        <div className="grid grid-cols-2 gap-3">
          <Field label="공급가" placeholder="900,000" suffix="원" />
          <Field label="판매가" placeholder="1,280,000" suffix="원" />
          <Field
            label={isBusiness ? "배송비 (직접 배송)" : "배송비 (풀티 → 구매자)"}
            placeholder="35,000"
            suffix="원"
          />
          <Field label="VAT" placeholder="0" suffix="원" />
        </div>
        <div className="border border-border p-4 mt-4 bg-muted/40">
          <div className="grid grid-cols-3 gap-3 text-xs">
            <Stat label="신품 최저가" value="1,580,000원" />
            <Stat label={`권장가 (${grade}등급)`} value="1,260,000원" />
            <Stat label="실 정산액 (수수료 15%)" value="1,088,000원" highlight />
          </div>
          <p className="text-[11px] text-muted-foreground mt-3">
            S등급 가격이 신품 최저가를 초과하면 등록이 제한됩니다.
          </p>
        </div>
      </Section>

      {/* 배송 설정 — 사업자 전용 */}
      {isBusiness && (
        <Section title="직접 배송 설정">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">사용 택배사</label>
                <div className="flex flex-wrap gap-2">
                  {CARRIERS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCarrier(c)}
                      className={cn(
                        "px-3 h-9 border text-xs transition-colors",
                        carrier === c
                          ? "border-sage-ink bg-sage-ink text-background"
                          : "border-border hover:bg-muted"
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">출고 소요일</label>
                <div className="flex flex-wrap gap-2">
                  {SHIP_DAYS.map((d) => (
                    <button
                      key={d}
                      onClick={() => setShipDay(d)}
                      className={cn(
                        "px-3 h-9 border text-xs transition-colors",
                        shipDay === d
                          ? "border-sage-ink bg-sage-ink text-background"
                          : "border-border hover:bg-muted"
                      )}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 items-start">
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">반품 배송비</label>
                <div className="flex items-center border border-border h-9">
                  <input placeholder="5,000" className="flex-1 h-full px-3 text-sm bg-transparent" />
                  <span className="text-xs text-muted-foreground px-3">원</span>
                </div>
              </div>
            </div>

            <div className="border border-sage-deep/20 bg-sage-deep/5 p-3 text-[11px] text-sage-ink space-y-1">
              <div className="font-medium">직배송 안내</div>
              <div className="text-muted-foreground">· 구매 확정 후 출고 소요일 내 발송 의무가 있습니다.</div>
              <div className="text-muted-foreground">· 운송장 번호는 구매 확정 후 마이페이지에서 입력하세요.</div>
              <div className="text-muted-foreground">· 허위 발송 또는 미발송 시 판매 권한이 정지될 수 있습니다.</div>
            </div>
          </div>
        </Section>
      )}

      {/* 풀티 배송 안내 — 개인 셀러 전용 */}
      {!isBusiness && (
        <Section title="풀티 검수센터 배송 안내">
          <div className="border border-border p-4 bg-muted/20 space-y-2 text-sm">
            <div className="text-xs font-semibold text-muted-foreground tracking-widest mb-3">
              배송지
            </div>
            <div className="font-medium">풀티 검수센터</div>
            <div className="text-sm text-muted-foreground">서울특별시 성동구 왕십리로 130, B동 3층</div>
            <div className="text-sm text-muted-foreground">수령인: 풀티 검수팀 · 02-1234-5678</div>
            <div className="mt-3 pt-3 border-t border-border text-[11px] text-muted-foreground space-y-1">
              <div>· 상품 박스 외면에 <strong className="text-sage-ink">등록 신청 번호</strong>를 반드시 기재해주세요.</div>
              <div>· 예상 검수 기간: 수령 후 3~5 영업일</div>
              <div>· 검수 반려 시 반송 처리 (배송비 셀러 부담)</div>
              <div>· 배송비는 셀러 부담이며 영수증 보관을 권장합니다.</div>
            </div>
          </div>
        </Section>
      )}

      {/* 렌탈 공급 */}
      <Section title="렌탈 공급">
        <div className="border border-border p-4">
          <label className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-medium">렌탈 공급</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                ON 시 사용자가 렌탈로 시작할 수 있습니다.
              </div>
            </div>
            <button
              onClick={() => setRentalOn(!rentalOn)}
              className={cn(
                "w-10 h-6 relative transition-colors",
                rentalOn ? "bg-sage-ink" : "bg-border"
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 w-5 h-5 bg-background transition-all",
                  rentalOn ? "left-5" : "left-0.5"
                )}
              />
            </button>
          </label>
          {rentalOn && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Field label="최소 렌탈 일수" placeholder="7" suffix="일" />
                <Field label="최대 렌탈 일수" placeholder="90" suffix="일" />
              </div>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <Stat label="7일 예상 렌탈료" value="128,000원" />
                <Stat label="30일 예상 렌탈료" value="234,000원" />
                <Stat label="예상 수익 (월)" value="198,900원" highlight />
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* 상품 사진 */}
      <Section title="상품 사진">
        <div className="grid grid-cols-5 gap-2">
          <div className="border border-dashed border-border aspect-square flex items-center justify-center text-xs text-muted-foreground">
            + 추가
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border border-border aspect-square bg-muted/20" />
          ))}
        </div>
      </Section>

      {/* 하단 */}
      <div className="border-t border-border pt-6 flex items-center justify-between">
        {isBusiness ? (
          <Badge variant="sage">즉시 노출 · 직접 배송</Badge>
        ) : (
          <Badge variant="muted">검수 대기 → Fullty 검수 → 노출 (반려 시 반송)</Badge>
        )}
        <div className="flex gap-2">
          <Button variant="outline">임시저장</Button>
          <Button>{isBusiness ? "바로 등록" : "등록 요청"}</Button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="text-xs font-semibold tracking-widest text-muted-foreground mb-3">
        {title}
      </div>
      {children}
    </section>
  );
}

function Field({ label, placeholder, suffix }: { label: string; placeholder: string; suffix?: string }) {
  return (
    <div>
      <label className="text-xs text-muted-foreground mb-1.5 block">{label}</label>
      <div className="flex items-center border border-border bg-background h-11">
        <input placeholder={placeholder} className="flex-1 h-full px-3 text-sm bg-transparent" />
        {suffix && <span className="text-xs text-muted-foreground px-3">{suffix}</span>}
      </div>
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <div className="text-muted-foreground">{label}</div>
      <div className={highlight ? "text-base font-bold mt-1" : "text-sm font-medium mt-1"}>{value}</div>
    </div>
  );
}
