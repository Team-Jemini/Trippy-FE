<script setup>
import { defineProps } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  data: Object
});
</script>

<template>
  <div class="flex items-center justify-between p-4 bg-blue-100 rounded-xl active:bg-gray-200">
    <div class="flex items-center gap-4">
      <img :src="props.data.logo" class="size-9 bg-gray-100 rounded-full" />
      <div>
        <h3 class="subtitle1">{{ props.data.accountType }}</h3>
        <p class="body1">{{ props.data.bankName }} {{ props.data.accountNumber }}</p>
      </div>
    </div>
    <Icon
      :icon="props.data.isChecked ? 'material-symbols:check-circle-rounded' : 'material-symbols:check-circle-outline-rounded'"
      :class="['size-9', props.data.isChecked ? 'text-blue-400' : 'text-gray-400']"
    />
  </div>
</template>
