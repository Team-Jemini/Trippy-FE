<script setup>
import PaymentMethodList from "@/components/payment/CardList.vue";
import KbLogo from "@/assets/svg/card/kb.svg";
import ShinhanLogo from "@/assets/svg/card/shinhan.svg";
import HanaLogo from "@/assets/svg/card/hana.svg";
import WooriLogo from "@/assets/svg/card/kakao.svg";
import TossLogo from "@/assets/svg/card/nh.svg";
import { ref } from "vue";
import { useRouter } from "vue-router";

// 카드 리스트 (비워보면서 테스트 가능)
const cards = ref([
  {
    id: 1,
    name: "KB국민카드_트래블러스",
    number: "233*",
    logo: KbLogo,
    bgColor: "#F8B500",
  },
  {
    id: 2,
    name: "신한카드_청년수당 S20",
    number: "233*",
    logo: ShinhanLogo,
    bgColor: "#236FFF",
  },
  {
    id: 3,
    name: "하나카드_트래블로그",
    number: "233*",
    logo: HanaLogo,
    bgColor: "#07A44D",
  },
  {
    id: 4,
    name: "카카오카드",
    number: "233*",
    logo: WooriLogo,
    bgColor: "#CBD0D7",
  },
  {
    id: 5,
    name: "농협카드",
    number: "233*",
    logo: TossLogo,
    bgColor: "#CBD0D7",
  },
]);
</script>

<template>
  <div class="w-[375px] mx-auto">
    <div class="settings-title subtitle2">등록한 결제수단</div>

    <!-- 카드가 있는 경우 -->
    <template v-if="cards.length > 0">
      <PaymentMethodList :cards="cards" />
    </template>

    <!-- 카드가 없는 경우 -->
    <template v-else>
      <div class="w-full flex flex-col items-center justify-center mt-6">
        <p class="text-sm text-gray-700 mb-4">등록된 결제수단이 없습니다.</p>
      </div>
    </template>
  </div>
</template>
