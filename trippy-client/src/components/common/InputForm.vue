<script setup>
import { ref, watch } from "vue";

import Input from "@/components/common/inputs/TextInput.vue";
import RegistNumberInput from "@/components/common/inputs/RegistNumberInput.vue";
import TermsModal from "@/components/common/modals/TermsModal.vue";
import NextButton from "@/components/common/buttons/NextButton.vue";

import { useUserStore } from "@/stores/userStore.js";

const userStore = useUserStore();
const emit = defineEmits(["next"]);

const showModal = ref(false);

const name = ref("");
const registNumber = ref("");
const phoneNumber = ref("");
const isAllFilled = ref(false);

watch([name, registNumber, phoneNumber], () => {
  isAllFilled.value =
    name.value.trim() !== "" &&
    registNumber.value.trim().length === 8 &&
    phoneNumber.value.trim().length >= 10;
});

const openModal = () => {
  showModal.value = true;
};

const addUserInfo = () => {
  userStore.setUserInputValue({
    name: name.value,
    phone: phoneNumber.value,
    residentNum: registNumber.value,
  });

  emit("next");
}
</script>

<template>
  <div class="flex flex-col h-full justify-between">
    <div class="flex flex-col gap-8">
      <Input label="이름" placeholder="이름을 입력해 주세요." v-model="name" />
      <RegistNumberInput v-model="registNumber" />
      <Input label="휴대폰 번호" placeholder="예) 01012345678" v-model="phoneNumber" />
    </div>
    <NextButton title="다음" :disabled="!isAllFilled" @click="openModal" />
    <TermsModal v-model="showModal" @next="addUserInfo" />
  </div>
</template>
