<script setup>
import { Icon } from "@iconify/vue";
import { computed, onMounted, onUnmounted } from "vue";
import agodaLogo from "@/assets/png/Agoda_logo.png"; // 실제 경로에 맞게 조정

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["close"]);

const checkInFormatted = computed(() => {
  const { date, dayOfWeek, time } = props.data.checkIn;
  return `${new Date(date).getMonth() + 1}.${new Date(date).getDate()}(${dayOfWeek}) ${time}`;
});
const checkOutFormatted = computed(() => {
  const { date, dayOfWeek, time } = props.data.checkOut;
  return `${new Date(date).getMonth() + 1}.${new Date(date).getDate()}(${dayOfWeek}) ${time}`;
});

onMounted(() => {
  document.body.style.overflow = "hidden";
});
onUnmounted(() => {
  document.body.style.overflow = "";
});
</script>

<template>
  <div class="fixed inset-0 z-[999] flex justify-center pt-28">
    <div class="absolute inset-0 bg-black/30 z-0"></div>
    <div class="relative z-10 w-full bg-gray-100 rounded-tl-xl rounded-tr-xl shadow-xl px-4 pt-8">
      <button @click="emit('close')" class="mb-4 text-gray-500">
        <Icon icon="material-symbols:close-rounded" class="w-5 h-5" />
      </button>
      <!-- 숙소 예약 카드 -->
      <div class="relative bg-white border border-gray-200 rounded-xl shadow px-5 py-6">
        <div class="w-full pt-1 pb-6">
          <img :src="agodaLogo" alt="Agoda Logo" class="w-14 h-auto" />
        </div>

        <!-- 예약번호 -->
        <p class="body2 text-gray-500">예약번호</p>
        <p class="title1 text-black mb-4">{{ data.id }}</p>

        <div class="relative w-full my-2">
          <div class="border-t border-dashed border-gray-200 w-full"></div>

          <div
            class="absolute -left-7 top-1/2 w-3.5 h-3.5 bg-gray-100 rounded-full -translate-y-1/2 overflow-hidden"
          >
            <div
              class="absolute inset-0 bg-transparent border border-blue-200"
              style="clip-path: inset(0 0 0 50%)"
            ></div>
          </div>

          <div
            class="absolute -right-7 top-1/2 w-3.5 h-3.5 bg-gray-100 rounded-full -translate-y-1/2 overflow-hidden"
          >
            <div
              class="absolute inset-0 bg-transparent border border-blue-200"
              style="clip-path: inset(0 50% 0 0)"
            ></div>
          </div>
        </div>

        <!-- 체크인/체크아웃 -->
        <div class="flex justify-between mb-5 text-subtitle2 font-medium">
          <div class="text-leftr">
            <p class="text-gray-400 caption1">체크인</p>
            <p class="subtitle1 text-black">{{ checkInFormatted }}</p>
          </div>
          <div class="w-px bg-gray-300"></div>
          <div class="text-right">
            <p class="text-gray-400 caption1">체크아웃</p>
            <p class="subtitle1 text-black">{{ checkOutFormatted }}</p>
          </div>
        </div>

        <!-- 기타 정보 -->
        <div class="flex flex-col gap-2 text-[15px] text-gray-800">
          <div>
            <p class="body2 text-gray-500">고객명</p>
            <p class="subtitle1 text-black">{{ data.guestName }}</p>
          </div>
          <div>
            <p class="body2 text-gray-500">숙소명</p>
            <p class="subtitle1 text-black">{{ data.hotelEnglishName }}</p>
          </div>
          <div>
            <p class="body2 text-gray-500">주소</p>
            <p class="subtitle1 leading-snug text-black">
              {{ data.address }}
            </p>
          </div>
          <div>
            <p class="body2 text-gray-500">숙소 연락처</p>
            <p class="subtitle1 text-black">{{ data.contact }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
