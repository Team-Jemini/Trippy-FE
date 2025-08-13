<script setup>
import { Icon } from "@iconify/vue";
import { ref, computed } from "vue";
import TicketModal from "@/components/air-ticket/TicketModal.vue";

const props = defineProps({
  ticket: {
    type: Object,
    required: true,
  },
});

// 출발일시 계산 (중복 제거 및 재사용)
const departureDateTime = computed(() => {
  if (!props.ticket?.date || !props.ticket?.departure?.time) {
    return null;
  }
  const dateStr = `${props.ticket.date}T${props.ticket.departure.time}:00`;
  return new Date(dateStr);
});

const showModal = ref(false);

// 탑승 시간이 현재보다 이전이면 true
const isExpired = computed(() => {
  const departure = departureDateTime.value;
  if (!departure) return false;

  const now = new Date();
  return departure < now;
});

// 24시간 이내 여부
const isAvailable = computed(() => {
  const departure = departureDateTime.value;
  if (!departure) return false;

  const now = new Date();
  const diffMs = departure.getTime() - now.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  return diffHours <= 24 && diffHours > 0; // 24시간 이내이고 미래 시간
});

// 버튼 텍스트
const buttonText = computed(() => {
  return isAvailable.value ? "모바일 티켓 보기" : "모바일 탑승권 발급 전입니다.";
});

// 버튼 스타일
const buttonClasses = computed(() => [
  "w-full rounded-xl py-3 text-center text-button2 transition-colors",
  isAvailable.value
    ? "bg-blue-200 text-blue-400 hover:bg-blue-300"
    : "bg-gray-200 text-gray-400 cursor-not-allowed",
]);
</script>

<template>
  <div class="w-full bg-white rounded-xl shadow-custom px-4 py-3 flex flex-col">
    <!-- 날짜 & 예약번호 -->
    <div class="flex justify-between text-gray-500 caption2 mt-2">
      <span>{{ ticket.date }}({{ ticket.dayOfWeek }})</span>
      <span>예약번호: {{ ticket.reservationCode }}</span>
    </div>

    <!-- 도시 & 공항 코드 -->
    <div class="relative flex justify-between items-center mt-3.5">
      <div class="flex flex-col ml-2">
        <span class="text-black subtitle1">{{ ticket.departure.city }}</span>
        <span class="text-gray-500 body2">{{ ticket.departure.code }}</span>
      </div>

      <div class="absolute left-1/2 -translate-x-1/2">
        <Icon icon="material-symbols:flight-takeoff" class="w-8 h-8 text-black" />
      </div>

      <div class="flex flex-col items-end mr-2">
        <span class="text-black subtitle1">{{ ticket.arrival.city }}</span>
        <span class="text-gray-500 body2">{{ ticket.arrival.code }}</span>
      </div>
    </div>

    <!-- 시간 + 라인 -->
    <div class="flex items-center justify-between m-2">
      <span class="text-black text-subtitle1">{{ ticket.departure.time }}</span>
      <div class="relative flex-1 flex items-center mx-2 h-2">
        <div class="absolute top-1/2 left-0 w-full h-[1px] bg-gray-300 -translate-y-1/2"></div>
        <div class="z-10 w-1 h-1 rounded-full bg-purple"></div>
        <div class="flex-1"></div>
        <div class="z-10 w-1 h-1 rounded-full bg-purple"></div>
      </div>
      <span class="text-black text-subtitle1">{{ ticket.arrival.time }}</span>
    </div>

    <!-- 항공 정보 영역 -->
    <div class="mt-1 text-gray-500 text-body2 flex flex-col gap-1 ml-2 mr-2">
      <div class="flex items-center gap-1">
        <Icon icon="material-symbols:travel" class="w-3 h-3" />
        <span class="caption3">{{ ticket.flight.flightNo }}</span>
      </div>

      <div class="flex justify-between">
        <div class="flex items-center gap-1">
          <Icon icon="material-symbols:luggage-rounded" class="w-3 h-3" />
          <span class="caption3">{{ ticket.flight.baggage }}</span>
        </div>

        <div class="flex items-center gap-1">
          <Icon icon="material-symbols:airline-seat-recline-extra-rounded" class="w-3 h-3" />
          <span class="caption3">{{ ticket.flight.seatType }}</span>
        </div>
      </div>
    </div>

    <!-- 버튼은 isExpired가 false일 때만 보임 -->
    <div class="mt-4" v-if="!isExpired">
      <button :disabled="!isAvailable" @click="showModal = true" :class="buttonClasses">
        {{ buttonText }}
      </button>
    </div>

    <!-- 티켓 모달 -->
    <TicketModal
      v-if="showModal"
      :ticket="ticket"
      :airlineId="ticket.id"
      @close="showModal = false"
    />
  </div>
</template>
