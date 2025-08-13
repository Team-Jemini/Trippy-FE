import { defineStore } from "pinia";
import { fetchVoucher, fetchAccommodationDetail } from "@/api/voucher";
import { parseVoucherDate } from "@/assets/utils";

export const useAccommodationStore = defineStore("accommodation", {
  state: () => ({
    accommodations: [],
    selectedAccommodation: null,
  }),

  getters: {
    // 현재 이용중 + 미래 예약 (체크아웃이 오늘 이후)
    activeAccommodations: (state) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return state.accommodations
        .filter((item) => {
          const checkOutDate = parseVoucherDate(item.checkOutDate);
          return checkOutDate >= today;
        })
        .sort((a, b) => {
          const dateA = parseVoucherDate(a.checkOutDate);
          const dateB = parseVoucherDate(b.checkOutDate);
          return dateA - dateB;
        });
    },

    // 과거 예약 (체크아웃이 오늘 이전)
    pastAccommodations: (state) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return state.accommodations
        .filter((item) => {
          const checkOutDate = parseVoucherDate(item.checkOutDate);
          return checkOutDate < today;
        })
        .sort((a, b) => {
          const dateA = parseVoucherDate(a.checkInDate);
          const dateB = parseVoucherDate(b.checkInDate);
          return dateB - dateA; // 최신순 (가장 최근 이용한 것부터)
        });
    },

    // 전체 (현재 + 과거) - 뷰에서 사용
    allAccommodations: (state, getters) => {
      return [...getters.activeAccommodations, ...getters.pastAccommodations];
    },
  },

  actions: {
    setAccommodations(data) {
      this.accommodations = data;
    },

    selectAccommodation(item) {
      this.selectedAccommodation = item;
    },

    findAccommodationById(id) {
      return this.accommodations.find((a) => a.accommodationId === id);
    },

    async loadAllAccommodations() {
      try {
        const data = await fetchVoucher();
        this.accommodations = data.accommodation || [];
      } catch (error) {
        console.error("숙소 데이터 로딩 실패:", error);
        throw error;
      }
    },

    async loadAccommodationDetail(accommodationId) {
      try {
        const response = await fetchAccommodationDetail(accommodationId);
        return response.data;
      } catch (error) {
        console.error("숙소 상세 조회 실패:", error);
        throw error;
      }
    },
  },
});
