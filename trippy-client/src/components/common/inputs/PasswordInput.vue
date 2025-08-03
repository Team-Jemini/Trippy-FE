<script setup>
import { ref, computed, defineEmits, defineProps, onMounted } from "vue";
import NextButton from "@/components/common/NextButton.vue";
import AlertModal from "@/components/common/modals/AlertModal.vue";

const props = defineProps({
  currentPage: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  }
});

const tempPassword = "123456";
const password = ref([]);
const isModalOpen = ref(false);

const isDisabled = computed(() => password.value.length !== 6);

const emit = defineEmits(["next"]);

const onPressKey = (num) => {
  if (password.value.length < 6) {
    password.value.push(num);
  }
};

const onDelete = () => {
  password.value.pop();
};

const handleClick = () => {
  if (password.value.join("") === tempPassword) {
    emit("next");
  } else {
    isModalOpen.value = true;
  }
};
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="flex flex-col grow mb-4 items-center justify-center gap-8">
      <div class="flex flex-col gap-2 items-center">
        <h1 class="title3">{{ props.title || "비밀번호 입력" }}</h1>
        <p class="body2">Trippy 비밀번호를 입력해 주세요.</p>
      </div>
      <div class="flex gap-3">
        <div
          v-for="n in 6"
          :key="n"
          class="size-4 bg-gray-200 rounded-full"
          :class="password.length >= n ? 'bg-main-gradient' : 'bg-gray-200'"
        ></div>
      </div>
      <a
        v-if="props.currentPage === 'login'"
        class="caption2 text-blue-400 underline"
      >혹시 비밀번호를 잊으셨나요?</a>
    </div>
    <div class="mx-[-1rem] mb-2">
      <NextButton
        title="입력 완료"
        :disabled="isDisabled"
        :isRounded="false"
        @click="handleClick"
      />
    </div>
    <div class="grid grid-cols-3 w-full gap-2">
      <button
        v-for="n in 9"
        :key="n"
        class="h-12 title2 font-normal rounded-lg active:bg-blue-100"
        @click="() => onPressKey(n)"
      >
        {{ n }}
      </button>
      <div></div>
      <button
        class="h-12 title2 font-normal rounded-lg active:bg-blue-100"
        @click="() => onPressKey(0)"
      >
        0
      </button>
      <button
        class="h-12 title2 font-normal rounded-lg active:bg-blue-100"
        @click="onDelete"
      >
        ←
      </button>
    </div>
    <AlertModal
      v-model="isModalOpen"
      title="비밀번호가 틀렸습니다."
      :isSuccess="false"
    />
  </div>
</template>
