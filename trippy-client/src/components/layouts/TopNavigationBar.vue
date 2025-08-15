<script setup>
import { RouterLink, useRoute, useRouter } from "vue-router";
import { computed, ref, watchEffect } from "vue";

import { Icon } from "@iconify/vue";
import TrippyLogo from "@/assets/svg/trippy-logo.svg";

const route = useRoute();
const router = useRouter();
const pageTitle = computed(() => route.meta.title || "");

const hiddenPrefixes = ["/capture"];

const isHidden = computed(() => hiddenPrefixes.some((prefix) => route.path.startsWith(prefix)));
const goBack = () => {
  router.back();
};
</script>

<template>
  <div
    v-if="!isHidden"
    class="flex flex-col justify-center bg-white h-[56px] w-full fixed top-0 z-50 md:max-w-[375px] md:mx-auto"
  >
    <div
      v-if="pageTitle == '예약 등록하기'"
      class="flex items-center justify-between relative"
    >
      <button @click="goBack" class="ml-4">
        <Icon icon="material-symbols:close-rounded" class="w-6 h-6 hover:text-gray-500" />
      </button>
      <h3 class="subtitle1 absolute left-1/2 -translate-x-1/2">{{ pageTitle }}</h3>
    </div>

    <div
      v-else-if="pageTitle === '홈'"
      class="px-4 flex align-center items-center justify-between"
    >
      <TrippyLogo class="w-[62px] h-auto" />
      <RouterLink to="/notifications">
        <div class="text-gray-400 flex flex-col items-center hover:text-gray-600">
          <Icon icon="material-symbols:notifications-rounded" class="w-[28px] h-auto" />
        </div>
      </RouterLink>
    </div>

    <div v-else class="flex items-center justify-between relative">
      <RouterLink to="/" class="ml-4">
        <Icon icon="material-symbols:arrow-back-ios-rounded" class="w-6 h-6 hover:text-gray-500" />
      </RouterLink>
      <h3 class="subtitle1 absolute left-1/2 -translate-x-1/2">{{ pageTitle }}</h3>
    </div>
  </div>
</template>
