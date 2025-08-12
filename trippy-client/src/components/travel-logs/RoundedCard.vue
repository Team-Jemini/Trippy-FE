<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { Icon } from "@iconify/vue";

const router = useRouter();

const props = defineProps({
  imageUrl: String,
  title: String,
  dateRange: String,
  memberCount: Number,
  onClick: Function,
  isReportGenerated: Boolean,
});
const showReportModal = ref(false);

const emit = defineEmits(["request-loading"]);

function handleReportClick() {
  if (props.isReportGenerated) {
    router.push("/report");
  } else {
    showReportModal.value = true;
  }
}
function cancel(event) {
  event.stopPropagation();
  showReportModal.value = false;
}
function generateReport(event) {
  event.stopPropagation();
  showReportModal.value = false;
  emit("request-loading");
}
// function handleReportDone() {
//   router.push("/report");
// }
</script>
<template>
  <div
    @click="onClick"
    class="w-full bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
  >
    <!-- 상단 이미지 -->
    <div class="relative w-full aspect-[3/1]">
      <img
        :src="imageUrl"
        alt="여행 이미지"
        class="absolute inset-0 w-full h-full object-cover opacity-60"
      />
    </div>

    <!-- 본문 -->
    <div class="p-4">
      <!-- 제목 & 날짜 -->
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-md font-bold text-gray-800 truncate">{{ title }}</h2>
        <p class="text-xs text-gray-400">{{ dateRange }}</p>
      </div>

      <!-- 리포트 링크 & 인원 수 -->
      <div class="flex justify-between items-center text-sm">
        <button
          class="flex items-center gap-1 px-3 py-1 rounded-md transition font-medium cursor-pointer hover:bg-blue-50 focus:outline-none"
          :class="
            isReportGenerated
              ? 'text-blue-600 border border-blue-600'
              : 'text-gray-600 border border-gray-400'
          "
          @click.stop="handleReportClick"
        >
          {{ isReportGenerated ? "여행 리포트 발행 완료" : "여행 리포트 발행하기" }}
          <Icon icon="streamline:receipt-add" class="w-4 h-4" />
        </button>
        <span class="text-gray-500 flex items-center">
          <Icon v-if="isReportGenerated" icon="ion:person" />
          <Icon v-else icon="ic:sharp-people-alt" />
          <span class="ml-1">{{ memberCount }}</span>
        </span>
      </div>
    </div>

    <!-- 모달 창 -->
    <div
      v-if="showReportModal"
      class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
    >
      <div class="bg-white w-80 rounded-xl p-6 shadow-lg text-center">
        <h2 class="text-lg font-semibold text-black mb-2">여행이 끝나셨나요?</h2>
        <p class="text-sm text-gray-600 mb-6">여행 리포트는 1회만 생성 가능합니다.</p>
        <div class="flex justify-between gap-4">
          <button
            class="flex-1 py-2 bg-gray-200 rounded-lg text-gray-800 font-semibold hover:bg-gray-300"
            @click="cancel"
          >
            취소
          </button>
          <button
            class="flex-1 py-2 bg-main-gradient text-white rounded-lg font-semibold hover:bg-blue-600"
            @click="generateReport"
          >
            리포트 발행
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
