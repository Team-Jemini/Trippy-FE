import { ref } from "vue";
import { defineStore } from "pinia";
import api from "@/api/groupAccount";

export const useGroupJoinStore = defineStore("groupJoin", () => {
  const loading = ref(false);
  const error = ref(null);

  //초대받은 계좌 정보
  const inviteInfo = ref(null);

  // 초대 참여 완료정보
  const groupJoinComplete = ref(null);

  // 초대 링크 파싱 정보
  const inviteLink = ref("");

  // 초대 받은 토큰
  const tokenInfo = ref("");

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
      tokenInfo.value = token;
      const response = await api.getInviteInfo(token);
      inviteInfo.value = response;
    } catch (err) {
      error.value = err;
      console.log(`err: ${err}`);
    } finally {
      loading.value = false;
    }
  };

  const groupAccountJoin = async (mainAccountId) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.joinGroupAccount(tokenInfo.value, mainAccountId);
      groupJoinComplete.value = response;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    inviteInfo,
    inviteLink,
    groupJoinComplete,
    shareToKakao,
    createURL,
    inviteInfoToken,
    groupAccountJoin,
  };
});
