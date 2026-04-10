import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
  return (
    <div className="space-y-10">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold">계정 정보</h2>
      </div>

      <Section title="기본 정보">
        <Row label="아이디" value="kimfullty@gmail.com" />
        <Row label="비밀번호" value="••••••••" action="변경" />
        <Row label="휴대폰" value="010-1234-5678" action="변경" />
      </Section>

      <Section title="배송지">
        <div className="space-y-2">
          <div className="border border-border p-4 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">자택</span>
                <span className="text-[11px] border border-border px-1.5 py-0.5">기본</span>
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                서울특별시 마포구 와우산로 ... · 010-1234-5678
              </div>
            </div>
            <Button size="sm" variant="outline">
              수정
            </Button>
          </div>
          <Button variant="outline" className="w-full">
            새 배송지 추가
          </Button>
        </div>
      </Section>

      <Section title="회원 탈퇴">
        <p className="text-xs text-muted-foreground mb-3">
          탈퇴 시 모든 자산화 등록, 렌탈 이력, 풀티머니가 삭제됩니다. 진행 중인 거래가 있는 경우
          탈퇴할 수 없습니다.
        </p>
        <Button variant="ghost" className="text-muted-foreground">
          탈퇴 진행
        </Button>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="text-xs font-semibold tracking-widest text-muted-foreground mb-3">
        {title}
      </div>
      <div>{children}</div>
    </section>
  );
}

function Row({ label, value, action }: { label: string; value: string; action?: string }) {
  return (
    <div className="border border-border p-4 flex items-center justify-between">
      <div>
        <div className="text-[11px] text-muted-foreground">{label}</div>
        <div className="text-sm font-medium mt-0.5">{value}</div>
      </div>
      {action && (
        <Button size="sm" variant="outline">
          {action}
        </Button>
      )}
    </div>
  );
}
