<script setup>
import router from "@/router";
import { useGroupJoinStore } from "@/stores/groupAccountJoinStore";
import TrippyLogo from "@/assets/svg/trippy-logo.svg";
import NextButton from "@/components/common/NextButton.vue";
import { onMounted, ref } from "vue";

const joinStore = useGroupJoinStore();
const groupAccountName = ref("");
const joinDateTime = ref("");

onMounted(() => {
  groupAccountName.value = joinStore.groupAccountName;
  joinDateTime.value = joinStore.joinDateTime;
});
</script>

<template>
  <div class="flex flex-col h-full justify-between w-full items-center">
    <div class="flex flex-col items-center mt-28 w-full">
      <TrippyLogo class="w-40" />
      <div class="title1 text-center mt-8">
        <p>{{ groupAccountName }}의 모임에</p>
        <p>참여하기가 완료되었습니다.</p>
      </div>
      <div class="flex justify-between w-full body1 px-5 border-b border-b-gray400 mt-28">
        <p>모임명</p>
        <p class="mb-3">{{ groupAccountName }}</p>
      </div>
      <div class="flex justify-between w-full body1 px-5 border-b border-b-gray400 mt-3">
        <p>가입일</p>
        <p class="mb-3">{{ joinDateTime }}</p>
      </div>
    </div>
    <NextButton :title="'완료'" @click="router.push({ name: 'home' })" />
  </div>
</template>

<style scoped></style>
