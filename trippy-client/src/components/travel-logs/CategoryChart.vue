<script setup>
import { computed } from "vue";

const props = defineProps({
  // [{ name:'교통', amount: 138000 }, ...] 형식 (없어도 자동 보정)
  categories: { type: Array, required: true },
  // total이 0이거나 생략되면 합계로 계산
  total: { type: Number, required: true },
});

const CATEGORY_ORDER = ["교통", "숙박", "쇼핑", "먹거리", "문화여가"];
const PALETTE = {
  교통: "#38bdf8", // sky-400
  숙박: "#6366f1", // indigo-500
  쇼핑: "#10b981", // emerald-500
  먹거리: "#f59e0b", // amber-500
  문화여가: "#f43f5e", // rose-500
};

const currency = (n) => new Intl.NumberFormat("ko-KR").format(n);

// 넘어온 배열을 5개 고정으로 정규화
const normalized = computed(() => {
  const map = Object.fromEntries(props.categories.map((c) => [c.name, Number(c.amount) || 0]));
  return CATEGORY_ORDER.map((name) => ({
    name,
    amount: map[name] ?? 0,
    color: PALETTE[name],
  }));
});

const sumAmounts = computed(() => normalized.value.reduce((a, c) => a + c.amount, 0));
const denom = computed(() => (props.total > 0 ? props.total : sumAmounts.value) || 1);

// 도넛 그라디언트
const gradientStyle = computed(() => {
  let acc = 0;
  const parts = normalized.value.map((c) => {
    const pct = (c.amount / denom.value) * 100;
    const start = acc;
    const end = (acc += pct);
    return `${c.color} ${start}% ${end}%`;
  });
  return {
    backgroundImage: parts.length
      ? `conic-gradient(${parts.join(",")})`
      : "conic-gradient(#e2e8f0 0% 100%)",
  };
});

// 전설용(퍼센트 계산)
const list = computed(() =>
  normalized.value.map((c) => ({
    ...c,
    pct: Math.round((c.amount / denom.value) * 1000) / 10, // 0.1%
  })),
);
</script>

<template>
  <div>
    <div class="text-center text-[18px] font-bold text-slate-800">카테고리 별 소비 금액은</div>
    <div class="mt-1 text-center text-sm text-slate-500">총 {{ currency(denom) }} 원 중</div>

    <!-- 도넛 -->
    <div class="mt-6 grid place-items-center">
      <div class="relative size-64 rounded-full shadow-inner" :style="gradientStyle">
        <div class="absolute inset-8 rounded-full bg-white grid place-items-center text-center p-2">
          <div class="text-slate-500 text-xs">총액</div>
          <div class="text-slate-900 font-extrabold text-lg">{{ currency(denom) }} 원</div>
          <div class="mt-1 text-slate-500 text-xs">카테고리 5개</div>
        </div>
      </div>
    </div>

    <!-- 전설 -->
    <ul class="mx-auto mt-6 max-w-[360px] divide-y divide-slate-200 rounded-xl bg-white shadow">
      <li
        v-for="c in list"
        :key="c.name"
        class="flex items-center justify-between px-4 py-3 text-[15px]"
      >
        <div class="flex items-center gap-3">
          <span
            class="inline-block size-3 rounded-full"
            :style="{ backgroundColor: c.color }"
          ></span>
          <span class="text-slate-700">{{ c.name }}</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-slate-500 text-sm">{{ c.pct }}%</span>
          <span class="font-semibold">{{ currency(c.amount) }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
