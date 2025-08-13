<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import XButton from "@/assets/svg/x_button.svg";
import { getCardDetails, updateCardNickname } from "@/api/card";

const route = useRoute();
const router = useRouter();

//const userId = 1; // TODO: 스토어
const cardId = Number(route.params.id);

const nickname = ref("");
const isEdited = ref(false);

onMounted(async () => {
  try {
    const res = await getCardDetails();
    const list = res?.data && res.data.data ? res.data.data : [];
    const card = list.find((c) => c.cardId === cardId);
    if (card) {
      // 기본값: 기존 별명 있으면 별명, 없으면 카드명
      nickname.value = card.cardNickname || card.cardName || "";
    }
  } catch (e) {
    console.error("카드 상세 조회 실패", e?.response?.data ?? e);
  }
});

const handleInput = () => {
  isEdited.value = true;
};
const handleClear = () => {
  nickname.value = "";
  isEdited.value = false;
};

const handleConfirm = async () => {
  const value = nickname.value.trim();
  if (value.length === 0) return; // 필요 시 토스트
  try {
    await updateCardNickname(cardId, value);
    router.back(); // 돌아가면 SettingsView에서 목록 새로고침됨
  } catch (e) {
    console.error("별명 수정 실패", e?.response?.data ?? e);
  }
};
</script>

<template>
  <div class="w-[375px] mx-auto px-4 pt-8">
    <div class="relative">
      <input
        v-model="nickname"
        @input="handleInput"
        type="text"
        maxlength="20"
        :class="[
          'w-full h-12 border border-gray-300 rounded-xl px-4 py-3 pr-10 body1 focus:outline-none appearance-none',
          isEdited ? 'text-black' : 'text-gray-400',
        ]"
      />
      <button
        v-if="nickname"
        @click="handleClear"
        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        aria-label="입력 지우기"
      >
        <XButton class="w-5 h-5" />
      </button>
      <div class="absolute right-2 bottom-[-20px] text-gray-400 text-xs">
        {{ nickname.length }}/20
      </div>
    </div>

    <div class="w-full mt-10">
      <button
        @click="handleConfirm"
        class="w-full py-3 rounded-xl bg-main-gradient text-white font-semibold text-sm hover:opacity-90"
      >
        확인
      </button>
    </div>
  </div>
</template>
