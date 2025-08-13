<template>
  <span :class="classes"><slot /></span>
</template>
<script setup>
import { computed } from "vue";
const props = defineProps({ tone: { type: String, default: "emerald" } });
const toneMap = {
  emerald: "bg-emerald-100 text-emerald-600",
  slate: "bg-slate-100 text-slate-600",
  sky: "bg-sky-100 text-sky-600",
};
const classes = computed(
  () =>
    `inline-flex items-center rounded-lg px-2.5 py-1 text-[18px] font-bold ${toneMap[props.tone] || toneMap.emerald}`,
);
</script>
