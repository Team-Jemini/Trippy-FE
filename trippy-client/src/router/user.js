export default [
  {
    path: "login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
    meta: { bgColor: "white" },
  },
  {
    path: "join",
    name: "join",
    component: () => import("@/views/JoinView.vue"),
    meta: { title: "회원 가입", bgColor: "white" },
  },
  {
    path: "my-page",
    name: "my-page",
    component: () => import("@/views/MyPageView.vue"),
    meta: { title: "마이페이지", bgColor: "white" },
  },
  {
    path: "app-setting",
    name: "app-setting",
    component: () => import("@/views/AppSettingView.vue"),
    meta: { title: "설정", bgColor: "white" },
  },
];
