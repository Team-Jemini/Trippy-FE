<script setup>
import { onMounted, ref } from "vue";
import RepresentativeAccountList from "@/components/account/group-account/RepresentativeAccountList.vue";
import { useGroupAccountStore } from "@/stores/groupAccountStore";
import NextButton from "@/components/common/buttons/NextButton.vue";
import router from "@/router";
import { useAccountStore } from "@/stores/accountStore";

const groupAccountStore = useGroupAccountStore();
const accountStore = useAccountStore();

const selectaccountId = ref("");
const selectAccountBank = ref("");

const accountList = ref([]);

const selectAccount = (account) => {
  selectAccountBank.value = "국민은행";
  selectaccountId.value = account.accountId;
};

const onClick = async () => {
  groupAccountStore.setRepresentativeAccount(selectaccountId.value, selectAccountBank.value);
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
        :accountId="selectaccountId"
      />
    </div>
    <NextButton :title="'다음'" :disabled="!selectAccountBank" @click="onClick" />
  </div>
</template>

<style scoped></style>
