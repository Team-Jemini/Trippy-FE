<script setup>
import router from "@/router";
import TrippyLogo from "@/assets/svg/trippy-logo.svg";
import NextButton from "@/components/common/NextButton.vue";
</script>

<template>
  <div class="flex flex-col h-full justify-between">
    <div class="flex flex-col items-center py-40">
      <TrippyLogo class="w-44 mb-4" />
      <p class="title1">정산 요청을 보냈습니다</p>
    </div>
    <NextButton :title="'완료'" @click="router.push({ name: 'home' })" />
  </div>
</template>

<style scoped></style>
