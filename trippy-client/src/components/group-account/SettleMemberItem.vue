<script setup>
import { Icon } from "@iconify/vue";
import { defineProps, defineEmits } from "vue";

const emit = defineEmits(["click"]);
const props = defineProps({
  member: String,
  isChecked: Boolean,
});

const onClick = () => {
  emit("click");
};
</script>

<template>
  <div class="w-full">
    <button class="flex flex-center justify-between w-full" @click="onClick">
      <div>
        <p class="body1">{{ $props.member }}</p>
      </div>
      <div>
        <Icon
          :icon="
            props.isChecked
              ? 'material-symbols:check-circle-rounded'
              : 'material-symbols:check-circle-outline-rounded'
          "
          :class="props.isChecked ? 'text-blue-400' : 'text-gray-400'"
          class="size-6"
        />
      </div>
    </button>
  </div>
</template>

<style scoped></style>
