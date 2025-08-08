<script setup>
import { defineEmits } from "vue";

const props = defineProps({
  title: String,
  disabled: Boolean,
  to: String,
  onClick: Function,
  isRounded: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(["click"]);

function handleClick() {
  emit("click");
}
</script>

<template>
  <button
    :class="[
      props.disabled ? 'bg-gray-400' : 'bg-main-gradient',
      { 'rounded-xl': props.isRounded !== false }
      ]"
    :disabled="props.disabled"
    class="text-gray-100 button1 flex justify-center items-center text-center h-12 w-full"
    @click="handleClick"
  >
    {{ props.title }}
  </button>
</template>
