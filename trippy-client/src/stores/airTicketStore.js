import { defineStore } from "pinia";
import { fetchAirTicketAll } from "@/api/airTicket";
import { extractDateAndDayOfWeek, normalizeTime } from "@/assets/utils";

export const useAirTicketStore = defineStore("airTicket", {
  state: () => ({
    tickets: [],
  }),

  getters: {
    usedTickets: (state) => state.tickets.filter((t) => t.used === true),
    unusedTickets: (state) => state.tickets.filter((t) => t.used === false),
  },

  actions: {
    setTickets(tickets) {
      this.tickets = tickets;
    },

    updateTicketStatus(id, used) {
      const ticket = this.tickets.find((t) => t.id === id);
      if (ticket) ticket.used = used;
    },

    // API 데이터를 컴포넌트에서 사용하는 구조로 변환
    normalizeTickets(list) {
      return list.map((t) => {
        const { date, dayOfWeek } = extractDateAndDayOfWeek(t.departureDate);

        return {
          id: t.airlineId,

          // 날짜 관련
          date: date,
          dayOfWeek: dayOfWeek,

          // 예약 정보
          reservationCode: t.reservationCode,

          // 출발 정보
          departure: {
            city: t.departure.city,
            code: t.departure.airportCode,
            time: normalizeTime(t.departure.time),
          },

          // 도착 정보
          arrival: {
            city: t.arrival.city,
            code: t.arrival.airportCode,
            time: normalizeTime(t.arrival.time),
          },

          // 항공편 정보
          flight: {
            airline: "", // 항공사명 불필요하므로 빈 문자열 또는 제거
            flightNo: t.flightNumber,
            baggage: t.baggage,
            seatType: t.seatClass,
          },

          // 기존 필드
          used: false,
        };
      });
    },

    async loadAllTickets() {
      try {
        const raw = await fetchAirTicketAll();
        // 배열이 아닌 경우 처리
        if (!raw) {
          this.tickets = [];
          return;
        }

        if (!Array.isArray(raw)) {
          if (Array.isArray(raw.data)) {
            this.tickets = this.normalizeTickets(raw.data);
          } else {
            this.tickets = [];
          }
          return;
        }

        this.tickets = this.normalizeTickets(raw);
      } catch (error) {
        this.tickets = []; // 에러 시 빈 배열로 초기화
        throw error;
      }
    },
  },
});
