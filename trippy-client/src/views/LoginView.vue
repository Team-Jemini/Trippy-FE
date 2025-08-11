<script setup>
import { useRouter } from "vue-router";
import PasswordInput from "@/components/common/inputs/PasswordInput.vue";

const router = useRouter();

const handleNext = () => {
  router.push("/");
};
</script>

<template>
  <PasswordInput current-page="login" @next="handleNext" />
</template>
