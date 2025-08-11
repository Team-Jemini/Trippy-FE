<script setup>
import { defineProps, defineEmits, onMounted } from "vue";
import OnLoading from "@/components/common/loading/OnLoading.vue";

const props = defineProps({
  description: String,
  apiCall: {
    type: Function,
    required: false,
  },
  apiArgs: {
    type: Array,
    default: () => [],
    required: false,
  },
  onSuccess: {
    type: Function,
    default: null,
  }
});

const emit = defineEmits(["next"]);

onMounted(async () => {
  if (props.apiCall) {
    const data = await props.apiCall(...props.apiArgs);
    if (props.onSuccess) props.onSuccess(data);
  }

  emit("next");
});
</script>

<template>
  <div class="flex flex-col h-full items-center justify-center gap-8 pb-2">
    <OnLoading />
    <div class="flex items-center justify-center h-9 bg-gray-500 rounded-full px-12">
      <p class="caption1 text-white">{{ props.description }}</p>
    </div>
  </div>
</template>
