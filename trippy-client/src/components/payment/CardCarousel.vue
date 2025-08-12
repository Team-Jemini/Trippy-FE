<script setup>
defineProps({ cards: Array });

import { ref } from "vue";
import { useRouter } from "vue-router";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

const activeIndex = ref(0);
const router = useRouter();
const emit = defineEmits(["selectCard"]);

function onSlideChange(swiper) {
  activeIndex.value = swiper.realIndex;
}
function goToAddCard() {
  router.push("/payment/add");
}

const CARD_W = 180; // ← empty_card.png 가로
const CARD_H = 265; // ← empty_card.png 세로

// 인덱스별 회전/스케일 메타
const metas = ref({}); // { [index]: { rotate: boolean, scale: number } }

function onImgLoad(e, i) {
  const w = e.target.naturalWidth;
  const h = e.target.naturalHeight;

  if (w > h) {
    // 가로 이미지 → 세로로 세우기(90도 회전)
    // 회전 후 폭=원본 높이(h), 높이=원본 폭(w)
    const scale = Math.min(CARD_W / h, CARD_H / w);
    metas.value[i] = { rotate: true, scale };
  } else {
    // 세로 이미지 → 회전 없음
    const scale = Math.min(CARD_W / w, CARD_H / h);
    metas.value[i] = { rotate: false, scale };
  }
}

function styleFor(i) {
  const m = metas.value[i] || { rotate: false, scale: 1 };
  const base = `translate(-50%, -50%) ${m.rotate ? "rotate(90deg)" : ""} scale(${m.scale})`;
  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: base,
    transformOrigin: "center center",
    maxWidth: "none",
    maxHeight: "none",
    display: "block",
  };
}
</script>

<template>
  <div class="mt-[157px] w-full">
    <Swiper
      :slides-per-view="1.8"
      :centered-slides="true"
      :space-between="48"
      class="w-full"
      @slideChange="onSlideChange"
    >
      <SwiperSlide v-for="(card, index) in cards" :key="card.id" class="flex justify-center">
        <div
          class="flex flex-col items-center transition-all duration-300 ease-in-out transform cursor-pointer"
          :class="index === activeIndex ? 'scale-100 opacity-100' : 'scale-90 opacity-50'"
          @click="card.isAddCard ? goToAddCard() : emit('selectCard', card.id)"
        >
          <!-- ✅ 프레임(placeholder) 크기 고정 -->
          <div
            class="relative rounded-xl bg-white shadow-sm overflow-hidden"
            :style="{ width: CARD_W + 'px', height: CARD_H + 'px' }"
          >
            <!-- ✅ 이미지: 가로면 자동 회전 + 스케일로 안 잘리게 -->
            <img
              :src="card.image"
              alt="카드"
              @load="(e) => onImgLoad(e, index)"
              :style="styleFor(index)"
              draggable="false"
            />
          </div>

          <p
            v-if="index === activeIndex && !card.isAddCard"
            class="mt-[8px] caption1 text-center transition-opacity duration-300 text-gray-700"
            :style="{ width: CARD_W + 'px' }"
          >
            {{ card.name }}
          </p>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>
