import { createRouter, createWebHistory } from "vue-router";

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import TabViewLayout from "@/layouts/TabViewLayout.vue";

import HomeView from "@/views/HomeView.vue";
import PaymentView from "@/views/payment/PaymentView.vue";
import TravelLogsView from "@/views/TravelLogsView.vue";
import MenuView from "@/views/MenuView.vue";

import identification from "@/router/identification.js";
import GroupAccount from "./groupAccount.js";

import IdView from "@/views/identification//resident-card/ResidentCardView.vue";
import travelLog from "./travelLog.js";

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
          path: "/personal-accounts/import",
          name: "import-personal-accounts",
          component: () => import("@/views/personal-accounts/ImportAccountView.vue"),
          meta: {
            title: "계좌 불러오기",
            bgColor: "white",
          },
        },
        {
          path: "/personal-accounts/detail",
          name: "personal-accounts-detail",
          component: () => import("@/views/personal-accounts/AccountDetailView.vue"),
          meta: {
            title: "계좌 내역",
            bgColor: "white",
          },
        },
        {
          path: "/personal-accounts/add",
          name: "personal-accounts-add",
          component: () => import("@/views/personal-accounts/AddMoneyView.vue"),
          meta: {
            title: "송금하기",
            bgColor: "white",
          },
        },
        {
          path: "/personal-accounts/send",
          name: "personal-accounts-send",
          component: () => import("@/views/personal-accounts/SendMoneyView.vue"),
          meta: {
            title: "송금하기",
            bgColor: "white",
          },
        },
        {
          path: "identification/guide",
          name: "identification/guide",
          component: () => import("@/views/identification/resident-card/CaptureGuideView.vue"),
        },
        {
          path: "identification/registration",
          name: "identification/registration",
          component: () => import("@/views/identification/resident-card/RegistrationView.vue"),
        },
        {
          path: "exchange-rate",
          name: "ExchangeRate",
          component: () => import("@/views/exchange-rate/ExchangeRateListView.vue"),
          meta: { title: "환율", bgColor: "white" },
        },
        {
          path: "exchange-currency",
          name: "ExchangeCurrency",
          component: () => import("@/views/exchange-currency/SelectView.vue"),
          meta: { title: "환전", bgColor: "white" },
        },
        {
          path: "exchange-currency-account",
          name: "ExchangeCurrencySelectAccount",
          component: () => import("@/views/exchange-currency/SelectAccountView.vue"),
          meta: { title: "환전", bgColor: "white" },
        },
        {
          path: "exchange-currency-amount",
          name: "ExchangeCurrencyInputAmount",
          component: () => import("@/views/exchange-currency/InputAmountView.vue"),
          meta: { title: "환전", bgColor: "white" },
        },
        {
          path: "exchange-currency-password",
          name: "ExchangeCurrencyPassword",
          component: () => import("@/views/exchange-currency/PasswordInputView.vue"),
          meta: { title: "환전", bgColor: "white" },
        },
        {
          path: "exchange-currency-finish",
          name: "ExchangeCurrencyFinish",
          component: () => import("@/views/exchange-currency/FinishExchangeView.vue"),
          meta: { title: "환전", bgColor: "white" },
        },
        {
          path: "account-list",
          name: "account-list",
          component: () => import("@/views/AccountListview.vue"),
          meta: { title: "계좌 목록", bgColor: "white" },
        },
        {
          path: "login",
          name: "login",
          component: () => import("@/views/login/LoginView.vue"),
          meta: { bgColor: "white" },
        },
        {
          path: "app-setting",
          name: "app-setting",
          component: () => import("@/views/AppSettingView.vue"),
          meta: { title: "설정", bgColor: "white" },
        },
        {
          path: "my-page",
          name: "my-page",
          component: () => import("@/views/MyPageView.vue"),
          meta: { title: "마이페이지", bgColor: "white" },
        },
        ...GroupAccount,
        ...identification,
        ...travelLog,
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
          component: IdView,
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
  ],
});

export default router;
