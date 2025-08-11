<script setup>
import { ref, watch } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const front = ref("");
const back = ref("");

watch([front, back], () => {
  const combined = `${front.value}${back.value ? "-" + back.value : ""}`;

  emit("update:modelValue", combined);
});
</script>

<template>
  <div class="flex flex-col gap-1">
    <p class="body1 text-gray-400">주민등록번호</p>
    <div class="flex items-center gap-2">
      <input
        type="text"
        placeholder="예) 010345"
        v-model="front"
        maxlength="6"
        class="w-full h-12 border-[1px] border-gray-300 rounded-xl px-4"
        @input="front = $event.target.value.replace(/[^0-9]/g, '')"
      />
      <span>-</span>
      <input
        type="text"
        placeholder="*"
        v-model="back"
        maxlength="1"
        class="w-12 h-12 border-[1px] border-gray-300 rounded-xl px-4"
        @input="back = $event.target.value.replace(/[^0-9]/g, '')"
      />
      <div class="flex gap-1">
        <Icon v-for="n in 6" icon="material-symbols:circle" class="w-3 h-3" />
      </div>
    </div>
  </div>
</template>
