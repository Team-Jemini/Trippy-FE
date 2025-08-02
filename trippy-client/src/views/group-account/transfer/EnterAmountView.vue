<script setup>
import router from "@/router";
import AmountInputScreen from "@/components/account/AmountInputScreen.vue";

const onClick = () => {
  //api 연결할 때 금액 저장하는 스토어 호출에서 저장하기
  router.push({ name: "send-password" });
};
</script>

<template>
  <AmountInputScreen
    :isGroupAccount="true"
    :title="'얼마를 보낼까요?'"
    :type="'settle'"
    @next="onClick"
  />
</template>

<style scoped></style>
