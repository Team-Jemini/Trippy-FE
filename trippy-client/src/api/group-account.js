import api from "@/api";
import { ref } from "vue";

const BASE_URL = "/group-account";

const userId = ref(1);

export default {
  async CreateAccounId(accountName, email, mainAccountId) {
    const res = await api.post(`${BASE_URL}/create?userId=${userId.value}`, {
      accountName,
      email,
      mainAccountId,
    });
    return res.data.data;
  },
};
