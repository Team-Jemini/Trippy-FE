<script setup>
import { Icon } from "@iconify/vue";
import { ref, watch, defineProps, defineEmits } from "vue";

const categoryColorMap = {
  FOOD: "text-red-200 bg-red-100",
  TRANSPORTATION: "text-blue-400 bg-blue-200",
  SHOPPING: "text-[#E74298] bg-[#FEEEF6]",
  CULTURE: "text-[#B726E7] bg-[#F4EAF8]",
  ACCOMMODATION: "text-[#0094AA] bg-[#E3F7F9]",
  OTHER: "text-gray-500 bg-gray-100",
  INCOME: "text-gray-500 bg-gray-100",
};

const props = defineProps({
  category: String,
});

const selected = ref(props.category);

const emit = defineEmits(["update:category"]);

watch(selected, (v) => {
  emit("update:category", v);
});
</script>

<template>
  <div>
    <div v-if="selected !== '수입'" class="relative inline-block">
      <select
        v-model="selected"
        class="flex caption2 items-center pl-2 w-14 h-7 rounded-full appearance-none"
        :class="categoryColorMap[selected]"
      >
        <option value="FOOD">식사</option>
        <option value="SHOPPING">쇼핑</option>
        <option value="TRANSPORTATION">교통</option>
        <option value="CULTURE">문화</option>
        <option value="ACCOMMODATION">숙박</option>
        <option value="INCOME">수입</option>
        <option value="OTHER">기타</option>
      </select>
      <Icon
        icon="material-symbols:arrow-forward-ios-rounded"
        class="size-3 rotate-90 absolute right-1 top-1/2 -translate-y-1/2 mr-1"
        :class="categoryColorMap[selected]"
      />
    </div>
    <div
      v-else
      class="flex caption2 gap-1.5 items-center pl-2 w-14 h-7 rounded-full bg-green-100 text-green-200"
    >
      <p>수입</p>
      <Icon icon="material-symbols:money-bag-rounded" class="size-3" />
    </div>
  </div>
</template>
