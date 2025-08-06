<script setup>
import { onMounted } from "vue";
import LoadingView from "@/components/common/loading/LoadingView.vue";

const emit = defineEmits(["next"]);

onMounted(() => {
  setTimeout(() => {
    emit("next");
  }, 1500);
});
</script>

<template>
  <LoadingView description="카드 정보를 불러오는 중입니다..." />
</template>
