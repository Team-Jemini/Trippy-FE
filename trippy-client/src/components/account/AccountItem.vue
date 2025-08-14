<script setup>
import { defineProps } from "vue";
import kookminLogo from "@/assets/svg/bankLogo/kookmin.svg?url";

const props = defineProps({
  data: Object,
});
</script>

<template>
  <div class="flex w-full items-center justify-between p-4 rounded-xl active:bg-blue-100">
    <div class="flex items-center gap-4">
      <img :src="`${props.data.logo || kookminLogo}`" class="size-9 bg-gray-100 rounded-full" />
      <div>
        <h3 class="subtitle1">{{ props.data.accountName }}</h3>
        <p class="body1">{{ props.data.bankName || "국민은행" }} {{ props.data.accountId }}</p>
      </div>
    </div>
  </div>
</template>
