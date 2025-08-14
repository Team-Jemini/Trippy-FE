<script setup>
import { Icon } from "@iconify/vue";
import NextButton from "@/components/common/buttons/NextButton.vue";
import { numberWithCommas } from "@/assets/utils/index.js";

import { useTransferStore } from "@/stores/transferStore.js";
import { postGroupTransfer, postTransfer } from "@/api/transfer.js";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const props = defineProps({
  mode: String,
});

const isPersonalAccountTransfer = route.path.startsWith("/personal-accounts/");

const transferStore = useTransferStore();
const emit = defineEmits(["next"]);

const handleClick = async () => {
  const title = props.mode === "add" ? "내 계좌 채우기" : "송금하기";
  const response = ref({});
  if (route.path.startsWith("/personal-accounts/")) {
    transferStore.setTitle(title);
    response.value = await postTransfer(transferStore.transferInfo);
    transferStore.transferResponse = response.value.data;
  } else {
    response.value = await postGroupTransfer(transferStore.groupTransferInfo);
    transferStore.transferResponse = response.value.data;
  }

  if (!response.value.data) {
    console.log("송금 실패");
    return;
  }
  emit("next");
};
</script>

<template>
  <div class="flex flex-col w-full h-full justify-between">
    <div class="flex flex-col grow gap-2 title2 text-center justify-center">
      <h3>
        {{ `${transferStore.transferInfo.toAccountId || transferStore.accountBank} 계좌로` }}
      </h3>
      <h3>
        {{
          isPersonalAccountTransfer
            ? `${numberWithCommas(transferStore.transferInfo.amount)}원을`
            : `${numberWithCommas(transferStore.groupTransferInfo.amount)}원씩`
        }}
      </h3>
      <h3>보낼까요?</h3>
    </div>

    <div class="flex flex-col gap-16">
      <div class="flex flex-col body2 gap-1 text-gray-500">
        <div class="flex justify-between">
          <p>받는 분에게 표시</p>
          <div class="flex gap-1 items-center">
            <p>
              {{
                route.path.startsWith("/personal-accounts/")
                  ? "강병현"
                  : transferStore.groupTransferInfo.fromAccountName
              }}
            </p>
            <Icon icon="material-symbols:arrow-forward-ios-rounded" class="size-3" />
          </div>
        </div>
        <div class="flex justify-between">
          <p>출금 계좌</p>
          <p>
            {{
              isPersonalAccountTransfer
                ? transferStore.transferInfo.fromAccountId
                : transferStore.groupTransferInfo.fromAccountId
            }}
          </p>
        </div>
        <div class="flex justify-between">
          <p>입금 계좌</p>
          <p>
            {{
              isPersonalAccountTransfer
                ? transferStore.transferInfo.toAccountId
                : `${transferStore.accountBank} 계좌`
            }}
          </p>
        </div>
      </div>
      <NextButton title="보내기" :disabled="false" @click="handleClick" />
    </div>
  </div>
</template>
