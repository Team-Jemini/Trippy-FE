<script setup>
defineProps({
  cardId: Number,
  isAuthenticated: Boolean,
  qrMap: { type: Object, default: () => ({}) },
});

import afterQr from "@/assets/png/default_qr.png";
import defaultQr from "@/assets/png/before-pay.png";
</script>

<template>
  <RouterLink to="/payment/password">
    <div
      class="cursor-pointer"
      :style="{
        width: isAuthenticated ? '140px' : '85px',
        height: isAuthenticated ? '140px' : '94px',
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
