<script setup>
import { bankAccounts } from "@/_dummy/bankAccounts_dummy";
import { useExchangeStore } from "@/stores/exchangeStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import AccountItem from "@/components/account/AccountItem.vue";
import NextButton from "@/components/common/NextButton.vue";

const accountStore = useExchangeStore();
const { selectedAccount } = storeToRefs(accountStore);
const { setSelectedAccount } = accountStore;

const handleSelect = (account) => {
  setSelectedAccount(account);
};

const router = useRouter();
const goToAmountView = () => {
  router.push("/exchange-currency-amount");
};
</script>

<template>
  <div class="flex flex-col justify-between w-full">
    <div class="flex h-full flex-col justify-between gap-8 mb-6">
      <h2 class="text-center title2 mt-8">환전할 계좌를 선택해주세요</h2>
      <div class="text-center border-b-2 border-gray-300 w-full">
        <p v-if="selectedAccount" class="title4">
          {{ selectedAccount.bankName }} {{ selectedAccount.accountNumber }}
        </p>
        <p v-else class="title4 text-gray-400">계좌를 선택해 주세요</p>
      </div>
      <h3 class="subtitle1 ml-4 mb-1">내 계좌</h3>
    </div>
    <ul class="w-full overflow-scroll hide-scrollbar pb-12">
      <li
        class="flex cursor-pointer"
        v-for="account in bankAccounts"
        :key="account.accountNumber"
        @click="handleSelect(account)"
      >
        <AccountItem :data="account" />
      </li>
    </ul>
    <div
      class="fixed bottom-0 left-0 right-0 z-50 w-full max-w-full pt-4 pb-[34px] px-4 bg-white md:max-w-[375px] md:mx-auto"
    >
      <NextButton title="다음" @click="goToAmountView" :disabled="!selectedAccount" />
    </div>
  </div>
</template>

<style>
.hide-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
</style>
