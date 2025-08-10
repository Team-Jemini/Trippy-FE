import { defineStore } from "pinia";
import api from "@/api/groupAccount";
import { ref } from "vue";

export const useGroupAccountStore = defineStore("groupAccount", () => {
  const loading = ref(false);
  const error = ref(null);
  const email = ref("");
  //모임계좌비밀번호
  const groupAccountPassword = ref("");
  //모임계좌이름
  const groupAccountName = ref("");
  //모임주 대표계좌 선택
  const representativeAccount = ref("");
  //모임주 대표계좌 은행
  const representativeAccountBank = ref("");

  //모임 계좌 리스트
  const groupAccountList = ref([]);

  //모임 계좌 상세정보
  const groupAccountDetail = ref({});

  const createdAccountData = ref({
    accountName: "",
    accountId: "",
    createdAt: "",
  });

  const emailSet = (newEmail) => {
    email.value = newEmail;
  };
  const setGroupAccountInfo = (password, name) => {
    groupAccountPassword.value = password;
    groupAccountName.value = name;
  };

  const setRepresentativeAccount = (number, bank) => {
    representativeAccount.value = number;
    representativeAccountBank.value = bank;
  };

  const createGroupAccount = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.CreateAccounId(
        groupAccountName.value,
        email.value,
        representativeAccount.value,
      );
      createdAccountData.value = response;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  const getGroupAccountList = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.getGroupAccountList();
      groupAccountList.value = response;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  const getGroupAccountDetail = async (accountId) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.getGroupAccountDetail(accountId);
      groupAccountDetail.value = response;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    email,
    groupAccountPassword,
    groupAccountName,
    representativeAccount,
    representativeAccountBank,
    createdAccountData,
    groupAccountList,
    emailSet,
    setGroupAccountInfo,
    setRepresentativeAccount,
    createGroupAccount,
    getGroupAccountList,
    getGroupAccountDetail,
  };
});
