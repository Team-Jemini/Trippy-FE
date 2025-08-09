<script setup>
import { defineProps, defineEmits, onMounted } from "vue";
import OnLoading from "@/components/common/loading/OnLoading.vue";
import { fetchPersonalAccount } from "@/api/personalAccount.js";
import { useAccountStore } from "@/stores/accountStore.js";

const props = defineProps({
  description: String,
});

const emit = defineEmits(["next"]);
const accountStore = useAccountStore();

onMounted(async () => {
  const data = await fetchPersonalAccount(159); // 임시 userID
  accountStore.setCodefAccountList(data);
  emit("next");
});
</script>

<template>
  <div class="flex flex-col h-full items-center justify-center gap-8 pb-2">
    <OnLoading />
    <div class="flex items-center justify-center h-9 bg-gray-500 rounded-full px-12">
      <p class="caption1 text-white">{{ props.description }}</p>
    </div>
  </div>
</template>
