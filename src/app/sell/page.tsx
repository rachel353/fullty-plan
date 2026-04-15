"use client";

import { Button } from "@/components/ui/Button";
import { DatePicker } from "@/components/ui/DatePicker";
import { FileUpload } from "@/components/ui/FileUpload";
import { AddressSearch } from "@/components/ui/AddressSearch";

export default function SellPage() {
  return (
    <div className="max-w-3xl mx-auto px-12 py-16">
      <div className="border-b border-border pb-8 mb-10">
        <div className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase mb-3">
          Sell — 위탁 / 매입
        </div>
        <h1 className="font-display text-5xl text-sage-ink leading-none">Send Yours.</h1>
        <p className="text-sm text-muted-foreground mt-4">
          소유 가구를 Fullty에 매입하거나 위탁 판매할 수 있습니다. 신청서를 작성하시면 검수 후
          <strong className="text-sage-ink"> 매입가와 위탁 조건을 함께 제안</strong>드립니다.
        </p>
      </div>

      {/* Flow steps */}
      <ol className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-10">
        {["1. 신청", "2. 픽업비 결제", "3. 픽업", "4. 검수", "5. 금액 제안 / 계약"].map((s, i) => (
          <li
            key={s}
            className={
              i === 0
                ? "border border-sage-ink bg-sage-ink text-background h-12 flex items-center justify-center text-xs font-medium"
                : "border border-border h-12 flex items-center justify-center text-xs text-muted-foreground"
            }
          >
            {s}
          </li>
        ))}
      </ol>

      <div className="space-y-6">
        <Field label="브랜드" placeholder="예) Herman Miller" />
        <Field label="모델명" placeholder="예) Aeron Chair" />

        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">구매 시기</label>
          <DatePicker placeholder="구매하신 날짜를 선택해 주세요" />
          <p className="text-[11px] text-muted-foreground mt-1">
            정확한 날짜를 모르시면 구매한 달의 1일로 선택해 주세요.
          </p>
        </div>

        <Field label="크기 (가로 × 세로 × 높이 cm)" placeholder="예) 70 × 65 × 110" />

        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">픽업 주소</label>
          <AddressSearch placeholder="주소 검색 버튼을 눌러 주소를 입력해 주세요" />
          <p className="text-[11px] text-muted-foreground mt-1">
            입력하신 주소 기준으로 픽업 배송비가 자동 산출됩니다.
          </p>
        </div>

        <div className="border border-border p-4 text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">예상 픽업 배송비</span>
            <span className="font-medium">45,000원</span>
          </div>
          <div className="flex justify-between text-[11px] text-muted-foreground">
            <span>* 추가 작업 발생 시 별도 결제 안내</span>
          </div>
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">상품 사진</label>
          <FileUpload label="정면 / 측면 / 디테일 / 라벨 사진 업로드" accept="image/*" />
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">상태 메모</label>
          <textarea
            rows={3}
            placeholder="흠집, 사용감, 보관 조건 등 자유롭게 작성"
            className="w-full p-3 text-sm border border-border bg-background resize-none"
          />
        </div>

        <div className="border border-sage/40 bg-sage-soft/30 p-4">
          <div className="text-[11px] font-semibold text-sage-ink mb-2">
            이후 프로세스
          </div>
          <ul className="text-[11px] text-sage-ink space-y-1 leading-relaxed">
            <li>· 신청 후 Fullty에서 픽업 → 검수를 진행합니다.</li>
            <li>· 검수 완료 시 <strong>매입가 / 위탁 조건을 한 번에 제안</strong>드립니다.</li>
            <li>· 원하시는 방식(매입 or 위탁)을 선택해 계약이 진행됩니다.</li>
            <li>· 거절 시 반송 또는 Fullty 운영팀의 재제안(채널톡)이 가능합니다.</li>
          </ul>
        </div>

        <div className="border-t border-border pt-6 flex justify-end gap-2">
          <Button variant="outline">임시 저장</Button>
          <Button>신청 및 픽업비 결제</Button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="text-xs text-muted-foreground mb-1.5 block">{label}</label>
      <input
        placeholder={placeholder}
        className="w-full h-11 px-3 text-sm border border-border bg-background"
      />
    </div>
  );
}
