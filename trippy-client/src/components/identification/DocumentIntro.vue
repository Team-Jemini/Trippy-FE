<!-- /components/identity/DocumentIntro.vue -->
<script setup>
import NextButton from "../common/NextButton.vue";

defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  buttonText: { type: String, required: true },
});
</script>

<template>
  <div class="w-full h-[41.3rem] flex flex-col justify-between">
    <!-- 제목 & 설명 -->
    <div class="pt-3">
      <h1 class="title2">{{ title }}</h1>
      <p class="mt-4 body1" v-html="description"></p>
    </div>

    <!-- 문서 이미지 -->
    <div class="flex-1 mb-[6rem] flex flex-col items-center justify-center">
      <img :src="image" class="w-[19.5rem] h-auto mb-2" />
    </div>

    <!-- 버튼 -->
    <div>
      <NextButton :title="buttonText" :disabled="false" />
    </div>
  </div>
</template>
