import api from "@/api/index.js";

export const postTransfer = async (transferData) => {
  try {
    const response = await api.post(`/transfer`, transferData);
    return response.data;
  } catch (error) {
    console.error("송금 실패", error);
    throw error;
  }
};
