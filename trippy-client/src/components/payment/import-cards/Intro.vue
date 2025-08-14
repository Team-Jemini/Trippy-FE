<script setup>
import { ref } from "vue";
import TrippyLogo from "@/assets/svg/trippy-logo.svg";
import NextButton from "@/components/common/buttons/NextButton.vue";
import TermsModal from "@/components/common/modals/TermsModal.vue";

const emit = defineEmits(["next"]);
const showTerms = ref(false);

const handleClick = () => {
  showTerms.value = true;
};

const handleNext = () => {
  showTerms.value = false;
  emit("next");
};
</script>

<template>
  <div class="flex flex-col h-full justify-between">
    <div class="flex flex-col gap-2 mt-10">
      <h1 class="title2">내 카드를 한번에 관리해요!</h1>
      <p class="body1">간편하게 내 카드 목록을 불러올 수 있어요.</p>
    </div>

    <div class="flex-1 flex items-center justify-center">
      <TrippyLogo class="w-64 h-36" />
    </div>

    <NextButton title="카드 불러오기" @click="handleClick" />

    <TermsModal v-model="showTerms" type="card" @next="handleNext" />
  </div>
</template>
