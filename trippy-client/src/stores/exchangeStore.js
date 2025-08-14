import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { bankAccounts } from "@/_dummy/bankAccounts_dummy.js";
import { currencyToCountryMap } from "@/assets/currencyToCountryCodes.js";
import api from "@/api/account.js";
import {
  postExchangeRate,
  getExchangeRate,
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
  const fetchAccounts = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await api.getPersonalAccountList();
      accountList.value = data;
    } catch (err) {
      console.error("계좌 목록 가져오기 실패: ", err);
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  // 3. 선택한 통화의 환율 및 계좌 잔액 출력 (환전 금액 입력 뷰)
  const rateAndBalance = ref([]);
  const fetchRateAndBalance = async (accountId, currencyCode) => {
    loading.value = true;
    error.value = null;
    try {
      const data = await getRatesAndBalance(accountId, currencyCode);
      rateAndBalance.value = data;
    } catch (err) {
      console.error("선택한 통화 환율 및 계좌 잔액 가져오기 실패: ", err);
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  // 4. 환전한 내역 DB로 저장
  const fetchExchange = async (
    krwAmount,
    krwAccountId,
    foreignAmount,
    foreignAccountId,
    currencyCode,
  ) => {
    loading.value = true;
    error.value = null;
    try {
      await postExchange(krwAmount, krwAccountId, foreignAmount, foreignAccountId, currencyCode);
    } catch (err) {
      console.error("환전 정보 DB 저장 실패 ", err);
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
  const selectedAccountId = ref(null);
  const setSelectedAccount = (account) => {
    selectedAccount.value = account;
    selectedAccountId.value = selectedAccount;
  };

  const selectedTodayRate = computed(() => {
    if (!selectedCurrencyCode.value) return null;
    return exchangeRates.value.find((item) => item.currencyCode === selectedCurrencyCode.value);
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
    selectedAccountId,
    setSelectedAccount,
    selectedTodayRate,
    accounts,
    foreignCurrencyAccount,
    inputForeignAmount,
    inputKrwAmount,
    parseCurrencyCode,
    fetchExchangeRates,
    fetchAccounts,
    accountList,
    rateAndBalance,
    fetchRateAndBalance,
    fetchExchange,
  };
});
