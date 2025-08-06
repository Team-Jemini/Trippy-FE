<script setup>
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import RoundedCard from "@/components/travel-logs/RoundedCard.vue";
import EmptyState from "@/components/travel-logs/EmptyState.vue";
import LogYearHeader from "@/components/travel-logs/LogYearHeader.vue";
import FloatingAddButton from "@/components/travel-logs/FloatingAddButton.vue";
import TravelOptions from "@/components/travel-logs/TravelOptions.vue";
import GroupAccountModal from "@/components/travel-logs/GroupAccountModal.vue";
import sampleImage from "@/assets/image.png";
import travelLogsRaw from "@/_dummy/travelLogs.json";

const router = useRouter();

const showOptions = ref(false);
const showGroupModal = ref(false);

const travelLogs = travelLogsRaw.map((log) => ({
  ...log,
  imageUrl: sampleImage,
}));

const groupedLogs = computed(() => {
  const groups = {};
  travelLogs.forEach((log) => {
    const year = log.dateRange.split(".")[0];
    if (!groups[year]) groups[year] = [];
    groups[year].push(log);
  });

  return Object.entries(groups)
    .sort((a, b) => b[0] - a[0])
    .map(([year, logs]) => ({ year, logs }));
});

function toggleOptions() {
  showOptions.value = !showOptions.value;
  console.log("toggleOptions 실행됨", showOptions.value);
}

function handleClick(id) {
  router.push("/map");
}

function handleAddLog() {
  router.push("/new-log");
}

function handleGroupClick() {
  showOptions.value = false;
  showGroupModal.value = true;
}
</script>

<template>
  <main class="relative w-full flex flex-col gap-8">
    <!-- 배경 오버레이 -->
    <!-- <div
      v-if="showOptions"
      class="fixed inset-0 bg-black bg-opacity-40 z-20"
      @click="showOptions = false"
    ></div> -->

    <!-- 비어 있을 경우 화면 -->
    <EmptyState v-if="travelLogs.length === 0" />

    <!-- 연도별 로그 리스트 -->
    <div v-for="(group, index) in groupedLogs" :key="group.year" class="px-4">
      <LogYearHeader :year="group.year" :showSort="index === 0" />
      <div class="flex flex-col gap-4">
        <RoundedCard
          v-for="log in group.logs"
          :key="log.id"
          :imageUrl="log.imageUrl"
          :title="log.title"
          :dateRange="log.dateRange"
          :memberCount="log.memberCount"
          :isReportGenerated="log.isReportGenerated"
          :onClick="() => handleClick(log.id)"
        />
      </div>
    </div>

    <!-- 플로팅 버튼 -->
    <FloatingAddButton @click="toggleOptions" />

    <!-- 여행 선택 모달 -->
    <TravelOptions
      v-if="showOptions"
      @close="showOptions = false"
      @clickGroup="handleGroupClick"
      @clickSolo="handleAddLog"
    />

    <!-- 단체 여행 모달 -->
    <GroupAccountModal
      v-if="showGroupModal"
      @cancel="showGroupModal = false"
      @confirm="router.push('/group-account/create')"
    />
  </main>
</template>
