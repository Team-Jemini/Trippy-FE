<script setup>
import { defineProps } from "vue";
import {
  numberWithCommas,
  formatDateToKorean,
  extractTime
} from "@/assets/utils/index.js";

import CategoryChip from "@/components/common/CategoryChip.vue";

const props = defineProps({
  transactions: Object,
});
</script>

<template>
  <div
    v-for="(data, index) in props.transactions"
    class="flex flex-col gap-3">
    <p class="body2 text-gray-500">{{ formatDateToKorean(data.date) }}</p>
    <div
      v-for="(item, index) in data.transactions"
      class="flex justify-between">
      <div class="flex gap-3 items-center">
        <CategoryChip :category="item.category" />
        <div class="flex flex-col gap-1">
          <p class="subtitle1">{{ item.description }}</p>
          <p class="body2 text-gray-500">{{ extractTime(item.time) }}</p>
        </div>
      </div>
      <div class="flex flex-col gap-1 items-end">
        <p class="subtitle1">{{ item.type === "withdraw" ? `-${numberWithCommas(item.amount)}` : numberWithCommas(item.amount)}}원</p>
        <p class="body2 text-gray-500">{{ numberWithCommas(item.balance_after) }}원</p>
      </div>
    </div>
  </div>
</template>
