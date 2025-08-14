<script setup>
import { computed } from "vue";
import Badge from "./Badge.vue";

const props = defineProps({
  tripNumber: { type: Number, default: 1 },
  days: { type: Number, required: true },
  destination: { type: String, required: true },
});

const tripNumberLabel = computed(() => `${props.tripNumber}`);
</script>

<template>
  <div>
    <div class="inline-flex items-center gap-2">
      <div
        class="grid place-items-center rounded-xl bg-rose-50 px-3 py-1 text-rose-500 font-bold shadow-sm"
      >
        {{ tripNumberLabel }}
      </div>
      <h2 class="text-xl font-extrabold tracking-tight text-slate-800">번째 여행로그</h2>
    </div>
    <div class="mt-3 flex items-center gap-2 text-[20px] leading-tight font-semibold">
      <Badge> {{ days }}일 </Badge>
      <span class="text-slate-600">동안</span>
      <Badge tone="slate"> {{ destination }} </Badge>
      <span class="text-slate-600">여행하셨네요</span>
    </div>
  </div>
</template>
