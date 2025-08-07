export default [
  {
    path: "/payment/settings",
    name: "PaymentSettings",
    component: () => import("@/views/payment/SettingsView.vue"),
    meta: {
      title: "카드 설정",
      bgColor: "white",
    },
  },
  {
    path: "/payment/add",
    name: "ImportCards",
    component: () => import("@/views/payment/ImportCardView.vue"),
    meta: {
      title: "카드 불러오기",
      bgColor: "white",
    },
  },
  {
    path: "/payment/settings/:id/nickname",
    name: "CardNickname",
    component: () => import("@/views/payment/CardNicknameView.vue"),
    meta: {
      title: "별명 설정",
      bgColor: "white",
    },
  },
  {
    path: "/payment/password",
    name: "PaymentPassword",
    component: () => import("@/views/payment/PasswordView.vue"),
    meta: {
      bgColor: "white",
    },
  },
];
