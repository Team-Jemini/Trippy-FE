import { ref } from "vue";
import { defineStore } from "pinia";
import api from "@/api/groupAccount";

export const useGroupJoinStore = defineStore("groupJoin", () => {
  const loading = ref(false);
  const error = ref(null);

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

  const setRepresentativeAccount = (number, bank) => {
    representativeAccount.value = number;
    representativeAccountBank.value = bank;
  };

  //초대 링크 주소: 나중에 배 포완료되고 백에서 토큰 만들어서 가져와서 주소 만들기
  const inviteLink = ref("");

  const createURL = async (accountId, accountName) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.createURL(accountId, accountName);
      inviteLink.value = response.inviteTokenURL;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  //초대 보내는 내용
  const shareToKakao = (accountName) => {
    window.Kakao.Link.sendDefault({
      objectType: "text",
      text: `${accountName}에서 모임통장을 만들었어요!`,
      link: {
        webUrl: inviteLink.value,
        mobileWebUrl: inviteLink.value,
      },
      buttons: [
        {
          title: "지금 참여하기",
          link: {
            webUrl: inviteLink.value,
            mobileWebUrl: inviteLink.value,
          },
        },
      ],
    });
  };

  const inviteInfoToken = async (token) => {
    loading.value = true;
    error.value = null;
    try {
      console.log(`token: ${token}`);
      const response = await api.getInviteInfo(token);
      inviteInfo.value = response;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
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
    setRepresentativeAccount,
    createURL,
    inviteInfoToken,
  };
});
