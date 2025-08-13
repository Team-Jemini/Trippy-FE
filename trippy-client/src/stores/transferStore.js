import { defineStore } from "pinia";
import { ref } from "vue";

export const useTransferStore = defineStore("Transfer", () => {
  const transferInfo = ref({
    fromAccountId: "",
    toAccountId: "",
    amount: 0,
    currencyCode: "KRW",
    title: "",
  });

  const groupTransferInfo = ref({
    fromAccountId: "",
    fromAccountName: "",
    amount: 0,
    currencyCode: "KRW",
    memberList: [],
  });

  const selectMembers = ref([]);
  const memberList = ref([]);

  const accountBank = ref("");

  const transferResponse = ref({});

  const setFromAccountId = (fromAccountId) => {
    transferInfo.value.fromAccountId = fromAccountId;
  };

  const setToAccountId = (toAccountId) => {
    transferInfo.value.toAccountId = toAccountId;
  };

  const setAmount = (amount) => {
    transferInfo.value.amount = amount;
  };

  const setTitle = (title) => {
    transferInfo.value.title = title;
  };

  const setAccountBank = (bankName) => {
    accountBank.value = bankName;
  };

  const setSelectedMembers = (members) => {
    selectMembers.value = members;
    memberList.value = selectMembers.value.map((member) => ({
      mainAccountId: member.mainAccountId,
      userId: member.userId,
      userName: member.userName,
    }));

    groupTransferInfo.value.memberList = memberList;

    accountBank.value = `모임계좌 멤버${memberList.value.length}명의 대표`;
  };

  const setGroupTransferInfo = (accountId, accountName) => {
    groupTransferInfo.value.fromAccountId = accountId;
    groupTransferInfo.value.fromAccountName = accountName;
    groupTransferInfo.value.amount = transferInfo.value.amount;
  };

  const reset = () => {
    transferInfo.value = {
      fromAccountId: "",
      toAccountId: "",
      amount: 0,
      currencyCode: "KRW",
      title: "",
    };

    groupTransferInfo.value = {
      fromAccountId: "",
      fromAccountName: "",
      amount: 0,
      currencyCode: "KRW",
      memberList: [],
    };

    selectMembers.value = [];
    memberList.value = [];
    transferResponse.value = {};
  };

  return {
    transferInfo,
    accountBank,
    selectMembers,
    memberList,
    groupTransferInfo,
    transferResponse,
    setFromAccountId,
    setToAccountId,
    setAmount,
    setTitle,
    setAccountBank,
    setSelectedMembers,
    setGroupTransferInfo,
    reset,
  };
});
