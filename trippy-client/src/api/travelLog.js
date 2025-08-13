// src/api/travelLog.js
import api from "@/api/index.js";

/** 여행 로그 목록 조회 (토큰으로 userId 추출) */
export const getTravelLogs = async () => {
  const { data } = await api.get("travel-log");
  return Array.isArray(data?.data) ? data.data : [];
};

/** 날짜 가용성 체크 */
export const checkTravelDateAvailability = async (begin, end) => {
  const { data } = await api.get("travel-log/availability", {
    params: { begin, end },
  });
  return Boolean(data?.data);
};

/** 여행 로그 생성 (멀티파트) */
export const createTravelLog = async (payload) => {
  const form = new FormData();

  const dto = {
    accountId: payload.accountId,
    title: payload.title,
    travelBeginDate: payload.travelBeginDate,
    travelEndDate: payload.travelEndDate,
    destination: payload.destination,
    isGenerated: payload.isGenerated ?? false,
  };

  form.append("travelLogCreateDTO", new Blob([JSON.stringify(dto)], { type: "application/json" }));
  if (payload.imageFile) form.append("travelImg", payload.imageFile);

  const { data } = await api.post("travel-log", form);
  return data;
};

/** 가용성 통과 시에만 생성 */
export const createTravelLogIfAvailable = async (payload) => {
  const ok = await checkTravelDateAvailability(payload.travelBeginDate, payload.travelEndDate);
  if (!ok) {
    const err = new Error("DATE_OVERLAP");
    err.code = "DATE_OVERLAP";
    throw err;
  }
  return createTravelLog(payload);
};
