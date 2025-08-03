<script setup>
import { ref, computed } from "vue";

import InputForm from "@/components/personal-accounts/import-accounts/InputForm.vue";
import SMSCertification from "@/components/personal-accounts/import-accounts/SMSCertification.vue";

const views = [
  { component: InputForm },
  { component: SMSCertification },
];
const currentIndex = ref(0);

const currentView = computed(() => views[currentIndex.value]);

function goNext() {
  if (currentIndex.value < views.length - 1) {
    currentIndex.value++;
  }
}
</script>

<template>
  <main class="w-full bg-white h-full">
    <component
      :is="currentView.component"
      v-bind="currentView.props"
      @next="goNext"
    />
  </main>
</template>
