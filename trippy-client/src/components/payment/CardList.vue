<script setup>
import CardListItem from "./CardListItem.vue";

const props = defineProps({
  cards: { type: Array, required: true },
});
const emit = defineEmits(["refresh"]);
</script>

<template>
  <div class="flex flex-col gap-0 w-full">
    <CardListItem
      v-for="card in cards"
      :key="card.cardId"
      :card="card"
      @refresh="$emit('refresh')"
    />
  </div>
</template>
