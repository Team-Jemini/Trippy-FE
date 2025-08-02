<script setup>
import router from "@/router";
import ConfirmTransfer from "@/components/account/ConfirmTransfer.vue";

const onClick = () => {
  router.push({ name: "send-complete" });
};
</script>

<template>
  <ConfirmTransfer @click="onClick" />
</template>
