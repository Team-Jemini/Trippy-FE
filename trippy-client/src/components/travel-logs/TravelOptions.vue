<template>
  <div class="flex inset-0 z-40" @click.self="$emit('close')">
    <div
      class="absolute bottom-[6.5rem] right-4 transform translate-x-1/2 bg-main-gradient text-white rounded-xl shadow-lg overflow-hidden w-40"
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
