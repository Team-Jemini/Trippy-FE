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

  const accountBank = ref("");

  const setFromAccountId = (fromAccountId) => {
    transferInfo.value.fromAccountId = fromAccountId;
  }

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
  }

  return {
    transferInfo,
    accountBank,
    setFromAccountId,
    setToAccountId,
    setAmount,
    setTitle,
    setAccountBank,
  };
});
