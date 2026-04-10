import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function BusinessSellerSignupPage() {
  return (
    <div className="border border-border p-8">
      <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-4">
        <Link href="/signup/seller" className="hover:text-foreground">
          셀러 가입
        </Link>
        <span>/</span>
        <span className="text-foreground">사업자 셀러</span>
      </div>
      <h1 className="text-xl font-bold mb-1">사업자 셀러 정보 입력</h1>
      <p className="text-xs text-muted-foreground mb-6">
        세금계산서 발행 및 통신판매업 신고 정보가 필요합니다.
      </p>

      <ol className="grid grid-cols-3 gap-1 mb-6">
        {["1. 유형 선택", "2. 정보 입력", "3. 심사 대기"].map((s, i) => (
          <li
            key={s}
            className={
              i === 1
                ? "border border-foreground bg-foreground text-background h-9 flex items-center justify-center text-[11px] font-medium"
                : "border border-border h-9 flex items-center justify-center text-[11px] text-muted-foreground"
            }
          >
            {s}
          </li>
        ))}
      </ol>

      <Section title="계정">
        <Field label="이메일" placeholder="biz@example.com" type="email" />
        <Field label="비밀번호" placeholder="영문/숫자/특수문자 8자 이상" type="password" />
      </Section>

      <Section title="사업자 정보">
        <Field label="상호 / 매장명" placeholder="예) 오브제 스튜디오" />
        <Field label="대표자명" placeholder="홍길동" />
        <Field label="사업자 등록번호" placeholder="000-00-00000" />
        <Field label="업태 / 종목" placeholder="도소매 / 가구" />
        <Field label="통신판매업 신고번호" placeholder="제 0000-서울-0000호" />
        <Field label="사업장 주소" placeholder="서울특별시 ..." />
        <Field label="대표 연락처" placeholder="010-0000-0000" />
      </Section>

      <Section title="첨부 서류">
        <Field label="사업자등록증 사본" placeholder="" upload />
        <Field label="통장 사본 (정산 계좌)" placeholder="" upload />
      </Section>

      <Section title="취급 카테고리">
        <div className="grid grid-cols-3 gap-2">
          {["체어", "라운지", "소파", "테이블", "수납", "조명"].map((c) => (
            <label
              key={c}
              className="flex items-center gap-2 border border-border p-2.5 text-xs cursor-pointer hover:bg-muted"
            >
              <input type="checkbox" className="accent-foreground" />
              {c}
            </label>
          ))}
        </div>
      </Section>

      <Link href="/signup/seller/pending" className="block pt-4">
        <Button size="lg" className="w-full">
          심사 신청
        </Button>
      </Link>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <div className="text-[11px] font-semibold tracking-widest text-muted-foreground mb-3">
        {title}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  upload,
}: {
  label: string;
  placeholder: string;
  type?: string;
  upload?: boolean;
}) {
  return (
    <div>
      <label className="text-xs text-muted-foreground mb-1.5 block">{label}</label>
      {upload ? (
        <div className="border border-dashed border-border h-20 flex items-center justify-center text-xs text-muted-foreground">
          파일 업로드 (PDF / JPG / PNG)
        </div>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="w-full h-11 px-3 text-sm border border-border bg-background"
        />
      )}
    </div>
  );
}
