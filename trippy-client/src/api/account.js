import api from "@/api";
import { ref } from "vue";

const BASE_URL = "/accounts";

const userId = ref(1);

export default {
  async getPersonalAccountList() {
    const res = await api.get(`${BASE_URL}?userId=${userId.value}`);
    return res.data.data;
  },
};
