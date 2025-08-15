<script setup>
import Idcard from "@/assets/png/Idcard.png";
import ActionButtons from "@/components/identification/ActionButtons.vue";
import DocumentPreview from "@/components/identification/CapturePreview.vue";
import CountrySelect from "@/components/identification/CountrySelect.vue";
import DatePicker from "@/components/identification/DatePicker.vue";
import EditableField from "@/components/common/inputs/EditableInput.vue";
import GenderSelect from "@/components/identification/GenderSelect.vue";
import { ref } from "vue";
import { addPassport } from "@/api/identification";
import router from "@/router";

const imgUrl = ref("https://your-cdn.com/idcard.png");

const nameKr = ref("");
const nameEn = ref("");
const passportNumber = ref("");
const countryCode = ref("");
const birthDate = ref(""); // "YYYY-MM-DD"
const expireDate = ref(""); // "YYYY-MM-DD"
const gender = ref("");

const editingField = ref({
  nameKr: false,
  nameEn: false,
  passportId: false,
});

const handleSubmitPassport = async () => {
  try {
    const payload = {
      passportNumber: passportNumber.value,
      nameKr: nameKr.value,
      nameEn: nameEn.value,
      birthDate: birthDate.value,
      gender: gender.value,
      countryCode: countryCode.value,
      expireDate: expireDate.value,
      imgUrl: imgUrl.value,
    };
    const response = await addPassport(payload);

    if (response.code === 200) {
      router.push("/check/identification");
      console.log("성공 완료");
    }
  } catch {
    console.error("등록 실패");
  }
};
</script>

<template>
  <div class="w-full flex flex-col">
    <DocumentPreview :image="Idcard" message="여권 정보를 확인해주세요." />

    <div class="mt-5">
      <EditableField
        label="이름"
        v-model="nameKr"
        :readonly="!editingField.nameKr"
        :placeholder="`홍길동`"
        @toggleEdit="editingField.nameKr = !editingField.nameKr"
      />

      <EditableField
        label="영문이름"
        v-model="nameEn"
        :readonly="!editingField.nameEn"
        :placeholder="`HONG/GILDONG`"
        @toggleEdit="editingField.nameEn = !editingField.nameEn"
      />
    </div>

    <div class="flex gap-4">
      <DatePicker class="flex-1" label="생년월일" v-model="birthDate" />
      <GenderSelect class="flex-1" label="성별" v-model="gender" />
    </div>

    <CountrySelect :label="국적" v-model="countryCode" />

    <EditableField
      label="여권번호"
      v-model="passportNumber"
      :readonly="!editingField.passportNumber"
      :placeholder="`M38281234`"
      @toggleEdit="editingField.passportNumber = !editingField.passportNumber"
    />
    <div>
      <DatePicker class="flex-1" label="여권만료날짜" v-model="expireDate" />
    </div>

    <ActionButtons @leftClick="console.log('다시 촬영')" @rightClick="handleSubmitPassport" />
  </div>
</template>
