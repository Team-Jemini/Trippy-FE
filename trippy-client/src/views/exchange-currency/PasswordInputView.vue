<script setup>
import { useRouter } from "vue-router";
import PasswordInput from "@/components/common/inputs/PasswordInput.vue";

const router = useRouter();
const goToFinishView = () => {
  router.push("/exchange-currency-finish");
};
</script>

<template>
  <PasswordInput @next="goToFinishView" />
</template>

<style></style>
