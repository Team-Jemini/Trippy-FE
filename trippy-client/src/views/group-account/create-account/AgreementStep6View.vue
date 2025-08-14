<script setup>
import { onMounted, ref } from "vue";
import RepresentativeAccountList from "@/components/account/group-account/RepresentativeAccountList.vue";
import { useGroupAccountStore } from "@/stores/groupAccountStore";
import NextButton from "@/components/common/buttons/NextButton.vue";
import router from "@/router";
import { useAccountStore } from "@/stores/accountStore";

const groupAccountStore = useGroupAccountStore();
const accountStore = useAccountStore();

const selectAccountNumber = ref("");
const selectAccountBank = ref("");

const accountList = ref([]);

const selectAccount = (account) => {
  console.log(`account:`, account);

  selectAccountBank.value = account.accountName;
  selectAccountNumber.value = account.accountId;

  console.log(`selectAccountBank:`, selectAccountBank.value);
  console.log(`selectAccountNumber:`, selectAccountNumber.value);
};

const onClick = async () => {
  groupAccountStore.setRepresentativeAccount(selectAccountNumber.value, selectAccountBank.value);
  await groupAccountStore.createGroupAccount();
  router.push({ name: "group-account-create-complete" });
};

onMounted(async () => {
  if (accountStore.personalAccountList.length === 0) {
    await accountStore.getParsonalAccountList();
  }
  accountList.value = accountStore.personalAccountList.filter(
    (account) => account.accountType === "person",
  );
});
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
