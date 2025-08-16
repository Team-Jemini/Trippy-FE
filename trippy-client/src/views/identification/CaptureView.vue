<script setup>
import { useCameraDetection } from "@/components/identification/script/use-camera-detection";
import { loadOpenCV } from "@/components/identification/script/use-openCV-loader";
import { useOcrStore } from "@/stores/ocrStore";
import { Icon } from "@iconify/vue";
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";

const video = ref(null);
const detected = ref(false);
const guideBox = ref({ left: 0, top: 0, width: 0, height: 0 });

const router = useRouter();
const ocr = useOcrStore();
let stopCameraRef = null;

onMounted(() => {
  // OpenCV 로드 후 카메라 + 탐지 실행
  loadOpenCV(() => {
    const { startCameraAndDetection, stopCamera } = useCameraDetection(video, guideBox, detected, {
      async onCaptured(file) {
        // 1) 파일을 스토어에 저장
        ocr.setFile(file);
        // 2) 카메라 정리
        stopCamera();
      },
    });
    stopCameraRef = stopCamera; // 언마운트 시 사용
    startCameraAndDetection();
  });
});

watch(
  () => ocr.file,
  async (f) => {
    if (!f || ocr.loading) return;
    try {
      await ocr.requestOcr();
    } catch (e) {
      console.error("OCR failed:", e);
      // TODO: 토스트/재촬영 버튼 등
    }
  },
);

watch(
  () => ocr.result,
  (val) => {
    if (val) {
      router.push("/identification/registration");
    }
  },
);

onBeforeRouteLeave(() => {
  stopCameraRef?.();
});
onBeforeUnmount(() => {
  stopCameraRef?.();
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
