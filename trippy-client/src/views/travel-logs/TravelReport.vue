<script setup>
import { ref } from "vue";
// 라우트/API 호출은 당분간 미사용
// import { useRoute } from "vue-router";
// import { getTravelReport } from "@/api/travelLog";

import NotebookPaper from "@/components/travel-logs/NotebookPaper.vue";
import ReportHeader from "@/components/travel-logs/ReportHeader.vue";
import TitleBlock from "@/components/travel-logs/TitleBlock.vue";
import TotalSpendCard from "@/components/travel-logs/TotalSpendCard.vue";
import DailyAverageCard from "@/components/travel-logs/DailyAverageCard.vue";
import BiggestExpenseCard from "@/components/travel-logs/BiggestExpenseCard.vue";
import CategoryChart from "@/components/travel-logs/CategoryChart.vue";

/* ======================
   MOCK 데이터 (하드코딩)
   ====================== */
const travelBeginDate = "2025-08-11";
const travelEndDate = "2025-08-21";
const days = (() => {
  const ms = 24 * 60 * 60 * 1000;
  const b = new Date(travelBeginDate);
  const e = new Date(travelEndDate);
  const bd = new Date(b.getFullYear(), b.getMonth(), b.getDate());
  const ed = new Date(e.getFullYear(), e.getMonth(), e.getDate());
  return Math.max(1, Math.round((ed - bd) / ms) + 1); // 포함 계산
})();

const loading = ref(false); // 호출 안 하므로 false
const errorMsg = ref(""); // 에러 없음

const trip = ref({
  number: 1, // 임의 표시용
  days,
  destination: "서울 종로구",
});

const totalSpend = ref(879821);
const dailyAvg = ref(Math.round(totalSpend.value / trip.value.days));

const biggestExpense = ref({
  amount: 5555555,
  date: travelEndDate, // 응답에 개별 결제일이 없어서 종료일로 표기
  merchant: "이재정 계좌로 송금",
});

const categories = ref([
  { name: "교통", amount: 150000 },
  { name: "숙박", amount: 230000 },
  { name: "쇼핑", amount: 190000 },
  { name: "먹거리", amount: 200000 },
  { name: "문화여가", amount: 109821 },
]);

/* ==============
   API 코드 보류
   ============== */
// const route = useRoute();
// const travelId = computed(() => route.params.travelId);
// onMounted(fetchReport);
// watch(travelId, () => fetchReport());
// async function fetchReport() { /* 주석 처리 */ }
</script>

<template>
  <NotebookPaper>
    <div class="mx-auto max-w-[420px] px-4 pb-24">
      <ReportHeader />

      <section v-if="loading" class="mt-8 text-center text-slate-500">불러오는 중…</section>
      <section v-else-if="errorMsg" class="mt-8 text-center text-rose-500">{{ errorMsg }}</section>

      <template v-else>
        <section class="mt-6">
          <TitleBlock
            :trip-number="trip.number"
            :days="trip.days"
            :destination="trip.destination"
          />
        </section>

        <section class="mt-6">
          <TotalSpendCard :total="totalSpend" />
        </section>

        <section class="mt-8">
          <DailyAverageCard :avg="dailyAvg" />
        </section>

        <section class="mt-8">
          <BiggestExpenseCard
            :amount="biggestExpense.amount"
            :date="biggestExpense.date"
            :merchant="biggestExpense.merchant"
          />
        </section>

        <section class="mt-10">
          <CategoryChart :categories="categories" :total="totalSpend" />
        </section>
      </template>
    </div>
  </NotebookPaper>
</template>
