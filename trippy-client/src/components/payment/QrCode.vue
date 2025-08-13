<script setup>
defineProps({
  cardId: Number,
  isAuthenticated: Boolean,
  qrMap: { type: Object, default: () => ({}) }, // ✅ 추가
});

import afterQr from "@/assets/png/default_qr.png"; // (옵션) 로딩/플레이스홀더
import defaultQr from "@/assets/png/before-pay.png"; // 인증 전 이미지
</script>

<template>
  <RouterLink to="/payment/password">
    <div class="w-full h-full cursor-pointer">
      <img
        :src="
          isAuthenticated
            ? qrMap?.[cardId]
              ? `data:image/png;base64,${qrMap[cardId]}`
              : afterQr // ✅ 인증됐지만 아직 맵에 없는 경우(로딩/딜레이)
            : defaultQr
        "
        alt="QR 코드"
        class="w-full h-full object-contain"
      />
    </div>
  </RouterLink>
</template>
