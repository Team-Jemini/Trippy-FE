<script setup>
import { useRouter } from "vue-router";
import CompleteJoin from "@/assets/svg/complete-join.svg";
import NextButton from "@/components/common/NextButton.vue";

const router = useRouter();
</script>

<template>
  <div class="flex flex-col w-full h-full justify-between">
    <div class="flex flex-col grow gap-8 title2 items-center justify-center mb-4">
      <CompleteJoin />
      <h3 class="title3">Trippy 가입이 완료되었습니다.</h3>
      <div class="body1 text-gray-500 flex flex-col gap-1 items-center">
        <h3>비밀번호 6자리로</h3>
        <h3>빠르고 간편하게 인증하세요</h3>
      </div>
    </div>
    <NextButton :title="'완료'" @click="router.push('/')" />
  </div>
</template>
