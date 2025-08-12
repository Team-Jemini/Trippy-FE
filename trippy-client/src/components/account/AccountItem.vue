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
      <!-- <img :src="props.data.logo" class="size-9 bg-gray-100 rounded-full" /> -->
      <img :src="kookminLogo" class="size-9 bg-gray-100 rounded-full" />
      <div>
        <!-- 계좌 테이블 정보에 맞게 컬럼명 변경 필요 -->
        <h3 class="subtitle1">{{ props.data.accountType }}</h3>
        <!-- <p class="body1">{{ props.data.bankName }} {{ props.data.accountId }}</p> -->
        <p class="body1">{{ props.data.bankName || "국민은행" }} {{ props.data.accountId }}</p>
      </div>
    </div>
  </div>
</template>
