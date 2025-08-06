<script setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";

const userName = ref("강올챙");
const phoneNumber = ref("010-1234-5678");
const email = ref("test@trippy.com");
const birthday = ref("2000-05-19");
const gender = ref("Man");
</script>

<template>
  <div class="flex flex-col items-center">
    <h1 class="title1 mt-5 mb-10">{{ userName }}</h1>

    <div class="border-b border-b-gray-300 flex justify-between w-80 px-1 py-2 caption1">
      <p>휴대폰번호</p>
      <p>{{ phoneNumber }}</p>
    </div>

    <div class="border-b border-b-gray-300 flex justify-between mt-3 w-80 px-1 py-2 caption1">
      <p>이메일</p>
      <p>{{ email }}</p>
    </div>

    <div class="border-b border-b-gray-300 flex justify-between mt-3 w-80 px-1 py-2 caption1">
      <p>생일</p>
      <p>{{ birthday }}</p>
    </div>

    <div class="border-b border-b-gray-300 flex justify-between mt-3 w-80 px-1 py-2 caption1">
      <p>성별</p>
      <p>{{ gender }}</p>
    </div>

    <button
      class="border-b border-b-gray-300 flex justify-between mt-10 items-center gap-1 pl-1 py-1 caption2"
    >
      <p>비밀번호 변경</p>
      <Icon icon="material-symbols:arrow-back-ios-new-rounded" class="rotate-180" />
    </button>
  </div>
</template>

<style scoped></style>
