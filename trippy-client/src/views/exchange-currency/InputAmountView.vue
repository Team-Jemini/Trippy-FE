<script setup>
import { ref, watch, computed } from "vue";
import { useExchangeStore } from "@/stores/exchangeStore";
import { storeToRefs } from "pinia";
import { Icon } from "@iconify/vue";
import triangle from "@/assets/svg/triangle.svg";
import NextButton from "@/components/common/NextButton.vue";
import { useRouter } from "vue-router";
import NumberKeypad from "@/components/common/NumberKeypad.vue";
import { numberWithCommas } from "@/assets/utils";

const exchangeStore = useExchangeStore();

const {
  selectedAccount,
  selectedCurrencyCode,
  selectedTodayRate,
  selectedCurrencyName,
  foreignCurrencyAccount,
  inputForeignAmount,
  inputKrwAmount,
} = storeToRefs(exchangeStore);
const { parseCurrencyCode } = exchangeStore;

// div 부분 영역 클릭해도 입력칸 활성화되는 코드
const foreignInputRef = ref(null);
const krwInputRef = ref(null);

const focusForeignInput = () => {
  activeInput.value = "foreign";
  foreignInputRef.value?.focus();
};
const focusKrwInput = () => {
  activeInput.value = "krw";
  krwInputRef.value?.focus();
};

// 입력값 환율 자동 계산해주는 부분
const foreignAmount = ref("");
const krwAmount = ref("");

let updatingFromForeign = false;
let updatingFromKrw = false;

const displayForeignAmount = computed({
  get() {
    return numberWithCommas(foreignAmount.value);
  },
  set(val) {
    const numeric = val
      .replace(/[^0-9.]/g, "")
      .replace(/^0+(?=\d)/, "")
      .replace(/(\..*?)\..*/g, "$1");
    foreignAmount.value = numeric;
  },
});

const displayKrwAmount = computed({
  get() {
    return numberWithCommas(krwAmount.value);
  },
  set(val) {
    const numeric = val
      .replace(/[^0-9.]/g, "")
      .replace(/^0+(?=\d)/, "")
      .replace(/(\..*?)\..*/g, "$1");
    krwAmount.value = numeric;
  },
});

// 현재 선택된 입력창 (foreign or krw)
const activeInput = ref("foreign");

inputForeignAmount.value = foreignAmount.value;
inputKrwAmount.value = krwAmount.value;

watch(krwAmount, (newVal) => {
  if (updatingFromForeign) {
    updatingFromForeign = false;
    return;
  }
  if (!selectedTodayRate.value?.deal_bas_r) return;

  const rate = Number(selectedTodayRate.value.deal_bas_r);
  const krw = parseFloat(newVal);
  if (isNaN(krw)) {
    foreignAmount.value = " ";
    return;
  }
  updatingFromKrw = true;
  foreignAmount.value = (krw / rate).toFixed(2);

  inputKrwAmount.value = parseFloat(newVal).toFixed(2);
  inputForeignAmount.value = parseFloat(foreignAmount.value);
});

watch(foreignAmount, (newVal) => {
  if (updatingFromKrw) {
    updatingFromKrw = false;
    return;
  }
  if (!selectedTodayRate.value?.deal_bas_r) return;
  const rate = Number(selectedTodayRate.value.deal_bas_r);
  const foreign = parseFloat(newVal);
  if (isNaN(foreign)) {
    krwAmount.value = " ";
    return;
  }
  updatingFromForeign = true;
  krwAmount.value = (foreign * rate).toFixed(2);
  inputForeignAmount.value = parseFloat(newVal).toFixed(2);
  inputKrwAmount.value = parseFloat(krwAmount.value);
});

// 기존 잔액이 없는 외화통화에 대한 환전 시 잔액 0 데이터 추가
watch(selectedCurrencyCode, (newCode) => {
  if (
    foreignCurrencyAccount.value?.accountType === "외화예금" &&
    foreignCurrencyAccount.value.balance &&
    foreignCurrencyAccount.value.balance[newCode] === undefined
  ) {
    foreignCurrencyAccount.value.balance[newCode] = 0;
  }
});

