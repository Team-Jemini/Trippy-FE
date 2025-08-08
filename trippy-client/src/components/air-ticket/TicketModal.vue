<script setup>
import { Icon } from "@iconify/vue";
import { onMounted, onUnmounted, computed } from "vue";
import AirLineLogo from "@/assets/png/korean_air_logo.png";
import defaultQr from "@/assets/png/default_qr.png";

const props = defineProps({
  ticket: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["close"]);

const formattedDate = computed(() => {
  const date = new Date(props.ticket.date);
  return date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    })
    .toUpperCase()
    .replaceAll(" ", "");
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

      <!-- 내부 모바일 탑승권 -->
      <div
        class="bg-white rounded-xl border border-blue-200 shadow flex flex-col gap-1 items-center"
      >
        <!-- 항공사 로고[추후 enum으로 관리 예정] -->
        <div class="w-full px-4 pt-7 pb-5">
          <img :src="AirLineLogo" alt="Korean Air Logo" class="w-24 h-auto" />
        </div>

        <!-- 출발지, 도착지 -->
        <div class="flex items-center justify-between w-full px-4">
          <div class="flex flex-col items-center pl-4">
            <span class="body2 text-gray-500">{{ ticket.departure.city }}</span>
            <span class="title1 text-black">{{ ticket.departure.code }}</span>
          </div>

          <Icon icon="material-symbols:airplanemode-active" class="w-8 h-8 text-black rotate-90" />

          <div class="flex flex-col items-center pr-4">
            <span class="body2 text-gray-500">{{ ticket.arrival.city }}</span>
            <span class="title1 font-bold">{{ ticket.arrival.code }}</span>
          </div>
        </div>

        <!-- 중간 점선 + 컷팅 -->
        <div class="relative w-full my-2">
          <div class="border-t border-dashed border-gray-200 w-full"></div>

          <div
            class="absolute -left-2 top-1/2 w-3.5 h-3.5 bg-gray-100 rounded-full -translate-y-1/2 overflow-hidden"
          >
            <div
              class="absolute inset-0 bg-transparent border border-blue-200"
              style="clip-path: inset(0 0 0 50%)"
            ></div>
          </div>

          <div
            class="absolute -right-2 top-1/2 w-3.5 h-3.5 bg-gray-100 rounded-full -translate-y-1/2 overflow-hidden"
          >
            <div
              class="absolute inset-0 bg-transparent border border-blue-200"
              style="clip-path: inset(0 50% 0 0)"
            ></div>
          </div>
        </div>

        <!-- 항공편 세부정보(추후 데이터 id로 조회해서 연결예정) -->
        <div class="grid grid-cols-4 gap-y-3 gap-x-7 text-left w-full px-4">
          <div class="flex flex-col gap-1">
            <p class="text-gray-400 body2">편명</p>
            <p class="subtitle1">{{ ticket.flight.flightNo }}</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-gray-400 body2">출발일</p>
            <p class="subtitle1">{{ formattedDate }}</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-gray-400 body2">탑승시각</p>
            <p class="subtitle1">{{ ticket.departure.time }}</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-gray-400 body2">출발시각</p>
            <p class="subtitle1">{{ ticket.arrival.time }}</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-gray-400 body2">터미널</p>
            <p class="subtitle1">4</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-gray-400 body2">탑승구</p>
            <p class="subtitle1">미정</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-gray-400 body2">수하물</p>
            <p class="subtitle1">{{ ticket.flight.baggageWeight }}</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-gray-400 body2">좌석</p>
            <p class="subtitle1">12E</p>
          </div>
        </div>

        <!-- 탑승자 이름 -->
        <p class="title3 mt-6">LEE/SOJEONG</p>

        <!-- QR 코드 -->
        <img :src="defaultQr" alt="QR Code" class="w-40 h-40 mt-0.5 mb-10" />
      </div>
    </div>
  </div>
</template>
