<script setup>
import { defineProps, defineEmits } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  title: String,
});
const emits = defineEmits(["click"]);
const onClick = () => {
  emits("click");
};
</script>
<template>
  <div class="flex justify-center h-12 w-full rounded-[0.625rem]">
    <button
      class="flex items-center justify-between h-12 w-full rounded-[0.625rem] text-white button1"
      @click="onClick"
    >
      <div class="flex items-center gap-2 button1">
        <Icon icon="material-symbols:check-circle-outline-rounded" class="size-7 pl-2 w-9" />
        {{ props.title }}
      </div>
      <div class="pr-2">
        <Icon icon="material-symbols:arrow-forward-ios-rounded" class="w-4 h-4" />
      </div>
    </button>
  </div>
</template>
<style scoped></style>
