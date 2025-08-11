<script setup>
import router from "@/router";
import NextButton from "@/components/common/buttons/NextButton.vue";
import TrippyLogo from "@/assets/svg/trippy-logo.svg";
</script>

<template>
  <div class="flex flex-col justify-between h-full">
    <div class="mt-[30%]">
      <div class="text-center title3">
        모임을 더 쉽고, 재밌게
        <br />
        함께 쓰고 같이 보는 모임통장
      </div>
      <TrippyLogo class="w-[18rem] h-auto mt-[5rem] mx-auto" />
    </div>
    <NextButton
      :title="'모임계좌 만들기'"
      :disabled="false"
      @click="router.push({ name: 'group-account-create-step1' })"
    />
  </div>
</template>

<style scoped></style>
