<script setup>
import { ref, defineEmits, computed, onMounted } from "vue";

import { useAccountStore } from "@/stores/accountStore.js";
import SelectAccountItem from "@/components/account/personal-accounts/SelectAccountItem.vue";
import NextButton from "@/components/common/buttons/NextButton.vue";

const emit = defineEmits(["next"]);

const accountStore = useAccountStore();

const accountsData = ref([]);

const toggleCheck = (index) => {
  if (!accountsData.value) return;

  accountsData.value[index].isChecked = !accountsData.value[index].isChecked;
};

const isAnyChecked = computed(() =>
  accountsData.value?.some((account) => account.isChecked)
);

const handleClick = () => {
  if (!accountsData.value) return;

  const selectedAccounts = accountsData.value
    .filter((a) => a.isChecked)
    .map(({ isChecked, ...rest }) => rest);

  accountStore.setSelectedAccountList(selectedAccounts);
  emit("next");
};

onMounted(() => {
  accountsData.value = accountStore.codefAccountList.data.map(account => ({
    ...account,
    isChecked: false
  }));

  console.log("계좌데이터:", accountsData.value);
});
</script>

<template>
  <div class="flex flex-col gap-8 mt-4">
    <h1 class="title2">등록할 계좌를 선택해 주세요.</h1>
    <div class="flex flex-col gap-3 overflow-scroll mb-28">
      <div
        v-for="(item, index) in accountsData"
        @click="() => toggleCheck(index)">
        <SelectAccountItem :data="item" />
      </div>
    </div>
    <div class="fixed bottom-0 left-0 right-0 z-50 w-full max-w-full pt-4 pb-[34px] px-4 bg-white md:max-w-[375px] md:mx-auto">
      <NextButton
        title="계좌 등록하기"
        :disabled="!isAnyChecked"
        @click="handleClick"
      />
    </div>
  </div>
</template>
