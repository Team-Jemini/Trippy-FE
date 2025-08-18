<script setup>
import Idcard from "@/assets/png/Idcard.png";
import DefaultProfile from "@/assets/svg/person.svg";

import DefaultQr from "@/assets/png/default_qr.png";
import { computed, onMounted, ref, toRefs } from "vue";
import IdCardUnregisterd from "@/components/identification/IdCardUnregisterd.vue";
import Toggle from "@/components/identification/Toggle.vue";
import HeaderNotice from "@/components/identification/HeaderNotice.vue";
import ToggleVueButton from "@/components/identification/ToggleVueButton.vue";
import QrDisplay from "@/components/identification/QrDisplay.vue";
import FooterInfo from "@/components/identification/FooterInfo.vue";
import DetailInfo from "@/components/identification/DetailInfo.vue";
import { useIdCardStore } from "@/stores/identificationStore";
import router from "@/router";

const idCardStore = useIdCardStore();
const { fetchResidentCard, fetchPassport } = idCardStore;

const props = defineProps({
  currentTab: { type: String, required: true },
});

// props.currentTab을 ref로 변환해서 반응형으로 감시
const { currentTab } = toRefs(props);
//const currentTab = ref("여권");

const isRegistered = ref(true); // 임시로 고정 설정
const showDetail = ref(false);
const toggleOn = ref(false);

// 여권
const name = ref("");
const englishName = ref("");
const nation = ref("");
const birthDate = ref("");
const gender = ref("");
const expireDate = ref("");
const passportNumber = ref("");
// 신분증
const resName = ref("");
const resUserIdentity = ref("");
const resAddress = ref("");
const resIssueDate = ref("");

onMounted(async () => {
  await fetchResidentCard();
  await fetchPassport();

  resName.value = idCardStore.residentCard?.resUserName;
  resUserIdentity.value = idCardStore.residentCard?.resUserIdentity;
  resAddress.value = idCardStore.residentCard?.address;
  resIssueDate.value = idCardStore.residentCard?.resIssueDate;
  isRegistered.value = idCardStore.isResidentRegistered;

  name.value = idCardStore.passport?.nameKr;
  englishName.value = idCardStore.passport?.nameEn;
  nation.value = idCardStore.passport?.countryCode;
  birthDate.value = idCardStore.passport?.birthDate;
  expireDate.value = idCardStore.passport?.expireDate;
  gender.value = idCardStore.passport?.gender;
  passportNumber.value = idCardStore.passport?.passportNumber;
});

const maskedId = computed(() => {
  if (!idCardStore.residentCard?.resUserIdentity) return "";
  const [front, back] = idCardStore.residentCard?.resUserIdentity.split("-");
  if (!toggleOn.value) return idCardStore.residentCard?.resUserIdentity; // 토글 OFF → 전체 표시
  const maskedBack = back[0] + "*".repeat(back.length - 1); // 첫 자리만 남기고 마스킹
  return `${front}-${maskedBack}`;
});

const goToPassportGuide = () => {
  router.push("/passport/guide"); // 이동할 라우터 경로
};

const goToResidentCardGuide = () => {
  router.push("/identification/guide"); // 이동할 라우터 경로
};
</script>

<template>
  <div class="w-full">
    <!-- TODO: 나중에 특정 라우터로 이동 -->
    <div v-if="currentTab === '주민등록'">
      <!-- ----------------신분증 등록 안 된 경우---------------- -->
      <div v-if="!isRegistered">
        <IdCardUnregisterd
          v-if="!isRegistered"
          :image="Idcard"
          docType="주민등록증"
          @registerClick="goToResidentCardGuide"
        />
      </div>

      <!-- ----------------신분증 등록된 경우----------------  -->
      <div
        v-else
        class="w-full h-[32rem] rounded-xl shadow-md flex flex-col"
        :class="{ 'bg-gray-100': showDetail, 'bg-white': !showDetail }"
      >
        <!-- 안내 문구 -->
        <HeaderNotice
          text="주민등록증 이미지 위변조 및 부정 사용 금지(위반 시 3년 이하의 징역 또는 3천만원 벌금)"
        />

        <!-- 디폴트 프로필 -->
        <div class="bg-gray-200 flex flex-col h-48 justify-end items-center">
          <DefaultProfile class="w-40 h-[9.5rem]" alt="profile" />
        </div>

        <div class="mt-4 flex w-full items-center-justify-start px-4">
          <DetailInfo
            :name="resName"
            :maskedId="maskedId"
            :idNumber="resUserIdentity"
            :address="resAddress"
            :showDetail="showDetail"
            :currentTab="currentTab"
          />

          <!-- 내용 -->
          <div class="flex flex-col item-center ml-auto">
            <!-- QR -->
            <div v-if="!showDetail">
              <QrDisplay :qrImage="DefaultQr" :progress="70" :timeLeft="8" />
            </div>
            <div v-else>
              <!-- 토글 -->
              <Toggle v-model="toggleOn" />
            </div>
          </div>
        </div>

        <!-- 법적 효력 안내 -->
        <FooterInfo
          infoText="법적 효력 안내 >"
          :date="resIssueDate"
          :currentTab="currentTab"
          :showDetail="showDetail"
        />

        <!-- 상세정보 표시버튼 -->
        <ToggleVueButton v-model="showDetail" detailText="상세정보 표시" qrText="QR정보 표기" />
      </div>
    </div>

    <div v-if="currentTab === '여권'">
      <div v-if="!isRegistered">
        <IdCardUnregisterd
          v-if="!isRegistered"
          :image="Idcard"
          docType="여권"
          @registerClick="goToPassportGuide"
        />
      </div>

      <div
        v-else
        class="w-full h-[32rem] rounded-xl shadow-md flex flex-col"
        :class="{ 'bg-gray-100': showDetail, 'bg-white': !showDetail }"
      >
        <!-- 안내 문구 -->
        <HeaderNotice
          text="여권 이미지 위변조 및 부정 사용 금지(위반 시 3년 이하의 징역 또는 3천만원 벌금)"
        />
        <!-- 디폴트 프로필 -->
        <div class="bg-gray-200 flex flex-col h-48 justify-end items-center">
          <DefaultProfile class="w-40 h-[9.5rem]" alt="profile" />
        </div>

        <div class="mt-4 flex w-full items-center-justify-start px-4">
          <DetailInfo
            :name="name"
            :englishName="englishName"
            :maskedId="maskedId"
            :nation="nation"
            :birthDate="birthDate"
            :gender="gender"
            :showDetail="showDetail"
            :currentTab="currentTab"
          />

          <!-- 내용 -->
          <div class="flex flex-col items-end ml-auto">
            <!-- QR -->
            <div v-if="!showDetail">
              <QrDisplay :qrImage="DefaultQr" :progress="70" :timeLeft="8" />
            </div>
            <div v-else class="flex flex-col items-end w-full">
              <!-- 토글 -->
              <Toggle v-model="toggleOn" />
              <p class="mt-2 text-gray-700 body2">{{ passportNumber }}</p>
            </div>
          </div>
        </div>

        <!-- 법적 효력 안내 -->
        <FooterInfo :currentTab="currentTab" infoText="법적 효력 안내 >" :date="expireDate" />
        <!-- 상세정보 표시버튼 -->
        <ToggleVueButton v-model="showDetail" detailText="상세정보 표시" qrText="QR정보 표기" />
      </div>
    </div>
  </div>
</template>
