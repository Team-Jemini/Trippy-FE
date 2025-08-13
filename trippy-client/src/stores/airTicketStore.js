import { defineStore } from "pinia";
import { fetchAirTicketAll } from "@/api/airTicket";

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

    // 날짜에서 요일 추출 헬퍼 함수
    extractDateAndDayOfWeek(departureDateString) {
      // "2025-08-28(일)" 형식에서 날짜와 요일 분리
      const match = departureDateString.match(/^(\d{4}-\d{2}-\d{2})\((.)\)$/);
      if (match) {
        return {
          date: match[1], // "2025-08-28"
          dayOfWeek: match[2], // "일"
        };
      }
      // 매칭 실패시 fallback
      return {
        date: departureDateString.split("(")[0] || departureDateString,
        dayOfWeek: "미정",
      };
    },

    // 시간 형식 정규화 (0:30 -> 00:30)
    normalizeTime(timeString) {
      if (!timeString) return "00:00";

      const parts = timeString.split(":");
      if (parts.length === 2) {
        const hours = parts[0].padStart(2, "0");
        const minutes = parts[1].padStart(2, "0");
        return `${hours}:${minutes}`;
      }
      return timeString;
    },

    // API 데이터를 컴포넌트에서 사용하는 구조로 변환
    normalizeTickets(list) {
      return list.map((t) => {
        const { date, dayOfWeek } = this.extractDateAndDayOfWeek(t.departureDate);

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
            time: this.normalizeTime(t.departure.time),
          },

          // 도착 정보
          arrival: {
            city: t.arrival.city,
            code: t.arrival.airportCode,
            time: this.normalizeTime(t.arrival.time),
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
