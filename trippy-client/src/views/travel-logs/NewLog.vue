<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import PhotoUploader from "@/components/travel-logs/PhotoUploader.vue";
import DateRangePicker from "@/components/travel-logs/DateRangePicker.vue";
import NameInput from "@/components/common/inputs/NameInput.vue";
import AccountItem from "@/components/account/AccountItem.vue";
import AlertModal from "@/components/common/modals/AlertModal.vue";
import { createTravelLogIfAvailable } from "@/api/travelLog";
import accountApi from "@/api/account"; // ✅ 계좌 API 사용
import defaultImage from "@/assets/svg/travelLogEmpty.svg?url";

const router = useRouter();

const selectedRange = ref({ start: "", end: "" });
const travelName = ref("");
const travelPlace = ref("");
const imageFile = ref(null);
const imageUrl = ref("");

// ✅ 계좌 목록 상태
const accounts = ref([]);
const accountsLoading = ref(false);

const selectedAccount = ref(null);
const submitting = ref(false);

const isModalOpen = ref(false);
const modalTitle = ref("");

// ✅ 계좌 목록 불러오기
async function fetchAccounts() {
  accountsLoading.value = true;
  try {
    const list = await accountApi.getPersonalAccountList();
    // 삭제된 계좌 제외
    accounts.value = Array.isArray(list) ? list.filter((a) => a?.isDeleted !== "Y") : [];
  } catch (err) {
    openModal(`계좌 목록을 불러오지 못했습니다: ${err?.message ?? err}`);
    accounts.value = [];
  } finally {
    accountsLoading.value = false;
  }
}
onMounted(fetchAccounts);

const formattedDate = computed(() =>
  selectedRange.value.start && selectedRange.value.end
    ? `${selectedRange.value.start} ~ ${selectedRange.value.end}`
    : "날짜를 선택하세요",
);

// DateRangePicker가 어떤 형태를 주든 {start, end}로 표준화
function onRangeUpdate(val) {
  let s, e;

  if (Array.isArray(val)) {
    [s, e] = val;
  } else if (val && typeof val === "object") {
    s = val.start ?? val.startDate ?? val.from ?? val.begin ?? val.checkIn ?? val.beginDate;
    e = val.end ?? val.endDate ?? val.to ?? val.finish ?? val.checkOut ?? val.endAt ?? val.endDate;
  } else {
    s = val?.start ?? val;
    e = val?.end ?? val;
  }

  const normalize = (d) => {
    if (!d) return "";
    if (typeof d === "string") {
      return d.includes("T") ? d.split("T")[0] : d;
    }
    if (d instanceof Date) {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    }
    if (d?.toDate) return normalize(d.toDate());
    return "";
  };

  selectedRange.value = {
    start: normalize(s),
    end: normalize(e),
  };
}

function toIso(dateStr, type) {
  if (!dateStr) return "";
  if (dateStr.includes("T")) return dateStr;
  return type === "end" ? `${dateStr}T23:59:59` : `${dateStr}T00:00:00`;
}

const handleSelect = (account) => {
  selectedAccount.value = account;
};

function openModal(msg) {
  modalTitle.value = msg;
  isModalOpen.value = true;
}

async function onSubmit() {
  // 프런트 검증
  if (!travelName.value?.trim()) return openModal("여행 제목을 입력해 주세요.");
  if (!travelPlace.value?.trim()) return openModal("여행지를 입력해 주세요.");
  if (!selectedRange.value.start || !selectedRange.value.end)
    return openModal("여행 기간을 선택해 주세요.");
  if (!selectedAccount.value) return openModal("결제 내역을 추적할 계좌를 선택해 주세요.");

  const begin = toIso(selectedRange.value.start, "begin");
  const end = toIso(selectedRange.value.end, "end");

  // ✅ API 스키마에 맞춰 accountId만 사용
  const accountId = selectedAccount.value?.accountId ?? "";

  const payload = {
    accountId,
    title: travelName.value.trim(),
    travelBeginDate: begin,
    travelEndDate: end,
    destination: travelPlace.value.trim(),
    isGenerated: false,
    imageFile: imageFile.value, // 선택
  };

  submitting.value = true;
  try {
    await createTravelLogIfAvailable(payload);
    router.push({ name: "travel-logs" });
  } catch (e) {
    if (e?.code === "DATE_OVERLAP") {
      openModal(
        "해당 일정에 대한 여행 로그가 존재합니다. 다른 계좌를 선택하거나 \n\n날짜를 변경해 주세요.",
      );
    } else {
      openModal(`여행 로그 생성 실패: ${e?.message ?? e}`);
    }
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- 헤더 -->
    <div class="relative">
      <div class="relative w-full">
        <img
          :src="imageUrl || defaultImage"
          alt="여행 이미지"
          class="w-full h-auto object-cover opacity-60"
        />
      </div>
      <button class="absolute top-4 left-4 text-black text-2xl" @click="router.back()">✕</button>
      <PhotoUploader @update:imageUrl="imageUrl = $event" @update:imageFile="imageFile = $event" />
    </div>

    <!-- 폼 -->
    <form class="px-4 py-6 space-y-4 pb-24" @submit.prevent="onSubmit">
      <!-- 제목 -->
      <NameInput v-model="travelName" label="여행 제목" placeholder="여행의 제목을 입력해주세요" />

      <!-- 여행 기간 -->
      <div>
        <DateRangePicker @update:range="onRangeUpdate" @change="onRangeUpdate" />
        <p class="text-sm text-gray-500 mt-1">{{ formattedDate }}</p>
      </div>

      <!-- 여행지 -->
      <NameInput v-model="travelPlace" label="여행지" placeholder="여행지를 입력해주세요" />

      <!-- 계좌 선택 -->
      <!-- 내 계좌 불러오기 API와 연동하기 GET : /accounts -->
      <div class="flex flex-col gap-2 mt-4">
        <label class="body2 text-black px-1">결제 내역을 추적할 계좌</label>
        <div class="border border-gray-300 rounded-xl overflow-hidden">
          <ul class="flex flex-col">
            <!-- 로딩/빈 상태 -->
            <li v-if="accountsLoading" class="p-4 text-gray-500">계좌를 불러오는 중...</li>
            <li v-else-if="!accounts?.length" class="p-4 text-gray-500">표시할 계좌가 없습니다.</li>

            <!-- 계좌 목록 -->
            <li
              v-else
              v-for="account in accounts"
              :key="account.accountId"
              @click="handleSelect(account)"
              :class="[
                'cursor-pointer transition',
                selectedAccount && selectedAccount.accountId === account.accountId
                  ? 'bg-main-gradient text-white'
                  : 'hover:bg-gray-100',
              ]"
            >
              <AccountItem :data="account" />
            </li>
          </ul>
        </div>
      </div>

      <!-- 하단 버튼 -->
      <div class="sticky bottom-0 z-50 bg-white px-4 pt-2">
        <button
          type="submit"
          class="w-full py-3 bg-main-gradient text-white rounded-xl font-bold disabled:opacity-60"
          :disabled="submitting"
        >
          {{ submitting ? "생성 중..." : "로그 생성하기" }}
        </button>
      </div>
    </form>
  </div>

  <AlertModal v-model="isModalOpen" :title="modalTitle" :isSuccess="false" />
</template>
