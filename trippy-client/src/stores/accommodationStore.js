import { defineStore } from "pinia";
import { fetchVoucherAll, fetchAccommodationDetail } from "@/api/voucher";

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
          const checkOutDate = parseDate(item.checkOutDate);
          return checkOutDate >= today;
        })
        .sort((a, b) => {
          const dateA = parseDate(a.checkInDate);
          const dateB = parseDate(b.checkInDate);
          return dateA - dateB;
        });
    },

    // 과거 예약 (체크아웃이 오늘 이전)
    pastAccommodations: (state) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return state.accommodations
        .filter((item) => {
          const checkOutDate = parseDate(item.checkOutDate);
          return checkOutDate < today;
        })
        .sort((a, b) => {
          const dateA = parseDate(a.checkInDate);
          const dateB = parseDate(b.checkInDate);
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
        const data = await fetchVoucherAll();
        console.log("🏨 숙소 데이터:", data.accommodation);
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

// 날짜 파싱 헬퍼 함수
function parseDate(dateString) {
  // "25.08.09(토) 17:00" -> Date 객체
  const datePart = dateString.split("(")[0]; // "25.08.09"
  const [year, month, day] = datePart.split(".");
  return new Date(`20${year}`, month - 1, day);
}
