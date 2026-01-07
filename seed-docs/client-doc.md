# 쟈근친구들 client 제공 문서 
## 1. 서비스 핵심 컨셉
'conture'는 작가가 스토리 초안(콘티)을 올리면, 팬들이 이의 완성을 돕거나 바꾸도록 개입하고, 그 기여를 **'작품 내 크레딧(Credit)'**으로 기록하여 인정받는 참여형 플랫폼입니다.
핵심 사항: 후원자의 가장 큰 보상은 단순 열람권 수령이 아니라, 해당 회차 하단에 **'이 스토리를 만든 사람들(Executive Producers)'**로서 자신의 닉네임과 기여도가 명시되는 것입니다.
독자들이 단독 후원 혹은 '인터벤션(Intervention)'이라는 기능을 통해 특정 전개에 돈을 걸고(Bounty), 작가는 그 제안을 채택하도록 합니다. 작가는 제작비를 확보하고 반응을 선행 수집하며, 독자는 자신이 창작에 직접 참여하는 경험을 제공하도록 합니다.
핵심 유저: Creator(작가), Backer(후원자)
핵심 객체: Story(작품), Episode(회차), Proposal(제안), Backing(지지)

## 2. 주요 기능 명세 (Feature Specifications)
### 2.1. 핵심 플로우: '스토리 인터벤션' 로직
이 플로우는 **'제안(Proposal) 생성 → 지지(Backing) 모집 → 작가 결정(Deal/Drop)'**의 3단계로 이루어집니다.

1. [작가] 콘티 게시 (State: OPEN_FOR_PROPOSAL)
작가가 특정 회차(Episode)에 대한 콘티(이미지, 텍스트)를 업로드합니다.
해당 회차는 '후원 및 제안 받기' 상태가 됩니다.

2. [독자] 후원 (Direct Backing)
독자 A가 'Ink'(재화)를 사용하여 해당 창작에 후원합니다.
후원 즉시 독자의 Ink가 차감되고, 이 금액은 정산 가능합니다.

3. [독자] 제안 생성 (Open Bounty)
독자 B가 'Ink'(재화)를 사용하여 Proposal 객체를 생성합니다.
Proposal에는 제안 내용(description), 제안자(proposer_id), 최초 베팅액(seed_money)이 포함됩니다.
생성 즉시 제안자의 Ink가 차감되고, 이 금액은 에스크로(Escrow) 상태로 시스템이 보관합니다.

4. [독자] 제안에 지지 (Proposal Backing)
다른 독자 C, D가 기존 Proposal에 Backing을 추가합니다.
Backing 시 사용된 Ink 역시 에스크로 상태로 전환됩니다.
Proposal의 total_bounty와 backer_count가 실시간으로 업데이트됩니다.

5. [작가] 결정 (Deal or Drop)
Deal (채택): 작가가 특정 Proposal을 채택합니다.
해당 Proposal의 상태는 DEAL로 변경됩니다.
에스크로에 있던 total_bounty는 작가의 예정 정산금(payable_balance)으로 이동합니다.
해당 Proposal에 Backing한 모든 유저의 Bounty는 후원금으로 처리됩니다.
Drop (거절): 작가가 Proposal을 거절하거나, 일정 시간 동안 채택하지 않습니다.
해당 Proposal의 상태는 DROP으로 변경됩니다.
에스크로에 있던 모든 Ink는 각 Backer의 지갑으로 100% 반환됩니다.

6. [시스템] 다이내믹 크레딧 렌더링 (Dynamic Credit Rendering)
작가가 완성 원고를 업로드할 때, 페이지의 최하단에 [Sponsored by] 섹션을 자동으로 생성하여 붙입니다.
정렬 로직(Sorting): 후원자의 기여 금액(Amount) 순으로 정렬합니다.
Top 3: 'Main Producer' 등으로 크게 강조 (UI 차별화).
그 외: 채택된 제안의 최초 제안자 우선 표시 후 리스트 형태로 닉네임 표기.
영구 박제: 이 크레딧 데이터는 작품 데이터와 함께 저장되어, 추후 유료/무료 전환 여부와 상관없이 모든 독자에게 노출되어야 합니다.

## 3. 재화 시스템: 'Ink' 로직 (Currency System Logic)
'Ink'는 플랫폼 내 유료 재화입니다. 모든 Ink 거래는 트랜잭션 로그로 기록되어야 합니다.
구매: 유저는 신용카드, 간편결제 등으로 Ink를 구매합니다.
사용(차감): Proposal 생성 또는 Backing 시점에 유저의 Ink 지갑에서 차감되어 시스템 에스크로로 이동합니다.
반환: Proposal이 DROP 되면, 에스크로에 있던 Ink가 유저의 지갑으로 즉시 반환됩니다.
정산: 작가가 DEAL한 회차의 최종 콘텐츠를 업로드하면, 작가의 '예정 정산금'이 '출금 가능 정산금(withdrawable_balance)'으로 전환됩니다. 플랫폼 수수료는 이 시점에 차감됩니다.