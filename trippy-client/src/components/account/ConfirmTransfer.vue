<script setup>
import { defineEmits } from "vue";

import { Icon } from "@iconify/vue";
import NextButton from "@/components/common/NextButton.vue";
import { numberWithCommas } from "@/assets/utils/index.js";

const emit = defineEmits(["next"]);

const onClick = () => {
  emit("next");
};
</script>

<template>
  <div class="flex flex-col w-full h-full justify-between">
    <div class="flex flex-col grow gap-2 title2 text-center justify-center">
      <h3>내 국민은행 계좌로</h3>
      <h3>{{ `${numberWithCommas(100000)}원을` }}</h3>
      <h3>보낼까요?</h3>
    </div>

    <div class="flex flex-col gap-16">
      <div class="flex flex-col body2 gap-1 text-gray-500">
        <div class="flex justify-between">
          <p>받는 분에게 표시</p>
          <div class="flex gap-1 items-center">
            <p>홍길동</p>
            <Icon icon="material-symbols:arrow-forward-ios-rounded" class="size-3" />
          </div>
        </div>
        <div class="flex justify-between">
          <p>출금 계좌</p>
          <p>내 농협은행</p>
        </div>
        <div class="flex justify-between">
          <p>입금 계좌</p>
          <p>국민은행 123-2132-323</p>
        </div>
      </div>
      <NextButton
        title="보내기"
        :disabled="false"
        @click="onClick"
      />
    </div>
  </div>
</template>
