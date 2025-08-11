<script setup>
import { defineProps, defineEmits } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  title: String,
  visible: Boolean,
});
const emits = defineEmits(["click"]);
const onClick = () => {
  emits("click");
};
</script>

<template>
  <div class="flex justify-center h-12 w-[21.4375rem]">
    <div class="flex justify-center h-10 w-80 rounded-[0.625rem]">
      <button class="flex items-center justify-between w-96 rounded-[0.625rem] text-gray-500" @click="onClick">
        <div class="flex items-center gap-2 caption3">
          <Icon
            :icon="props.visible ? 'material-symbols:check-circle-rounded' : 'material-symbols:check-circle-outline-rounded'"
            :class="props.visible ? 'text-blue-400' : 'gray-400'" class="size-5" />
          {{ props.title }}
        </div>
        <div class=" pr-2">
          <Icon icon="material-symbols:arrow-forward-ios-rounded" class="w-4 h-4 text-gray-500" />
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped></style>
