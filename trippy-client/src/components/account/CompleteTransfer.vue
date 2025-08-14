<script setup>
import { defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";
import TrippyLogo from "@/assets/svg/trippy-logo.svg";
import NextButton from "@/components/common/buttons/NextButton.vue";
import { numberWithCommas } from "@/assets/utils/index.js";

import { useTransferStore } from "@/stores/transferStore.js";

const props = defineProps({
  type: {
    type: String,
    required: Boolean,
  },
});

const transferStore = useTransferStore();
const router = useRouter();
const route = useRoute();
const isPersonalAccountTransfer = route.path.startsWith("/personal-accounts/");

const onClick = () => {
  transferStore.reset(); // 초기화
  router.push("/");
};
</script>

<template>
  <div class="flex flex-col w-full h-full justify-between">
    <div class="flex flex-col grow gap-8 title2 items-center justify-center mb-4">
      <TrippyLogo class="w-40" />
      <h3 v-if="props.type === 'settle'">정산 요청을 보냈어요!</h3>
      <div v-else class="flex flex-col gap-2 items-center">
        <h3>
          {{ `${transferStore.transferInfo.toAccountId || transferStore.accountBank} 계좌로` }}
        </h3>
        <h3>
          {{
            isPersonalAccountTransfer
              ? `${numberWithCommas(transferStore.transferResponse.amount || 0)}원을`
              : `총 ${numberWithCommas(transferStore.transferResponse.amount || 0)}원을`
          }}
        </h3>
        <h3>보냈어요</h3>
      </div>
    </div>
    <NextButton :title="'완료'" @click="onClick" />
  </div>
</template>

<style scoped></style>
