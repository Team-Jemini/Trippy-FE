<script setup>
import { ref, computed } from "vue";

import AmountInputScreen from "@/components/account/AmountInputScreen.vue";
import PasswordInput from "@/components/common/inputs/PasswordInput.vue";
import ConfirmTransfer from "@/components/account/ConfirmTransfer.vue";
import CompleteTransfer from "@/components/account/CompleteTransfer.vue";
import { useTransferStore } from "@/stores/transferStore";

const transferStore = useTransferStore();

const views = [
  {
    component: AmountInputScreen,
    props: { title: "얼마나 채울까요?", type: "add", balance: transferStore.balance },
  },
  { component: PasswordInput },
  { component: ConfirmTransfer, props: { mode: "add" } },
  { component: CompleteTransfer },
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
    <component :is="currentView.component" v-bind="currentView.props" @next="goNext" />
  </main>
</template>
