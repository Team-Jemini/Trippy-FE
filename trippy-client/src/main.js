import "@/assets/tailwind.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

console.log("✅ KAKAO KEY:", import.meta.env.VITE_KAKAO_JS_KEY);
Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);

app.use(createPinia());
app.use(router);

app.mount("#app");
