<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import XButton from "@/assets/svg/x_button.svg";

const cards = [
  { id: "1", name: "KB국민카드_트래블러스" },
  { id: "2", name: "신한카드_청년수당 S20" },
  { id: "3", name: "하나카드_트래블로그" },
  { id: "4", name: "카카오카드" },
  { id: "5", name: "농협카드" },
];

const route = useRoute();
const router = useRouter();
const cardId = route.params.id;

const nickname = ref("");
const isEdited = ref(false); // 입력 시작 여부를 추적

onMounted(() => {
  const card = cards.find((c) => c.id === cardId);
  if (card) {
    nickname.value = card.name;
  }
});

const handleInput = () => {
  isEdited.value = true;
};

const handleClear = () => {
  nickname.value = "";
  isEdited.value = false;
};

const handleConfirm = () => {
  console.log("새 별명:", nickname.value);
  router.back();
};
</script>

<template>
  <div class="w-[375px] mx-auto px-4 pt-8">
    <!-- 입력창 -->
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
      <!-- x 아이콘 버튼 교체 -->
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

    <!-- 확인 버튼 -->
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
