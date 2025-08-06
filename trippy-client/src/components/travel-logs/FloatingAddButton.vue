<!-- FloatingAddButton.vue -->

<script setup>
import { Icon } from "@iconify/vue";

defineEmits(["click"]);
</script>

<template>
  <button
    class="absolute right-5 bottom-24 z-30 bg-blue-500 hover:bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg text-3xl flex items-center justify-center"
    @click.stop="$emit('click')"
  >
    <Icon icon="material-symbols:add-2-rounded" class="w-8 h-8" />
  </button>
</template>
