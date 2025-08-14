import api from "@/api";
import { ref } from "vue";

const BASE_URL = "/noti";

const userId = ref(1);

export default {
  async getNotifications() {
    const res = await api.get(`${BASE_URL}`);
    return res.data.data;
  },
};
