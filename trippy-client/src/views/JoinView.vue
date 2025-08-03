<script setup>
import { ref, computed } from "vue";

import InputForm from "@/components/personal-accounts/import-accounts/InputForm.vue";
import SMSCertification from "@/components/personal-accounts/import-accounts/SMSCertification.vue";
import PasswordInput from "@/components/common/inputs/PasswordInput.vue";
import LoadingView from "@/components/common/loading/LoadingView.vue";
import CompleteJoin from "@/components/join/CompleteJoin.vue";

const views = [
  { component: InputForm },
  { component: SMSCertification },
  { component: PasswordInput, props: { title: "새 비밀번호 입력" }},
  { component: PasswordInput, props: { title: "비밀번호 재입력" }},
  { component: LoadingView, props: { description: "인증 수단을 등록하는 중입니다..." }},
  { component: CompleteJoin },
];
const currentIndex = ref(5);

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
