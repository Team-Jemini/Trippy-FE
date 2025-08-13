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
    <option value="ALL">전체</option>
    <option value="DEPOSIT">입금</option>
    <option value="WITHDRAW">출금</option>
  </select>
</template>
