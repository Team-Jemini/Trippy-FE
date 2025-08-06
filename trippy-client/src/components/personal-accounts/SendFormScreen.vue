<script setup>
import { ref, watch } from "vue";
import AmountInput from "@/components/common/inputs/AmountInput.vue";
import SelectInput from "@/components/common/inputs/SelectInput.vue";
import NextButton from "@/components/common/NextButton.vue";

const account = ref("");
const bank = ref("");
const isAllFilled = ref(false);

const emit = defineEmits(["next"]);

const handleClick = () => {
  emit("next");
};

watch([account, bank], () => {
  isAllFilled.value =
    account.value.trim() !== "" &&
    bank.value.trim() !== "";
});
</script>

<template>
  <div class="flex flex-col w-full h-full justify-between">
    <div class="flex flex-col gap-8">
      <h2 class="title2">어떤 계좌로 보낼까요?</h2>
      <AmountInput v-model="account" type="account" />
      <SelectInput v-model="bank" />
    </div>
    <NextButton title="다음" :disabled="!isAllFilled" @click="handleClick" />
  </div>
</template>
