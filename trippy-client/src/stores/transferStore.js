import { defineStore } from "pinia";
import { ref } from "vue";

export const useTransferStore = defineStore("Transfer", () => {
  const transferInfo = ref({
    fromAccountId: "",
    toAccountId: "",
    amount: 0,
    currencyCode: "",
    title: "",
  });

  const setToAccountId = (toAccountId) => {
    transferInfo.value.toAccountId = toAccountId;
  };

  const setAmount = (amount) => {
    transferInfo.value.amount = amount;
  }

  return {
    transferInfo,
    setToAccountId,
    setAmount,
  };
});
