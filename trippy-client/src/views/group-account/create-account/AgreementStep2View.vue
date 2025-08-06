<script setup>
import router from "@/router";
import { computed, onMounted, ref, nextTick } from "vue";
import AgreementCheck from "@/components/common/AgreementCheck.vue";
import NextButton from "@/components/common/NextButton.vue";
import AgreementItemTitle from "@/components/group-account/AgreementItemTitle.vue";
import {
  agreementStep3,
  agreementStep4,
  agreementStep5,
  agreementStep6,
  agreementStep7,
  agreementStep8,
} from "@/_dummy/agreement_dummy";
import { useGroupAccountStore } from "@/stores/groupAccountStore";
import AgreementListItem from "@/components/group-account/AgreementListItem.vue";
import AccountNotice from "@/components/group-account/AccountNotice.vue";
import EmailInput from "@/components/common/inputs/EmailInput.vue";

const groupAccountStore = useGroupAccountStore();
const email = ref("");
const scrollContainer = ref(null);
// 전체 선택 클릭 핸들러
const toggleAllCheck = () => {
  const newState = !allChecked.value;
  checkedItems.value = checkedItems.value.map(() => newState);
  if (newState) {
    nextTick(() => {
      scrollContainer.value?.scrollTo({
        top: scrollContainer.value.scrollHeight,
        behavior: "smooth",
      });
    });
  }
};

const checkedItems = ref(new Array(6).fill(false));
const allChecked = computed(() => checkedItems.value.every((v) => v));
const isEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value));
const formValid = computed(() => allChecked.value && isEmailValid.value);

const onClick = (idx) => {
  checkedItems.value[idx] = checkedItems.value[idx] == false ? true : false;
};

onMounted(() => {
  email.value = groupAccountStore.email;
});
</script>

<template>
  <div class="flex h-full flex-col justify-between">
    <div
      class="flex flex-col w-full items-center h-full overflow-scroll [&::-webkit-scrollbar]:hidden"
      ref="scrollContainer"
    >
      <div class="text-center subtitle1 mt-5xs">
        <p>
          입출금통장 개설을 위해 <br />
          약관 및 상품설명서를 꼭 확인해 주세요
        </p>
      </div>
      <div class="w-full flex flex-col felx-center items-center">
        <AgreementCheck
          class="mt-7 w-full"
          :class="[!allChecked ? 'bg-gray-400' : 'bg-main-gradient']"
          :title="'Trippy 입출금 통장 상품설명서'"
          @click="toggleAllCheck"
        />
        <!-- 상품이용약관 -->
        <div class="py-9 con">
          <AgreementItemTitle
            :title="agreementStep3[0].title"
            :visible="checkedItems[0]"
            @click="() => onClick(0)"
          />
          <AgreementListItem
            class="ml-2"
            v-for="(item, index) in Object.values(agreementStep3[0].subtitle)"
            :key="index"
            :title="item"
          />
        </div>
        <!-- 금융상품 가입 전 안내 -->
        <div class="py-9 con">
          <AgreementItemTitle
            :title="agreementStep4[0].title"
            :visible="checkedItems[1]"
            @click="() => onClick(1)"
          />
          <AgreementListItem
            class="ml-2"
            v-for="(item, index) in Object.values(agreementStep4[0].subtitle)"
            :key="index"
            :title="item"
          />
        </div>
        <!-- 안심차단 등록 여부 조회 동의 -->
        <div class="py-9 con">
          <AgreementItemTitle
            :title="agreementStep5[0].title"
            :visible="checkedItems[2]"
            @click="() => onClick(2)"
          />
        </div>
        <!-- 불법 ∙ 탈법 차명거래 금지 설명 확인 -->
        <div class="py-9 con">
          <AgreementItemTitle
            :title="agreementStep6[0].title"
            :visible="checkedItems[3]"
            @click="() => onClick(3)"
          />
          <AccountNotice :title="agreementStep6[0].subtitle" class="aption1 text-gray-400" />
        </div>
        <!-- 예금자보호법 설명 확인 -->
        <div class="py-9 con flex flex-col items-center">
          <AgreementItemTitle
            :title="agreementStep7[0].title"
            :visible="checkedItems[4]"
            @click="() => onClick(4)"
          />
          <AccountNotice :title="agreementStep7[0].subtitle[0]" class="caption1 text-gray-400" />
          <EmailInput class="mt-5 mb-5 px-3" v-model="email" />
          <AccountNotice :title="agreementStep7[0].subtitle[1]" class="caption3 text-gray-400" />
        </div>
        <!-- 입력습관 수집 ∙ 이용 동의 -->
        <div class="py-9">
          <AgreementItemTitle
            :title="agreementStep8[0].title"
            :visible="checkedItems[5]"
            @click="() => onClick(5)"
          />
          <AccountNotice :title="agreementStep8[0].subtitle[0]" class="caption1 text-gray-400" />
        </div>
      </div>
    </div>
    <NextButton
      title="다음"
      :disabled="!formValid"
      @click="router.push({ name: 'group-account-create-step3' })"
    />
  </div>
</template>

<style scoped>
.con {
  border-bottom: 1px solid #9ca3af;
}
</style>
