<script setup>
import { ref, watch, defineProps, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { useAccommodationStore } from "@/stores/accommodationStore";
import { useSightseeingStore } from "@/stores/sightseeingStore";

import dummyAccommodations from "@/_dummy/accommodation_dummy.json";
import dummySightseeing from "@/_dummy/sightseeing_dummy.json";

import LoadingOverlay from "@/components/common/loading/LoadingOverlay.vue";
import QuickReloadButton from "@/components/common/QuickReloadButton.vue";
import EmptyAccommodation from "@/components/boucher/EmptyAccommodation.vue";
import EmptySightseeing from "@/components/boucher/EmptySightseeing.vue";
import AccommodationItem from "@/components/boucher/AccommodationItem.vue";
import SightseeingItem from "@/components/boucher/SightseeingItem.vue";
import QuickAddButton from "@/components/buttons/QuickAddButton.vue";

// props로 탭을 외부에서 제어
const props = defineProps({
  currentTab: { type: String, required: true },
});
// const currentTab = computed({
//   get: () => route.query.tab || "숙소", // 기본값 '숙소'
//   set: (val) => {
//     router.replace({ query: { ...route.query, tab: val } });
//   },
// });

const route = useRoute();
const router = useRouter();
const isLoading = ref(false);

// 스토어
const accommodationStore = useAccommodationStore();
const sightseeingStore = useSightseeingStore();
const { accommodations } = storeToRefs(accommodationStore);
const { sightseeings } = storeToRefs(sightseeingStore);

// props.currentTab 변경 시마다 더미 데이터 세팅
watch(
  () => props.currentTab,
  (tab) => {
    if (tab === "숙소") {
      accommodationStore.setAccommodations(dummyAccommodations);
    } else if (tab === "관광") {
      sightseeingStore.setSightseeing(dummySightseeing);
    }
  },
  { immediate: true },
);
// watch(
//   () => currentTab.value,
//   (tab) => {
//     if (tab === "숙소") {
//       accommodationStore.setAccommodations(dummyAccommodations);
//     } else if (tab === "관광") {
//       sightseeingStore.setSightseeing(dummySightseeing);
//     }
//   },
//   { immediate: true },
// );

// onMounted(() => {
//   if (route.query.tab === "관광") {
//     currentTab.value = "관광";
//   }
// });

const onReload = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
};
</script>

<template>
  <main class="w-full flex flex-col gap-8 relative">
    <LoadingOverlay v-if="isLoading" message="예약한 숙소내역을 불러오고 있습니다." />

    <!-- 숙소 탭 -->
    <template v-if="props.currentTab === '숙소'">
      <!-- <template v-if="currentTab === '숙소'"> -->
      <div v-if="accommodations.length === 0" class="mt-[50%] flex justify-center">
        <EmptyAccommodation />
      </div>
      <div v-else class="flex flex-col gap-4">
        <AccommodationItem v-for="item in accommodations" :key="item.id" :data="item" />
      </div>

      <div class="fixed bottom-7 ml-48 z-50">
        <QuickReloadButton @reload="onReload" />
      </div>
    </template>

    <!-- 관광 탭 -->
    <!-- <template v-else-if="currentTab === '관광'"> -->
    <template v-else-if="props.currentTab === '관광'">
      <div v-if="sightseeings.length === 0" class="mt-[50%] flex justify-center">
        <EmptySightseeing />
      </div>
      <div v-else class="flex flex-col gap-4">
        <SightseeingItem v-for="item in sightseeings" :key="item.id" :data="item" />
      </div>

      <div class="fixed bottom-7 ml-72 z-50">
        <QuickAddButton @click="router.push({ name: 'SightseeingRegister' })" />
      </div>
    </template>
  </main>
</template>
