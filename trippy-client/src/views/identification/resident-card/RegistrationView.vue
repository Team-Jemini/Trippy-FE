<script setup>
import Idcard from "@/assets/png/Idcard.png";
import ActionButtons from "@/components/identification/ActionButtons.vue";
import DocumentPreview from "@/components/identification/CapturePreview.vue";
import EditableField from "@/components/common/inputs/EditableInput.vue";
import { ref } from "vue";
import { addResidentCard } from "@/api/identification";
import { useRouter } from "vue-router";

const router = useRouter();

const name = ref("홍길동");
const residentId = ref("010123-1234567");
const issueDate = ref("2019-12-13");
const editingField = ref({ name: false, id: false, date: false, address: false });
const address = ref("서울특별시 광진구 능동로 209 KB 602호");

// TODO: 이미지하고 userId 제대로 잘 받아 넣기
const imgUrl = ref("https://your-cdn.com/idcard.png");
const userId = 5;

const formatResidentId = (val = "") => {
  const digits = String(val).replace(/\D/g, "").slice(0, 13);
  return digits.length > 6 ? `${digits.slice(0, 6)}-${digits.slice(6)}` : digits;
};

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
        :placeholder="`2019.12.13`"
        @toggleEdit="editingField.date = !editingField.date"
      />
    </div>

    <!-- 촬영 or 등록 버튼 -->
    <div class="mt-[5rem]">
      <ActionButtons @leftClick="console.log('다시 촬영')" @rightClick="handleSubmit" />
    </div>
  </div>
</template>
