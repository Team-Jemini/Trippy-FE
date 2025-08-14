<template>
  <div class="relative min-h-screen bg-white">
    <!-- 세로 빨간선 -->
    <div class="pointer-events-none absolute inset-y-0 left-16 w-[1.5px] bg-rose-300/60"></div>
    <!-- 공책 라인 배경 -->
    <div
      class="pointer-events-none absolute inset-0 [background:repeating-linear-gradient(0deg,theme(colors.transparent),theme(colors.transparent)_31px,theme(colors.slate.200/_60%)_32px)]"
    ></div>

    <div class="relative">
      <slot />
    </div>
  </div>
</template>
<script setup></script>
