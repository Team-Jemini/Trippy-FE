<script setup>
import WalletImage from "@/assets/svg/wallet.svg?url";

const props = defineProps({ avg: { type: Number, required: true } });
const currency = (n) => new Intl.NumberFormat("ko-KR").format(n) + "원";
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <img :src="WalletImage" alt="지갑" class="h-28 w-28 object-contain" />

    <div class="text-slate-800">
      <div class="text-[18px]">이번 여행 기간 동안 <span class="font-bold">하루 평균</span></div>
      <div class="mt-1 text-[26px] font-extrabold tracking-tight">
        총 <span class="px-1 rounded bg-cyan-200/60">{{ currency(avg) }}</span>
      </div>
      <div class="text-[15px] mt-1">사용하셨어요!</div>
    </div>
  </div>
</template>
