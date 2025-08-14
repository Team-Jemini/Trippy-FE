<script setup>
import router from "@/router";
import AmountInputScreen from "@/components/account/AmountInputScreen.vue";
import { onMounted, ref } from "vue";
import { useGroupAccountStore } from "@/stores/groupAccountStore";
import { useTransferStore } from "@/stores/transferStore";

const groupAccountStore = useGroupAccountStore();
const transferStore = useTransferStore();
const balance = ref(0);

const onClick = () => {
  //api 연결할 때 금액 저장하는 스토어 호출에서 저장하기
  transferStore.setGroupTransferInfo(
    groupAccountStore.groupAccountDetail.accountId,
    groupAccountStore.groupAccountDetail.accountName,
  );
  router.push({ name: "send-password" });
};

onMounted(() => {
  balance.value = groupAccountStore.groupAccountDetail.balance;
});
</script>

<template>
  <AmountInputScreen
    :isGroupAccount="true"
    :title="'얼마를 보낼까요?'"
    :type="'settle'"
    :balance="balance"
    @next="onClick"
  />
</template>

<style scoped></style>
