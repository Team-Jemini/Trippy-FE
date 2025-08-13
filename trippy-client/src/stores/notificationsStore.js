import { ref } from "vue";
import { defineStore } from "pinia";
import api from "@/api/notifications";

export const useNotificationStore = defineStore("notifications", () => {
  const loading = ref(false);
  const error = ref(null);
  const notificationList = ref([]);

  const getNotifications = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.getNotifications();
      notificationList.value = response;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return { loading, error, notificationList, getNotifications };
});
