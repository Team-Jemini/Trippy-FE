<script setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";

const isFocused = ref(false);
const searchedMember = defineModel();
</script>

<template>
  <div
    class="flex items-center bg-gray-100 rounded-xl h-13 gap-2"
    :class="isFocused ? 'border border-blue-400' : ''"
  >
    <Icon icon="material-symbols:search-rounded" class="size-6 ml-2" />
    <input
      type="text"
      placeholder="멤버 검색"
      v-model="searchedMember"
      class="w-full bg-gray-100 rounded-xl h-12"
      style="outline: none; border: none; box-shadow: none"
      @input="searchedMember = $event.target.value.trim()"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
  </div>
</template>

<style scoped></style>
