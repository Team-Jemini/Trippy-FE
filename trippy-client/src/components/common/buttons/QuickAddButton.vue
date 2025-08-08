<script setup>
import { defineEmits } from "vue";
import { Icon } from "@iconify/vue";

const emit = defineEmits(["click"]);

const onClick = () => {
  emit("click");
};
</script>

<template>
  <div class="bg-main-gradient w-[4rem] h-[4rem] rounded-full flex items-center justify-center">
    <button @click="onClick">
      <Icon icon="material-symbols:add-2-rounded" class="size-10 text-white" />
    </button>
  </div>
</template>

<style scoped></style>
