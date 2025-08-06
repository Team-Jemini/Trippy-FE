<script setup>
import { useRouter } from "vue-router";
import TrippyLogo from "@/assets/svg/trippy-logo.svg";
import NextButton from "@/components/common/NextButton.vue";

const router = useRouter();
const handleClick = () => {
  router.push("/payment");
};
</script>

<template>
  <div class="flex flex-col h-full justify-between">
    <!-- 상단 문구 및 로고 -->
    <div class="flex-1 flex items-center justify-center">
      <div class="flex flex-col items-center gap-4">
        <TrippyLogo class="w-64 h-36" />
        <h3 class="title4">카드 불러오기가 완료되었습니다.</h3>
      </div>
    </div>

    <NextButton title="확인" @click="handleClick" />
  </div>
</template>
