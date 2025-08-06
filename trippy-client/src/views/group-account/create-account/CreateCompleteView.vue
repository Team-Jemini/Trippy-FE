<script setup>
import { onMounted } from "vue";
import TrippyLogo from "@/assets/svg/trippy-logo.svg";
import NextButton from "@/components/common/NextButton.vue";

import { useGroupAccountStore } from "@/stores/groupAccountStore";
import { useGroupJoinStore } from "@/stores/groupAccountJoinStore";
import router from "@/router";

const groupAcountStore = useGroupAccountStore();
const groupJoinStore = useGroupJoinStore();

const shareToKakao = () => {
  groupJoinStore.shareToKakao();
};

onMounted(() => {
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);
  }

  groupAcountStore.setGroupAccountCreateDate();
});
</script>

<template>
  <div class="w-full h-full bg-white flex flex-col justify-between">
    <div>
      <TrippyLogo class="w-[24vh] mt-8 mx-auto" />
      <div class="border-b border-gray-300 w-full text-center mt-16 pb-5">
        <h1 class="title1">모임통장 개설완료</h1>
        <p class="body2 mt-2 mb-3 text-gray-500">이제 모임통장에 친구를 초대해보세요.</p>
      </div>
      <div class="flex justify-between w-full px-3 py-5 text-body2 border-b border-gray-300">
        <p>계좌</p>
        <div class="flex flex-col items-end">
          <p>{{ groupAcountStore.groupAccountName }}의 통장</p>
          <p>{{ groupAcountStore.groupAccountNumber }}</p>
        </div>
      </div>
      <div class="flex justify-between w-full px-3 py-5 text-body2 border-b border-gray-300">
        <p>모임통장 개설일</p>
        <div class="flex flex-col items-end">
          <p class="subtitle2">{{ groupAcountStore.groupAccountCreateDate }}</p>
        </div>
      </div>

      <div class="px-3 mt-6 flex justify-end">
        <button
          class="w-32 bg-[#FEE500] rounded-lg py-3 flex items-center justify-center gap-2"
          @click="shareToKakao"
        >
          <img src="@/assets/Kakao.png" alt="카카오톡 아이콘" class="h-5 w-5" />
          <span class="text-black font-semibold">초대하기</span>
        </button>
      </div>
    </div>

    <NextButton :title="'완료'" @click="router.push({ name: 'home' })" />
  </div>
</template>

<style scoped></style>
