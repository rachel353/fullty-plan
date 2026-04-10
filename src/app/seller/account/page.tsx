import { Button } from "@/components/ui/Button";

export default function AccountPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold">정산 계좌 관리</h2>
      </div>

      <div className="border border-border p-6 space-y-4">
        <Field label="예금주" value="빈티지 웍스" />
        <Field label="은행" value="국민은행" />
        <Field label="계좌번호" value="123-12-345678" />
        <Field label="사업자 등록번호" value="123-45-67890" />
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline">취소</Button>
        <Button>저장</Button>
      </div>

      <div className="border border-border p-4 text-[11px] text-muted-foreground leading-relaxed">
        정산 변경 시 풀티 운영팀의 승인이 필요합니다. 사업자등록증 / 통장 사본 첨부가 요구될 수
        있습니다.
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-4 items-center gap-3">
      <label className="text-xs text-muted-foreground">{label}</label>
      <input
        defaultValue={value}
        className="col-span-3 h-10 px-3 text-sm border border-border bg-background"
      />
    </div>
  );
}
