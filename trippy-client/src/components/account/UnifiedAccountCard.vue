<script setup>
import { Icon } from "@iconify/vue";
import { defineProps } from "vue";

const props = defineProps({
  account: {
    type: Object,
    required: true,
  },
  isGroupAccount: Boolean,
});
</script>

<template>
  <div
    class="flex justify-between bg-main-gradient w-full h-40 p-4 rounded-xl hover:opacity-90 text-white"
  >
    <div class="flex flex-col justify-between h-full">
      <div>
        <p class="caption3 mb-2">{{ props.account.accountName }}의 계좌</p>
        <p class="body2">{{ props.account.bankName }}</p>
        <p class="body2">{{ props.account.account }}</p>
      </div>
      <div class="body1">{{ props.account.balance.toLocaleString() }}원</div>
    </div>

    <div class="flex flex-col justify-end">
      <div class="flex gap-2 text-white">
        <div class="flex items-center caption3" v-if="props.isGroupAccount">
          <p>모으기</p>
          <Icon icon="material-symbols:arrow-back-ios-new-rounded" class="rotate-180" />
        </div>
        <div class="flex items-center caption3">
          <p>이체</p>
          <Icon icon="material-symbols:arrow-back-ios-new-rounded" class="rotate-180" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
