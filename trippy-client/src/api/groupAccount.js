import api from "@/api";
import { ref } from "vue";

const BASE_URL = "/group-account";

const userId = ref(4);

export default {
  async CreateAccounId(accountName, email, mainAccountId) {
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

  async getInviteInfo(token) {
    const res = await api.post(`${BASE_URL}/invite/token-info?userId=${userId.value}`, {
      token,
    });
    return res.data.data;
  },
};
