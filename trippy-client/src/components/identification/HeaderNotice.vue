<script setup>
import { computed } from "vue";

const props = defineProps({
  text: { type: String, required: true },
});
</script>

<template>
  <div
    class="bg-header-gradient w-full text-white flex flex-col caption4 py-1 rounded-t-xl overflow-hidden select-none"
  >
    <div class="marquee">
      <span class="marquee__content">
        {{ text }}
      </span>
      <!-- 복제본: 시각적으로만 필요, 스크린리더는 무시 -->
      <span class="marquee__content" aria-hidden="true">
        {{ text }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  display: flex;
  gap: 2rem;
  white-space: nowrap;
}

.marquee__content {
  display: inline-flex;
  padding-right: 2rem;
  flex: 0 0 auto;
  min-width: 100%;
  animation: marquee-scroll 12s linear infinite;
  will-change: transform;
}

@keyframes marquee-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
