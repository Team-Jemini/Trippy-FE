<script setup>
import { computed, onMounted, ref } from "vue";
import TransferButton from "@/components/common/buttons/TransferButton.vue";
import TransactionFilter from "@/components/account/TransactionFilter.vue";
import TransactionItem from "@/components/account/TransactionItem.vue";
import SelectAccountModal from "@/components/account/SelectAccountModal.vue";
import { useRoute } from "vue-router";
import { useAccountStore } from "@/stores/accountStore";

const accountStore = useAccountStore();
const route = useRoute();
const filter = ref("all");
const isModalOpen = ref(false);

const accountDetail = ref(null);
const accountName = ref("");
const balance = ref(0);
const transactions = ref([]);

const isParsonal = computed(() => route.path.startsWith("/personal-account"));

const accountId = computed(() => String(route.params.accountId));

// 거래 구분 필터 handle 함수
const updateFilter = (newFilter) => {
  filter.value = newFilter;
  console.log(filter.value);
};

const openModal = () => {
  isModalOpen.value = true;
};

onMounted(async () => {
  if (isParsonal.value) {
    await accountStore.getPersonalAccountDetail(accountId);
    accountDetail.value = accountStore.personalAccountDetail;
    console.log(`accountDetail: ${JSON.stringify(accountDetail.value)}`);

    accountName.value = accountDetail.value.accountName;
    balance.value = accountDetail.value.balance;
    transactions.value = accountDetail.value.transactions;
  }
});
</script>

<template>
  <div class="w-full h-full">
    <div class="bg-white flex flex-col gap-8 pb-4">
      <div class="flex flex-col gap-2">
        <p class="body2">국민은행 123-1232312-123</p>
        <h1 class="title1">23,456,789원</h1>
      </div>
      <div class="flex gap-4">
        <TransferButton type="add" @click="openModal" />
        <TransferButton type="send" />
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
