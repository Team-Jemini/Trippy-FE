<script setup>
import { onMounted, ref } from "vue";
import RepresentativeAccountList from "@/components/account/group-account/RepresentativeAccountList.vue";
import { useGroupJoinStore } from "@/stores/groupAccountJoinStore";
import NextButton from "@/components/common/buttons/NextButton.vue";
import router from "@/router";
import { useAccountStore } from "@/stores/accountStore";

const groupJoinStore = useGroupJoinStore();
const accountStore = useAccountStore();

const selectAccountBank = ref("");
const selectaccountId = ref("");

const selectAccount = (account) => {
  selectAccountBank.value = "국민은행";
  selectaccountId.value = account.accountId;
};

const accountList = ref([]);

const onClick = async () => {
  await groupJoinStore.groupAccountJoin(selectaccountId.value);
  router.push({ name: "group-join-complete" });
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
        :accountId="selectaccountId"
        :accountBank="selectAccountBank"
      />
    </div>
    <NextButton :title="'참여완료하기'" :disabled="!selectaccountId" @click="onClick" />
  </div>
</template>

<style scoped></style>
