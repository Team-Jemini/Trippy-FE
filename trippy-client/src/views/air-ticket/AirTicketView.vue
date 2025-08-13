<script setup>
import { useAirTicketStore } from "@/stores/airTicketStore";
import { storeToRefs } from "pinia";
import { defineProps, onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import QuickReloadButton from "@/components/common/buttons/QuickReloadButton.vue";
import LoadingOverlay from "@/components/common/loading/LoadingOverlay.vue";
import EmptyTicket from "@/components/air-ticket/EmptyTicket.vue";
import TicketCard from "@/components/air-ticket/TicketItem.vue";

const props = defineProps({
  currentTab: { type: String, default: "이용전" },
});

const store = useAirTicketStore();
const { tickets } = storeToRefs(store);

const isLoading = ref(false);
const route = useRoute();

const currentTab = ref(route.meta.tabs?.[0] ?? "이용전");

const getDepartureDateTime = (ticket) => {
  if (!ticket?.date || !ticket?.departure?.time) {
    return new Date(); // fallback
  }
  const dateStr = `${ticket.date}T${ticket.departure.time}:00`;
  const date = new Date(dateStr);
  return date;
};

const upcomingTickets = computed(() =>
  tickets.value.filter((t) => getDepartureDateTime(t) > new Date()),
);
const pastTickets = computed(() =>
  tickets.value.filter((t) => getDepartureDateTime(t) < new Date()),
);
const visibleTickets = computed(() =>
  props.currentTab === "이용전" ? upcomingTickets.value : pastTickets.value,
);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const onReload = async () => {
  isLoading.value = true;
  try {
    await Promise.all([
      store.loadAllTickets?.(), // 로딩 버튼 눌러야지만 API 호출
      sleep(1500), // 강제 1.5초 로딩뷰 유지
    ]);
  } catch (e) {
    console.error("항공권 전체 조회 실패", e);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <main class="w-full flex flex-col gap-8 relative">
    <!-- 로딩 블러 오버레이 -->
    <LoadingOverlay v-if="isLoading" message="예약한 항공권을 불러오고 있습니다." />

    <!-- 항공권 없을 때 -->
    <div v-if="tickets.length === 0" class="mt-[50%] flex justify-center">
      <EmptyTicket />
    </div>

    <!-- 항공권 있을 때 -->
    <div v-else class="flex flex-col gap-4">
      <!-- <TicketCard v-for="ticket in tickets" :key="ticket.id" :ticket="ticket" /> -->
      <TicketCard v-for="ticket in visibleTickets" :key="ticket.id" :ticket="ticket" />
    </div>

    <!-- 하단 퀵 버튼-->
    <div class="fixed bottom-7 ml-48 z-50">
      <QuickReloadButton @reload="onReload" />
    </div>
  </main>
</template>
