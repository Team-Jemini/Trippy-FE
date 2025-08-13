<script setup>
import { defineProps, ref } from "vue";
import AccommodationModal from "@/components/boucher/AccommodationModal.vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const showModal = ref(false);

// 날짜 포맷팅 함수 - API 응답에 맞게 수정
function formatDate(dateString) {
  // "25.08.09(토) 08:00" -> "8.9(토) 08:00"
  const match = dateString.match(/^(\d{2})\.(\d{2})\.(\d{2})\((.)\)\s*(\d{1,2}:\d{2})$/);
  if (match) {
    const [, year, month, day, dayOfWeek, time] = match;
    return `${parseInt(month)}.${parseInt(day)}(${dayOfWeek}) ${time}`;
  }
  return dateString; // fallback
}
</script>

<template>
  <div class="w-full bg-white rounded-xl shadow-custom px-4 py-3 flex flex-col">
    <!-- 숙소 이름 및 객실 -->
    <div class="flex flex-col gap-1">
      <span class="subtitle1 text-black">{{ data.accommodationName }}</span>
      <span class="caption1 text-gray-500">{{ data.roomName }} · {{ data.nights }}</span>
    </div>

    <!-- 체크인/체크아웃 -->
    <div class="flex justify-between items-center mt-4 text-black subtitle2">
      <div class="flex flex-col items-start">
        <span class="caption1 text-gray-500">체크인</span>
        <span class="subtitle1">{{ formatDate(data.checkInDate) }}</span>
      </div>

      <div class="w-px bg-gray-300 h-8 border-opacity-20"></div>

      <div class="flex flex-col items-end">
        <span class="caption1 text-gray-500">체크아웃</span>
        <span class="subtitle1">{{ formatDate(data.checkOutDate) }}</span>
      </div>
    </div>

    <!-- 버튼 -->
    <div class="mt-4">
      <button
        class="w-full bg-blue-200 text-blue-400 py-3 rounded-xl text-button2 text-center"
        @click="showModal = true"
      >
        바우처 보기
      </button>
    </div>

    <!-- 모달 띄우기 -->
    <AccommodationModal v-if="showModal" :data="props.data" @close="showModal = false" />
  </div>
</template>
