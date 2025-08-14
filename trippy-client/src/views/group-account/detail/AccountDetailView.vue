<script setup>
import { onMounted, ref, computed } from "vue";
import TransferButton from "@/components/common/buttons/TransferButton.vue";
import TransactionFilter from "@/components/account/TransactionFilter.vue";
import TransactionItem from "@/components/account/TransactionItem.vue";
import { useGroupAccountStore } from "@/stores/groupAccountStore";
import { Icon } from "@iconify/vue";
import SelectAccountModal from "@/components/account/SelectAccountModal.vue";
import { useRoute, useRouter } from "vue-router";
import { numberWithCommas } from "@/assets/utils";
import { useAccountStore } from "@/stores/accountStore";

const router = useRouter();
const route = useRoute();
const filter = ref("ALL");
const groupAccountStore = useGroupAccountStore();
const accountStore = useAccountStore();

const accountId = computed(() => String(route.params.accountId));

const accountName = ref("");
const balance = ref(0);
const transactions = ref([]);
const role = ref("");

const accountDetail = ref(null);

const accountList = ref([]);

// 거래 구분 필터 handle 함수
const updateFilter = async (newFilter) => {
  filter.value = newFilter;
  await groupAccountStore.getGrouplAccountTransactionFilter(accountId, filter.value);
  transactions.value = groupAccountStore.groupAccountTransactionFilter;
};

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const onClick = () => {
  router.push({ name: "send-select-recipient", params: { accountId: accountId.value } });
};

onMounted(async () => {
  await groupAccountStore.getGroupAccountDetail(accountId.value);
  accountDetail.value = groupAccountStore.groupAccountDetail;
  accountName.value = accountDetail.value.accountName;
  balance.value = accountDetail.value.balance;
  transactions.value = accountDetail.value.transactions;
  role.value = accountDetail.value.role;

  if (accountStore.personalAccountList.length === 0) {
    await accountStore.getParsonalAccountList();
  }

  accountList.value = accountStore.personalAccountList
    .filter((account) => account.accountType === "person")
    .filter((account) => account.accountId !== accountId.value);
});
</script>

<template>
  <div class="w-full h-full">
    <div class="bg-white flex flex-col gap-8 pb-4">
      <div class="flex justify-between">
        <div class="flex flex-col gap-2">
          <p class="body2">{{ `${accountName} ${accountId}` }}</p>
          <h1 class="title1">{{ `${numberWithCommas(balance)}원` }}</h1>
        </div>
        <div class="flex flex-col items-end gap-2">
          <Icon
            icon="material-symbols:settings-rounded"
            class="size-6 text-gray-500"
            @click="router.push({ name: 'group-account-settings' })"
          />
          <div
            v-if="role == 'leader'"
            class="flex items-center text-gray-500"
            @click="router.push({ name: 'group-settle-target', params: { accountId: accountId } })"
          >
            <p class="subtitle2">정산 요청하기</p>
            <Icon icon="material-symbols:arrow-back-ios-new-rounded" class="rotate-180" />
          </div>
        </div>
      </div>
      <div class="flex gap-4">
        <TransferButton type="add" @click="openModal" />
        <TransferButton v-if="role === 'leader'" type="send" @click="onClick" />
      </div>
    </div>
    <div class="bg-gray-100 h-4 mx-[-16px]"></div>
    <div class="flex flex-col pt-4 gap-4">
      <TransactionFilter :filter="filter" @update:filter="updateFilter" />
      <TransactionItem :transactions="transactions" />
    </div>

    <SelectAccountModal v-model="isModalOpen" :accountList="accountList" />
  </div>
</template>
