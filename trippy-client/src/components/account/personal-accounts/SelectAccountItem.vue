<script setup>
import { defineProps, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import kookminLogo from "@/assets/svg/bankLogo/kookmin.svg?url";

const props = defineProps({
  data: Object
});

onMounted(() => {
  localStorage.setItem("accessToken", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJBQ0NFU1NfVE9LRU4iLCJpYXQiOjE3NTUzNTYxOTgsImV4cCI6MTc1Nzk0ODE5OCwiVVNFUl9JRCI6IjIifQ.dWSBcv5Hui0qQmS-JaXsWOFhQxR_bnutHF2gCYNff-xM3vyWE1RRUhFZdemHW6y8");
});
</script>

<template>
  <div class="flex items-center justify-between p-4 bg-blue-100 rounded-xl active:bg-gray-200">
    <div class="flex items-center gap-4">
      <img :src="props.data.logo || kookminLogo" class="size-9 bg-gray-100 rounded-full" />
      <div>
        <h3 class="subtitle1">{{ props.data.accountName }}</h3>
        <p class="body1">국민은행 {{ props.data.accountId }}</p>
      </div>
    </div>
    <Icon
      :icon="props.data.isChecked ? 'material-symbols:check-circle-rounded' : 'material-symbols:check-circle-outline-rounded'"
      :class="['size-9', props.data.isChecked ? 'text-blue-400' : 'text-gray-400']"
    />
  </div>
</template>
