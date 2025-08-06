<script setup>
import { onMounted, ref, computed } from "vue";
import { Icon } from "@iconify/vue";
import SettleMemberItem from "@/components/group-account/SettleMemberItem.vue";
import { useGroupMemberStore } from "@/stores/groupMemberStore";
import { useSettleStore } from "@/stores/useSettleStore";
import NextButton from "@/components/common/NextButton.vue";
import router from "@/router";

const groupMemberStore = useGroupMemberStore();
const settleStore = useSettleStore();

const members = ref([]);
const checkedStatus = ref([]);

const allChecked = computed(() => checkedStatus.value.every((v) => v));

const memberChecked = computed(() => checkedStatus.value.some(Boolean));

const checkedMember = (index) => {
  checkedStatus.value[index] = !checkedStatus.value[index];
};

const toggleAllCheck = () => {
  const newState = !allChecked.value;
  checkedStatus.value = checkedStatus.value.map(() => newState);
};

const onClick = () => {
  const checkedMembers = members.value.filter((member, i) => checkedStatus.value[i]);
  settleStore.setSelectedMembers(checkedMembers);
  router.push({ name: "group-settle-amount" });
};

onMounted(async () => {
  await groupMemberStore.setGroupMember();
  members.value = groupMemberStore.groupMember;
  checkedStatus.value = new Array(members.value.length).fill(false);
});
</script>

<template>
  <div class="flex flex-col justify-between h-full w-full">
    <div class="border-b border-gray-300 h-14 text-center">
      <p class="title2">누구한테 정산을 요청할까요?</p>
    </div>

    <div class="flex items-center justify-between px-1 mt-3">
      <p class="title4">모임원</p>
      <button @click="toggleAllCheck" class="flex items-center gap-1">
        <p class="body1">전체선택</p>
        <Icon
          :icon="
            allChecked
              ? 'material-symbols:check-circle-rounded'
              : 'material-symbols:check-circle-outline-rounded'
          "
          :class="allChecked ? 'text-blue-400' : 'text-gray-400'"
          class="size-8"
        />
      </button>
    </div>

    <div class="mt-1 px-2 flex-1 overflow-scroll [&::-webkit-scrollbar]:hidden">
      <SettleMemberItem
        v-for="(member, i) in members"
        :key="i"
        :member="member"
        :isChecked="checkedStatus[i]"
        class="my-2 border-b border-gray-300 py-2"
        @click="checkedMember(i)"
      />
    </div>

    <NextButton :title="'다음'" :disabled="!memberChecked" @click="onClick" />
  </div>
</template>

<style scoped></style>
