import { ref } from "vue";
import { defineStore } from "pinia";
import api from "@/api/notifications";

export const useNotificationsStoue = defineStore("notifications", () => {
  const loading = ref(false);
  const error = ref(null);
  const lotificationList = ref([]);

  const getNotifications = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.getNotifications();
      lotificationList.value = response;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return { loading, error, lotificationList, getNotifications };
});
