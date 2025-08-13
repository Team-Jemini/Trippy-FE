<script setup>
import { useRouter } from "vue-router";
import XButton from "@/assets/svg/x_button.svg";
import { Icon } from "@iconify/vue";

const props = defineProps({ card: Object });
const emit = defineEmits(["close", "set-main", "delete-card"]);
const router = useRouter();

const handleClose = () => emit("close");
const goToNicknamePage = () => {
  emit("close");
  router.push(`/payment/settings/${props.card.cardId}/nickname`); // ✅ cardId 사용
};
const emitSetMain = () => emit("set-main");
const emitDeleteCard = () => emit("delete-card");
</script>

<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-end z-50"
    @click.self="handleClose"
  >
    <div class="bg-white w-full rounded-t-xl p-6 max-w-[375px]">
      <div class="flex justify-between items-center mb-4">
        <div class="title4">{{ card.cardNickname || card.cardName }}</div>
        <!-- ✅ 필드 수정 -->
        <button @click="handleClose" aria-label="닫기 버튼">
          <XButton class="w-6 h-6" />
        </button>
      </div>

      <div class="text-sm text-gray-500 mb-4">{{ card.cardNumber ?? "****-****-****-****" }}</div>

      <ul class="divide-y divide-[#E5E8EB]">
        <li
          class="flex justify-between items-center py-4 text-base cursor-pointer"
          @click="goToNicknamePage"
        >
          <span>별명 설정</span>
          <Icon icon="material-symbols:chevron-right-rounded" class="text-gray-400 w-7 h-7" />
        </li>
        <li
          class="flex justify-between items-center py-4 text-base cursor-pointer"
          @click="emitSetMain"
        >
          <span>주카드 설정</span>
          <Icon icon="material-symbols:chevron-right-rounded" class="text-gray-400 w-7 h-7" />
        </li>
        <li
          class="flex justify-between items-center py-4 text-base text-red-200 cursor-pointer"
          @click="emitDeleteCard"
        >
          <span>카드 삭제</span>
          <Icon icon="material-symbols:chevron-right-rounded" class="text-gray-400 w-7 h-7" />
        </li>
      </ul>
    </div>
  </div>
</template>
