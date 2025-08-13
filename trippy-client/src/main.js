import "@/assets/tailwind.css";
import "./registerServiceWorker.js";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);

app.use(createPinia());
app.use(router);

app.mount("#app");
