<script setup>
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(["resendCode"]);

const onInput = (e) => {
  emit("update:modelValue", e.target.value.replace(/[^0-9]/g, ""));
};

const handleClick = () => {
  emit("update:modelValue", "");
  emit('resendCode');
};
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex justify-between">
      <span class="body2 text-gray-500">인증번호</span>
      <span class="body2 text-red-200">남은시간 03:00</span>
    </div>
    <div class="relative">
      <input
        type="text"
        :value="modelValue"
        maxlength="6"
        class="w-full h-12 p-4 rounded-xl bg-gray-100"
        placeholder="인증번호를 입력하세요"
        @input="onInput"
      />
      <button
        @click="handleClick"
        class="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 hover:bg-gray-200 p-1 rounded-lg"
      >
        재전송
      </button>
    </div>
  </div>
</template>
