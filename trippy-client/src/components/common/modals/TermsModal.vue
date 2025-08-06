<script setup>
import { ref, watch, defineProps, defineEmits, computed } from "vue";
import { Icon } from "@iconify/vue";
import { terms as defaultTerms } from "@/_dummy/terms.js";
import { terms as cardTerms } from "@/_dummy/terms_card.js";
import NextButton from "@/components/common/NextButton.vue";

const props = defineProps({
  modelValue: Boolean,
  type: {
    type: String,
    default: "default", // 'default' | 'card'
  },
});

const emit = defineEmits(["update:modelValue", "next"]);

const isCheckedAll = ref(false);
const termsData = ref([]);

// props.type에 따라 terms 선택
watch(
  () => props.type,
  (newType) => {
    termsData.value =
      newType === "card"
        ? JSON.parse(JSON.stringify(cardTerms))
        : JSON.parse(JSON.stringify(defaultTerms));
  },
  { immediate: true },
);

// 전체 동의
const checkAll = () => {
  isCheckedAll.value = !isCheckedAll.value;
  termsData.value.forEach((subtitle) => {
    subtitle.checked = isCheckedAll.value;
    subtitle.contents.forEach((content) => {
      content.checked = isCheckedAll.value;
    });
  });
};

// 섹션 동의
const checkSubtitle = (subtitleIndex) => {
  const subtitle = termsData.value[subtitleIndex];
  subtitle.checked = !subtitle.checked;
  subtitle.contents.forEach((content) => {
    content.checked = subtitle.checked;
  });
  updateIsCheckedAll();
};

// 세부 항목 동의
const checkContent = (subtitleIndex, contentIndex) => {
  const content = termsData.value[subtitleIndex].contents[contentIndex];
  content.checked = !content.checked;

  const subtitle = termsData.value[subtitleIndex];
  subtitle.checked = subtitle.contents.every((c) => c.checked);

  updateIsCheckedAll();
};

// 전체 동의 체크 여부 업데이트
const updateIsCheckedAll = () => {
  isCheckedAll.value = termsData.value.every(
    (subtitle) => subtitle.checked && subtitle.contents.every((content) => content.checked),
  );
};

// 필수 항목 동의 여부로 다음 버튼 활성화
const isNextEnabled = computed(() => {
  return termsData.value.every((section) => {
    if (section.required) {
      return (
        section.checked && section.contents.every((content) => !content.required || content.checked)
      );
    }
    return true;
  });
});

const closeModal = () => {
  emit("update:modelValue", false);
};

const handleNextClick = () => {
  emit("next");
};
</script>

<template>
  <div
    v-if="props.modelValue"
    class="fixed inset-0 z-50 flex items-end justify-center bg-black/40"
    @click.self="closeModal"
  >
    <div
      class="w-full max-w-[375px] pb-[34px] rounded-t-2xl bg-white transition-transform duration-300"
      :class="{
        'translate-y-0': props.modelValue,
        'translate-y-full': !props.modelValue,
      }"
      style="max-height: 80vh"
    >
      <div class="py-4 overflow-y-auto max-h-[calc(80vh-56px)] flex flex-col gap-4">
        <div class="flex justify-between px-4 text-gray-500">
          <p class="body2">
            {{
              props.type === "card"
                ? "카드 불러오기를 위한 동의가 필요합니다."
                : "회원가입을 위한 동의가 필요합니다."
            }}
          </p>
          <Icon
            icon="material-symbols:close-rounded"
            class="size-5 hover:text-gray-600"
            @click="closeModal"
          />
        </div>

        <!-- 전체 동의 -->
        <div class="flex gap-2 px-4">
          <Icon
            :icon="
              isCheckedAll
                ? 'material-symbols:check-circle-rounded'
                : 'material-symbols:check-circle-outline-rounded'
            "
            :class="['size-6', isCheckedAll ? 'text-blue-400' : 'text-gray-400']"
            @click="checkAll"
          />
          <div>
            <div class="flex gap-1">
              <h3 class="title3">전체 동의</h3>
              <h3 class="title3 text-blue-400">(선택 포함)</h3>
            </div>
            <p class="caption1 text-gray-400">
              선택 항목에 대한 동의를 거부하시는 경우에도<br />서비스는 이용이 가능합니다.
            </p>
          </div>
        </div>

        <!-- 항목 목록 -->
        <div>
          <div v-for="(subtitle, subtitleIndex) in termsData" :key="subtitleIndex">
            <div class="flex justify-between h-10 px-4">
              <div class="flex gap-2 items-center">
                <Icon
                  icon="iconamoon:check-duotone"
                  :class="['size-6', subtitle.checked ? 'text-blue-400' : 'text-gray-400']"
                  @click="checkSubtitle(subtitleIndex)"
                />
                <p class="body2">{{ subtitle.title }}</p>
                <p class="body2 text-blue-400">{{ subtitle.required ? "(필수)" : "(선택)" }}</p>
              </div>
              <Icon
                icon="material-symbols:arrow-back-ios-new-rounded"
                class="size-5 text-gray-400 rotate-90"
              />
            </div>

            <div
              v-for="(content, contentIndex) in subtitle.contents"
              :key="contentIndex"
              class="flex justify-between items-center bg-gray-100 h-10 px-4"
            >
              <div class="flex gap-2">
                <Icon
                  icon="iconamoon:check-duotone"
                  :class="['size-6', content.checked ? 'text-blue-400' : 'text-gray-400']"
                  @click="checkContent(subtitleIndex, contentIndex)"
                />
                <p class="caption1">{{ content.title }}</p>
                <p class="caption1">{{ subtitle.required ? "(필수)" : "(선택)" }}</p>
              </div>
              <Icon
                icon="material-symbols:arrow-back-ios-new-rounded"
                class="size-4 text-gray-400 rotate-180"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="w-full px-4">
        <NextButton
          title="다음"
          :disabled="!isNextEnabled"
          @click="handleNextClick"
        />
      </div>
    </div>
  </div>
</template>
