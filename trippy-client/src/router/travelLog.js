export default [
  {
    path: "new-log",
    name: "NewLog",
    component: () => import("@/views/travel-logs/NewLog.vue"),
    meta: {
      title: "새 여행로그",
      bgColor: "white",
    },
  },
  {
    path: "/map/:travelId",
    name: "Map",
    component: () => import("@/views/travel-logs/MapView.vue"),
    // meta: {
    //   title: "지도",
    //   bgColor: "white",
    // },
    props: (route) => ({ travelId: Number(route.params.travelId) }),
  },
  {
    path: "/travel-report/:travelId",
    name: "TravelReport",
    component: () => import("@/views/travel-logs/TravelReport.vue"),
    meta: {
      title: "여행리포트",
      bgColor: "white",
    },
  },
];
