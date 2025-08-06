<script setup>
import { defineEmits } from "vue";
import TrippyLogo from "@/assets/svg/trippy-logo.svg";
import NextButton from "@/components/common/buttons/NextButton.vue";

const emit = defineEmits(["next"]);
</script>

<template>
  <div class="flex flex-col h-full justify-between">
    <div class="flex flex-col gap-2 mt-10">
      <h1 class="title2">내 자산을 한눈에 확인해요!</h1>
      <p class="body1">간편하게 내 계좌 목록을 불러올 수 있어요.</p>
    </div>
    <div class="w-full flex justify-center">
      <TrippyLogo class="w-36" />
    </div>
    <NextButton title="계좌 불러오기" :disabled="false" @click="emit('next')" />
  </div>
</template>
