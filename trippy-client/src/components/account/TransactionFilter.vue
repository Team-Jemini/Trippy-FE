<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  filter: String,
});

const emit = defineEmits(["update:filter"]);
</script>

<template>
  <select
    :value="props.filter"
    @change="(e) => emit('update:filter', e.target.value)"
    class="w-fit bg-transparent ml-[-0.5rem] body1 text-gray-500"
  >
    <option value="all">전체</option>
    <option value="deposit">입금</option>
    <option value="withdraw">출금</option>
  </select>
</template>
