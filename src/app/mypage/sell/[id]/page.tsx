import { notFound } from "next/navigation";
import Link from "next/link";
import { ImageBox } from "@/components/ImageBox";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { sellRequests, SellRequest } from "@/lib/mock";

const steps = [
  "접수 완료",
  "배송비 결제 완료",
  "픽업 대기",
  "픽업 완료",
  "검수 중",
  "최종 금액 제안",
  "계약 완료",
] as const;

export function generateStaticParams() {
  return sellRequests.map((s) => ({ id: s.id }));
}

export default function SellDetailPage({ params }: { params: { id: string } }) {
  const item = sellRequests.find((s) => s.id === params.id);
  if (!item) notFound();

  const currentStep = steps.indexOf(item.status as (typeof steps)[number]);

  return (
    <div className="space-y-8">
      <nav className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
        <Link href="/mypage/sell" className="hover:text-sage-ink">
          SELL 내역
        </Link>
        <span className="mx-2">/</span>
        <span className="text-sage-ink">{item.id}</span>
      </nav>

      {/* Item header */}
      <div className="border-b border-border pb-6 flex gap-6">
        <ImageBox className="w-32 h-32 flex-shrink-0" ratio="square" />
        <div className="flex-1">
          <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
            {item.brand}
          </div>
          <h2 className="font-display text-3xl text-sage-ink mt-1">{item.model}</h2>
          <div className="flex items-center gap-2 mt-3">
            <Badge variant="muted">{item.id}</Badge>
            <span className="text-[11px] text-muted-foreground">신청일 {item.createdAt}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
            현재 상태
          </div>
          <Badge variant="default" className="mt-2">
            {item.status}
          </Badge>
        </div>
      </div>

      {/* Stepper */}
      <div>
        <div className="grid grid-cols-7 gap-1">
          {steps.map((step, i) => (
            <div key={step} className="text-center">
              <div
                className={
                  i <= currentStep
                    ? "h-1 bg-sage-deep"
                    : i === currentStep + 1
                    ? "h-1 bg-sage/60"
                    : "h-1 bg-border"
                }
              />
              <div
                className={
                  i === currentStep
                    ? "text-[10px] font-semibold text-sage-ink mt-2"
                    : i <= currentStep
                    ? "text-[10px] text-muted-foreground mt-2"
                    : "text-[10px] text-muted-foreground/60 mt-2"
                }
              >
                {step}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* State-specific card */}
      <StateCard item={item} />

      {/* Application summary */}
      <section>
        <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-3">
          Application Details
        </div>
        <div className="border border-border divide-y divide-border text-sm">
          <Row label="브랜드" value={item.brand} />
          <Row label="모델명" value={item.model} />
          <Row label="옵션" value="Size B / Graphite" />
          <Row label="구매 시기" value="2024.03.12" />
          <Row label="크기" value="70 × 65 × 110 cm" />
          <Row label="픽업 주소" value="서울특별시 마포구 와우산로 ..." />
          <Row label="상태 메모" value="사용감 적음, 구조 정상. 원본 부속 일부 분실" />
        </div>
      </section>

      {/* Shipping fee receipt */}
      <section>
        <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-3">
          픽업 배송비 영수증
        </div>
        <div className="border border-border p-5 text-sm">
          <div className="flex justify-between mb-2">
            <span className="text-muted-foreground">결제 금액</span>
            <span className="font-medium">45,000원</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-muted-foreground">결제 수단</span>
            <span>신용/체크카드</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">결제 일시</span>
            <span>{item.createdAt} 14:32</span>
          </div>
        </div>
      </section>
    </div>
  );
}

function StateCard({ item }: { item: SellRequest }) {
  if (item.status === "접수 완료") {
    return (
      <Card
        title="신청이 접수되었습니다"
        body="Fullty가 24시간 내 연락드려 픽업 일정을 조율합니다."
      />
    );
  }

  if (item.status === "배송비 결제 완료") {
    return (
      <Card
        title="결제가 완료되었습니다"
        body="픽업 일정 조율 후 담당자가 방문합니다."
      />
    );
  }

  if (item.status === "픽업 대기") {
    return (
      <Card title="픽업을 기다리고 있습니다" sage>
        <div className="grid grid-cols-2 gap-6 text-sm mt-4">
          <div>
            <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
              예상 픽업 일정
            </div>
            <div className="font-medium mt-1">2026-04-15 (화) 오전 10~12시</div>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
              담당자
            </div>
            <div className="font-medium mt-1">Fullty 물류 · 010-xxxx-1234</div>
          </div>
        </div>
        <div className="mt-5 flex gap-2">
          <Button size="sm" variant="outline">
            일정 변경 요청
          </Button>
          <Button size="sm" variant="outline">
            담당자 문의
          </Button>
        </div>
      </Card>
    );
  }

  if (item.status === "픽업 완료") {
    return (
      <Card
        title="픽업이 완료되어 Fullty 창고에 입고되었습니다"
        body="2~3영업일 내 검수가 시작됩니다."
      />
    );
  }

  if (item.status === "검수 중") {
    return (
      <Card title="검수가 진행 중입니다" sage>
        <ul className="text-xs text-sage-ink space-y-1.5 mt-4 leading-relaxed">
          <li>· 외관 / 구조 / 기능 / 원본 여부를 단계별로 점검합니다.</li>
          <li>· 검수 기간은 평균 2~3영업일입니다.</li>
          <li>· 완료 시 매입가와 위탁 조건을 함께 제안드립니다.</li>
        </ul>
      </Card>
    );
  }

  if (item.status === "최종 금액 제안") {
    const purchase = item.estimated;
    const consignmentMin = Math.round(item.estimated * 1.1);
    const consignmentMax = Math.round(item.estimated * 1.3);

    return (
      <div>
        <Card
          title="검수가 완료되어 최종 금액을 제안드립니다"
          body="매입가와 위탁 조건 중 원하시는 방식을 선택해 주세요."
          sage
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          <div className="border border-sage-ink p-5">
            <Badge variant="default">매입</Badge>
            <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground mt-3">
              즉시 구매가
            </div>
            <div className="font-display text-3xl text-sage-ink mt-1">
              {purchase.toLocaleString()}원
            </div>
            <ul className="text-[11px] text-muted-foreground mt-3 space-y-1">
              <li>· 검수 후 Fullty가 즉시 매입</li>
              <li>· 기준일 +3일 정산 (100만원 이상 7:3 분할)</li>
              <li>· 소유권 Fullty로 이전</li>
            </ul>
            <Button size="sm" className="w-full mt-4">
              매입 수락
            </Button>
          </div>

          <div className="border border-border p-5">
            <Badge variant="outline">위탁</Badge>
            <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground mt-3">
              예상 정산 범위
            </div>
            <div className="font-display text-3xl text-sage-ink mt-1">
              {consignmentMin.toLocaleString()}~{consignmentMax.toLocaleString()}원
            </div>
            <ul className="text-[11px] text-muted-foreground mt-3 space-y-1">
              <li>· 판매 완료 시 수수료 15% 차감 후 정산</li>
              <li>· 평균 판매 기간 2~4주</li>
              <li>· 판매 전까지 소유권 유지</li>
            </ul>
            <Button size="sm" variant="outline" className="w-full mt-4">
              위탁 수락
            </Button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button size="sm" variant="ghost" className="text-muted-foreground">
            거절 — 가격이 낮음
          </Button>
          <Button size="sm" variant="ghost" className="text-muted-foreground">
            거절 — 기타 사유
          </Button>
        </div>
        <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
          거절 시 Fullty 운영팀이 재제안을 드릴 수 있도록 채널톡으로 연결됩니다. 반송을 원하시면
          거절 후 안내에서 선택해 주세요.
        </p>
      </div>
    );
  }

  if (item.status === "계약 완료") {
    return (
      <Card title="계약이 완료되었습니다" sage>
        <div className="grid grid-cols-2 gap-6 text-sm mt-4">
          <div>
            <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
              계약 유형
            </div>
            <div className="font-medium mt-1">{item.type}</div>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
              확정 금액
            </div>
            <div className="font-medium mt-1">{item.estimated.toLocaleString()}원</div>
          </div>
        </div>
        <div className="mt-5 flex gap-2">
          <Button size="sm" variant="outline">
            계약서 다운로드 (PDF)
          </Button>
          <Button size="sm" variant="outline">
            정산 내역 확인
          </Button>
        </div>
      </Card>
    );
  }

  if (item.status === "반려") {
    return (
      <Card title="검수에서 반려되었습니다">
        <div className="text-sm text-muted-foreground mt-3 leading-relaxed">
          제품 하자 또는 사진과 상이한 상태가 확인되었습니다. 반송 처리되며 반송 배송비는
          판매자 부담입니다.
        </div>
        <div className="mt-4 flex gap-2">
          <Button size="sm" variant="outline">
            반려 사유 상세
          </Button>
          <Button size="sm">반송 진행 확인</Button>
        </div>
      </Card>
    );
  }

  return null;
}

function Card({
  title,
  body,
  children,
  sage,
}: {
  title: string;
  body?: string;
  children?: React.ReactNode;
  sage?: boolean;
}) {
  return (
    <div
      className={
        sage
          ? "border border-sage/40 bg-sage-soft/30 p-5"
          : "border border-border p-5"
      }
    >
      <div className={sage ? "text-sm font-semibold text-sage-ink" : "text-sm font-semibold"}>
        {title}
      </div>
      {body && <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{body}</div>}
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 grid grid-cols-4 gap-4">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className="col-span-3">{value}</div>
    </div>
  );
}
