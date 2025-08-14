<script setup>
import receiptBg from "@/assets/svg/receipt.svg?url";

const props = defineProps({
  amount: { type: Number, required: true },
  date: { type: String, required: true },
  merchant: { type: String, required: true },
});
const currency = (n) => new Intl.NumberFormat("ko-KR").format(n) + "원";
</script>

<template>
  <div class="rounded-2xl bg-gradient-to-b from-sky-100 to-indigo-100 p-4 shadow-inner">
    <div class="text-center text-[15px] font-semibold text-slate-700">
      이번 여행에서 가장 큰소비는
    </div>

    <div class="mt-4">
      <div class="relative mx-auto w-[260px]">
        <!-- 배경 이미지 -->
        <img
          :src="receiptBg"
          alt=""
          aria-hidden="true"
          class="w-full h-auto select-none pointer-events-none"
        />

        <!-- 오버레이 내용 -->
        <div class="absolute inset-0 px-5 py-4 text-center">
          <div class="text-slate-400 text-sm">Receipt</div>
          <div class="mt-2 w-full rounded-xl border-2 border-dashed border-slate-300 p-4">
            <div class="mt-2 flex items-center justify-between text-slate-600">
              <span>가격</span>
              <span class="text-2xl font-extrabold text-slate-900">
                {{ currency(amount) }}
              </span>
            </div>
            <div class="mt-1 flex items-center justify-between text-slate-600">
              <span>날짜</span>
              <span>{{ date }}</span>
            </div>
            <div class="mt-3 text-[12px] font-semibold text-slate-700">
              {{ merchant }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
