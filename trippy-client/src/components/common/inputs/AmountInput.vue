<script setup>
import { ref } from "vue";
import { numberWithCommas } from "@/assets/utils/index.js";

const props = defineProps({
  type: {
    type: String,
    required: false,
    default: "amount"
  }
});

const inputValue = defineModel();

const hiddenInput = ref(null);
const isFocused = ref(false);

const onInput = (event) => {
  if (props.type === "account") {
    inputValue.value = event.target.value
      .replace(/[^0-9]/g, "")
      .replace(/^0+/, "");

    return;
  }

  inputValue.value = event.target.value
    .replace(/[^0-9]/g, "")
    .replace(/^0+/, "")
    .slice(0, 10);
};

const focusInput = () => {
  hiddenInput.value?.focus();
};
</script>

<template>
  <div @click="focusInput" class="w-full flex justify-center">
    <div
      :class="[
        'w-full h-full py-2 border-b',
        isFocused ? 'border-b-blue-500' : 'border-b-gray-400',
      ]"
    >
      <div
        v-if="props.type==='amount'"
        :class="['title4 text-center', inputValue ? 'text-gray-600' : 'text-gray-400']"
      >
        <p>{{ inputValue ? `${numberWithCommas(inputValue)} 원` : "금액을 입력해 주세요" }}</p>
      </div>

      <div
        v-else
        :class="['title4', inputValue ? 'text-gray-600' : 'text-gray-400']"
      >
        <p>{{ inputValue || "계좌번호 입력" }}</p>
     </div>

      <input
        type="text"
        inputmode="numeric"
        pattern="[0-9]*"
        class="sr-only"
        v-model="inputValue"
        @input="onInput"
        ref="hiddenInput"
        readonly
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
    </div>
  </div>
</template>

<style scoped></style>
