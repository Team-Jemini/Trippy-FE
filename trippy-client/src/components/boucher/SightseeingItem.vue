<script setup>
import { ref, computed } from "vue";
import SightseeingModal from "@/components/boucher/SightseeingModal.vue";

const props = defineProps({
  data: Object,
});

const showPreview = ref(false);

// 날짜 포맷팅 - API 응답에 맞게 수정
const dateText = computed(() => {
  // "25.08.15(금) 03:00" -> "8.15(금) 03:00"
  const match = props.data.viewingDate.match(
    /^(\d{2})\.(\d{2})\.(\d{2})\((.)\)\s*(\d{1,2}:\d{2})$/,
  );
  if (match) {
    const [, year, month, day, dayOfWeek, time] = match;
    return `${parseInt(month)}.${parseInt(day)}(${dayOfWeek}) ${time}`;
  }
  return props.data.viewingDate; // fallback
});
</script>

<template>
  <div class="bg-white rounded-xl px-4 py-3 shadow-custom flex flex-col gap-2">
    <div class="flex flex-col gap-1">
      <p class="subtitle1 text-black mb-2 pt-1">{{ props.data.name }}</p>
      <div class="caption1 text-gray-400">예약 일자</div>
      <div class="subtitle1 text-black">{{ dateText }}</div>
    </div>
    <button
      class="mt-2 w-full bg-blue-200 text-blue-400 py-2.5 text-button2 rounded-xl"
      @click="showPreview = true"
    >
      바우처 보기
    </button>

    <SightseeingModal
      v-if="showPreview"
      :image-url="props.data.voucherImg"
      @close="showPreview = false"
    />
  </div>
</template>
