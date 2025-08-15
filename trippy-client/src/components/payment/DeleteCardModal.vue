<script setup>
const props = defineProps({ card: Object });
const emit = defineEmits(["close", "confirm"]);

const handleClose = () => emit("close");
const handleConfirm = () => emit("confirm");
</script>

<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
    @click.self="handleClose"
  >
    <div class="bg-white w-[280px] rounded-xl px-5 py-6 text-center">
      <div class="subtitle1 mb-1">카드 삭제</div>
      <div class="caption3 text-gray-400 mb-1">
        {{ card.cardNickname || card.cardName }} {{ card.cardNumber }}
      </div>
      <p class="caption2 text-gray-500 mb-6 leading-relaxed">계속 진행할까요?</p>
      <div class="flex gap-2">
        <button
          @click="handleClose"
          class="flex-1 py-2 rounded-lg bg-gray-300 text-sm text-gray-600 font-medium"
        >
          취소
        </button>
        <button
          @click="handleConfirm"
          class="flex-1 py-2 rounded-lg bg-main-gradient text-white font-semibold text-sm hover:opacity-90"
        >
          삭제하기
        </button>
      </div>
    </div>
  </div>
</template>
