<!-- components/travel-logs/PhotoUploader.vue -->
<script setup>
import { ref, watch } from "vue";
import { Icon } from "@iconify/vue";

// 부모로 이미지 URL/파일 emit
const emit = defineEmits(["update:imageUrl", "update:imageFile"]);

const fileInput = ref(null);
const imageFile = ref(null);

function openFileDialog() {
  fileInput.value.click();
}

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    imageFile.value = file;
    emit("update:imageFile", file);
    emit("update:imageUrl", URL.createObjectURL(file));
  }
}
</script>

<template>
  <div
    class="absolute bottom-4 left-4 bg-white rounded-lg px-3 py-1 flex items-center gap-2 shadow cursor-pointer"
    @click="openFileDialog"
  >
    <Icon icon="mdi:camera-outline" class="text-gray-500" />
    <span class="text-gray-700 text-sm">{{ imageFile ? "1/1" : "0/1" }}</span>
    <input
      type="file"
      ref="fileInput"
      accept="image/*"
      class="hidden"
      @change="handleImageUpload"
    />
  </div>
</template>
