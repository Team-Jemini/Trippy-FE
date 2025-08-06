export function loadOpenCV(callback) {
  // OpenCV가 메모리에 로드 되어있는지 확인
  if (window.cv && window.cv.Mat) {
    callback(window.cv);
    return;
  }

  const script = document.createElement("script");
  script.src = "https://docs.opencv.org/4.x/opencv.js";
  script.async = true;

  script.onload = () => {
    // WebAssembly와 내부 런타임 초기화
    window.cv["onRuntimeInitialized"] = () => {
      callback(window.cv); // 초기화 완료 후 실행
    };
  };
  script.onerror = () => alert("OpenCV.js 로드 실패");
  document.head.appendChild(script); //<head>에 <script> 붙여서 로드되도록 함
}
