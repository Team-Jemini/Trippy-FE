<script setup>
import { RouterLink } from "vue-router";
import { Icon } from "@iconify/vue";
</script>

<template>
  <RouterLink to="/payment/settings">
    <div
      class="absolute left-[265px] top-[16px] w-[62px] h-[27px] flex items-center gap-[4px] cursor-pointer group text-gray-400 hover:text-gray-600 transition-colors duration-200"
    >
      <Icon icon="material-symbols:settings-rounded" class="w-[24px] h-[24px]" />
      <span class="title4"> 설정 </span>
    </div>
  </RouterLink>
</template>
