<script setup>
import { useExchangeStore } from "@/stores/exchangeStore.js";

const exchangeStore = useExchangeStore();
const { getCountryCode } = exchangeStore;
</script>

<template>
  <div
    v-for="(item, index) in exchangeStore.exchangeRatesByCountries"
    :key="index"
    class="w-full"
  >
    <div class="w-full h-28 bg-white rounded-xl flex flex-col justify-center gap-1.5 p-4">
      <img
        :src="`https://flagcdn.com/w40/${getCountryCode(item.currencyCode)}.png`"
        :alt="item.currencyName"
        class="w-10 h-7 rounded border border-gray-200 object-cover"
      />
      <div class="flex gap-2">
        <p class="body2">{{ item.currencyName.slice(0, 2) }}</p>
        <p class="body2 text-gray-400">{{ item.currencyCode.slice(0, 3) }}</p>
      </div>
      <p class="subtitle2">{{ item.baseExchangeRate }}원</p>
    </div>
  </div>
</template>
