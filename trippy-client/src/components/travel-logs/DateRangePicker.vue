<script setup>
import { ref } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
const dateRange = ref([]);
const props = defineProps({
  label: String,
});
</script>

<template>
  <div class="flex flex-col gap-2 mt-4">
    <!-- 라벨 -->
    <p class="body2 text-black px-1">여행 기간</p>

    <!-- 달력 입력 -->
    <VueDatePicker
      v-model="dateRange"
      range
      format="yyyy.MM.dd"
      :enable-time-picker="false"
      @update:model-value="$emit('update:range', { start: dateRange[0], end: dateRange[1] })"
    />
  </div>
</template>

<style scoped>
:deep(.dp__input) {
  @apply body2 text-gray-400 w-full h-12 border border-gray-300 rounded-xl px-10;
}
</style>
