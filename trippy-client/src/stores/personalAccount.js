import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchPersonalAccount } from "@/api/personalAccount.js";

export const usePersonalAccountStore = defineStore("personal-accounts", () => {
  const accounts = ref([]);
});
