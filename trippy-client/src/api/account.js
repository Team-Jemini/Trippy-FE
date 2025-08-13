import api from "@/api";
import { ref } from "vue";

const BASE_URL = "/accounts";

const userId = ref(1);

export default {
  async getPersonalAccountList() {
    const res = await api.get(`${BASE_URL}?userId=${userId.value}`);
    return res.data.data;
  },

  async getPersonalAccountDetail(accountId) {
    const res = await api.get(`${BASE_URL}/detail?userId=${userId.value}&accountId=${accountId}`);
    return res.data.data;
  },

  async getPersonalAccountTransactionFilter(accountId, transactionType) {
    const res = await api.get(
      `${BASE_URL}/transactions?userId=${userId.value}&accountId=${accountId}&transactionType=${transactionType}`,
    );
    return res.data.data;
  },
};
