<script setup>
import { ref, defineProps, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { Icon } from "@iconify/vue";
import { defineProps } from "vue";
import { numberWithCommas } from "@/assets/utils";

const props = defineProps({
  toggleGroupAccount: Boolean,
  account: Object,
});
</script>

<template>
  <div class="flex flex-col bg-main-gradient w-full h-40 p-4 rounded-xl hover:opacity-90">
    <RouterLink
      v-if="!props.account || Object.keys(props.account).length === 0"
      :to="props.toggleGroupAccount ? '/group-account/create' : '/personal-accounts/import'"
    >
      <div class="text-white flex flex-col items-center gap-2 my-auto">
        <Icon icon="material-symbols:add-2-rounded" class="w-16 h-16" />
        <div class="flex flex-col items-center">
          <h3 class="body1">대표계좌 등록하기</h3>
          <p class="caption3">빠르게 조회하고 싶은 계좌를 등록해보세요</p>
        </div>
      </div>
    </RouterLink>

    <RouterLink
      v-else
      :to="
        props.toggleGroupAccount
          ? { name: 'group-account-detail', params: { accountId: account.accountId } }
          : { name: 'personal-accounts-detail', params: { accountId: account.accountId } }
      "
    >
      <div class="flex flex-col text-white gap-3 my-auto">
        <div class="flex justify-between">
          <p class="caption2">{{ account.accountName }}님의 계좌</p>
          <Icon icon="material-symbols:more-horiz" class="w-7 h-7" />
        </div>
        <div class="flex flex-col">
          <p class="body2">{{ toggleGroupAccount ? "Trippy" : "국민은행" }}</p>
          <p class="subtitle1">{{ account.accountId }}</p>
        </div>
        <div class="w-full flex justify-end">
          <h2 class="title1">
            {{ `${numberWithCommas(account.balance)} 원` }}
          </h2>
        </div>
      </div>
    </RouterLink>
  </div>
</template>
