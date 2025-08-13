<script setup>
import { RouterLink } from "vue-router";
import { Icon } from "@iconify/vue";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { useGroupJoinStore } from "@/stores/groupAccountJoinStore";
import ToggleSwitch from "@/components/common/ToggleSwitch.vue";
import AccountCard from "@/components/home/AccountCard.vue";
import ShortcutItems from "@/components/home/ShortCutItems.vue";
import ExchangeRateItems from "@/components/home/ExchangeRateItems.vue";
import GroupAccountJoinModal from "@/components/common/modals/GroupAccountJoinModal.vue";
import router from "@/router";
import { useGroupAccountStore } from "@/stores/groupAccountStore";
import { useAccountStore } from "@/stores/accountStore";

const groupAccountStore = useGroupAccountStore();
const accountStore = useAccountStore();
const groupJoinStore = useGroupJoinStore();
const route = useRoute();
const inviteInfo = ref(null);
const showInviteModal = ref(false);

const groupAccountList = ref([{}]);
const accountList = ref([{}]);
const toggleGroupAccount = ref(false);

const closeShowInviteModal = () => {
  const { token, ...restQuery } = route.query;
  router.replace({ query: { ...restQuery } });
  showInviteModal.value = false;
};

onMounted(async () => {
  await groupAccountStore.getGroupAccountList();
  await accountStore.getParsonalAccountList();
  if (accountStore.personalAccountList.length > 0) {
    accountList.value = accountStore.personalAccountList.filter(
      (account) => account.accountType === "person",
    );
  }
  if (groupAccountStore.groupAccountList.length > 0) {
    groupAccountList.value = groupAccountStore.groupAccountList;
  }
});

onMounted(async () => {
  const token = route.query.token;

  if (token) {
    await groupJoinStore.inviteInfoToken(token);
    inviteInfo.value = groupJoinStore.inviteInfo;
    if (inviteInfo.value) {
      showInviteModal.value = true;
    }
  }
});
</script>

<template>
  <main class="w-full h-full flex flex-col gap-8">
    <div class="flex flex-col gap-4">
      <ToggleSwitch label="모임통장 보기" @click="toggleGroupAccount = !toggleGroupAccount" />

      <div
        class="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth"
        style="scrollbar-width: none; -ms-overflow-style: none"
      >
        <AccountCard
          v-for="(account, idx) in toggleGroupAccount ? groupAccountList : accountList"
          :key="account.accountId ?? idx"
          :account="account"
          :toggle-group-account="toggleGroupAccount"
          class="flex-shrink-0 w-64 snap-center"
        />
      </div>
    </div>

    <div class="flex flex-col gap-1">
      <h2 class="subtitle2">서비스 바로가기</h2>
      <div class="flex gap-2">
        <ShortcutItems />
      </div>
    </div>

    <div class="flex flex-col gap-1">
      <div class="flex justify-between items-center">
        <h2 class="subtitle2">환율 정보</h2>
        <RouterLink to="/exchange-rate">
          <div class="text-gray-400 flex items-center gap-1 hover:text-gray-600">
            <span class="caption2">환율 조회</span>
            <Icon icon="material-symbols:arrow-back-ios-rounded" class="w-3 h-3 rotate-180" />
          </div>
        </RouterLink>
      </div>
      <div class="flex gap-2">
        <ExchangeRateItems />
      </div>
    </div>

    <GroupAccountJoinModal
      v-if="showInviteModal"
      :groupInviteData="inviteInfo"
      :To="'/group-user/agreement'"
      @click="closeShowInviteModal"
    />
  </main>
</template>
