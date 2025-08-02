<script setup>
import { onMounted, ref } from "vue";

import TransferButton from "@/components/common/TransferButton.vue";
import TransactionFilter from "@/components/account/TransactionFilter.vue";
import TransactionItem from "@/components/account/TransactionItem.vue";
import transactions from "@/_dummy/transactions_dummy.json";
import { useGroupAccountStore } from "@/stores/groupAccountStore";
import { Icon } from "@iconify/vue";
import router from "@/router";
import SelectAccountModal from "@/components/account/SelectAccountModal.vue";

const filter = ref("all");
const groupAccountStore = useGroupAccountStore();

const role = ref("");

// 거래 구분 필터 handle 함수
const updateFilter = (newFilter) => {
  filter.value = newFilter;
  console.log(filter.value);
};

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const onClick = () => {
  //현재 계좌 정보 스토어에 저장
  router.push({ name: "send-select-recipient" });
};

onMounted(() => {
  role.value = groupAccountStore.userRoleInGroupAccount;
});
</script>

<template>
  <div class="w-full h-full">
    <div class="bg-white flex flex-col gap-8 pb-4">
      <div class="flex justify-between">
        <div class="flex flex-col gap-2">
          <p class="body2">국민은행 123-1232312-123</p>
          <h1 class="title1">23,456,789원</h1>
        </div>
        <div class="flex flex-col items-end gap-2">
          <Icon
            icon="material-symbols:settings-rounded"
            class="size-6 text-gray-500"
            @click="router.push({ name: 'group-account-settings' })"
          />
          <div
            class="flex items-center text-gray-500"
            @click="router.push({ name: 'group-settle-target' })"
          >
            <p class="subtitle2">정산 요청하기</p>
            <Icon icon="material-symbols:arrow-back-ios-new-rounded" class="rotate-180" />
          </div>
        </div>
      </div>
      <div class="flex gap-4">
        <TransferButton type="add" @click="openModal" />
        <TransferButton v-if="role == 'leader'" type="send" @click="onClick" />
      </div>
    </div>
    <div class="bg-gray-100 h-4 mx-[-16px]"></div>
    <div class="flex flex-col pt-4 gap-4">
      <TransactionFilter :filter="filter" @update:filter="updateFilter" />
      <TransactionItem :transactions="transactions" />
    </div>

    <SelectAccountModal v-model="isModalOpen" />
  </div>
</template>
