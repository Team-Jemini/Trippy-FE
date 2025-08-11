<script setup>
import DocumentIntro from "@/components/identification/DocumentIntro.vue";
import Idcard from "@/assets/png/Idcard.png";
</script>

<template>
  <DocumentIntro
    title="실물 여권을 준비해주세요"
    description="모바일 여권 등록을 위해<br />실물 주민등록증 촬영이 필요합니다."
    :image="Idcard"
    buttonText="여권 촬영 시작하기"
  />
</template>
