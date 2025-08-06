<script setup>
import { useExchangeStore } from "@/stores/exchangeStore";
import { useRouter } from "vue-router";
import NextButton from "@/components/common/NextButton.vue";
import TrippyLogo from "@/assets/svg/trippy-logo.svg";

const exchangeStore = useExchangeStore();
const { inputForeignAmount, inputKrwAmount, selectedCurrencyCode, parseCurrencyCode } =
  exchangeStore;

const router = useRouter();
const goToHomeView = () => {
  router.push("/");
};
</script>

<template>
  <div class="flex flex-col h-full justify-center items-center gap-4 -mt-10">
    <div><TrippyLogo class="w-40 h-auto m-2" /></div>

    <div class="text-center title1">
      <p>{{ inputForeignAmount.toLocaleString() }} {{ parseCurrencyCode(selectedCurrencyCode) }}</p>
      <p>환전이 완료되었습니다.</p>
    </div>

    <div class="flex justify-between text-gray-500 gap-6">
      <p>환전 금액</p>
      <div class="flex flex-row">
        <p>{{ Number(inputKrwAmount).toLocaleString() }} 원 →</p>
        <p class="ml-1">
          {{ inputForeignAmount.toLocaleString() }} {{ parseCurrencyCode(selectedCurrencyCode) }}
        </p>
      </div>
    </div>
  </div>
  <div>
    <NextButton title="확인" @click="goToHomeView"></NextButton>
  </div>
</template>
<style></style>
