// src/stores/exchangeStore.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import exchangeRatesRaw from "@/_dummy/exchange_dummy.json";
import { bankAccounts } from "@/_dummy/bankAccounts_dummy.js";
import { currencyToCountryMap } from "@/assets/currencyToCountryCodes.js";

export const useExchangeStore = defineStore("exchange", () => {
  const exchangeRates = ref(exchangeRatesRaw);
  const loading = ref(false);

  // api 연결 시 사용할 함수.
  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}${mm}${dd}`;
  };

  // 실제 코드 - 매일 날짜 갱신 됨.
  // const today = new Date();
  // const yesterday = new Date();
  // yesterday.setDate(today.getDate() - 1);

  // const todayForm = formatDate(today);
  // const yesterdayForm = formatDate(yesterday);

  // (개발용) 임시 날짜로 지정해둠
  const todayForm = "20250722";
  const yesterdayForm = "20250721";

  const todayRates = computed(() =>
    exchangeRates.value.filter((item) => item.deal_ymd === todayForm),
  );

  const yesterdayRates = computed(() =>
    exchangeRates.value.filter((item) => item.deal_ymd === yesterdayForm),
  );

  const getYesterdayRate = (curUnit) => {
    const found = yesterdayRates.value.find((item) => item.cur_unit === curUnit);
    return found?.deal_bas_r || null;
  };

  const getCountryCode = (curUnitRaw) => {
    const curUnit = curUnitRaw.replace(/\(.*\)/, "").trim();
    return currencyToCountryMap[curUnit] || "un";
  };

  const parseCurrencyCode = (code) => {
    return code.replace(/\(.*\)/, "").trim(); // "JPY(100)" → "JPY"
  };

  const selectedCurrencyCode = ref(null);

  const setSelectedCurrencyCode = (code) => {
    selectedCurrencyCode.value = code;
  };

  const selectedAccount = ref(null);

  const setSelectedAccount = (account) => {
    selectedAccount.value = account;
  };

  const selectedTodayRate = computed(() => {
    if (!selectedCurrencyCode.value) return null;
    return todayRates.value.find((item) => item.cur_unit === selectedCurrencyCode.value);
  });

  const selectedCurrencyName = computed(() => {
    if (!selectedCurrencyCode.value) return null;
    const match = todayRates.value.find((item) => item.cur_unit === selectedCurrencyCode.value);
    return match?.cur_nm || null;
  });

  const accounts = ref(bankAccounts);
  const foreignCurrencyAccount = computed(() =>
    accounts.value.find((acc) => acc.accountType === "외화예금"),
  );

  const inputForeignAmount = ref("");
  const inputKrwAmount = ref("");

  return {
    exchangeRates,
    todayRates,
    yesterdayRates,
    getYesterdayRate,
    getCountryCode,
    todayForm,
    yesterdayForm,
    loading,
    formatDate,
    selectedCurrencyCode,
    setSelectedCurrencyCode,
    selectedAccount,
    setSelectedAccount,
    selectedTodayRate,
    selectedCurrencyName,
    accounts,
    foreignCurrencyAccount,
    inputForeignAmount,
    inputKrwAmount,
    parseCurrencyCode,
  };
});
