<script setup>
import { defineProps } from "vue";

const props = defineProps({
  data: Object
});
</script>

<template>
  <div class="flex w-full items-center justify-between p-4 rounded-xl active:bg-blue-100">
    <div class="flex items-center gap-4">
      <img :src="props.data.logo" class="size-9 bg-gray-100 rounded-full" />
      <div>
        <h3 class="subtitle1">{{ props.data.accountType }}</h3>
        <p class="body1">{{ props.data.bankName }} {{ props.data.accountNumber }}</p>
      </div>
    </div>
  </div>
</template>
