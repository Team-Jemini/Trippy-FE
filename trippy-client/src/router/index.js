import { createRouter, createWebHistory } from "vue-router";

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import TabViewLayout from "@/layouts/TabViewLayout.vue";

import HomeView from "@/views/HomeView.vue";
import PaymentView from "@/views/payment/PaymentView.vue";
import TravelLogsView from "@/views/TravelLogsView.vue";
import MenuView from "@/views/MenuView.vue";

import personalAccount from "@/router/personalAccount.js";
import groupAccount from "@/router/groupAccount.js";
import payment from "@/router/payment.js";
import travelLog from "@/router/travelLog.js";
import identification from "@/router/identification.js";
import exchange from "@/router/exchange.js";
import user from "@/router/user.js";

import NoPaddingLayout from "@/layouts/NoPaddingLayout.vue";
import Notifications from "@/views/Notifications.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // DefaultLayout
    {
      path: "/",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "home",
          component: HomeView,
          meta: { title: "홈" },
        },
        {
          path: "payment",
          name: "payment",
          component: PaymentView,
          meta: { title: "결제" },
        },
        {
          path: "travel-logs",
          name: "travel-logs",
          component: TravelLogsView,
          meta: { title: "여행 로그" },
        },
        {
          path: "menu",
          name: "menu",
          component: MenuView,
          meta: { title: "메뉴" },
        },
        {
          path: "/notifications",
          name: "notifications",
          component: Notifications,
          meta: { title: "알림" },
        },
        ...personalAccount,
        ...groupAccount,
        ...payment,
        ...travelLog,
        ...identification,
        ...exchange,
        ...user,
      ],
    },
    // TabViewLayout (탭 메뉴 사용하는 뷰)
    {
      path: "/check",
      component: TabViewLayout,
      redirect: "/check/identification",
      children: [
        {
          path: "identification",
          name: "identification",
          component: () => import("@/views/identification/resident-card/ResidentCardView.vue"),
          meta: { tabs: ["주민등록", "여권"] },
        },
        {
          path: "tickets",
          name: "AirTicket",
          component: () => import("@/views/air-ticket/AirTicketView.vue"),
          meta: { title: "항공권 내역", tabs: ["이용전", "이용후"] },
        },
        {
          path: "bouchers",
          name: "bouchers",
          component: () => import("@/views/boucher/BoucherView.vue"),
          meta: { title: "예약 내역", tabs: ["숙소", "관광"] },
        },
        {
          path: "bouchers/sightseeing-register",
          name: "SightseeingRegister",
          component: () => import("@/views/boucher/SightseeingRegisterView.vue"),
          meta: { title: "예약 등록하기", bgColor: "wihte" },
        },
      ],
    },
    {
      path: "/capture",
      component: NoPaddingLayout,
      children: [
        {
          path: "",
          name: "capture",
          component: () => import("@/views/identification/CaptureView.vue"),
        },
      ],
    },
  ],
});

export default router;
