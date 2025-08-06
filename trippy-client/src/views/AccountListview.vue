<script setup>
import { onMounted, ref, watch, nextTick, computed } from "vue";
import { useAccountStore } from "@/stores/accountStore";
import router from "@/router";
import { Icon } from "@iconify/vue";
import UnifiedAccountCard from "@/components/account/UnifiedAccountCard.vue";
import ToggleSwitch from "@/components/common/ToggleSwitch.vue";
import QuickAddButton from "@/components/buttons/QuickAddButton.vue";
import AccountIcon from "@/assets/svg/account-icon.svg";

const accountStore = useAccountStore();
const showGroupAccount = ref(false);
const scrollContainer = ref(null);

const accountList = computed(() => accountStore.filterAccountList);

onMounted(async () => {
  await accountStore.GetAccountList();
  accountStore.FilterAccount(showGroupAccount.value);
});

// 토글 변화에 따라 계좌 목록 상단으로 이동 + 필터 적용
watch(showGroupAccount, async () => {
  accountStore.FilterAccount(showGroupAccount.value);
  await nextTick();
  if (scrollContainer.value) {
    scrollContainer.value.scrollTop = 0;
  }
});
</script>

<template>
  <div class="flex flex-col justify-between h-full w-full">
    <div class="flex justify-between items-center mb-3">
      <ToggleSwitch :label="'모임통장 보기'" @click="showGroupAccount = !showGroupAccount" />
      <div
        v-if="accountList.length > 0"
        class="flex hover:cursor-pointer"
        @click="
          showGroupAccount
            ? router.push({ name: 'group-account-create' })
            : router.push({ name: 'import-personal-accounts' })
        "
      >
        <p class="caption3 text-gray-500">계좌 추가하기</p>
        <Icon icon="material-symbols:arrow-back-ios-new-rounded" class="rotate-180 text-gray-500" />
      </div>
    </div>

    <div class="flex flex-col flex-1 overflow-scroll [&::-webkit-scrollbar]:hidden">
      <div
        v-if="accountList.length === 0"
        class="flex flex-col justify-center items-center h-full gap-3"
      >
        <AccountIcon />
        <p class="text-gray-400 subtitle2">
          {{ showGroupAccount ? "등록된 모임 계좌가 없습니다..." : "등록된 계좌가 없습니다..." }}
        </p>
      </div>

      <div v-else ref="scrollContainer">
        <UnifiedAccountCard
          v-for="(account, i) in accountList"
          :key="i"
          :account="account"
          :isGroupAccount="showGroupAccount"
          class="my-3"
        />
      </div>
    </div>

    <div class="flex justify-end mt-3" v-if="accountList.length === 0">
      <QuickAddButton
        @click="
          showGroupAccount
            ? router.push({ name: 'group-account-create' })
            : router.push({ name: 'import-personal-accounts' })
        "
      />
    </div>
  </div>
</template>

<style scoped></style>
