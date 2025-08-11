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
  <div class="ml-2 flex justify-center h-12 w-[21.4375rem]">
    <button class="flex items-center justify-between w-full h-full text-gray-600" @click="onClick">
      <div class="flex items-center gap-3 button1 text-black">
        <Icon
          v-if="!props.visible"
          icon="material-symbols:check-circle-outline-rounded"
          class="size-8 text-gray-400"
        />
        <Icon
          v-if="props.visible"
          icon="material-symbols:check-circle-rounded"
          class="size-8 text-blue-500"
        />
        {{ props.title }}
      </div>
      <div class="pr-2">
        <Icon icon="material-symbols:arrow-forward-ios-rounded" class="w-5 h-5 text-gray-400" />
      </div>
    </button>
  </div>
</template>

<style scoped></style>
