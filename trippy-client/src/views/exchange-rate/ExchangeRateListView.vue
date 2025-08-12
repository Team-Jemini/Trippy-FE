<script setup>
import { useExchangeStore } from "@/stores/exchangeStore.js";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import NextButton from "@/components/common/buttons/NextButton.vue";
import { storeToRefs } from "pinia";

const exchangeStore = useExchangeStore();
const { getCountryCode } = exchangeStore;
const { exchangeRates, loading } = storeToRefs(exchangeStore);

const error = ref("");

const router = useRouter();
const goToExchangeCurrencyView = () => {
  router.push("/exchange-currency");
};

onMounted(async () => {
  await exchangeStore.fetchExchangeRates();
});
</script>

<template>
  <div class="w-full flex flex-col h-full justify-between">
    <h3 class="font-semibold text-xl mb-5">오늘의 환율 정보</h3>

    <div v-if="loading">데이터 불러오는 중...</div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
    <div
      v-else
      class="overflow-scroll flex-1 mb-12 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      <ul class="divide-y divide-gray-200">
        <li
          v-for="item in exchangeRates"
          :key="item.currencyName"
          class="flex items-center justify-between py-4"
        >
          <div class="flex">
            <div class="w-10">
              <img
                :src="`https://flagcdn.com/w40/${getCountryCode(item.currencyCode)}.png`"
                :alt="item.currencyName"
                class="w-10 h-7 rounded object-cover"
              />
            </div>
            <span class="font-semibold text-sm text-gray-900 px-4">
              {{ item.currencyName }}
            </span>
          </div>
          <div class="flex flex-col text-right text-m">
            <span class="text-sm font-semibold">{{ item.todayExchangeRate || "-" }}원</span>
            <div
              :class="{
                'text-red-200': item.upOrDown === '+',
                'text-blue-400': item.upOrDown === '-',
              }"
            >
              <span class="text-xs text-right">{{`${item.upOrDown || ""} ${item.changeAmount || "-"}원`}}</span>
              <span class="text-xs">
                {{`(${item.changePercentage || "-"}%)`}}
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div
      class="fixed bottom-0 left-0 right-0 z-50 w-full max-w-full pt-4 pb-[34px] px-4 bg-white md:max-w-[375px] md:mx-auto"
    >
      <NextButton title="환전하기" @click="goToExchangeCurrencyView" />
    </div>
  </div>
</template>

<style scoped></style>
