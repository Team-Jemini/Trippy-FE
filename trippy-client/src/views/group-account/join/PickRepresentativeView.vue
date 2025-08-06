<script setup>
import { ref } from "vue";
import accountList from "@/_dummy/accountList_dummy.json";
import RepresentativeAccountList from "@/components/group-account/RepresentativeAccountList.vue";
import { useGroupJoinStore } from "@/stores/groupAccountJoinStore";
import NextButton from "@/components/common/NextButton.vue";
import router from "@/router";

const groupJoinStore = useGroupJoinStore();

const selectAccountNumber = ref("");
const selectAccountBank = ref("");

const selectAccount = (account) => {
  selectAccountBank.value = account.bankName;
  selectAccountNumber.value = account.account;
};

const onClick = () => {
  groupJoinStore.setRepresentativeAccount(selectAccountNumber.value, selectAccountBank.value);
  router.push({ name: "group-join-complete" });
};
</script>

<template>
  <div class="flex flex-col h-full w-full bg-white justify-between">
    <div>
      <div>
        <p class="title1 text-center mt-40">대표계좌를 설정해 주세요</p>
      </div>
      <RepresentativeAccountList
        :accountList="accountList"
        @selectAccount="selectAccount"
        :accountBank="selectAccountBank"
        :accountNumber="selectAccountNumber"
      />
    </div>
    <NextButton :title="'참여완료하기'" :disabled="!selectAccountBank" @click="onClick" />
  </div>
</template>

<style scoped></style>
