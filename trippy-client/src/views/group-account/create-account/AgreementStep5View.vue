<script setup>
import { ref } from "vue";

import SMSCodeInput from "@/components/common/inputs/SMSCodeInput.vue";
import NextButton from "@/components/common/buttons/NextButton.vue";
import AlertModal from "@/components/common/modals/AlertModal.vue";
import router from "@/router";

const isResend = ref(false);
const inputCode = ref("");
const isCodeValid = ref(null);
const isOpenModal = ref(false);
const modalTitle = ref("");

const correctCode = "123456";

const resendCode = () => {
  isResend.value = true;
  isCodeValid.value = null;
};

const handleNext = () => {
  isCodeValid.value = inputCode.value === correctCode;

  if (isCodeValid.value) {
    modalTitle.value = "인증이 완료되었습니다.";
    isOpenModal.value = true;
  } else {
    modalTitle.value = "인증번호가 틀렸습니다.";
    isOpenModal.value = true;
  }
};
</script>

<template>
  <div class="h-full flex flex-col justify-between">
    <div class="flex flex-col gap-4">
      <h3 class="body1 mb-4">SMS로 인증번호를 전송하였습니다.</h3>
      <SMSCodeInput v-model="inputCode" @resendCode="resendCode" />
      <p v-if="isResend" class="caption1 text-blue-400">인증번호가 재전송되었습니다.</p>
      <p class="caption1 text-gray-400">* 인증문자가 오지 않는다면 114 스팸차단을 확인해 보세요.</p>
    </div>
    <NextButton title="확인" class="px-4" :disabled="inputCode.length !== 6" @click="handleNext" />
    <AlertModal
      v-model="isOpenModal"
      :title="modalTitle"
      :isSuccess="isCodeValid"
      @next="router.push({ name: 'group-account-create-step6' })"
    />
  </div>
</template>
