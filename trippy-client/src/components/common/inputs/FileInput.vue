<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  file: File, // 단방향 props
});
const emit = defineEmits(["update:file"]);

const fileUrl = ref(null);

const onFileChange = (e) => {
  const selected = e.target.files[0];
  if (selected) {
    fileUrl.value = URL.createObjectURL(selected);
    emit("update:file", selected); // 🔥 부모로 emit
  }
};
</script>

<template>
  <div class="flex flex-col gap-2 mt-4">
    <p class="body2 text-black px-1">바우처 등록</p>
    <div
      class="w-full h-12 border border-blue-500 rounded-xl px-4 flex items-center justify-between"
    >
      <label for="file" class="text-blue-500 cursor-pointer truncate">
        {{ props.file?.name || "파일을 선택해주세요." }}
      </label>
      <input id="file" type="file" accept="image/*,.pdf" class="hidden" @change="onFileChange" />
      <Icon
        :icon="props.file ? 'material-symbols:check-rounded' : 'material-symbols:add-2-rounded'"
        class="text-blue-500 w-5 h-5"
      />
    </div>
    <p class="caption1 text-gray-400 px-1">
      *.pdf, .jpg, .jpeg, .png 형식의 파일만 등록할 수 있습니다.
    </p>

    <!-- ✅ 미리보기 -->
    <div v-if="props.file" class="mt-4 w-full rounded-xl overflow-hidden border border-gray-200">
      <img
        v-if="props.file?.type.startsWith('image/')"
        :src="fileUrl"
        class="w-full object-contain max-h-[400px]"
      />
      <embed
        v-else-if="props.file?.type === 'application/pdf'"
        :src="fileUrl"
        type="application/pdf"
        class="w-full h-[400px]"
      />
    </div>
  </div>
</template>
