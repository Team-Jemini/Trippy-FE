<script setup>
import { defineProps, defineEmits, ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

import { Icon } from "@iconify/vue";
import AccountItem from "@/components/account/AccountItem.vue";
import { bankAccounts } from "@/_dummy/bankAccounts_dummy.js";
import { useTransferStore } from "@/stores/transferStore.js";

const props = defineProps({
  modelValue: Boolean,
  accountList: Array,
});

const router = useRouter();
const transferStore = useTransferStore();

const emit = defineEmits(["update:modelValue"]);

const handleSelect = (account) => {
  if (!account) return;

  // selectedAccount.value = account;
  transferStore.setToAccountId(account.accountId); // 계좌 목록 조회 API 연동 후 인자 변경하기

  router.push("/personal-accounts/add");
};

const closeModal = () => {
  emit("update:modelValue", false);
};

onMounted(() => {
  document.body.style.overflow = "hidden";
});

onUnmounted(() => {
  document.body.style.overflow = "";
});
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-end justify-center bg-black/40"
    :class="{ 'opacity-100': props.modelValue, 'opacity-0 pointer-events-none': !props.modelValue }"
    @click.self="closeModal"
  >
    <div
      class="w-full pt-8 px-2 pb-[34px] rounded-t-2xl bg-white transition-transform duration-300"
      :class="{
        'translate-y-0': props.modelValue,
        'translate-y-full': !props.modelValue,
      }"
    >
      <div class="flex flex-col max-h-[65vh] gap-4 max-h-96">
        <div class="flex mx-4 justify-between items-center">
          <h3 class="title2">어떤 계좌에서 돈을 가져올까요?</h3>
          <Icon
            icon="material-symbols:close-rounded"
            class="size-6 text-gray-400 rounded-full active:bg-blue-100"
            @click="closeModal"
          />
        </div>
        <ul class="w-full overflow-scroll hide-scrollbar">
          <li
            class="flex cursor-pointer"
            v-for="account in accountList"
            :key="account.accountId"
            @click="handleSelect(account)"
          >
            <AccountItem :data="account" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
