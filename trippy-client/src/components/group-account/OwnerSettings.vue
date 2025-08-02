<script setup>
import { Icon } from "@iconify/vue";
import { defineProps, onMounted } from "vue";
import ToggleSwitch from "../common/ToggleSwitch.vue";
import router from "@/router";
import { useGroupJoinStore } from "@/stores/groupAccountJoinStore";

const props = defineProps({
  account: Object,
  member: Array,
});

const groupJoinStore = useGroupJoinStore();

const shareToKakao = () => {
  groupJoinStore.shareToKakao();
};

onMounted(() => {
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);
  }
});
</script>

<template>
  <div class="w-full h-full overflow-scroll [&::-webkit-scrollbar]:hidden">
    <div class="flex flex-col gap-2 border-b border-b-gray-400 pb-3 px-2">
      <div class="caption2">
        {{ `${props.account.accountBank}  ${props.account.accountNumber}` }}
      </div>
      <div class="subtitle1">{{ `${props.account.accountName}의 계좌` }}</div>
    </div>
    <div class="flex flex-col gap-2 my-4 px-2">
      <div class="flex gap-14 caption1">
        <p>상품명</p>
        <p>입출금 통장</p>
      </div>
      <div class="flex gap-14 caption1">
        <p>개설일</p>
        <p>{{ props.account.createDate }}</p>
      </div>
      <div class="flex gap-9 caption1">
        <p>모임시작일</p>
        <p>{{ props.account.createDate }}</p>
      </div>
      <div class="flex gap-11 caption1">
        <p>적용금리</p>
        <p>연 0.10%</p>
      </div>
    </div>

    <div class="bg-gray-200 caption1 py-1 px-2">모임설정</div>
    <div class="flex justify-between caption1 py-4 border-b border-b-gray-300 px-2">
      <p class="">모임멤버</p>
      <div class="flex items-center">
        {{ `(${member.length}명)` }}
        <Icon
          icon="material-symbols:arrow-back-ios-new-rounded"
          class="rotate-180"
          @click="router.push({ name: 'group-account-members' })"
        />
      </div>
    </div>
    <div class="flex justify-between caption1 py-4 border-b border-b-gray-300 px-2">
      <p class="flex items-center">친구초대</p>
      <div class="px-3 flex justify-end">
        <button
          class="w-32 bg-[#FEE500] rounded-lg py-3 flex items-center justify-center gap-2"
          @click="shareToKakao"
        >
          <img src="@/assets/Kakao.png" alt="카카오톡 아이콘" class="h-5 w-5" />
          <span class="text-black font-semibold">초대하기</span>
        </button>
      </div>
    </div>
    <div class="flex justify-between items-center caption1 py-3 border-b border-b-gray-300 px-2">
      <p>모임알림</p>
      <ToggleSwitch />
    </div>
    <div class="flex justify-between items-center caption1 py-3 border-b border-b-gray-300 px-2">
      <p>입출금 알림</p>
      <ToggleSwitch />
    </div>
    <div class="flex justify-between caption1 py-4 px-2">
      <p class="">모임 통장 사용 종료</p>
      <Icon icon="material-symbols:arrow-back-ios-new-rounded" class="rotate-180" />
    </div>

    <div class="bg-gray-200 caption1 py-1 px-2 ㅈ-[375px]">조회/다운로드</div>
    <div class="flex justify-between caption1 py-4 border-b border-b-gray-300 px-2">
      <p class="">통장사본</p>
      <Icon icon="material-symbols:arrow-back-ios-new-rounded" class="rotate-180" />
    </div>
    <div class="flex justify-between caption1 py-4 border-b border-b-gray-300 px-2">
      <p class="">거래내역 다운로드</p>
      <Icon icon="material-symbols:arrow-back-ios-new-rounded" class="rotate-180" />
    </div>
    <div class="flex justify-between caption1 py-4 px-2">
      <p class="">가입서류</p>
      <Icon icon="material-symbols:arrow-back-ios-new-rounded" class="rotate-180" />
    </div>

    <div class="bg-gray-200 caption1 py-1 px-2">설정</div>
    <div class="flex justify-between caption1 py-4 border-b border-b-gray-300 px-2">
      <p class="">계좌 비밀번호 재설정</p>
      <Icon icon="material-symbols:arrow-back-ios-new-rounded" class="rotate-180" />
    </div>
  </div>
</template>

<style scoped></style>
