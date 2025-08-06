<script setup>
defineProps({
  cards: Array,
});

import { ref } from "vue";
import { useRouter } from "vue-router";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

const activeIndex = ref(0);
const router = useRouter();
const emit = defineEmits(["selectCard"]); // 이벤트 선언

function onSlideChange(swiper) {
  activeIndex.value = swiper.realIndex;
}
function goToAddCard() {
  router.push("/payment/add");
}
</script>

<template>
  <div class="mt-[157px] w-full">
    <Swiper
      :slides-per-view="1.8"
      :centered-slides="true"
      :space-between="10"
      class="w-full"
      @slideChange="onSlideChange"
    >
      <SwiperSlide v-for="(card, index) in cards" :key="card.id" class="flex justify-center">
        <div
          class="flex flex-col items-center transition-all duration-300 ease-in-out transform cursor-pointer"
          :class="index === activeIndex ? 'scale-100 opacity-100' : 'scale-90 opacity-50'"
          @click="card.isAddCard ? goToAddCard() : emit('selectCard', card.id)"
        >
          <img :src="card.image" alt="카드" class="w-[180px] rounded-xl" />
          <p
            v-if="index === activeIndex && !card.isAddCard"
            class="mt-[8px] caption1 text-center transition-opacity duration-300 text-gray-700"
          >
            {{ card.name }}
          </p>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>
