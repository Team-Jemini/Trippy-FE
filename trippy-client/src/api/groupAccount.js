import api from "@/api";
import { ref } from "vue";

const BASE_URL = "/group-account";

const userId = ref(1);

export default {
  async createAccountId(accountName, email, mainAccountId) {
    const res = await api.post(`${BASE_URL}/create`, {
      accountName,
      email,
      mainAccountId,
    });
    return res.data.data;
  },

  async createURL(accountId, accountName) {
    const res = await api.post(`${BASE_URL}/invite/reissue`, {
      accountId,
      accountName,
    });
    return res.data.data;
  },

  async getInviteInfo(token) {
    const res = await api.post(`${BASE_URL}/invite/token-info`, {
      token,
    });
    return res.data.data;
  },

  async joinGroupAccount(token, mainAccountId) {
    const res = await api.post(`${BASE_URL}/join`, {
      token,
      mainAccountId,
    });
    return res.data.data;
  },

  async getGroupAccountList() {
    const res = await api.get(`${BASE_URL}/list`);
    return res.data.data;
  },

  async getGroupAccountDetail(accountId) {
    const res = await api.get(
      `${BASE_URL}/detail?`,
      {
        params: { accountId }
      });
    return res.data.data;
  },

  async getGroupAccountMembers(accountId) {
    const res = await api.get(
      `${BASE_URL}/members`,
      {
        params: { accountId }
      });
    return res.data.data;
  },

  async getGrouplAccountTransactionFilter(accountId, transactionType) {
    const res = await api.get(
      `${BASE_URL}/transactions?`,
      {
        params: {
          accountId: accountId,
          transactionType: transactionType,
        }
      });
    return res.data.data;
  },

  async settlementRequst(accountId, accountName, amount, memberList) {
    const res = await api.post(`${BASE_URL}/settle`, {
      accountId,
      accountName,
      amount,
      memberList,
    });
    return res;
  },
};
