<script setup>
import { ref, computed } from "vue";

import Intro from "@/components/account/personal-accounts/import-accounts/Intro.vue";
import InputForm from "@/components/common/InputForm.vue";
import SMSCertification from "@/components/account/personal-accounts/import-accounts/SMSCertification.vue";
import AgreeToTerms from "@/components/account/personal-accounts/import-accounts/AgreeToTerms.vue";
import PasswordInput from "@/components/common/inputs/PasswordInput.vue";
import LoadingView from "@/components/common/loading/LoadingView.vue";
import SelectAccount from "@/components/account/personal-accounts/import-accounts/SelectAccounts.vue";
import CompleteImport from "@/components/account/personal-accounts/import-accounts/CompleteImport.vue";

import { fetchPersonalAccount, postPersonalAccount } from "@/api/personalAccount.js";
import { useAccountStore } from "@/stores/accountStore.js";

const accountStore = useAccountStore();

const views = [
  { component: Intro },
  { component: InputForm },
  { component: SMSCertification },
  { component: AgreeToTerms },
  { component: PasswordInput },
  { component: LoadingView, props: {
      description: "계좌 목록을 불러오고 있습니다...",
      apiCall: fetchPersonalAccount,
      apiArgs: [159], // 임시 userID
      onSuccess: (data) => accountStore.setCodefAccountList(data),
  }},
  { component: SelectAccount },
  { component: LoadingView, props: {
      description: "계좌를 등록하는 중입니다...",
      apiCall: postPersonalAccount,
      apiArgs: [159, accountStore.selectedAccountList],
  }},
  { component: CompleteImport },
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
      :key="currentIndex"
      v-bind="currentView.props"
      @next="goNext"
    />
  </main>
</template>
