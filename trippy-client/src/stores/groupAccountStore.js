import { defineStore } from "pinia";
import { ref } from "vue";

export const useGroupAccountStore = defineStore("groupAccount", () => {
  const email = ref("");
  //모임계좌비밀번호
  const groupAccountPassword = ref("");
  //모임계좌이름
  const groupAccountName = ref("");
  //모임계좌번호
  const groupAccountNumber = ref("123456");
  //모임계좌 생성 날짜
  const groupAccountCreateDate = ref("");
  //모임주 대표계좌 선택
  const representativeAccount = ref("");
  //모임주 대표계좌 은행
  const representativeAccountBank = ref("");

  //사용자 모임계좌 등급
  const userRoleInGroupAccount = ref("leader");

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

  const setGroupAccountNumber = (number) => {
    groupAccountNumber.value = number;
  };

  const setGroupAccountCreateDate = () => {
    groupAccountCreateDate.value = new Date().toLocaleString("ko-KR", {
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return {
    email,
    groupAccountPassword,
    groupAccountName,
    representativeAccount,
    representativeAccountBank,
    groupAccountNumber,
    groupAccountCreateDate,
    userRoleInGroupAccount,
    emailSet,
    setGroupAccountInfo,
    setRepresentativeAccount,
    setGroupAccountNumber,
    setGroupAccountCreateDate,
  };
});
