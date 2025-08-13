<script setup>
import { ref, computed, onMounted } from "vue";

import SendFormScreen from "@/components/account/personal-accounts/SendFormScreen.vue";
import AmountInputScreen from "@/components/account/AmountInputScreen.vue";
import PasswordInput from "@/components/common/inputs/PasswordInput.vue";
import ConfirmTransfer from "@/components/account/ConfirmTransfer.vue";
import CompleteTransfer from "@/components/account/CompleteTransfer.vue";
import { useAccountStore } from "@/stores/accountStore";
import { useTransferStore } from "@/stores/transferStore";

const accountStore = useAccountStore();
const transferStore = useTransferStore();

const views = [
  { component: SendFormScreen },
  {
    component: AmountInputScreen,
    props: {
      title: "얼마를 보낼까요?",
      type: "send",
      balance: accountStore.personalAccountDetail.balance,
    },
  },
  { component: PasswordInput },
  { component: ConfirmTransfer, props: { mode: "send" } },
  { component: CompleteTransfer },
];
const currentIndex = ref(0);

const currentView = computed(() => views[currentIndex.value]);

function goNext() {
  if (currentIndex.value < views.length - 1) {
    currentIndex.value++;
  }
}

onMounted(() => {
  transferStore.setFromAccountId(accountStore.personalAccountDetail.accountId);
});
</script>

<template>
  <main class="w-full bg-white h-full">
    <component :is="currentView.component" v-bind="currentView.props" @next="goNext" />
  </main>
</template>
