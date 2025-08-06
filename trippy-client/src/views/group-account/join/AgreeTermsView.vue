<script setup>
import TrippyLogo from "@/assets/svg/trippy-logo.svg";
import AgreementCheck from "@/components/common/AgreementCheck.vue";
import NextButton from "@/components/common/NextButton.vue";
import router from "@/router";
import { ref } from "vue";

const checked = ref(false);
</script>

<template>
  <div class="flex flex-col justify-between h-full w-full">
    <div class="h-full w-full flex flex-col items-center">
      <div class="subtitle1 text-center">
        <p>모임통장 사용을 위해</p>
        <p>서비스 설명과 약관을 확인해 주세요.</p>
      </div>

      <div class="flex flex-col items-center mt-32 gap-24">
        <TrippyLogo class="w-60 h-auto" />

        <div class="px-1">
          <AgreementCheck
            :title="'모임통장 설명서 및 약관에 동의'"
            :class="checked ? 'bg-main-gradient' : 'bg-gray-400'"
            @click="checked = !checked"
          />
          <p class="caption2 px-2 text-gray-400 mt-3">
            모임통장은 모임주 개인 명의의 통장으로 납입한 모임 회비의지급, 해지 권한은 모임주에게
            있습니다. 압류 등 모임주의 상태에 따라 모임 회비 및 모임통장 서비스 이용이 제한 될 수
            있습니다.
          </p>
        </div>
      </div>
    </div>

    <NextButton
      :title="'다음'"
      :disabled="!checked"
      @click="router.push({ name: 'group-join-select-account' })"
    />
  </div>
</template>

<style scoped></style>
