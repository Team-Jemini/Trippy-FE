<script setup>
import CardListItem from "./CardListItem.vue";

const props = defineProps({
  cards: { type: Array, required: true },
});
</script>

<template>
  <div class="flex flex-col gap-0 w-full">
    <CardListItem v-for="card in cards" :key="card.cardId" :card="card" />
  </div>
</template>
