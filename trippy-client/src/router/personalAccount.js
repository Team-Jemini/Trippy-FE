export default [
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
    path: "/personal-accounts/detail/:accountId",
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
    path: "account-list",
    name: "account-list",
    component: () => import("@/views/AccountListview.vue"),
    meta: { title: "계좌 목록", bgColor: "white" },
  },
];
