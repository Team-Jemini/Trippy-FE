<script setup>
import { computed, onMounted, ref } from "vue";
import MemberSettings from "@/components/account/group-account/MemberSettings.vue";
import OwnerSettings from "@/components/account/group-account/OwnerSettings.vue";
import { useGroupAccountStore } from "@/stores/groupAccountStore";
import { useRoute } from "vue-router";
import { useGroupMemberStore } from "@/stores/groupMemberStore";
const groupAccountStore = useGroupAccountStore();
const memberStore = useGroupMemberStore();
const route = useRoute();

const accountId = computed(() => String(route.params.accountId));
const member = ref([]);
const accountDetail = ref({});
const isOwner = ref(false);

onMounted(async () => {
  await groupAccountStore.getGroupAccountDetail(accountId.value);
  await memberStore.getGroupMemberList(accountId.value);

  accountDetail.value = groupAccountStore.groupAccountDetail;
  member.value = memberStore.groupMembers;
  isOwner.value = accountDetail.value.role;
});
</script>

<template>
  <div class="h-full w-full mt-[-1rem]">
    <OwnerSettings v-if="isOwner == 'leader'" :account="accountDetail" :member="member" />
    <MemberSettings v-else :account="accountDetail" :member="member" />
  </div>
</template>

<style scoped></style>
