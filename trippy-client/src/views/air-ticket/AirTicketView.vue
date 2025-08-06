<script setup>
import { useAirTicketStore } from "@/stores/airTicketStore";
import { storeToRefs } from "pinia";
import { defineProps, onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import dummyTickets from "@/_dummy/airTicket_dummy.json"; //더미 -> 나중에 삭제하기
import QuickReloadButton from "@/components/common/buttons/QuickReloadButton.vue";
import LoadingOverlay from "@/components/common/loading/LoadingOverlay.vue";
import EmptyTicket from "@/components/air-ticket/EmptyTicket.vue";
import TicketCard from "@/components/air-ticket/TicketItem.vue";

const store = useAirTicketStore();
const { tickets } = storeToRefs(store);
const isLoading = ref(false);
const route = useRoute();
const currentTab = ref(route.meta.tabs?.[0] ?? "이용전");

onMounted(() => {
  store.setTickets(dummyTickets);
});

const now = new Date();
const getDepartureDateTime = (ticket) => {
  return new Date(`${ticket.date}T${ticket.departure.time}:00`);
};
const upcomingTickets = computed(() => tickets.value.filter((t) => getDepartureDateTime(t) > now));
const pastTickets = computed(() => tickets.value.filter((t) => getDepartureDateTime(t) < now));
const visibleTickets = computed(() =>
  props.currentTab === "이용전" ? upcomingTickets.value : pastTickets.value,
);

const onReload = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
};

const props = defineProps({
  currentTab: {
    type: String,
    default: "이용전",
  },
});
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
