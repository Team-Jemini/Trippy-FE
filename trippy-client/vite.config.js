import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import svgLoader from "vite-svg-loader";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), svgLoader()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: "0.0.0.0", // 외부 기기에서 접근 가능하도록 설정
    port: 5173, // 기본 포트 (다른 포트를 사용 중이면 해당 번호로)
    allowedHosts: ["43ba8f842559.ngrok-free.app"], // 로컬 - 신분증 촬영 테스트, 테스트할 때마다 계속 바꿔줘야한다.
  },
});
