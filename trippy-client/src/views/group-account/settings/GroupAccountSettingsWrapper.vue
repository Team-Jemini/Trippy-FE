<script setup>
import { onMounted, ref } from "vue";
import MemberSettings from "@/components/group-account/MemberSettings.vue";
import OwnerSettings from "@/components/group-account/OwnerSettings.vue";
import { useGroupAccountStore } from "@/stores/groupAccountStore";
const groupAccountStore = useGroupAccountStore();

const account = ref({});
const member = ref([]);

const isOwner = ref(false);

onMounted(() => {
  isOwner.value = groupAccountStore.userRoleInGroupAccount;

  (account.value = {
    accountName: "트리피",
    accountBank: "국민은행",
    accountNumber: "013456878547486",
    createDate: "2025.07.15",
  }),
    (member.value = [
      { id: 1, name: "홍길동" },
      { id: 2, name: "김철수" },
    ]);
});
</script>

<template>
  <div class="h-full w-full mt-[-1rem]">
    <OwnerSettings v-if="isOwner == 'leader'" :account="account" :member="member" />
    <MemberSettings v-else :account="account" :member="member" />
  </div>
</template>

<style scoped></style>
