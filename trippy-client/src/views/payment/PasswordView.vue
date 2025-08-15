<script setup>
import { useRouter } from "vue-router";
import PasswordInput from "@/components/common/inputs/PasswordInput.vue";

const router = useRouter();

const handleNext = () => {
  router.push({ path: "/payment", query: { authenticated: "true" } });
};
</script>

<template>
  <PasswordInput @next="handleNext" />
</template>
