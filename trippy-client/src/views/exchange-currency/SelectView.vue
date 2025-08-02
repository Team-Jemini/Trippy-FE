<script setup>
import { ref, computed } from "vue";
import { useExchangeStore } from "@/stores/exchangeStore.js";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import NextButton from "@/components/common/NextButton.vue";

//수출입은행 현재환율api 인증키
const authkey = "수출입은행 현재환율 api 인증키 부분";

const exchangeStore = useExchangeStore();

const { getCountryCode, todayRates, setSelectedCurrencyCode } = exchangeStore;

const handleSelect = (code) => {
  setSelectedCurrencyCode(code);
};

const router = useRouter();
const goToAccountView = () => {
  router.push("/exchange-currency-account");
};

const loading = ref(false);
const error = ref("");
</script>

<template>
  <div class="w-full h-full mx-auto flex flex-col">
    <h3 class="font-semibold text-xl m-1">어떤 돈으로 환전할까요?</h3>

    <div v-if="loading">데이터 불러오는 중...</div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>

    <ul
      v-else
      class="divide-y divide-gray-200 w-full flex-1 mb-12 overflow-auto hide-scrollbar::-webkit-scrollbar"
    >
      <li
        v-for="item in todayRates"
        :key="item.cur_unit"
        class="flex items-center justify-between py-4"
      >
        <div class="flex">
          <span class="w-10">
            <img
              :src="`https://flagcdn.com/w40/${getCountryCode(item.cur_unit)}.png`"
              :alt="item.cur_nm"
              class="w-10 h-7 rounded"
            />
          </span>
          <span class="font-semibold text-sm text-gray-600 px-4">{{ item.cur_nm }}</span>
        </div>
        <div>
          <button @click="handleSelect(item.cur_unit)" class="p-2">
            <Icon
              :class="[
                'right-6 w-8 h-8',
                item.cur_unit === exchangeStore.selectedCurrencyCode
                  ? 'text-blue-400'
                  : 'text-gray-400',
              ]"
              icon="material-symbols:check"
            ></Icon>
          </button>
        </div>
      </li>
    </ul>
    <div
      class="fixed bottom-0 left-0 right-0 z-50 w-full max-w-full pt-4 pb-[34px] px-4 bg-white md:max-w-[375px] md:mx-auto"
    >
      <NextButton
        title="다음"
        @click="goToAccountView"
        :disabled="!exchangeStore.selectedCurrencyCode"
      />
    </div>
  </div>
</template>

<style scoped></style>
