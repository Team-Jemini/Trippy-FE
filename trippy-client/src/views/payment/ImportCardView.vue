<script setup>
import { ref, computed } from "vue";

import Intro from "@/components/payment/import-cards/Intro.vue";
import Loading from "@/components/payment/import-cards/Loading.vue";
import Complete from "@/components/payment/import-cards/Complete.vue";

const views = [Intro, Loading, Complete];
const currentIndex = ref(0);
const currentView = computed(() => views[currentIndex.value]);

const goNext = () => {
  if (currentIndex.value < views.length - 1) {
    currentIndex.value++;
  }
};
</script>

<template>
  <main class="w-full h-full bg-white">
    <component :is="currentView" @next="goNext" />
  </main>
</template>
