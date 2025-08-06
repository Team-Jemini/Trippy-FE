<template>
  <div class="absolute inset-0 z-40" @click.self="$emit('close')">
    <div
      class="absolute bottom-40 right-5 bg-gradient-to-b from-blue-500 to-blue-600 text-white rounded-xl shadow-lg overflow-hidden w-40"
      @click.stop
    >
      <button
        @click="$emit('clickGroup')"
        class="w-full flex items-center px-4 py-3 hover:bg-blue-700"
      >
        <Icon icon="mdi:account-group" class="w-5 h-5 mr-2" />
        <span>단체 여행</span>
      </button>

      <div class="h-px bg-white opacity-50 mx-3"></div>

      <button
        @click="$emit('clickSolo')"
        class="w-full flex items-center px-4 py-3 hover:bg-blue-700"
      >
        <Icon icon="mdi:account" class="w-5 h-5 mr-2" />
        <span>개인 여행</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
</script>
