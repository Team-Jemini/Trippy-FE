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

  const { data } = await api.post("travel-log", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });

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

/** 여행 리포트 조회 */
export const getTravelReport = async (travelId) => {
  if (travelId === undefined || travelId === null) {
    const err = new Error("TRAVEL_ID_REQUIRED");
    err.code = "TRAVEL_ID_REQUIRED";
    throw err;
  }
  const { data } = await api.get(`travel-report/${travelId}`);
  // SuccessResponse 래퍼 기준: 실제 페이로드는 data.data
  return data?.data ?? null;
};

/** 여행 리포트 생성 */
export const createTravelReport = async (travelId) => {
  if (travelId === undefined || travelId === null) {
    const err = new Error("TRAVEL_ID_REQUIRED");
    err.code = "TRAVEL_ID_REQUIRED";
    throw err;
  }
  const { data } = await api.post("travel-report", { travelId });
  return data; // 성공 코드/메시지 반환
};
