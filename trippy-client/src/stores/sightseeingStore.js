import { defineStore } from "pinia";
import { fetchVoucher } from "@/api/voucher";
import { parseVoucherDate } from "@/assets/utils";

export const useSightseeingStore = defineStore("sightseeing", {
  state: () => ({
    sightseeings: [],
    selectedSightseeing: null,
  }),

  getters: {
    // 오늘 이후의 관광 (미래 예약)
    upcomingSightseeings: (state) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return state.sightseeings
        .filter((item) => {
          const viewingDate = parseVoucherDate(item.viewingDate);
          return viewingDate >= today;
        })
        .sort((a, b) => {
          const dateA = parseVoucherDate(a.viewingDate);
          const dateB = parseVoucherDate(b.viewingDate);
          return dateA - dateB;
        });
    },

    // 과거 관광 (오늘 이전)
    pastSightseeings: (state) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return state.sightseeings
        .filter((item) => {
          const viewingDate = parseVoucherDate(item.viewingDate);
          return viewingDate < today;
        })
        .sort((a, b) => {
          const dateA = parseVoucherDate(a.viewingDate);
          const dateB = parseVoucherDate(b.viewingDate);
          return dateB - dateA; // 최신순 (가장 최근 이용한 것부터)
        });
    },

    // 전체 (미래 + 과거) - 뷰에서 사용
    allSightseeings: (state, getters) => {
      return [...getters.upcomingSightseeings, ...getters.pastSightseeings];
    },
  },

  actions: {
    setSightseeing(data) {
      this.sightseeings = data;
    },

    selectSightseeing(item) {
      this.selectedSightseeing = item;
    },

    findSightseeingById(id) {
      return this.sightseeings.find((s) => s.sightseeingId === id);
    },

    async loadAllSightseeings() {
      try {
        const data = await fetchVoucher();
        this.sightseeings = data.sightSeeing || [];
      } catch (error) {
        console.error("관광 데이터 로딩 실패:", error);
        throw error;
      }
    },
  },
});
