<script setup>
import NotificationCard from "@/components/home/NotificationCard.vue";
import { useNotificationStore } from "@/stores/notificationsStore.js";
import { Icon } from "@iconify/vue";
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
    <div v-if="notificationData.length > 0">
      <NotificationCard
        v-for="notification in notificationData"
        :key="notification.notiId"
        :notification="notification"
      />
    </div>

    <div v-else class="flex flex-col justify-center items-center h-full mt-[-3rem]">
      <Icon icon="material-symbols:notifications-rounded" class="size-24 text-gray-400" />
      <p class="text-gray-400 body1">알림이 없습니다.</p>
    </div>
  </div>
</template>

<style scoped></style>
