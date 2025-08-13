<script setup>
import { Icon } from "@iconify/vue";

const props = defineProps({
  label: { type: String, required: true },
  modelValue: { type: String, required: true }, // "M" 또는 "F"
});
const emit = defineEmits(["update:modelValue"]);

const onChange = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>
<template>
  <div class="mb-3 relative">
    <label class="body2 block mb-1">{{ label }}</label>
    <select
      :value="modelValue"
      @change="onChange"
      class="w-full h-[3.25rem] border-[1px] border-gray-300 rounded-xl text-gray-400 body1 px-4 appearance-none"
    >
      <option disabled value="">성별 선택</option>

      <option value="M">M</option>
      <option value="F">F</option>
    </select>

    <!-- 커스텀 드롭다운 아이콘 -->
    <Icon
      icon="material-symbols:arrow-back-ios-new-rounded"
      class="absolute right-3 top-[55%] text-gray-500 pointer-events-none w-5 h-5 -rotate-90"
    />
  </div>
</template>
