<script setup>
import { ref } from "vue";
import accountList from "@/_dummy/accountList_dummy.json";
import RepresentativeAccountList from "@/components/account/group-account/RepresentativeAccountList.vue";
import { useGroupAccountStore } from "@/stores/groupAccountStore";
import NextButton from "@/components/common/buttons/NextButton.vue";
import router from "@/router";

const groupAccountStore = useGroupAccountStore();

const selectAccountNumber = ref("");
const selectAccountBank = ref("");

const selectAccount = (account) => {
  selectAccountBank.value = account.bankName;
  selectAccountNumber.value = account.account;
};

const onClick = () => {
  groupAccountStore.setRepresentativeAccount(selectAccountNumber.value, selectAccountBank.value);
  router.push({ name: "group-account-create-complete" });
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
    <NextButton :title="'다음'" :disabled="!selectAccountBank" @click="onClick" />
  </div>
</template>

<style scoped></style>
