<script setup>
defineProps({
  cardId: Number,
  isAuthenticated: Boolean,
});

import afterQr from "@/assets/default_qr.png"; // 인증 후
import defaultQr from "@/assets/before-pay.png"; // 인증 전
</script>

<template>
  <RouterLink to="/payment/password">
    <div class="w-full h-full cursor-pointer">
      <img
        :src="isAuthenticated ? afterQr : defaultQr"
        alt="QR 코드"
        class="w-full h-full object-contain"
      />
    </div>
  </RouterLink>
</template>
