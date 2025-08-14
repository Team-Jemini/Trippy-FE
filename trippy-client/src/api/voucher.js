import api from "@/api/index.js";

export const fetchVoucher = async () => {
  try {
    const response = await api.get(`/voucher`);
    return response.data.data;
  } catch (error) {
    console.error("바우처 전체 조회 실패", error);
    throw error;
  }
};

export const postVoucher = async (voucherData) => {
  try {
    const response = await api.post('voucher/sightseeing', voucherData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data.data;
  } catch (error) {
    console.error("바우처 등록 실패", error);
    throw error;
  }
}

export const fetchAccommodationDetail = async (accommodationId) => {
  try {
    const response = await api.get(`/voucher/accommodation/${accommodationId}`);
    return response.data;
  } catch (error) {
    console.error("숙소 상세 조회 실패", error);
    throw error;
  }
};

