<script setup>
import PasswordInput from "@/components/common/inputs/PasswordInput.vue";
import router from "@/router";

const onClick = () => {
  //송금하기 로직 실행 붙이기
  router.push({ name: "send-transfer-review" });
};
</script>

<template>
  <div class="h-full">
    <PasswordInput @next="onClick" />
  </div>
</template>

<style scoped></style>
