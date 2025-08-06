import { ref } from "vue";
import { defineStore } from "pinia";

export const useSettleStore = defineStore("settle", () => {
  const selectedMembers = ref([]);
  const settleAmount = ref(0);
  const isRequestSuccess = ref(false);

  const selectMembers = ref([]);

  const setSelectedMembers = (members) => {
    selectMembers.value = members;
  };

  const setSettleAmount = (amount) => {
    settleAmount.value = amount;
  };
  return {
    selectedMembers,
    settleAmount,
    isRequestSuccess,
    selectMembers,
    setSelectedMembers,
    setSettleAmount,
  };
});
