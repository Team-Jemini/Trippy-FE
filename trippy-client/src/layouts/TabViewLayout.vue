<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import TabMenu from "@/components/common/TabMenu.vue";

const route = useRoute();
const currentTab = ref("");

watch(
  () => route.meta.tabs,
  (newTabs) => {
    if (newTabs && newTabs.length > 0) {
      currentTab.value = newTabs[0];
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="w-full flex flex-grow flex-col">
    <TabMenu v-if="route.meta.tabs" :tabs="route.meta.tabs" v-model:tab="currentTab" />

    <div class="w-full px-4 pt-4 pb-[34px]">
      <RouterView :current-tab="currentTab" />
    </div>
  </div>
</template>
