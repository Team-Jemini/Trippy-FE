<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

import NextButton from "@/components/common/buttons/NextButton.vue";
import NameInput from "@/components/common/inputs/NameInput.vue";
import DateInput from "@/components/common/inputs/DateInput.vue";
import FileInput from "@/components/common/inputs/FileInput.vue";

import { postVoucher } from "@/api/voucher.js";

const router = useRouter();
const reservationName = ref("");
const selectedDate = ref("");
const selectedFile = ref(null);
const fileUrl = ref(null);

const onFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    selectedFile.value = file;
    fileUrl.value = URL.createObjectURL(file);
  }
};

const isDisabled = computed(() => {
  return !reservationName.value || !selectedDate.value || !selectedFile.value;
});

const handleSubmit = async () => {
  const response = await postVoucher({
    name: reservationName.value,
    viewingDate: `${selectedDate.value}T14:00`,
  }, selectedFile.value);

  if (response.code === 200) {
    router.push({
      name: "bouchers",
      state: {
        tabs: "관광",
      }
    });
  } else {
    console.log(response.message);
  }
};
</script>

<template>
  <main class="w-full flex flex-col gap-8 relative">
    <!-- 예약 등록 폼 -->
    <div class="flex flex-col gap-2">
      <NameInput
        v-model="reservationName"
        label="예약 이름"
        placeholder="예약 이름을 입력해주세요"
      />
      <DateInput v-model="selectedDate" label="예약 날짜" />
      <!-- <FileInput @update:file="selectedFile = $event" />
        -->
      <FileInput :file="selectedFile" @update:file="selectedFile = $event" />

      <!-- 위치 지정잘하기 -->
      <div class="fixed bottom-0 left-0 right-0 z-50 w-full max-w-full pb-[34px] px-4 bg-white md:max-w-[375px] md:mx-auto">
        <NextButton title="등록하기" :disabled="isDisabled" @click="handleSubmit" />
      </div>
    </div>
  </main>
</template>
