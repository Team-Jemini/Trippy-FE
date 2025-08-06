export default [
  {
    path: "identification/guide",
    name: "identification/guide",
    meta: {
      title: "주민등록증 촬영",
      bgColor: "white",
    },
    component: () => import("@/views/identification/resident-card/CaptureGuideView.vue"),
  },
  {
    path: "identification/registration",
    name: "identification/registration",
    meta: {
      title: "주민등록증 등록",
      bgColor: "white",
    },
    component: () => import("@/views/identification/resident-card/RegistrationView.vue"),
  },
  {
    path: "passport/guide",
    name: "passport/guide",
    meta: {
      title: "여권 촬영",
      bgColor: "white",
    },
    component: () => import("@/views/identification/passport/CaptureGuideView.vue"),
  },
  {
    path: "passport/registration",
    name: "passport/registration",
    meta: {
      title: "여권 등록",
      bgColor: "white",
    },
    component: () => import("@/views/identification/passport/RegistrationView.vue"),
  },
];
