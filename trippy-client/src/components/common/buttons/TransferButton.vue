<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  type: String,
});

const emit = defineEmits(["click"]);
</script>

<template>
  <button
    @click="emit('click')"
    class="w-full h-12 button1 rounded-xl"
    :class="[type==='add' ? 'bg-blue-200 text-blue-400' : 'bg-main-gradient text-white']"
  >
    {{ type === "add" ? "채우기" : "보내기" }}
  </button>
</template>
