<script setup>
import ToggleSwitch from "@/components/common/ToggleSwitch.vue";
</script>

<template>
  <div>
    <div class="border-b border-b-gray300 pb-5">
      <div class="flex justify-between items-center body1 py-3">
        <p>알림 허용</p>
        <ToggleSwitch />
      </div>
      <div class="flex justify-between items-center body1 py-3">
        <p>다크 모드</p>
        <ToggleSwitch />
      </div>
      <div class="flex justify-between items-center body1 py-3">
        <p>간편 모드</p>
        <ToggleSwitch />
      </div>
    </div>

    <div class="mt-5">
      <p class="body1">이용 약관 동의</p>
      <div class="flex justify-between items-center caption3 py-3">
        <p>앱 버전</p>
        <p class="text-gray-400">1.2.0</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
