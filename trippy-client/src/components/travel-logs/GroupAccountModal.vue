<template>
  <div class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div class="bg-white w-80 rounded-xl p-6 shadow-lg text-center">
      <h2 class="text-lg font-semibold text-black mb-2">모임 계좌를 만들기 전이에요</h2>
      <p class="text-sm text-gray-600 mb-6">
        단체 여행 로그를 기록하려면<br />
        Trippy의 모임 계좌가 필요해요
      </p>
      <div class="flex justify-between gap-4">
        <button
          class="flex-1 py-2 bg-gray-200 rounded-lg text-gray-800 font-semibold hover:bg-gray-300"
          @click="$emit('cancel')"
        >
          취소
        </button>
        <button
          class="flex-1 py-2 bg-main-gradient text-white rounded-lg font-semibold hover:bg-blue-600"
          @click="$emit('confirm')"
        >
          만들러 가기
        </button>
      </div>
    </div>
  </div>
</template>
