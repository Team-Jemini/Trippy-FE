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
  <!-- ✅ 화면 전체를 덮는 오버레이 -->
  <div class="fixed inset-0 bg-white z-[40] flex items-center justify-center">
    <LoadingView description="여행 리포트를 생성중입니다..." />
  </div>
</template>
