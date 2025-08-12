<script setup>
import { ref, onMounted } from "vue";
import PaymentMethodList from "@/components/payment/CardList.vue";
import { getCardDetails } from "@/api/card";

const userId = 1; // TODO: 로그인 스토어
const cards = ref([]);

onMounted(async () => {
  try {
    const res = await getCardDetails(userId);
    cards.value = res?.data && res.data.data ? res.data.data : [];
  } catch (e) {
    console.error("카드 상세 조회 실패", e);
  }
});
</script>

<template>
  <div class="w-[375px] mx-auto">
    <div class="settings-title subtitle2">등록한 결제수단</div>

    <template v-if="cards.length > 0">
      <PaymentMethodList :cards="cards" />
    </template>

    <template v-else>
      <div class="w-full flex flex-col items-center justify-center mt-6">
        <p class="text-sm text-gray-700 mb-4">등록된 결제수단이 없습니다.</p>
      </div>
    </template>
  </div>
</template>
