<script setup>
import NotificationCard from "@/components/home/NotificationCard.vue";
import { useNotificationStore } from "@/stores/notificationsStore";
import { onMounted, ref } from "vue";

const notificationStore = useNotificationStore();

const notificationData = ref([]);

onMounted(async () => {
  await notificationStore.getNotifications();
  notificationData.value = notificationStore.notificationList;
});
</script>

<template>
  <div class="h-full w-full overflow-scroll mt-[-1rem] [&::-webkit-scrollbar]:hidden mb-12">
    <NotificationCard
      v-for="notification in notificationData"
      :key="notification.notiId"
      :notification="notification"
    />
  </div>
</template>

<style scoped></style>
