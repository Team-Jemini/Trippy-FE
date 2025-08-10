import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/api/account";

export const useAccountStore = defineStore("Account", () => {
  const loading = ref(false);
  const error = ref(null);
  const personalAccountList = ref([]);

  const getParsonalAccountList = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.getPersonalAccountList();
      personalAccountList.value = response;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };
  return { personalAccountList, getParsonalAccountList };
});
