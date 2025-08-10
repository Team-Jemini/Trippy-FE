import api from "@/api";
import { ref } from "vue";

const BASE_URL = "/group-account";

const userId = ref(1);

export default {
  async createAccounId(accountName, email, mainAccountId) {
    const res = await api.post(`${BASE_URL}/create?userId=${userId.value}`, {
      accountName,
      email,
      mainAccountId,
    });
    return res.data.data;
  },

  async createURL(accountId, accountName) {
    const res = await api.post(`${BASE_URL}/invite/reissue?userId=${userId.value}`, {
      accountId,
      accountName,
    });
    return res.data.data;
  },

  async getGroupAccountList() {
    const res = await api.get(`${BASE_URL}/list?userId=${userId.value}`);
    return res.data.data;
  },
};