const router = useRouter();
const goToPasswordView = () => {
  router.push("/exchange-currency-password");
};

const onPressKey = (num) => {
  if (activeInput.value === "foreign" && foreignAmount.value.length < 10) {
    foreignAmount.value += String(num);
  }
  if (activeInput.value === "krw" && krwAmount.value.length < 10) {
    krwAmount.value += String(num);
  }
};

const onDeleteKey = () => {
  if (activeInput.value === "foreign") {
    foreignAmount.value = foreignAmount.value.slice(0, -1);
  }
  if (activeInput.value === "krw") {
    krwAmount.value = krwAmount.value.slice(0, -1);
  }
};
</script>

<template>
  <div class="flex flex-col h-full justify-between">
    <div class="w-full flex flex-col items-center p-4">
      <div class="flex flex-wrap w-full items-center justify-between m-6">
        <p class="subtitle2 break-words">
          1 {{ selectedCurrencyCode }} = {{ selectedTodayRate.deal_bas_r }} 원
        </p>
        <div class="flex text-gray-500 break-words items-center">
          <a class="subtitle2"> 원하는 환율에 사기</a>
          <Icon icon="ic:round-navigate-next" class="w-8 h-auto"></Icon>
        </div>
      </div>

      <!-- 잔액 내역 표시 칸 -->
      <div class="flex flex-col w-full">
        <div class="flex gap-4 mb-0 ml-4 mr-8 text-left">
          <p class="subtitle2">{{ selectedCurrencyName }}</p>
          <p class="whitespace-nowrap caption2 text-gray-500">
            잔액 : {{ numberWithCommas(foreignCurrencyAccount.balance[selectedCurrencyCode]) || 0 }}
            {{ parseCurrencyCode(selectedCurrencyCode) }}
          </p>
        </div>
        <!-- 금액 입력칸 -->
        <div
          class="flex justify-end w-full h-16 border border-solid border-blue-400 rounded-lg"
          @click="focusForeignInput"
        >
          <input
            ref="foreignInputRef"
            type="text"
            v-model="displayForeignAmount"
            maxlength="13"
            class="bg-transparent border-nonde focus:outline-none text-right"
          />
          <p class="mx-4 self-center">
            {{ parseCurrencyCode(selectedCurrencyCode) }}
          </p>
        </div>
      </div>

      <!-- 가운데 구분 삼각형 -->
      <div class="flex flex-col justify-center my-2">
        <triangle class="mb-0 m-1"></triangle>
        <triangle class="scale-y-[-1] mt-1 m-1"></triangle>
      </div>
      <!-- 가운데 구분 삼각형 -->

      <!-- 잔액 표시 -->
      <div class="flex flex-col w-full">
        <div class="flex gap-4 mb-0 ml-4 mr-8">
          <p class="subtitle2">대한민국 원</p>
          <p class="whitespace-nowrap caption2 text-gray-500">
            잔액 : {{ numberWithCommas(selectedAccount.balance) }} 원
          </p>
        </div>
        <!-- 입력칸 -->
        <div
          class="flex justify-end w-full h-16 border border-solid border-blue-400 rounded-lg"
          @click="focusKrwInput"
        >
          <input
            ref="krwInputRef"
            type="text"
            v-model="displayKrwAmount"
            maxlength="13"
            class="bg-transparent w-full sm:w-[6rem] border-none focus:outline-none text-right"
          />
          <p class="mx-4 self-center">KRW</p>
        </div>
      </div>
    </div>
    <!-- 키패드 컴포넌트 삽입  -->
    <div class="mx-[-1rem] mb-2">
      <NextButton
        :title="'확인'"
        :disabled="!foreignAmount"
        :isRounded="false"
        @click="goToPasswordView"
      />
    </div>
    <NumberKeypad @press-key="onPressKey" @delete="onDeleteKey" type="amount" />
  </div>
</template>

<style></style>
