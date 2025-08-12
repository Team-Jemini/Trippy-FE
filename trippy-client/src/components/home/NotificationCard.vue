<script setup>
import { Icon } from "@iconify/vue";

const props = defineProps({
  notification: Object,
});
</script>

<template>
  <div class="h-hull p-2 px-3 bg-white rounded-xl shadow-md my-4">
    <div class="flex gap-2">
      <div class="pt-3">
        <Icon icon="material-symbols:notifications-rounded" class="size-5 text-gray-00" />
      </div>
      <div class="pt-3">
        <p class="subtitle2">{{ props.notification.title }}</p>
        <p class="caption3">
          {{ props.notification.content }}
        </p>
      </div>
    </div>

    <div class="flex justify-end">
      <p class="caption2">{{ props.notification.createdAt.replace("T", " ") }}</p>
    </div>
  </div>
</template>

<style scoped></style>
