<script setup>
import { defineProps, defineEmits } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  title: String,
  modelValue: null, // v-model 대신 사용됨
});

const emit = defineEmits(["update:modelValue"]);

const select = (value) => {
  emit("update:modelValue", value);
};
</script>

<template>
  <div class="w-full my-2">
    <p class="subtitle2">{{ props.title }}</p>
    <div class="flex my-3">

      <div class="flex items-center w-[50%]" @click="select(false)">
        <Icon
          :icon="props.modelValue === false ? 'material-symbols:check-circle-rounded' : 'material-symbols:check-circle-outline-rounded'"
          class="size-8" :class="props.modelValue === false ? 'text-blue-500' : 'text-gray-400'" />
        <p class="ml-2">예</p>
      </div>

      <div class="flex items-center w-[50%]" @click="select(true)">
        <Icon
          :icon="props.modelValue === true ? 'material-symbols:check-circle-rounded' : 'material-symbols:check-circle-outline-rounded'"
          class="size-8" :class="props.modelValue === true ? 'text-blue-500' : 'text-gray-400'" />
        <p class="ml-2">아니요</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
