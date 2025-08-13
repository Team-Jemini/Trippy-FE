<script setup>
import { ref, onMounted, watch } from "vue";
import { useExchangeStore } from "@/stores/exchangeStore.js";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import NextButton from "@/components/common/buttons/NextButton.vue";
import { storeToRefs } from "pinia";

const exchangeStore = useExchangeStore();

const { getCountryCode, todayRates, setSelectedCurrencyCode } = exchangeStore;
const { exchangeRates, loading } = storeToRefs(exchangeStore);

const handleSelect = (code) => {
  setSelectedCurrencyCode(code);
};

const router = useRouter();
const goToAccountView = () => {
  router.push("/exchange-currency-account");
};

loading.value = ref(false);
const error = ref("");

onMounted(async () => {
  await exchangeStore.fetchExchangeRates();
});
watch(
  () => exchangeStore.exchangeRates,
  (newVal) => {
    console.log("환율 데이터 갱신됨:", newVal);
  },
);
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
        v-for="item in exchangeRates"
        :key="item.currencyCode"
        class="flex items-center justify-between py-4"
      >
        <div class="flex">
          <span class="w-10">
            <img
              :src="`https://flagcdn.com/w40/${getCountryCode(item.currencyCode)}.png`"
              :alt="item.currencyName"
              class="w-10 h-7 rounded"
            />
          </span>
          <span class="font-semibold text-sm text-gray-600 px-4">{{ item.currencyName }}</span>
        </div>
        <div>
          <button @click="handleSelect(item.currencyCode)" class="p-2">
            <Icon
              :class="[
                'right-6 w-8 h-8',
                item.currencyCode === exchangeStore.selectedCurrencyCode
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
