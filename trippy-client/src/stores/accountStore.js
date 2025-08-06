import { defineStore } from "pinia";
import { ref } from "vue";
import accountsSample from "@/_dummy/accounts_sample.json";

export const useAccountStore = defineStore("Account", () => {
  const accountList = ref([]);

  const filterAccountList = ref([]);

  const GetAccountList = async () => {
    accountList.value = accountsSample;
  };

  const FilterAccount = (showGroupAccount) => {
    if (showGroupAccount) {
      filterAccountList.value = accountList.value.filter((account) => account.type === "group");
    } else {
      filterAccountList.value = accountList.value.filter((account) => account.type === "personal");
    }
  };
  return { accountList, filterAccountList, GetAccountList, FilterAccount };
});
