<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
});
const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>

<template>
  <div class="flex flex-col gap-2 mt-4">
    <p class="body2 text-black px-1">{{ label }}</p>
    <input
      v-model="value"
      type="text"
      :placeholder="placeholder"
      :class="[
        'body2 w-full h-12 border border-gray-300 rounded-xl px-4',
        value ? 'text-black' : 'text-gray-400',
      ]"
    />
  </div>
</template>
