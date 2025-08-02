export default [
  {
    path: "/group-account/create",
    name: "group-account-create",
    component: () => import("../views/group-account/create-account/CreateIntroView.vue"),
    meta: {
      title: "모임계좌 만들기",
      bgColor: "white",
    },
  },
  {
    path: "/group-account/create/step1",
    name: "group-account-create-step1",
    component: () => import("../views/group-account/create-account/AgreementStep1View.vue"),
    meta: {
      title: "모임계좌 만들기",
      bgColor: "white",
    },
  },
  {
    path: "/group-account/create/step2",
    name: "group-account-create-step2",
    component: () => import("../views/group-account/create-account/AgreementStep2View.vue"),
    meta: {
      title: "모임계좌 만들기",
      bgColor: "white",
    },
  },
  {
    path: "/group-account/create/step3",
    name: "group-account-create-step3",
    component: () => import("../views/group-account/create-account/AgreementStep3View.vue"),
    meta: {
      title: "모임계좌 만들기",
      bgColor: "white",
    },
  },
  {
    path: "/group-account/create/step4",
    name: "group-account-create-step4",
    component: () => import("../views/group-account/create-account/AgreementStep4View.vue"),
    meta: {
      title: "모임계좌 만들기",
      bgColor: "white",
    },
  },
  {
    path: "/group-account/create/step5",
    name: "group-account-create-step5",
    component: () => import("../views/group-account/create-account/AgreementStep5View.vue"),
    meta: {
      title: "모임계좌 만들기",
      bgColor: "white",
    },
  },
  {
    path: "/group-account/create/step6",
    name: "group-account-create-step6",
    component: () => import("../views/group-account/create-account/AgreementStep6View.vue"),
    meta: {
      title: "모임계좌 만들기",
      bgColor: "white",
    },
  },
  {
    path: "/group-account/create/complete",
    name: "group-account-create-complete",
    component: () => import("../views/group-account/create-account/CreateCompleteView.vue"),
    meta: {
      title: "모임계좌 만들기",
      bgColor: "white",
    },
  },
  {
    path: "/group-settle/target",
    name: "group-settle-target",
    component: () => import("@/views/group-account/settle-request/TargetView.vue"),
    meta: {
      title: "정산 요청하기",
      bgColor: "white",
    },
  },
  {
    path: "/group-settle/amount",
    name: "group-settle-amount",
    component: () => import("@/views/group-account/settle-request/EnterSettleAmountView.vue"),
    meta: {
      title: "정산 요청하기",
      bgColor: "white",
    },
  },
  {
    path: "/group-settle/complete",
    name: "group-settle-complete",
    component: () => import("@/views/group-account/settle-request/SettleCompleteView.vue"),
    meta: {
      title: "정산 요청하기",
    },
  },
  {
    path: "/group-account/settings",
    name: "group-account-settings",
    component: () => import("@/views/group-account/settings/GroupAccountSettingsWrapper.vue"),
    meta: {
      title: "계좌 설정",
      bgColor: "white",
    },
  },
  {
    path: "/group-join/agreement",
    name: "group-join-agreement",
    component: () => import("@/views/group-account/join/AgreeTermsView.vue"),
    meta: {
      title: "모임계좌 참여하기",
      bgColor: "white",
    },
  },
  {
    path: "/group-join/select-account",
    name: "group-join-select-account",
    component: () => import("@/views/group-account/join/PickRepresentativeView.vue"),
    meta: {
      title: "모임계좌 참여하기",
      bgColor: "white",
    },
  },
  {
    path: "/group-join/complete",
    name: "group-join-complete",
    component: () => import("@/views/group-account/join/JoinComplete.vue"),
    meta: {
      title: "모임계좌 참여하기",
      bgColor: "white",
    },
  },
  {
    path: "/group-account/detail",
    name: "group-account-detail",
    component: () => import("@/views/group-account/detail/AccountDetailView.vue"),
    meta: {
      title: "계좌 내역",
      bgColor: "white",
    },
  },
  {
    path: "/group-account/members",
    name: "group-account-members",
    component: () => import("@/views/group-account/settings/MemberListView.vue"),
    meta: {
      title: "참여중 멤버",
      bgColor: "white",
    },
  },
  {
    path: "/send/select-recipient",
    name: "send-select-recipient",
    component: () => import("@/views/group-account/transfer/SelectRecipientView.vue"),
    meta: {
      title: "송금하기",
      bgColor: "white",
    },
  },
  {
    path: "/send/amount",
    name: "send-amount",
    component: () => import("@/views/group-account/transfer/EnterAmountView.vue"),
    meta: {
      title: "송금하기",
      bgColor: "white",
    },
  },
  {
    path: "/send/password",
    name: "send-password",
    component: () => import("@/views/group-account/transfer/EnterPasswordView.vue"),
    meta: {
      title: "송금하기",
      bgColor: "white",
    },
  },
  {
    path: "/send/transfer-review",
    name: "send-transfer-review",
    component: () => import("@/views/group-account/transfer/TransferReviewView.vue"),
    meta: {
      title: "송금하기",
      bgColor: "white",
    },
  },
  {
    path: "/send/complete",
    name: "send-complete",
    component: () => import("@/views/group-account/transfer/TransferCompleteView.vue"),
    meta: {
      title: "송금하기",
      bgColor: "white",
    },
  },
];
