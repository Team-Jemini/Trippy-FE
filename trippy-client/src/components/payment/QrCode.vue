<!-- trippy-client/src/components/payment/QrCode.vue -->
<script setup>
defineProps({
  cardId: Number,
  isAuthenticated: Boolean,
  qrMap: { type: Object, default: () => ({}) },
});

import afterQr from "@/assets/png/default_qr.png"; // 인증됨+아직 맵없을 때
import defaultQr from "@/assets/png/before-pay.png"; // 인증 전
</script>

<template>
  <RouterLink to="/payment/password">
    <div
      class="cursor-pointer"
      :style="{
        width: isAuthenticated ? '140px' : '85px', // ✅ 인증 시만 크게
        height: isAuthenticated ? '140px' : '94px', // ✅ 인증 시만 크게
      }"
    >
      <img
        :src="
          isAuthenticated
            ? qrMap?.[cardId]
              ? `data:image/png;base64,${qrMap[cardId]}`
              : afterQr
            : defaultQr
        "
        alt="QR 코드"
        class="w-full h-full"
        style="object-fit: contain; image-rendering: pixelated"
      />
    </div>
  </RouterLink>
</template>
