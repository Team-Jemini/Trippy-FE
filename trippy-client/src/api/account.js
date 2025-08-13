import api from "@/api";

const BASE_URL = "/accounts";

export default {
  async getPersonalAccountList() {
    const res = await api.get(`${BASE_URL}`);
    return res.data.data;
  },

  async getPersonalAccountDetail(accountId) {
    const res = await api.get(
      `${BASE_URL}/detail`,
      {
        params: { accountId }
      });
    return res.data.data;
  },

  async getPersonalAccountTransactionFilter(accountId, transactionType) {
    const res = await api.get(
      `${BASE_URL}/transactions`,
      {
        params: {
          accountId: accountId,
          transactionType: transactionType,
        }}
    );
    return res.data.data;
  },
};
