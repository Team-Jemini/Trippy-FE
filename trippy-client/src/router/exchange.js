export default [
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
];
