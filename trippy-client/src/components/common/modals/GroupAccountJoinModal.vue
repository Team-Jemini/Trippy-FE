<script setup>
import { defineProps, defineEmits } from "vue";
import router from "@/router";
import { useGroupJoinStore } from "@/stores/groupAccountJoinStore";

const props = defineProps({
  groupInviteData: Object,
  To: String,
});

const emit = defineEmits(["click"]);

const onClick = () => {
  emit("click");
};

const store = useGroupJoinStore();

const onJoinClick = () => {
  store.setInviteInfo(props.groupInviteData);
  router.push(props.To);
};
</script>

<template>
  <div
    class="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center"
  >
    <div class="flex flex-col items-center bg-white w-60 h-48 rounded-xl py-4">
      <div class="flex flex-col items-center justify-center flex-1 py-auto">
        <p class="subtitle2">
          {{ `${groupInviteData.inviter}님이 < ${groupInviteData.accountName} > 모임통장에` }}
        </p>
        <p class="subtitle2">초대하셨습니다</p>
        <p class="caption3 mt-3">{{ `${groupInviteData.deadline} 까지 수락해주세요` }}</p>
      </div>

      <div class="flex gap-2">
        <button class="w-16 h-9 bg-gray-300 rounded-xl text-gray-600 button2" @click="onClick">
          취소
        </button>
        <button
          class="w-28 h-9 bg-main-gradient rounded-xl text-white button2"
          @click="onJoinClick"
        >
          참여하기
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
