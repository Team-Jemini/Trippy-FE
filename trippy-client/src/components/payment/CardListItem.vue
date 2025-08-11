<script setup>
import { ref, computed } from "vue";
import CardOptionsModal from "./CardOptionsModal.vue";
import SetMainCardModal from "./SetMainCardModal.vue";
import DeleteCardModal from "./DeleteCardModal.vue";
import DetailIcon from "@/assets/svg/detail.svg";
import { deleteCard, setMainCard } from "@/api/card";

const props = defineProps({
  card: { type: Object, required: true },
});
const emit = defineEmits(["refresh"]); // ✅ 성공 시 부모에게 새로고침 요청

const isOptionsOpen = ref(false);
const isSetMainOpen = ref(false);
const isDeleteOpen = ref(false);
const processing = ref(false);

const openOptions = () => (isOptionsOpen.value = true);
const closeOptions = () => (isOptionsOpen.value = false);
const openSetMain = () => {
  isOptionsOpen.value = false;
  isSetMainOpen.value = true;
};
const openDelete = () => {
  isOptionsOpen.value = false;
  isDeleteOpen.value = true;
};

const displayedNumber = computed(() => props.card.cardNumber ?? "****-****-****-****");

// ✅ API: 주카드 설정
async function handleConfirmSetMain() {
  if (processing.value) return;
  processing.value = true;
  try {
    await setMainCard(props.card.cardId);
    isSetMainOpen.value = false;
    emit("refresh");
  } catch (e) {
    console.error("주카드 설정 실패", e?.response?.data ?? e);
  } finally {
    processing.value = false;
  }
}

// ✅ API: 카드 삭제
async function handleConfirmDelete() {
  if (processing.value) return;
  processing.value = true;
  try {
    await deleteCard(props.card.cardId);
    isDeleteOpen.value = false;
    emit("refresh");
  } catch (e) {
    console.error("카드 삭제 실패", e?.response?.data ?? e);
  } finally {
    processing.value = false;
  }
}
</script>

<template>
  <div class="w-[343px] relative">
    <div class="flex items-center justify-between h-[80px] border-b border-[#F4F5F7] bg-white">
      <div
        class="flex items-center justify-center rounded-[10px] mr-4 overflow-hidden bg-gray-200"
        style="width: 92px; height: 48px"
      >
        <img
          v-if="card.cardImg"
          :src="card.cardImg"
          alt="card"
          class="max-w-full max-h-full object-contain"
        />
        <span v-else class="text-xs text-gray-600">CARD</span>
      </div>

      <div class="flex-1">
        <div class="caption1">
          {{ card.cardNickname || card.cardName }}
          <span v-if="card.isMainCard" class="ml-1 text-[10px] text-blue-600">주카드</span>
        </div>

        <div class="caption1 text-gray-600">{{ displayedNumber }}</div>
      </div>

      <button class="p-1 ml-2" @click="openOptions" aria-label="카드 옵션">
        <DetailIcon class="w-5 h-5 text-gray-500" />
      </button>
    </div>

    <CardOptionsModal
      v-if="isOptionsOpen"
      :card="card"
      @close="closeOptions"
      @set-main="openSetMain"
      @delete-card="openDelete"
    />

    <!-- ✅ 확인 시 API 호출 -->
    <SetMainCardModal
      v-if="isSetMainOpen"
      :card="card"
      @close="isSetMainOpen = false"
      @confirm="handleConfirmSetMain"
    />
    <DeleteCardModal
      v-if="isDeleteOpen"
      :card="card"
      @close="isDeleteOpen = false"
      @confirm="handleConfirmDelete"
    />
  </div>
</template>
