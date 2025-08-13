<script setup>
const props = defineProps({
  currentTab: { type: String, required: true },
  infoText: { type: String, required: true },
  date: { type: String, required: true },
  showDetail: { type: Boolean, default: "" },
});

// 날짜 변환 함수
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const dateObj = new Date(dateStr);
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, "0");
  const d = String(dateObj.getDate()).padStart(2, "0");
  return `${y}.${m}.${d}`;
};
</script>

<template>
  <div class="p-4 mt-auto">
    <div class="flex items-end justify-between">
      <!-- 왼쪽 안내 문구 -->
      <p class="text-gray-500 caption2">{{ infoText }}</p>

      <div v-if="currentTab === '주민등록' && showDetail" class="flex flex-col items-end">
        <p class="subtitle2">{{ date }}</p>
      </div>

      <div v-if="currentTab === '여권'" class="flex flex-col items-end -mb-2">
        <p class="text-gray-400 caption2">EXPIRATION DATE</p>
        <p class="subtitle2">{{ formatDate(date) }}</p>
      </div>
    </div>
  </div>
</template>
