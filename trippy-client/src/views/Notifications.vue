<script setup>
import NotificationCard from "@/components/home/NotificationCard.vue";
import { ref } from "vue";

const notificationData = ref([
  {
    notiId: 1,
    title: "알림 내용 타이틀이잉이이ㅣ야ㅐㅑ",
    content:
      " 알림내여ㅛㅇㅇㅇ아ㅓ머ㅗ랴ㅓㅇ노러ㅜㄴ어ㅠ러저ㅗㅗ러ㅏㅇ놀허ㅗ미ㅑ호ㅓㅏㅁㅇ롸ㅓ호ㅓㅏㄷㄱ모허ㅠㅜ머ㅠ허ㅗㅕㄷㅂ모혀ㅛㅠㅇㄴ머ㅗㅠ호ㅓㅗㅕㅁㄴ로ㅓㅗㄱ휴ㅓㅗㅁ퓨ㅗㅓㅈ듁호ㅓ머ㅗㅇ뉴호ㅕ조ㅕ",
    createdAt: "2025.08.12 T12:13:00",
  },
]);
</script>

<template>
  <div class="h-full w-full overflow-scroll">
    <NotificationCard
      v-for="notification in notificationData"
      :key="notification.notiId"
      :notification="notification"
    />
  </div>
</template>

<style scoped></style>
