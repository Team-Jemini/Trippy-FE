<script setup>
import { countries } from "@/_dummy/countries_50";
import { Icon } from "@iconify/vue";

const props = defineProps({
  label: { type: String, default: "국적" },
  modelValue: { type: String, default: "" }, // 선택된 값
});
const emit = defineEmits(["update:modelValue"]);

const onChange = (event) => {
  emit("update:modelValue", event.target.value);
};

// 필요한 국가 리스트 (간단 예시)
</script>

<template>
  <!-- TODO: 여기 다시 생각해보기 -->
  <div class="mb-3 relative">
    <label class="body2 block mb-1">{{ label }}</label>
    <select
      :value="modelValue"
      @change="onChange"
      class="w-full h-[3.25rem] border-[1px] border-gray-300 rounded-xl px-4 text-gray-400 body1 appearance-none"
    >
      <option value="" disabled>국가 선택</option>
      <option v-for="c in countries" :key="c.code" :value="c.name">
        {{ c.name }}
      </option>
    </select>

    <Icon
      icon="material-symbols:arrow-back-ios-new-rounded"
      class="absolute right-3 top-[55%] text-gray-500 pointer-events-none w-5 h-5 -rotate-90"
    />
  </div>
</template>
