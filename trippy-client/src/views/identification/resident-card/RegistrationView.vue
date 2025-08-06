<script setup>
import Idcard from "@/assets/Idcard.png";
import ActionButtons from "@/components/identification/ActionButtons.vue";
import DocumentPreview from "@/components/identification/CapturePreview.vue";
import EditableField from "@/components/common/inputs/EditableInput.vue";
import { ref } from "vue";

const name = ref("홍길동");
const residentId = ref("010123-1234567");
const issueDate = ref("2019년 12월 13일");
const editingField = ref({ name: false, id: false, date: false });

// 각 필드 편집 모드 상태
const editingName = ref(false);
const editingResidentId = ref(false);
const editingIssueDate = ref(false);

const formatResidentId = () => {
  let digits = residentId.value.replace(/[^0-9]/g, ""); // 숫자만 추출
  if (digits.length > 6) {
    residentId.value = digits.slice(0, 6) + "-" + digits.slice(6, 13);
  } else {
    residentId.value = digits;
  }
};
</script>

<template>
  <div class="w-full h-[34rem] flex flex-col">
    <!-- 민증 미리보기 -->
    <DocumentPreview :image="Idcard" message="주민등록증 정보를 확인해주세요." />

    <!-- 입력부 -->

    <div class="mt-5">
      <EditableField
        label="이름"
        v-model="name"
        :readonly="!editingField.name"
        @toggleEdit="editingField.name = !editingField.name"
      />

      <EditableField
        label="주민등록번호"
        v-model="residentId"
        :readonly="!editingField.id"
        :formatter="formatResidentId"
        maxlength="14"
        @toggleEdit="editingField.id = !editingField.id"
      />

      <EditableField
        label="발급일자"
        v-model="issueDate"
        :readonly="!editingField.date"
        @toggleEdit="editingField.date = !editingField.date"
      />
    </div>

    <!-- 촬영 or 등록 버튼 -->
    <div class="mt-[5rem]">
      <ActionButtons @leftClick="console.log('다시 촬영')" @rightClick="console.log('등록')" />
    </div>
  </div>
</template>
