<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { getTravelReport } from "@/api/travelLog"; // 이미 만들어둔 함수 사용

import NotebookPaper from "@/components/travel-logs/NotebookPaper.vue";
import ReportHeader from "@/components/travel-logs/ReportHeader.vue";
import TitleBlock from "@/components/travel-logs/TitleBlock.vue";
import TotalSpendCard from "@/components/travel-logs/TotalSpendCard.vue";
import DailyAverageCard from "@/components/travel-logs/DailyAverageCard.vue";
import BiggestExpenseCard from "@/components/travel-logs/BiggestExpenseCard.vue";
import CategoryChart from "@/components/travel-logs/CategoryChart.vue";

const route = useRoute();
const travelId = computed(() => Number(route.params.travelId)); // 숫자 변환

const loading = ref(true);
const errorMsg = ref("");

const trip = ref({ number: 0, days: 0, destination: "" });
const totalSpend = ref(0);
const dailyAvg = ref(0);
const biggestExpense = ref({ amount: 0, date: "", merchant: "" });
const categories = ref([
  { name: "교통", amount: 0 },
  { name: "숙박", amount: 0 },
  { name: "쇼핑", amount: 0 },
  { name: "먹거리", amount: 0 },
  { name: "문화여가", amount: 0 },
]);

onMounted(fetchReport);
watch(travelId, fetchReport); // URL 파라미터가 바뀌면 재조회

function daysInclusive(beginISO, endISO) {
  if (!beginISO || !endISO) return 0;
  const ms = 24 * 60 * 60 * 1000;
  const b = new Date(beginISO),
    e = new Date(endISO);
  const bd = new Date(b.getFullYear(), b.getMonth(), b.getDate());
  const ed = new Date(e.getFullYear(), e.getMonth(), e.getDate());
  return Math.max(1, Math.round((ed - bd) / ms) + 1); // 시작~종료 포함
}

async function fetchReport() {
  if (!travelId.value) {
    errorMsg.value = "유효한 여행 ID가 없습니다.";
    loading.value = false;
    return;
  }
  loading.value = true;
  errorMsg.value = "";

  try {
    // 응답 예시:
    // { code, message, data: { travelId, destination, travelBeginDate, travelEndDate, ... } }
    const r = await getTravelReport(travelId.value);

    // 총액/카테고리
    totalSpend.value = r.totalExpense ?? 0;
    categories.value = [
      { name: "교통", amount: r.totalTransport ?? 0 },
      { name: "숙박", amount: r.totalAcc ?? 0 },
      { name: "쇼핑", amount: r.totalShop ?? 0 },
      { name: "먹거리", amount: r.totalFood ?? 0 },
      { name: "문화여가", amount: r.totalActivity ?? 0 },
    ];

    // 기간/목적지/일수/일평균
    const d = daysInclusive(r.travelBeginDate, r.travelEndDate);
    trip.value = {
      number: r.travelId ?? 0,
      days: d,
      destination: r.destination ?? "",
    };
    dailyAvg.value = d > 0 ? Math.round(totalSpend.value / d) : 0;

    // 최대 지출 → 카드 필드 매핑
    biggestExpense.value = {
      amount: r.maxSpendingAmount ?? 0,
      date: r.travelEndDate ?? "", // 응답에 개별 결제일이 없으므로 종료일로 표기
      merchant: r.maxSpendingTitle ?? "",
    };
  } catch (e) {
    console.error(e);
    errorMsg.value = "리포트 조회에 실패했습니다.";
  } finally {
    loading.value = false;
  }
}
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
