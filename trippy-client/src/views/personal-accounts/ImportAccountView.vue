<script setup>
import { ref, computed } from "vue";

import Intro from "@/components/personal-accounts/import-accounts/Intro.vue";
import InputForm from "@/components/common/InputForm.vue";
import SMSCertification from "@/components/personal-accounts/import-accounts/SMSCertification.vue";
import AgreeToTerms from "@/components/personal-accounts/import-accounts/AgreeToTerms.vue";
import PasswordInput from "@/components/common/inputs/PasswordInput.vue";
import LoadingView from "@/components/common/loading/LoadingView.vue";
import SelectAccount from "@/components/personal-accounts/import-accounts/SelectAccounts.vue";
import CompleteImport from "@/components/personal-accounts/import-accounts/CompleteImport.vue";

const views = [Intro, InputForm, SMSCertification, AgreeToTerms, PasswordInput, LoadingView, SelectAccount, CompleteImport];
const currentIndex = ref(0);

const currentView = computed(() => views[currentIndex.value]);

const loadingDescription = "계좌 목록을 불러오고 있습니다.";

function goNext() {
  if (currentIndex.value < views.length - 1) {
    currentIndex.value++;
  }
}
</script>

<template>
  <main class="w-full bg-white h-full">
    <component
      :is="currentView"
      @next="goNext"
      v-bind="currentView === LoadingView ? { description: loadingDescription } : {}"
    />
  </main>
</template>
