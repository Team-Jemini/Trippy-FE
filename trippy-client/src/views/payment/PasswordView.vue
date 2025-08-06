<script setup>
import { useRouter } from "vue-router";
import PasswordInput from "@/components/common/inputs/PasswordInput.vue";

const router = useRouter();

const handleNext = () => {
  // query param으로 인증 여부 전달
  router.push({ path: "/payment", query: { authenticated: "true" } });
};
</script>

<template>
  <PasswordInput @next="handleNext" />
</template>
