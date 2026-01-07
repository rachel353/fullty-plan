[cursor]

**pending ink 확인 기능 추가**
```
@docs/user_stories.md:92-101 내 Ink 잔액과 함게 proposal 상태의 ink 금액도 확인하는 userflow도 추가해줘. proposal 상태의 ink 금액을 누르면, proposal한 에피소드 내역을 확인할 수 있도록 하고 싶어. 

현재 제안서나 클라이언트 문서 상으로는, proposal을 생성하는 순간 ink가 즉시 지갑에서 출금되는 것처럼 보이는데 
실제로 사용 가능한 ink랑 proposal 상태로 잠시 묶여 있는 ink를 구분해서 보여줘야 하기 때문. 

Proposal 및 Backing한 금액의 합이 보여져야 함. 참고 : @docs/user_stories.md:152-171 
```

```
@docs/conceptual_model.md:121-139 여기도 맞춰서 업데이트
```

**신고 관련 유저플로우 추가**

```
작가나 독자가 다른 독자를 신고하는 유저플로우
관리자가 신고 내역을 확인하는 유저플로우 있어야해 
유저플로우 추가하고, 관련 파일들 모두 업데이트
```

**작가 상세페이지 추가**

```
 @docs/ia_structure.md:195-204 작품 상세 페이지의 작품 정보 헤더에서 작가 정보 란을 누르면 작가 상세 페이지로 연결되도록 하고싶어. 즉 독자들이 볼 수 있는 Creator Detail 페이지가 새롭게 필요함 
Creator Detail 페이지에서는 작가 정보(프로필 사진, 이름, 소개 등)과 작품 목록(@docs/conceptual_model.md:203-219)이 보여야해. 

업데이트 해주고, 관련 파일 모두 수정해 
```