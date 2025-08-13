import api from "@/api/index.js";

export const postTransfer = async (userId, transferData) => {
  try {
    const response = await api.post(`/transfer?userId=${userId}`, transferData);
    return response.data;
  } catch (error) {
    console.error("송금 실패", error);
    throw error;
  }
};
