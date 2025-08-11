<script setup>
import { useCameraDetection } from "@/components/identification/script/use-camera-detection";
import { loadOpenCV } from "@/components/identification/script/use-openCV-loader";
import { Icon } from "@iconify/vue";
import { ref, onMounted } from "vue";

const video = ref(null);
const detected = ref(false);
const guideBox = ref({ left: 0, top: 0, width: 0, height: 0 });

onMounted(() => {
  // OpenCV 로드 후 카메라 + 탐지 실행
  loadOpenCV(() => {
    const { startCameraAndDetection } = useCameraDetection(video, guideBox, detected);
    startCameraAndDetection();
  });
});
</script>

<template>
  <div class="relative w-screen h-screen bg-black overflow-hidden">
    <div class="absolute top-[60px] w-full text-center text-white body1 z-10">
      <Icon
        icon="material-symbols:close-rounded"
        class="absolute left-4 top-[0.75rem] -translate-y-[0.8rem] w-[1.5rem] h-[1.5rem]"
      />
      <span>주민등록증 사진 촬영</span>
    </div>

    <!-- 카메라 영상 -->
    <video
      ref="video"
      autoplay
      playsinline
      muted
      class="absolute top-0 left-0 w-full h-full object-cover"
    ></video>

    <!-- 실제 분석 영역을 그대로 표시하는 테두리 -->
    <div
      class="absolute rounded-xl border-4 transition-colors duration-300 pointer-events-none"
      :class="detected ? 'border-blue-400' : 'border-white'"
      style="box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.7)"
      :style="{
        left: guideBox.left + 'px',
        top: guideBox.top + 'px',
        width: guideBox.width + 'px',
        height: guideBox.height + 'px',
      }"
    ></div>

    <!-- 설명 텍스트 -->
    <div class="absolute top-40 w-full text-center text-white body1 z-10">
      카메라로 신분증을 자동 촬영합니다.<br />
      사각형에 맞게 신분증을 놓아주세요.
    </div>

    <!-- 안내 텍스트 -->
    <div class="absolute bottom-[12.5rem] w-full text-center text-white body1">
      빛 반사에 유의하여 촬영해주세요.
    </div>
  </div>
</template>
