<script setup>
import { ref, onMounted, onActivated } from "vue";
import PaymentMethodList from "@/components/payment/CardList.vue";
import { getCardDetails } from "@/api/card";

//const userId = 1;
const cards = ref([]);

const sortCards = (arr) => [...arr].sort((a, b) => (b.isMainCard ? 1 : 0) - (a.isMainCard ? 1 : 0));

async function load() {
  try {
    const res = await getCardDetails();
    const list = res?.data && res.data.data ? res.data.data : [];
    cards.value = sortCards(list);
  } catch (e) {
    console.error("카드 상세 조회 실패", e?.response?.data ?? e);
  }
}

onMounted(load);
onActivated(load);
</script>

<template>
  <div class="w-[375px] mx-auto">
    <div class="settings-title subtitle2">등록한 결제수단</div>

    <template v-if="cards.length > 0">
      <PaymentMethodList :cards="cards" @refresh="load" />
    </template>

    <template v-else>
      <div class="w-full flex flex-col items-center justify-center mt-6">
        <p class="text-sm text-gray-700 mb-4">등록된 결제수단이 없습니다.</p>
      </div>
    </template>
  </div>
</template>
