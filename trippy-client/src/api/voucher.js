import api from "@/api/index.js";

export const fetchVoucher = async () => {
  try {
    const response = await api.get(`/voucher`);

    return response.data;
  } catch (error) {
    console.error("바우처(숙소,관광) 전체 조회 실패", error);
    throw error;
  }
};

export const fetchAccommodationDetail = async (accommocationId) => {
  try {
    const response = await api.get(`/voucher/accommodation/${accommocationId}`);

    return response.data;
  } catch (error) {
    console.error("숙소예약 상세 조회 실패", error);
    throw error;
  }
};
