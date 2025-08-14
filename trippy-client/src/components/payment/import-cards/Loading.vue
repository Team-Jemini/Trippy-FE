<script setup>
import { onMounted } from "vue";
import LoadingView from "@/components/common/loading/LoadingView.vue";
import { fetchCodefAndSave } from "@/api/card";

const emit = defineEmits(["next"]);
<<<<<<< HEAD
//const userId = 1; // TODO: 로그인 스토어
=======
>>>>>>> develop
const accountId = "dummyAccountId";

onMounted(async () => {
  try {
<<<<<<< HEAD
    await fetchCodefAndSave(accountId);
=======
    await fetchCodefAndSave("3333-02-654321");
>>>>>>> develop
  } catch (e) {
    console.error("카드 불러오기 실패", e);
    // TODO: 에러 토스트 등
  } finally {
    emit("next");
  }
});
</script>

<template>
  <LoadingView description="카드 정보를 불러오는 중입니다..." />
</template>
