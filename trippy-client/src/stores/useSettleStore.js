import { ref } from "vue";
import { defineStore } from "pinia";
import api from "@/api/groupAccount";

export const useSettleStore = defineStore("settle", () => {
  const loading = ref(false);
  const error = ref(null);

  const settleAmount = ref(0);
  const isRequestSuccess = ref(false);

  const selectMembers = ref([]);

  const memberList = ref([]);

  const setSelectedMembers = (members) => {
    selectMembers.value = members;
    memberList.value = selectMembers.value.map((member) => ({
      userId: member.userId,
      mainAccountId: member.mainAccountId,
    }));
  };

  const setSettleAmount = (amount) => {
    settleAmount.value = amount;
  };

  const settlementRequst = async (accountId, accountName) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.settlementRequst(
        accountId.value,
        accountName,
        settleAmount.value,
        memberList.value,
      );
      isRequestSuccess.value = response;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };
  return {
    loading,
    error,
    settleAmount,
    isRequestSuccess,
    selectMembers,
    setSelectedMembers,
    setSettleAmount,
    settlementRequst,
  };
});
