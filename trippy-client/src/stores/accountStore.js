import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/api/account";

export const useAccountStore = defineStore("Account", () => {
  const loading = ref(false);
  const error = ref(null);
  const codefAccountList = ref([]);
  const selectedAccountList = ref([]);
  const personalAccountList = ref([]);

  const personalAccountDetail = ref({});

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

  const setCodefAccountList = (data) => {
    codefAccountList.value = data;
  };

  const setSelectedAccountList = (data) => {
    selectedAccountList.value = data;
  };

  const getPersonalAccountDetail = async (accountId) => {
    loading.value = true;
    error.value = null;
    try {
      const res = await api.getPersonalAccountDetail(accountId.value);
      personalAccountDetail.value = res;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    codefAccountList,
    selectedAccountList,
    personalAccountList,
    personalAccountDetail,
    getParsonalAccountList,
    getPersonalAccountDetail,
    setCodefAccountList,
    setSelectedAccountList,
  };
});
