<script setup>
import { computed, onMounted, ref } from "vue";
import router from "@/router";

import NextButton from "@/components/common/buttons/NextButton.vue";
import { useSettleStore } from "@/stores/useSettleStore";
import { useRoute } from "vue-router";
import { useGroupAccountStore } from "@/stores/groupAccountStore";
import AmountInput from "@/components/account/group-account/AmountInput.vue";

const groupAccountStore = useGroupAccountStore();

const route = useRoute();
const accountId = computed(() => String(route.params.accountId));
const settleStore = useSettleStore();
const amount = ref("");

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
    <NextButton :title="'요청하기'" :disabled="!amount" @click="onClick" />
  </div>
</template>

<style scoped></style>
