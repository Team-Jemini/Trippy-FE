<script setup>
const props = defineProps({
  text: { type: String, required: true }, // 표시할 문구
});
</script>

<template>
  <div
    class="bg-header-gradient w-full text-white flex flex-col caption4 py-1 rounded-t-xl whitespace-nowrap overflow-hidden"
  >
    {{ text }}
    주민등록증 이미지 위변조 및 부정 사용 금지(위반 시 3년 이하의 징역 또는 3천만원 벌금)
  </div>
</template>
