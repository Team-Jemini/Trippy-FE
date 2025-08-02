<script setup>
import router from "@/router";
import { Icon } from "@iconify/vue";
</script>

<template>
  <main>
    <button
      class="flex justify-between caption1 py-4 border-b border-b-gray-300 px-2 w-full bg-transparent text-left"
      @click="router.push({ name: 'my-page' })"
    >
      <p class="">마이페이지</p>
      <Icon icon="material-symbols:arrow-back-ios-new-rounded" class="rotate-180" />
    </button>

    <button
      class="flex justify-between caption1 py-4 border-b border-b-gray-300 px-2 w-full bg-transparent text-left"
      @click="router.push({ name: 'app-setting' })"
    >
      <p class="">설정</p>
      <Icon icon="material-symbols:arrow-back-ios-new-rounded" class="rotate-180" />
    </button>

    <button
      class="flex justify-between caption1 py-4 border-b border-b-gray-300 px-2 w-full bg-transparent text-left"
      @click="router.push({ name: 'ExchangeCurrency' })"
    >
      <p class="">환전하기</p>
      <Icon icon="material-symbols:arrow-back-ios-new-rounded" class="rotate-180" />
    </button>

    <button
      class="flex justify-between caption1 py-4 border-b border-b-gray-300 px-2 w-full bg-transparent text-left"
      @click="router.push({ name: 'payment' })"
    >
      <p class="">결제</p>
      <Icon icon="material-symbols:arrow-back-ios-new-rounded" class="rotate-180" />
    </button>

    <button
      class="flex justify-between caption1 py-4 border-b border-b-gray-300 px-2 w-full bg-transparent text-left"
      @click="router.push({ name: 'account-list' })"
    >
      <p class="">계좌목록</p>
      <Icon icon="material-symbols:arrow-back-ios-new-rounded" class="rotate-180" />
    </button>

    <button
      class="flex justify-between caption1 py-4 border-b border-b-gray-300 px-2 w-full bg-transparent text-left"
      @click="router.push({ name: 'payment' })"
    >
      <p class="">카드목록</p>
      <Icon icon="material-symbols:arrow-back-ios-new-rounded" class="rotate-180" />
    </button>

    <button
      class="flex justify-between caption1 py-4 border-b border-b-gray-300 px-2 w-full bg-transparent text-left"
      @click="router.push({ name: 'identification' })"
    >
      <p class="">신분증</p>
      <Icon icon="material-symbols:arrow-back-ios-new-rounded" class="rotate-180" />
    </button>

    <button
      class="flex justify-between caption1 py-4 border-b border-b-gray-300 px-2 w-full bg-transparent text-left"
      @click="router.push({ name: 'AirTicket' })"
    >
      <p class="">항공권</p>
      <Icon icon="material-symbols:arrow-back-ios-new-rounded" class="rotate-180" />
    </button>

    <button
      class="flex justify-between caption1 py-4 border-b border-b-gray-300 px-2 w-full bg-transparent text-left"
      @click="router.push({ name: 'bouchers' })"
    >
      <p class="">바우처</p>
      <Icon icon="material-symbols:arrow-back-ios-new-rounded" class="rotate-180" />
    </button>

    <button
      class="flex justify-between caption1 py-4 border-b border-b-gray-300 px-2 w-full bg-transparent text-left"
      @click="router.push({ name: 'travel-logs' })"
    >
      <p class="">여행로그</p>
      <Icon icon="material-symbols:arrow-back-ios-new-rounded" class="rotate-180" />
    </button>

    <button
      class="flex justify-between caption1 py-4 border-b border-b-gray-300 px-2 w-full bg-transparent text-left"
      @click="router.push('/translation')"
    >
      <p class="">번역기</p>
      <Icon icon="material-symbols:arrow-back-ios-new-rounded" class="rotate-180" />
    </button>
  </main>
</template>
