<script setup>
import Idcard from "@/assets/png/Idcard.png";
import ActionButtons from "@/components/identification/ActionButtons.vue";
import DocumentPreview from "@/components/identification/CapturePreview.vue";
import EditableField from "@/components/common/inputs/EditableInput.vue";
import { ref, watchEffect } from "vue";
import { addResidentCard } from "@/api/identification";
import { useRouter } from "vue-router";
import { useOcrStore } from "@/stores/ocrStore";

const router = useRouter();
const ocr = useOcrStore();

const name = ref("홍길동");
const residentId = ref("010123-1234567");
const issueDate = ref("2019-12-13");
const editingField = ref({ name: false, id: false, date: false, address: false });
const address = ref("서울특별시 광진구 능동로 209 KB 602호");

// TODO: 이미지하고 제대로 잘 받아 넣기
const imgUrl = ref("https://your-cdn.com/idcard.png");

const formatResidentId = (val = "") => {
  const digits = String(val).replace(/\D/g, "").slice(0, 13);
  return digits.length > 6 ? `${digits.slice(0, 6)}-${digits.slice(6)}` : digits;
};

const formatIssueDate = (val = "") => {
  const d = String(val).replace(/\D/g, "").slice(0, 8); // 숫자만, 8자리 제한
  if (d.length <= 4) return d; // "2019"
  if (d.length <= 6) return `${d.slice(0, 4)}-${d.slice(4)}`; // "2019-12"
  return `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6)}`; // "2019-12-13"
};

watchEffect(() => {
  const r = ocr.result;
  if (!r) return;

  if (r.name) name.value = r.name;
  if (r.personalNum) residentId.value = formatResidentId(r.personalNum);
  if (r.address) address.value = r.address;
  if (r.issueDate) issueDate.value = formatIssueDate(r.issueDate);
});

const handleSubmit = async () => {
  try {
    const payload = {
      imgUrl: imgUrl.value,
      name: name.value,
      identity: residentId.value,
      address: address.value,
      resIssueDate: issueDate.value,
    };

    const response = await addResidentCard(payload);
    console.log("성공 완료");

    // 등록 후 이동
    router.push("/check/identification");
  } catch {
    console.error("등록 실패");
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
        :placeholder="`홍길동`"
        @toggleEdit="editingField.name = !editingField.name"
      />

      <EditableField
        label="주민등록번호"
        v-model="residentId"
        :readonly="!editingField.id"
        :formatter="formatResidentId"
        maxlength="14"
        :placeholder="`010123-1234567`"
        @toggleEdit="editingField.id = !editingField.id"
      />

      <EditableField
        label="주소"
        v-model="address"
        :readonly="!editingField.address"
        @toggleEdit="editingField.address = !editingField.address"
      />

      <EditableField
        label="발급일자"
        v-model="issueDate"
        :readonly="!editingField.date"
        :formatter="formatIssueDate"
        maxlength="10"
        :placeholder="`2019-12-13`"
        @toggleEdit="editingField.date = !editingField.date"
      />
    </div>

    <!-- 촬영 or 등록 버튼 -->
    <div class="mt-[5rem]">
      <ActionButtons @leftClick="console.log('다시 촬영')" @rightClick="handleSubmit" />
    </div>
  </div>
</template>
