<script setup>
import { defineProps, ref } from "vue";
import AccommodationModal from "@/components/boucher/AccommodationModal.vue";
import { formatVoucherDate } from "@/assets/utils";
import { fetchAccommodationDetail } from "@/api/voucher";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const showModal = ref(false);
const accommodationDetail = ref(null);

// 바우처 보기 버튼 클릭 핸들러
const handleShowVoucher = async () => {
  try {
    // fetchAccommodationDetail API 호출
    const response = await fetchAccommodationDetail(props.data.accommodationId);
    accommodationDetail.value = response.data;

    // 모달 표시
    showModal.value = true;
  } catch (error) {
    console.error("숙소 상세 정보 조회 실패:", error);
  }
};

// 모달 닫기 핸들러
const handleCloseModal = () => {
  showModal.value = false;
  accommodationDetail.value = null;
};
</script>

<template>
  <div class="w-full bg-white rounded-xl shadow-custom px-4 py-3 flex flex-col">
    <!-- 숙소 이름 및 객실 -->
    <div class="flex flex-col gap-1">
      <span class="subtitle1 text-black">{{ data.accommodationName }}</span>
      <span class="caption1 text-gray-500">{{ data.roomName }} · {{ data.nights }}</span>
    </div>

    <!-- 체크인/체크아웃 -->
    <div class="flex justify-between items-center mt-4 text-black subtitle2">
      <div class="flex flex-col items-start">
        <span class="caption1 text-gray-500">체크인</span>
        <span class="subtitle1">{{ formatVoucherDate(data.checkInDate) }}</span>
      </div>

      <div class="w-px bg-gray-300 h-8 border-opacity-20"></div>

      <div class="flex flex-col items-end">
        <span class="caption1 text-gray-500">체크아웃</span>
        <span class="subtitle1">{{ formatVoucherDate(data.checkOutDate) }}</span>
      </div>
    </div>

    <!-- 버튼 -->
    <div class="mt-4">
      <button
        class="w-full bg-blue-200 text-blue-400 py-3 rounded-xl text-button2 text-center disabled:opacity-50"
        @click="handleShowVoucher"
      >
        바우처 보기
      </button>
    </div>

    <!-- 모달 띄우기 -->
    <AccommodationModal
      v-if="showModal && accommodationDetail"
      :data="accommodationDetail"
      @close="handleCloseModal"
    />
  </div>
</template>
