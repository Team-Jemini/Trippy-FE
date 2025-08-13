<script setup>
import { ref, watch, defineProps, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { useAccommodationStore } from "@/stores/accommodationStore";
import { useSightseeingStore } from "@/stores/sightseeingStore";

import LoadingOverlay from "@/components/common/loading/LoadingOverlay.vue";
import QuickReloadButton from "@/components/common/buttons/QuickReloadButton.vue";
import EmptyAccommodation from "@/components/boucher/EmptyAccommodation.vue";
import EmptySightseeing from "@/components/boucher/EmptySightseeing.vue";
import AccommodationItem from "@/components/boucher/AccommodationItem.vue";
import SightseeingItem from "@/components/boucher/SightseeingItem.vue";
import QuickAddButton from "@/components/common/buttons/QuickAddButton.vue";

// props로 탭을 외부에서 제어
const props = defineProps({
  currentTab: { type: String, required: true },
});

const route = useRoute();
const router = useRouter();
const isLoading = ref(false);

// 스토어
const accommodationStore = useAccommodationStore();
const sightseeingStore = useSightseeingStore();

// Store의 getter 사용
const { activeAccommodations, pastAccommodations } = storeToRefs(accommodationStore);

const { upcomingSightseeings, pastSightseeings } = storeToRefs(sightseeingStore);

// 전체 데이터 길이 확인용
const totalAccommodations = computed(
  () => activeAccommodations.value.length + pastAccommodations.value.length,
);

const totalSightseeings = computed(
  () => upcomingSightseeings.value.length + pastSightseeings.value.length,
);

const onReload = async () => {
  isLoading.value = true;
  try {
    await Promise.all([
      // 두 스토어 모두 로딩 (전체 데이터 한 번에)
      accommodationStore.loadAllAccommodations(),
      sightseeingStore.loadAllSightseeings(),
      sleep(1500),
    ]);
  } catch (error) {
    console.error("데이터 새로고침 실패:", error);
  } finally {
    isLoading.value = false;
  }
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
</script>

<template>
  <main class="w-full flex flex-col gap-8 relative">
    <LoadingOverlay
      v-if="isLoading"
      :message="
        props.currentTab === '숙소'
          ? '예약한 숙소내역을 불러오고 있습니다.'
          : '예약한 관광내역을 불러오고 있습니다.'
      "
    />

    <!-- 숙소 탭 -->
    <template v-if="props.currentTab === '숙소'">
      <!-- 숙소가 없을 때 -->
      <div v-if="totalAccommodations === 0" class="mt-[50%] flex justify-center">
        <EmptyAccommodation />
      </div>

      <!-- 숙소가 있을 때 -->
      <div v-else class="flex flex-col gap-4">
        <!-- 현재/미래 예약 -->
        <AccommodationItem
          v-for="item in activeAccommodations"
          :key="item.accommodationId"
          :data="item"
        />

        <!-- 구분선 (과거 데이터가 있을 때만) -->
        <div
          v-if="pastAccommodations.length > 0"
          class="flex items-center gap-3 text-gray-400 text-sm my-1"
        >
          <div class="h-2"></div>
          <span>지난 예약</span>
          <div class="flex-1 h-px bg-gray-200"></div>
        </div>

        <!-- 과거 예약 (살짝 투명하게) -->
        <AccommodationItem
          v-for="item in pastAccommodations"
          :key="item.accommodationId"
          :data="item"
          class="opacity-60"
        />
      </div>

      <div class="fixed bottom-7 ml-48 z-50">
        <QuickReloadButton @reload="onReload" />
      </div>
    </template>

    <!-- 관광 탭 -->
    <template v-else-if="props.currentTab === '관광'">
      <!-- 관광이 없을 때 -->
      <div v-if="totalSightseeings === 0" class="mt-[50%] flex justify-center">
        <EmptySightseeing />
      </div>

      <!-- 관광이 있을 때 -->
      <div v-else class="flex flex-col gap-4">
        <!-- 미래 관광 -->
        <SightseeingItem
          v-for="item in upcomingSightseeings"
          :key="item.sightseeingId"
          :data="item"
        />

        <!-- 구분선 (과거 데이터가 있을 때만) -->
        <div
          v-if="pastSightseeings.length > 0"
          class="flex items-center gap-3 text-gray-400 text-sm my-1"
        >
          <div class="h-2"></div>
          <span>지난 예약</span>
          <div class="flex-1 h-px bg-gray-200"></div>
        </div>

        <!-- 과거 관광 (살짝 투명하게) -->
        <SightseeingItem
          v-for="item in pastSightseeings"
          :key="item.sightseeingId"
          :data="item"
          class="opacity-60"
        />
      </div>

      <div class="fixed bottom-7 ml-72 z-50">
        <QuickAddButton @click="router.push({ name: 'SightseeingRegister' })" />
      </div>
    </template>
  </main>
</template>
