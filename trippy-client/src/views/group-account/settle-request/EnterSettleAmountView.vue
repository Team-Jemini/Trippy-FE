<script setup>
import { computed, onMounted, ref } from "vue";
import router from "@/router";

import NextButton from "@/components/common/buttons/NextButton.vue";
import { useSettleStore } from "@/stores/useSettleStore";
import { useRoute } from "vue-router";
import { useGroupAccountStore } from "@/stores/groupAccountStore";
import AmountInput from "@/components/common/inputs/AmountInput.vue";
import NumberKeypad from "@/components/common/NumberKeypad.vue";

const groupAccountStore = useGroupAccountStore();

const route = useRoute();
const accountId = computed(() => String(route.params.accountId));
const settleStore = useSettleStore();
const amount = ref("");

const onPressKey = (num) => {
  if (amount.value.length >= 10) return;

  if (amount.value === "0") {
    amount.value = String(num);
  } else {
    amount.value += String(num);
  }

  console.log(amount.value);
};

const onDelete = () => {
  if (!amount.value) return;
  amount.value = amount.value.slice(0, -1);
};

const onClick = async () => {
  settleStore.setSettleAmount(amount.value);
  await settleStore.settlementRequst(accountId, groupAccountStore.groupAccountDetail.accountName);
  if (settleStore.isRequestSuccess) {
    router.push({ name: "group-settle-complete", params: { accountId: accountId.value } });
  }
};

onMounted(async () => {
  if (groupAccountStore.groupAccountDetail == null) {
    await groupAccountStore.getGroupAccountDetail(accountId.value);
  }
});
</script>

<template>
  <div class="flex flex-col w-full h-full justify-between">
    <div class="flex flex-col flex1 items-center items-center py-24">
      <div class="">
        <p class="title2">얼마를 요청할까요?</p>
      </div>

      <AmountInput v-model="amount" />
    </div>
    <div class="mx-[-1rem] mb-2">
      <NextButton :title="'요청하기'" :disabled="!amount" :isRounded="false" @click="onClick" />
    </div>
    <NumberKeypad @press-key="onPressKey" @delete="onDelete" type="amount" />
  </div>
</template>

<style scoped></style>
