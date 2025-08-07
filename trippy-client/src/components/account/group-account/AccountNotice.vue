<script setup>
import { defineProps } from "vue";

const props = defineProps({
  title: String,
});
</script>

<template>
  <div class="flex justify-center items-center w-[18rem] mx-auto caption1 text-gray-500">
    {{ props.title }}
  </div>
</template>

<style scoped></style>
