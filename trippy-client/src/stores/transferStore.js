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

  const setFromAccountId = (fromAccountId) => {
    transferInfo.value.fromAccountId = fromAccountId;
  };

  return {
    transferInfo,
    setFromAccountId,
  };
});
