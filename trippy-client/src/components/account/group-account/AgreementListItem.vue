<script setup>
import { defineProps } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  title: String,
});
</script>

<template>
  <div class="flex justify-center items-center justify-between h-7 w-[21.4375rem]">
    <div class="flex items-center gap-2 caption1">
      <Icon icon="iconamoon:check-duotone" class="size-4 pl-2 w-9 text-gray-400" />
      {{ props.title }}
    </div>
    <div class="pr-2">
      <Icon icon="material-symbols:arrow-forward-ios-rounded" class="w-4 h-4 mr-2 text-gray-400" />
    </div>
  </div>
</template>

<style scoped></style>
