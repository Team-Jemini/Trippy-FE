<script setup>
import { Icon } from "@iconify/vue";
import NextButton from "@/components/common/buttons/NextButton.vue";
import { numberWithCommas } from "@/assets/utils/index.js";

import { useTransferStore } from "@/stores/transferStore.js";
import { postTransfer } from "@/api/transfer.js";
import { onMounted } from "vue";

const props = defineProps({
  mode: String,
});

const transferStore = useTransferStore();
const emit = defineEmits(["next"]);

const handleClick = async () => {
  const title = props.mode === "add" ? "내 계좌 채우기" : "송금하기";
  transferStore.setTitle(title);

  const response = await postTransfer(2, transferStore.transferInfo);

  if (!response.data) {
    console.log("송금 실패");
    return;
  }
  emit("next");
};

onMounted(() => {
  transferStore.setFromAccountId("3333-02-654321");
  console.log(transferStore.accounBank);
});
</script>

<template>
  <div class="flex flex-col w-full h-full justify-between">
    <div class="flex flex-col grow gap-2 title2 text-center justify-center">
      <h3>{{`${transferStore.accountBank || ""} 계좌로`}}</h3>
      <h3>{{ `${numberWithCommas(transferStore.transferInfo.amount || 0)}원을` }}</h3>
      <h3>보낼까요?</h3>
    </div>

    <div class="flex flex-col gap-16">
      <div class="flex flex-col body2 gap-1 text-gray-500">
        <div class="flex justify-between">
          <p>받는 분에게 표시</p>
          <div class="flex gap-1 items-center">
            <p>이소정</p>
            <Icon icon="material-symbols:arrow-forward-ios-rounded" class="size-3" />
          </div>
        </div>
        <div class="flex justify-between">
          <p>출금 계좌</p>
          <p>{{`${transferStore.transferInfo.fromAccountId || ""}`}}</p>
        </div>
        <div class="flex justify-between">
          <p>입금 계좌</p>
          <p>{{`${transferStore.accountBank || ""} ${transferStore.transferInfo.toAccountId || ""}`}}</p>
        </div>
      </div>
      <NextButton
        title="보내기"
        :disabled="false"
        @click="handleClick"
      />
    </div>
  </div>
</template>
