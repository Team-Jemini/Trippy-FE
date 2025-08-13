import { defineStore } from "pinia";
import { ref } from "vue";

export const useGroupTransferStore = defineStore("groupTransfer", () => {
  const loading = ref(false);
  const error = ref(null);

  return { loading, error };
});
