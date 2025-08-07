<script setup>
import Idcard from "@/assets/png/Idcard.png";
import ActionButtons from "@/components/identification/ActionButtons.vue";
import DocumentPreview from "@/components/identification/CapturePreview.vue";
import CountrySelect from "@/components/identification/CountrySelect.vue";
import DatePicker from "@/components/identification/DatePicker.vue";
import EditableField from "@/components/common/inputs/EditableInput.vue";
import GenderSelect from "@/components/identification/GenderSelect.vue";
import { ref } from "vue";

const name = ref("홍길동");
const englishName = ref("HONG/GILDONG");

const editingField = ref({
  name: false,
  englishName: false,
  id: false,
  date: false,
  nationality: false,
  passportId: false,
});
const nationality = ref("KOR"); // 기본값 (대한민국)
const passportId = ref("M12345678");
</script>

<template>
  <div class="w-full flex flex-col">
    <DocumentPreview :image="Idcard" message="여권 정보를 확인해주세요." />

    <div class="mt-5">
      <EditableField
        label="이름"
        v-model="name"
        :readonly="!editingField.name"
        @toggleEdit="editingField.name = !editingField.name"
      />

      <EditableField
        label="영문이름"
        v-model="englishName"
        :readonly="!editingField.englishName"
        @toggleEdit="editingField.englishName = !editingField.englishName"
      />
    </div>

    <div class="flex gap-4">
      <DatePicker class="flex-1" label="생년월일" v-model="birthDate" />
      <GenderSelect class="flex-1" label="성별" v-model="gender" />
    </div>

    <CountrySelect :label="국적" v-model="nationality" />

    <EditableField
      label="여권번호"
      v-model="passportId"
      :readonly="!editingField.passportId"
      @toggleEdit="editingField.passportId = !editingField.englishName"
    />
    <div>
      <DatePicker class="flex-1" label="여권만료날짜" v-model="birthDate" />
    </div>

    <ActionButtons @leftClick="console.log('다시 촬영')" @rightClick="console.log('등록')" />
  </div>
</template>
