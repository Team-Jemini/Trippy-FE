import api from "@/api";
import { ref } from "vue";

const BASE_URL = "/group-account";

const userId = ref(170);

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

  async getInviteInfo(token) {
    const res = await api.post(`${BASE_URL}/invite/token-info?userId=${userId.value}`, {
      token,
    });
    return res.data.data;
  },

  async joinGroupAccount(token, mainAccountId) {
    const res = await api.post(`${BASE_URL}/join?userId=${userId.value}`, {
      token,
      mainAccountId,
    });
    return res.data.data;
  },

  async getGroupAccountList() {
    const res = await api.get(`${BASE_URL}/list?userId=${userId.value}`);
    return res.data.data;
  },

  async getGroupAccountDetail(accountId) {
    const res = await api.get(`${BASE_URL}/detail?userId=${userId.value}&accountId=${accountId}`);
    return res.data.data;
  },

  async getGroupAccountMembers(accountId) {
    const res = await api.get(`${BASE_URL}/members?accountId=${accountId}`);
    return res.data.data;
  },

  async getGrouplAccountTransactionFilter(accountId, transactionType) {
    const res = await api.get(
      `${BASE_URL}/transactions?userId=${userId.value}&accountId=${accountId}&transactionType=${transactionType}`,
    );
    return res.data.data;
  },
};
