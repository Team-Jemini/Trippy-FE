<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

import SettingsIcon from "./SettingsIcon.vue";
import QrCode from "./QrCode.vue";
import PayButton from "./PayButton.vue";
import CardCarousel from "./CardCarousel.vue";
import PaymentNotification from "./PaymentNotification.vue"; // 알림 컴포넌트

import plusCard from "@/assets/empty_card.png";
import card1 from "@/assets/card1.png";
import card2 from "@/assets/card2.png";
import card3 from "@/assets/card3.png";

const router = useRouter();
const route = useRoute();

const cards = ref([
  { id: 1, image: card1, name: "KB국민카드_트래블러스" },
  { id: 2, image: card2, name: "신한카드_디스커버" },
  { id: 3, image: card3, name: "하나카드_위시올" },
]);

const selectedCardId = ref(cards.value[0]?.id ?? null);

// 인증 상태
const isAuthenticated = ref(route.query.authenticated === "true");

// 결제 완료 알림 상태
const isPaymentComplete = ref(false);

// 알림 표시 함수
function showPaymentNotification() {
  isPaymentComplete.value = true;
  setTimeout(() => {
    isPaymentComplete.value = false;
  }, 2000);
}

// 카드 선택 시 처리
function handleSelectCard(id) {
  selectedCardId.value = id;
  if (isAuthenticated.value) {
    showPaymentNotification(); // 인증됐을 때만 알림 표시
  }
}

// 인증 변경 감지
watch(
  () => route.query.authenticated,
  (newVal) => {
    isAuthenticated.value = newVal === "true";
    if (isAuthenticated.value) {
      startTimer();
    }
  },
);

// 타이머
const timeLeft = ref(180);
let timer = null;

const startTimer = () => {
  if (!isAuthenticated.value) return;
  if (timer) clearInterval(timer);
  timeLeft.value = 180;
  timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      clearInterval(timer);
      isAuthenticated.value = false;
    }
  }, 1000);
};

onMounted(() => {
  if (isAuthenticated.value) {
    startTimer();
  }
});

function goToAddCard() {
  router.push("/payment/add");
}
</script>

<template>
  <div>
    <!-- 결제 완료 알림 -->
    <PaymentNotification :visible="isPaymentComplete" />

    <div
      class="absolute bg-white rounded-[20px] shadow-md"
      style="width: 343px; height: 520px; left: calc(50% - 343px / 2); top: 116px"
    >
      <div class="relative w-full h-full px-6 py-6">
        <SettingsIcon />

        <template v-if="cards.length > 0">
          <!-- 타이머 -->
          <div
            v-if="isAuthenticated"
            class="absolute text-[12px] text-gray-600 font-medium leading-none flex items-center gap-[4px]"
            style="width: 38px; height: 19px; left: 129px; top: 35px"
          >
            <span>
              {{
                Math.floor(timeLeft / 60)
                  .toString()
                  .padStart(2, "0")
              }}:{{ (timeLeft % 60).toString().padStart(2, "0") }}
            </span>
            <img
              src="@/assets/reload.png"
              alt="reload"
              class="w-3 h-3 cursor-pointer"
              @click="startTimer"
            />
          </div>

          <!-- QR 코드 -->
          <div class="absolute" style="width: 85px; height: 94px; left: 129px; top: 62px">
            <QrCode :cardId="selectedCardId" :isAuthenticated="isAuthenticated" />
          </div>

          <!-- 카드 캐러셀 -->
          <CardCarousel
            :cards="[...cards, { id: 999, image: plusCard, isAddCard: true }]"
            @selectCard="handleSelectCard"
          />

          <!-- 결제 버튼 -->
          <div class="absolute top-[500px] left-1/2 transform -translate-x-1/2">
            <PayButton />
          </div>
        </template>

        <!-- 카드 없을 때 -->
        <template v-else>
          <div class="flex flex-col items-center justify-center h-full pt-[50px]">
            <p class="title4 text-black mb-6">결제 수단을 추가해 주세요.</p>
            <div
              class="w-[160px] h-[240px] bg-gray-100 rounded-2xl flex items-center justify-center cursor-pointer"
              @click="goToAddCard"
            >
              <span class="text-[40px] text-gray-500">＋</span>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
