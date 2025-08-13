<script setup>
import { ref, computed, watch, onMounted, onActivated } from "vue";
import { useRouter, useRoute } from "vue-router";

import SettingsIcon from "./SettingsIcon.vue";
import QrCode from "./QrCode.vue";
import PayButton from "./PayButton.vue";
import CardCarousel from "./CardCarousel.vue";
import PaymentNotification from "./PaymentNotification.vue";

import plusCard from "@/assets/png/empty_card.png";
import { getCardSummaries } from "@/api/card";

const props = defineProps({ qrEnabled: { type: Boolean, default: false } });

const router = useRouter();
const route = useRoute();

const userId = 1; // TODO: 로그인 스토어에서 가져오세요.

// 서버 원본
const summaries = ref([]);

// ✅ 주카드가 맨 앞에 오도록 정렬
const sortedSummaries = computed(() => {
  const arr = [...summaries.value];
  arr.sort((a, b) => (b.isMainCard ? 1 : 0) - (a.isMainCard ? 1 : 0));
  return arr;
});

// 뷰모델
const cards = computed(() =>
  sortedSummaries.value.map((c) => ({
    id: c.cardId,
    image: c.cardImg || plusCard,
    name: c.cardNickname || c.cardName, // 별명 우선
  })),
);

// 상태
const selectedCardId = ref(null);
const isAuthenticated = ref(props.qrEnabled);
const isPaymentComplete = ref(false);

// 알림
function showPaymentNotification() {
  isPaymentComplete.value = true;
  setTimeout(() => (isPaymentComplete.value = false), 2000);
}

// 카드 선택
function handleSelectCard(id) {
  selectedCardId.value = id;
  if (isAuthenticated.value) showPaymentNotification();
}

// 타이머
const timeLeft = ref(180);
let timer = null;

function startTimer() {
  if (!isAuthenticated.value) return;
  if (timer) clearInterval(timer);
  timeLeft.value = 180;
  timer = setInterval(() => {
    if (timeLeft.value > 0) timeLeft.value--;
    else {
      clearInterval(timer);
      isAuthenticated.value = false;
    }
  }, 1000);
}

// 외부 상태 변화 대응
watch(
  () => props.qrEnabled,
  (v) => {
    isAuthenticated.value = !!v;
    if (v) startTimer();
  },
);
watch(
  () => route.query.authenticated,
  (nv) => {
    const v = nv === "true";
    isAuthenticated.value = v;
    if (v) startTimer();
  },
);

// 데이터 로드
async function load() {
  try {
    const res = await getCardSummaries(userId);
    summaries.value = res?.data && res.data.data ? res.data.data : [];
    // ✅ 정렬된 결과의 첫 카드(= 주카드)가 선택되도록
    selectedCardId.value = cards.value[0]?.id ?? null;
  } catch (e) {
    console.error("카드 요약 조회 실패", e?.response?.data ?? e);
  }
}

onMounted(async () => {
  await load();
  if (isAuthenticated.value) startTimer();
});

// 설정 화면에서 주카드 바꾸고 돌아와도 반영
onActivated(load);

function goToAddCard() {
  router.push("/payment/add");
}
</script>

<template>
  <div>
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
              src="@/assets/png/reload.png"
              alt="reload"
              class="w-3 h-3 cursor-pointer"
              @click="startTimer"
            />
          </div>

          <!-- QR -->
          <div class="absolute" style="width: 85px; height: 94px; left: 129px; top: 62px">
            <QrCode :cardId="selectedCardId" :isAuthenticated="isAuthenticated" />
          </div>

          <!-- 캐러셀 -->
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
