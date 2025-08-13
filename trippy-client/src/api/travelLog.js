import api from "@/api/index.js";

export const getTravelLogs = async () => {
  try {
    const { data } = await api.get("travel-log");
    return Array.isArray(data?.data) ? data.data : [];
  } catch (error) {
    console.error("여행 로그 조회 실패", error);
    throw error;
  }
};

export const createTravelLog = async (payload) => {
  try {
    const { data } = await api.post("travel-log", payload);
    return data?.data;
  } catch (error) {
    console.error("여행 로그 생성 실패", error);
    throw error;
  }
};
