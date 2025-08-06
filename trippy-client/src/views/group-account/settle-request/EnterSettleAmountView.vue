<script setup>
import { ref } from "vue";
import router from "@/router";
import AmountInput from "@/components/common/inputs/AmountInput.vue";
import NextButton from "@/components/common/NextButton.vue";
import { useSettleStore } from "@/stores/useSettleStore";

const settleStore = useSettleStore();
const amount = ref("");

const onClick = () => {
  settleStore.setSettleAmount(amount.value);
  router.push({ name: "group-settle-complete" });
};
</script>

<template>
  <div class="flex flex-col w-full h-full justify-between">
    <div class="flex flex-col flex1 items-center items-center py-24">
      <div class="">
        <p class="title2">얼마를 요청할까요?</p>
      </div>

      <AmountInput v-model="amount" />
    </div>
    <NextButton :title="'요청하기'" :disabled="!amount" @click="onClick" />
  </div>
</template>

<style scoped></style>
