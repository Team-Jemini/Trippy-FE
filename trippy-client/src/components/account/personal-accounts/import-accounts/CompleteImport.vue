<script setup>
import { useRouter } from "vue-router";

import TrippyLogo from "@/assets/svg/trippy-logo.svg";
import NextButton from "@/components/common/buttons/NextButton.vue";

const router = useRouter();

const handleClick = () => {
  router.push("/");
}
</script>

<template>
  <div class="flex flex-col h-full items-center justify-center">
    <div class="w-full flex flex-col items-center gap-4">
      <TrippyLogo class="w-40" />
      <h3 class="title3">계좌 등록이 완료되었습니다!</h3>
    </div>
    <div class="fixed bottom-0 left-0 right-0 z-50 w-full max-w-full pt-4 pb-[34px] px-4 bg-white md:max-w-[375px] md:mx-auto">
      <NextButton title="확인" @click="handleClick" />
    </div>
  </div>
</template>
