import { nextTick } from "vue";
import { getPerspectiveCorrectedImage } from "@/components/identification/script/transform-id-perspective";

export function useCameraDetection(video, guideBox, detected) {
  let captured = false; // 중복 캡처 방지용
  let stream, canvas, ctx;

  // cv.Mat → canvas 에 그리기
  function drawMatToCanvas(mat, canvas) {
    const rgba = new cv.Mat();
    if (mat.type() !== cv.CV_8UC4) {
      cv.cvtColor(mat, rgba, cv.COLOR_RGBA2RGBA);
    } else {
      mat.copyTo(rgba);
    }

    const imgData = new ImageData(new Uint8ClampedArray(rgba.data), rgba.cols, rgba.rows);
    const ctx2d = canvas.getContext("2d");
    ctx2d.putImageData(imgData, 0, 0);

    rgba.delete();
  }

  function startDetection() {
    const checkFrame = () => {
      if (!video.value || typeof cv === "undefined") {
        requestAnimationFrame(checkFrame);
        return;
      }

      // 원본 해상도
      const vw = video.value.videoWidth;
      const vh = video.value.videoHeight;
      if (!vw || !vh) {
        requestAnimationFrame(checkFrame);
        return;
      }

      // 일단 모바일에 맞춰 설정
      const ORI_BOX_W = vw * 0.7;
      const ORI_BOX_H = vh * 0.25;
      console.log(`${ORI_BOX_W}, ${ORI_BOX_H}`);

      canvas.width = vw;
      canvas.height = vh;
      ctx.drawImage(video.value, 0, 0, vw, vh);

      // 프레임 중앙 기준 사각형 자르기
      const boxX = (vw - ORI_BOX_W) / 2;
      const boxY = (vh - ORI_BOX_H) / 2;
      const frame = ctx.getImageData(boxX, boxY, ORI_BOX_W, ORI_BOX_H);

      // 사각형 탐지
      let src = cv.matFromImageData(frame);
      let gray = new cv.Mat();
      let blurred = new cv.Mat();
      let edges = new cv.Mat();

      cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY); //그레이스 스케일 변환
      cv.GaussianBlur(gray, blurred, new cv.Size(5, 5), 0); // 노이즈 제거
      cv.Canny(blurred, edges, 50, 150); // 에지 검출

      let contours = new cv.MatVector();
      let hierarchy = new cv.Mat();
      cv.findContours(edges, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

      // 사각형 판정
      let foundRectangle = false;
      for (let i = 0; i < contours.size(); i++) {
        let contour = contours.get(i);
        let approx = new cv.Mat();
        cv.approxPolyDP(contour, approx, 0.02 * cv.arcLength(contour, true), true);

        if (approx.rows === 4) {
          // 꼭짓점이 4개면
          let rect = cv.boundingRect(approx);
          let aspect = rect.width / rect.height; // 가로 세로 비율
          let area = cv.contourArea(approx); // 면적

          if (area > 250000 && aspect > 1.4 && aspect < 1.8 && !captured) {
            // // 신분증 비율 1.6:1 , 오차 +-0.2
            foundRectangle = true;
            captured = true;
            const corrected = getPerspectiveCorrectedImage(src, approx, ORI_BOX_W, ORI_BOX_H);

            const outputCanvas = document.createElement("canvas");
            outputCanvas.width = ORI_BOX_W;
            outputCanvas.height = ORI_BOX_H;
            drawMatToCanvas(corrected, outputCanvas);

            // 다운로드
            const imageDataUrl = outputCanvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = imageDataUrl;
            link.download = "corrected_id.png";
            link.click();

            corrected.delete();
          }
        }

        approx.delete();
        contour.delete();
      }

      ////////////////////////////////////////

      // 수동 메모리 해제 (OpenCV)
      src.delete();
      gray.delete();
      blurred.delete();
      edges.delete();
      contours.delete();
      hierarchy.delete();

      // 화면 좌표로 변환해서 guideBox 갱신
      const vRect = video.value.getBoundingClientRect();
      const contW = vRect.width;
      const contH = vRect.height;

      const s = Math.max(contW / vw, contH / vh); // 스케일 보정
      const realVidW = vw * s;
      const realVidH = vh * s;
      const offsetX = (realVidW - contW) / 2;
      const offsetY = (realVidH - contH) / 2;

      guideBox.value = {
        left: boxX * s - offsetX,
        top: boxY * s - offsetY,
        width: ORI_BOX_W * s,
        height: ORI_BOX_H * s,
      };

      requestAnimationFrame(checkFrame);
    };

    requestAnimationFrame(checkFrame);
  }

  // 카메라 연결 + 탐지 시작
  function startCameraAndDetection() {
    navigator.mediaDevices
      .getUserMedia({
        // 카메라, 마이크 권한 요청 API
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          aspectRatio: 9 / 16,
          facingMode: "environment", // 후면 카메라 우선 요청
        },
      })
      .then((mediaStream) => {
        stream = mediaStream;
        nextTick(() => {
          // 렌더링 끝나고 DOM 준비 후 실행 보장
          if (video.value) {
            video.value.srcObject = stream; // 카메라 연결

            canvas = document.createElement("canvas"); // <canvas> 동적 생성
            ctx = canvas.getContext("2d", { willReadFrequently: true }); // 픽셀 읽기

            startDetection(); // OpenCV 초기화 후 탐지 시작
          }
        });
      })
      .catch((e) => alert("Camera access error: " + e.message));
  }

  return { startCameraAndDetection };
}
