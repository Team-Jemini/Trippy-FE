// src/api/travelLog.js
import api from "@/api/index.js";

/**
 * 여행 로그 목록 조회
 * GET http://localhost:8080/travel-log?userId=1
 */
export const getTravelLogs = async (userId) => {
  try {
    const { data } = await api.get("travel-log", { params: { userId } });
    // 서버 응답: { code, message, data: [...] } 형태
    return Array.isArray(data?.data) ? data.data : [];
  } catch (error) {
    console.error("여행 로그 조회 실패", error);
    throw error;
  }
};

/**
 * 새 여행 로그 생성
 */
export const createTravelLog = async (userId, payload) => {
  try {
    const { data } = await api.post("travel-log", payload, {
      params: { userId },
    });
    return data?.data; // 생성된 리소스 반환한다고 가정
  } catch (error) {
    console.error("여행 로그 생성 실패", error);
    throw error;
  }
};
