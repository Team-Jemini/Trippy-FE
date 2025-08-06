<script setup>
import NextButton from "@/components/common/NextButton.vue";
import AccountNotice from "@/components/group-account/AccountNotice.vue";
import AgreementAccountPassword from "@/components/group-account/AgreementAccountPassword.vue";
import YesNoSelector from "@/components/group-account/YesNoSelector.vue";
import router from "@/router";
import { useGroupAccountStore } from "@/stores/groupAccountStore";
import { watch, ref, computed } from "vue";

const groupAccountPassword = ref("");
const passwordChecked = ref("");
const isPinMatched = ref("");
const passwordCheckedMessage = ref("");
const messages = [
  "타인으로부터 통장대여 요청을 받은 사실이 있나요?",
  "타인으로부터 신용점수 상향, 대출 등의 목적으로 통장개설을 요청받은 사실이 있나요?",
];
const groupAccountName = ref("");
const groupAccountStore = useGroupAccountStore();
const YesNoChecked = ref(new Array(2).fill(null));

const accountNameChecked = computed(() => groupAccountName.value.trim().length > 0);
const YesNoCheckeds = computed(() => YesNoChecked.value.every((v) => v));
const allChecked = computed(
  () => YesNoCheckeds.value && isPinMatched.value && accountNameChecked.value,
);

watch([groupAccountPassword, passwordChecked], () => {
  const passwordVal = groupAccountPassword.value;
  const passwordCheckVal = passwordChecked.value;

  if (passwordVal.length === 4 && passwordCheckVal.length === 4) {
    isPinMatched.value = passwordVal === passwordCheckVal;
    passwordCheckedMessage.value = isPinMatched.value
      ? "*비밀번호가 일치합니다"
      : "*비밀번호가 일치하지 않습니다";
  } else {
    // 입력이 4자리가 안 된 경우에는 메시지 숨김처리
    passwordCheckedMessage.value = "";
  }
});

const onClick = () => {
  groupAccountStore.setGroupAccountInfo(groupAccountPassword.value, groupAccountName.value);
  router.push({ name: "group-account-create-step4" });
};
</script>

<template>
  <div class="flex flex-col h-full justify-between">
    <div class="overflow-scroll px-1 [&::-webkit-scrollbar]:hidden">
      <div class="bg-main-gradient w-full h-40 p-4 rounded-xl">
        <div class="flex gap-2 flex-col items-center justify-center h-full text-white">
          <p class="title2">Trippy</p>
          <p class="title1">모임통장</p>
        </div>
      </div>
      <div class="w-full h-[8rem] flex flex-col items-center mt-5">
        <AgreementAccountPassword v-model="groupAccountPassword" :title="'통장 비밀번호 설정'" />
        <AgreementAccountPassword v-model="passwordChecked" :title="'통장 비밀번호 확인'" />
        <p
          v-if="passwordCheckedMessage"
          :class="[isPinMatched ? 'text-blue-600' : 'text-red-200']"
          class="caption3"
        >
          {{ passwordCheckedMessage }}
        </p>
      </div>
      <div class="w-full">
        <p class="subtitle2 mt-10 ml-2">계좌 이름을 지어주세요</p>
        <div class="shadow-custom w-full h-25 bg-black"></div>
        <input
          type="text"
          placeholder="모임통장 이름"
          v-model="groupAccountName"
          class="w-full h-16 text-center rounded-xl mt-3 shadow-custom body1"
        />
      </div>
      <AccountNotice
        class="mt-12 text-center w-[19rem]"
        :title="'고객님의 자산을 안전하게 보호하고 전화 금융사기의 피해를 예방하고자 금융거래목적에 대해 질문드립니다.'"
      />
      <YesNoSelector
        v-for="(message, i) in messages"
        :key="i"
        :title="message"
        v-model="YesNoChecked[i]"
      />
    </div>
    <NextButton :title="'다음'" :disabled="!allChecked" @click="onClick" />
  </div>
</template>

<style scoped></style>
