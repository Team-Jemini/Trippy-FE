import api from "@/api/index.js";

export const fetchAirTicketAll = async (userId) => {
  try {
    const response = await api.get(`/air-ticket`);

    return response.data;
  } catch (error) {
    console.error("티켓 전체 조회 실패", error);
    throw error;
  }
};
export const fetchAirTicketDetail = async (airLineId) => {
  try {
    const response = await api.get(`/air-ticket/${airLineId}`);

    return response.data;
  } catch (error) {
    console.error("티켓 상세 조회 실패", error);
    throw error;
  }
};
