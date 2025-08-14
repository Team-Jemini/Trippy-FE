<script setup>
const props = defineProps({ total: { type: Number, required: true } });
const currency = (n) => new Intl.NumberFormat("ko-KR").format(n) + "원";
</script>

<template>
  <div class="relative overflow-hidden rounded-2xl bg-main-gradient p-5 shadow-md text-white">
    <div class="text-[15px] opacity-95">이번 여행에서 소비한 금액은</div>
    <div class="mt-1 text-sm/none opacity-90">총 {{ currency(total) }}</div>
    <!-- <div class="absolute right-3 top-3">
      <div class="grid place-items-center rounded-xl bg-white/15 p-2">
        <div class="text-[10px]">365</div>
      </div>
    </div> -->
  </div>
</template>
