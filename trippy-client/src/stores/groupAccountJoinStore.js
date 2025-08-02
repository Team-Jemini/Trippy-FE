import { ref } from "vue";
import { defineStore } from "pinia";

export const useGroupJoinStore = defineStore("groupJoin", () => {
  const userId = ref("");
  //모임통장 계좌
  const groupAccountNumber = ref("");
  //모임통장 이름
  const groupAccountName = ref("떠나자");
  //대표계좌
  const representativeAccount = ref("");
  //대표계좌 은행
  const representativeAccountBank = ref("");
  //모임원 분류
  const userRole = ref("member");
  //가입 시간
  const joinDateTime = ref("2025.07.29 13:13:13");

  //초대받은 계좌 정보
  const inviteInfo = ref(null);

  //초대받은 계좌 정보저장
  const setInviteInfo = (info) => {
    inviteInfo.value = info;
  };

  const setRepresentativeAccount = (number, bank) => {
    representativeAccount.value = number;
    representativeAccountBank.value = bank;
  };

  //초대 링크 주소: 나중에 배 포완료되고 백에서 토큰 만들어서 가져와서 주소 만들기
  const inviteLink = "http://10.10.0.22:5173/?token=test123";

  //초대 보내는 내용
  const shareToKakao = () => {
    window.Kakao.Link.sendDefault({
      objectType: "text",
      text: "Trippy에서 모임통장을 만들었어요!",
      link: {
        webUrl: inviteLink,
        mobileWebUrl: inviteLink,
      },
      buttons: [
        {
          title: "지금 참여하기",
          link: {
            webUrl: inviteLink,
            mobileWebUrl: inviteLink,
          },
        },
      ],
    });
  };

  return {
    userId,
    groupAccountNumber,
    representativeAccount,
    representativeAccountBank,
    userRole,
    groupAccountName,
    joinDateTime,
    inviteInfo,
    inviteLink,
    shareToKakao,
    setInviteInfo,
    setRepresentativeAccount,
  };
});
