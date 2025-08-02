<script setup>
import { ref, computed } from "vue";
import { Icon } from "@iconify/vue";
import { banks } from "@/_dummy/banks_dummy.js";

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);
const isOpen = ref(false);

const selectedLabel = computed(() => props.modelValue);

const openDropdown = () => {
  isOpen.value = !isOpen.value;
}

const handleSelect = (option) => {
  emit("update:modelValue", option);
  isOpen.value = false;
};
</script>

<template>
  <div class="w-full">
    <div
      class="h-12 border-b border-gray-400 flex justify-between items-center text-gray-400"
      @click="openDropdown"
    >
      <span :class="['title4', selectedLabel && 'text-black']">{{ selectedLabel || '은행 선택' }}</span>
      <Icon icon="material-symbols:arrow-forward-ios-rounded" class="size-5 rotate-90" />
    </div>

    <ul
      v-if="isOpen === true"
      class="bg-blue-100 rounded-b-xl"
    >
      <li
        v-for="(option, index) in banks"
        :key="index"
        class="flex h-12 items-center border-t border-gray-200 gap-2 px-4 active:bg-gray-200"
        @click="handleSelect(option.bank)"
      >
        <img :src="option.logo" class="size-5" />
        <span class="body2">{{ option.bank }}</span>
      </li>
    </ul>
  </div>
</template>
