<script setup>
import { computed, onMounted, ref } from "vue";
import SearchedMember from "@/components/common/inputs/SearchInput.vue";
import { useGroupMemberStore } from "@/stores/groupMemberStore";
import { useGroupJoinStore } from "@/stores/groupAccountJoinStore";

const memberStore = useGroupMemberStore();
const leaderMember = ref({});
const members = ref([]);
const searchedMember = ref("");
const groupJoinStore = useGroupJoinStore();

const filteredMembers = computed(() => {
  if (searchedMember.value.trim() == "") {
    return [];
  }
  return memberStore.groupMembers.filter(
    (member) => member.name && member.name.includes(searchedMember.value),
  );
});

const shareToKakao = () => {
  groupJoinStore.shareToKakao();
};

onMounted(async () => {
  await memberStore.setGroupMember();
  leaderMember.value = memberStore.groupMembers.find((m) => m.role === "leader");
  members.value = memberStore.groupMembers.filter((m) => m.role === "member");

  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);
  }
});
</script>

<template>
  <div class="h-full w-full">
    <div class="h-12">
      <SearchedMember v-model="searchedMember" />
    </div>

    <div v-if="!searchedMember" class="px-2 mt-5">
      <div class="mb-4">
        <p class="caption1 text-gray-500 mb-1">모임주</p>
        <p class="body2">{{ leaderMember.name }}</p>
      </div>
      <div v-if="!members.length == 0">
        <p class="caption1 text-gray-500 mb-1">멤버</p>
        <p class="body2 mb-1" v-for="member in members" :key="member.id">{{ member.name }}</p>
      </div>
      <div v-else>
        <div>
          <p class="caption1 text-gray-500 mb-1">멤버</p>
        </div>
        <div class="px-3 mt-32 flex justify-center">
          <button
            class="w-32 bg-[#FEE500] rounded-lg py-3 flex items-center justify-center gap-2"
            @click="shareToKakao"
          >
            <img src="@/assets/Kakao.png" alt="카카오톡 아이콘" class="h-5 w-5" />
            <span class="text-black font-semibold">초대하기</span>
          </button>
        </div>
      </div>
    </div>

    <div v-else class="px-2 mt-5">
      <p class="body2 mb-1" v-for="member in filteredMembers" :key="member.id">
        {{ member.name }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
