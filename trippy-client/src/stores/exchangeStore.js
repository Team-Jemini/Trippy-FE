// src/stores/exchangeStore.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";
// import exchangeRatesRaw from "@/_dummy/exchange_dummy.json";
import { bankAccounts } from "@/_dummy/bankAccounts_dummy.js";
import { currencyToCountryMap } from "@/assets/currencyToCountryCodes.js";
import {
  postExchangeRate,
  getExchangeRate,
  getAccountList,
  getRatesAndBalance,
  postExchange,
} from "@/api/exchange.js";

export const useExchangeStore = defineStore("exchange", () => {
  const loading = ref(false);
  const error = ref(null);

  // api 연결 시 사용할 함수.
  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}${mm}${dd}`;
  };

  // 1. 환율 정보 저장
  const exchangeRates = ref([]);

  const fetchExchangeRates = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await getExchangeRate();
      exchangeRates.value = data;
    } catch (err) {
      console.error("환율 정보 가져오기 실패: ", err);
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  // 2. 계좌 목록 저장
  const accountList = ref([]);
  const fetchAccounts = async (userId = 1) => {
    loading.value = true;
    error.value = null;
    try {
      const data = await getAccountList(userId); // 유저 1인 경우 가정
      accountList.value = data;
    } catch (err) {
      console.error("계좌 목록 가져오기 실패: ", err);
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  const getCountryCode = (countryCodeRaw) => {
    const curUnit = countryCodeRaw.replace(/\(.*\)/, "").trim();
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
    return exchangeRates.value.find((item) => item.cur_unit === selectedCurrencyCode.value);
  });

  const selectedCurrencyName = computed(() => {
    if (!selectedCurrencyCode.value) return null;
    const match = exchangeRates.value.find((item) => item.cur_unit === selectedCurrencyCode.value);
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
    getCountryCode,
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
    fetchExchangeRates,
    fetchAccounts,
    accountList,
  };
});
