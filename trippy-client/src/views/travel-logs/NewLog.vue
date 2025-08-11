<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import PhotoUploader from "@/components/travel-logs/PhotoUploader.vue";
import DateRangePicker from "@/components/travel-logs/DateRangePicker.vue";
import NameInput from "@/components/common/inputs/NameInput.vue";
import { bankAccounts } from "@/_dummy/bankAccounts_dummy";
import AccountItem from "@/components/account/AccountItem.vue";

// 이미지 import
import defaultImage from "@/assets/png/image.png";

const showCalendar = ref(false);
const selectedRange = ref({ start: "", end: "" });

const router = useRouter();

const imageFile = ref(null);
const imageUrl = ref("");

const formattedDate = computed(() =>
  selectedRange.value.start && selectedRange.value.end
    ? `${selectedRange.value.start} ~ ${selectedRange.value.end}`
    : "날짜를 선택하세요",
);

const selectedAccount = ref(null);
const handleSelect = (account) => {
  selectedAccount.value = account;
};
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- 상단 헤더 -->
    <div class="relative">
      <div class="relative w-full">
        <img
          :src="imageUrl || defaultImage"
          alt="여행 이미지"
          class="w-full h-auto object-cover opacity-60"
        />
      </div>
      <button class="absolute top-4 left-4 text-black text-2xl" @click="router.back()">✕</button>
      <h1 class="absolute top-4 left-1/2 transform -translate-x-1/2 text-black font-bold text-lg">
        새 여행 로그
      </h1>
      <PhotoUploader @update:imageUrl="imageUrl = $event" @update:imageFile="imageFile = $event" />
    </div>

    <!-- 폼 영역 -->
    <form class="px-4 py-6 space-y-4 pb-24">
      <!-- 제목 -->
      <div>
        <NameInput
          v-model="travelName"
          label="여행 제목"
          placeholder="여행의 제목을 입력해주세요"
        />
      </div>

      <!-- 여행 기간 -->
      <div>
        <DateRangePicker
          @update:range="
            (val) => {
              selectedRange.value = val;
              showCalendar.value = false;
            }
          "
        />
        <!-- <DateInput v-model="selectedDate" label="예약 날짜" /> -->
      </div>

      <!-- 여행지 -->
      <div>
        <NameInput v-model="travelPlace" label="여행지" placeholder="여행지를 입력해주세요" />
      </div>

      <!-- 계좌 선택 -->

      <div class="flex flex-col gap-2 mt-4">
        <!-- 라벨 -->
        <label class="body2 text-black px-1">결제 내역을 추적할 계좌</label>
        <!-- 테두리 박스 안 계좌 목록 -->
        <div class="border border-gray-300 rounded-xl overflow-hidden">
          <ul class="flex flex-col">
            <li
              v-for="account in bankAccounts"
              :key="account.accountNumber"
              @click="handleSelect(account)"
              :class="[
                'cursor-pointer transition',
                selectedAccount?.accountNumber === account.accountNumber
                  ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white'
                  : 'hover:bg-gray-100',
              ]"
            >
              <AccountItem :data="account" />
            </li>
          </ul>
        </div>
      </div>

      <!-- 고정 하단 버튼 -->
      <div class="sticky bottom-0 z-50 bg-white px-4 pt-2">
        <button type="submit" class="w-full py-3 bg-main-gradient text-white rounded-xl font-bold">
          로그 생성하기
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.input {
  @apply w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400;
}
</style>
