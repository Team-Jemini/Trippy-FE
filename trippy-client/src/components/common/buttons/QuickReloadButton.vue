<script setup>
import { defineEmits } from "vue";
import { Icon } from "@iconify/vue";

const emits = defineEmits(["reload"]);
const onClick = () => {
  emits("reload");
};
</script>

<template>
  <div>
    <button
      @click="onClick"
      class="flex items-center gap-2 px-4 py-3 bg-main-gradient text-white rounded-full shadow-md hover:opacity-90 transition"
    >
      <Icon icon="material-symbols:refresh-rounded" class="w-6 h-6" />
      <span class="button2 text-white">내역 불러오기</span>
    </button>
  </div>
</template>
