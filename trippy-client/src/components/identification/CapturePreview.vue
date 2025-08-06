<script setup>
defineProps({
  image: { type: String, required: true },
  message: { type: String, default: "문서 정보를 확인해주세요." },
  borderColor: { type: String, default: "border-green-200" },
});
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <img :src="image" :class="`w-[19.5rem] h-auto mb-2 border-4 ${borderColor} rounded-lg p-1`" />
    <p class="text-gray-400 subtitle1 text-center">{{ message }}</p>
  </div>
</template>
