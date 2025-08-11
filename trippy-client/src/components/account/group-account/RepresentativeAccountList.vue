<script setup>
import { Icon } from "@iconify/vue";
import { defineProps, ref } from "vue";
import AccountNotice from "./AccountNotice.vue";

const props = defineProps({
  accountList: Array,
  accountBank: String,
  accountNumber: String,
});

const emits = defineEmits(["selectAccount"]);

const isOpen = ref(false);

const openList = () => {
  isOpen.value = !isOpen.value;
};

const selectAccount = (account) => {
  isOpen.value = !isOpen.value;
  emits("selectAccount", account);
};
</script>

<template>
  <div class="w-full">
    <div
      @click="openList"
      class="text-center border-[1px] border-gray bg-white rounded-xl h-16 mt-10 flex items-center justify-center gap-8"
    >
      <p
        class="button1 text-center ml-20 flex-1"
        :class="props.accountBank ? 'text-gray-700' : 'text-gray-400'"
      >
        {{
          props.accountBank && props.accountNumber
            ? `${props.accountBank}   ${props.accountNumber}`
            : "대표계좌를 선택해 주세요"
        }}
      </p>
      <Icon
        icon="material-symbols:keyboard-arrow-down-rounded"
        class="transform size-9 w-12"
        :class="isOpen ? 'rotate-180' : ''"
      />
    </div>

    <div
      class="w-full bg-white rounded-xl border-[1px] h-[16rem] border-gray overflow-scroll [&::-webkit-scrollbar]:hidden"
      v-if="isOpen"
    >
      <ul class="p-2">
        <li
          v-for="account in props.accountList"
          :key="account.account"
          class="hover:bg-gray-100 rounded-xl h-auto cursor-pointer transition-colors duration-200"
          @click="selectAccount(account)"
        >
          <div class="flex justify-between items-center h-10 mx-3">
            <p class="body2">{{ account.bankName }}</p>
            <p class="body2">{{ account.account }}</p>
          </div>
        </li>
      </ul>
    </div>

    <AccountNotice
      v-if="!isOpen"
      :title="'*정산하기 및 환급받을 계좌로 사용됩니다.'"
      class="mt-10 caption2"
    />
  </div>
</template>

<style scoped></style>
