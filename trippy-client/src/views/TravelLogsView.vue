<script setup>
import { useRouter } from "vue-router";
import { ref, computed, onMounted } from "vue";
import RoundedCard from "@/components/travel-logs/RoundedCard.vue";
import EmptyState from "@/components/travel-logs/EmptyState.vue";
import LogYearHeader from "@/components/travel-logs/LogYearHeader.vue";
import FloatingAddButton from "@/components/travel-logs/FloatingAddButton.vue";
import TravelOptions from "@/components/travel-logs/TravelOptions.vue";
import GroupAccountModal from "@/components/travel-logs/GroupAccountModal.vue";
import QuickAddButton from "@/components/common/buttons/QuickAddButton.vue";
import ReportLoading from "@/components/travel-logs/ReportLoading.vue";

import { getTravelLogs } from "@/api/travelLog.js";

const router = useRouter();

const showOptions = ref(false);
const showGroupModal = ref(false);
const showLoading = ref(false);

// ✅ API 상태
const travelLogs = ref([]);
const isFetching = ref(false);
const fetchError = ref("");

// 예시: 실제로는 로그인/스토어에서 가져오세요.
const userId = 1;

// 이미지 베이스 경로(백엔드 정적 경로가 있다면 .env로 분리 추천)
const IMG_BASE = import.meta.env.VITE_IMG_BASE_URL ?? "http://localhost:8080/images";

const resolveImageUrl = (filename) => {
  if (!filename) return sampleImage;
  // 절대 URL이면 그대로, 파일명만 오면 IMG_BASE/파일명
  return /^https?:\/\//i.test(filename) ? filename : `${IMG_BASE}/${filename}`;
};

const formatDate = (iso) => {
  const d = new Date(iso);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}.${mm}.${dd}`;
};

const toCardModel = (item) => ({
  id: item.travelId,
  title: item.title,
  dateRange: `${formatDate(item.travelBeginDate)} ~ ${formatDate(item.travelEndDate)}`,
  memberCount: item.memberCount ?? 1,
  isReportGenerated: !!item.isGenerated,
  imageUrl: item.travelImg, // S3 URL
  _beginYear: new Date(item.travelBeginDate).getFullYear(),
});

onMounted(async () => {
  isFetching.value = true;
  try {
    const list = await getTravelLogs(userId); // => 배열
    travelLogs.value = list.map(toCardModel);
  } catch (err) {
    fetchError.value = err?.response?.data?.message || "여행 로그를 불러오지 못했어요.";
  } finally {
    isFetching.value = false;
  }
});

const groupedLogs = computed(() => {
  const groups = {};
  travelLogs.value.forEach((log) => {
    const year = log._beginYear || "기타";
    if (!groups[year]) groups[year] = [];
    groups[year].push(log);
  });

  return Object.entries(groups)
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([year, logs]) => ({ year, logs }));
});

function toggleOptions() {
  showOptions.value = !showOptions.value;
}

function handleClick(id) {
  // TODO: 필요하면 상세/지도에 id 전달
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
    <!-- 로딩/에러 -->
    <div v-if="isFetching" class="px-4 text-sm text-gray-500">불러오는 중…</div>
    <div v-else-if="fetchError" class="px-4 text-sm text-red-500">{{ fetchError }}</div>

    <!-- 비어 있을 경우 화면 -->
    <EmptyState v-else-if="travelLogs.length === 0" />

    <!-- 연도별 로그 리스트 -->
    <div v-else v-for="(group, index) in groupedLogs" :key="group.year" class="px-4">
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
          @request-loading="showLoading = true"
        />
      </div>
    </div>

    <!-- 플러스 버튼 -->
    <div class="fixed bottom-28 ml-60 z-50">
      <FloatingAddButton @click="toggleOptions" />
    </div>

    <!-- 단체/개인여행 선택 버튼 -->
    <div class="fixed bottom-28 ml-60 z-40">
      <TravelOptions
        v-if="showOptions"
        @close="showOptions = false"
        @clickGroup="handleGroupClick"
        @clickSolo="handleAddLog"
      />
    </div>

    <!-- 단체 여행 모달 -->
    <GroupAccountModal
      v-if="showGroupModal"
      @cancel="showGroupModal = false"
      @confirm="router.push('/group-account/create')"
    />
  </main>

  <ReportLoading v-if="showLoading" @next="() => router.push('/report')" />
</template>
