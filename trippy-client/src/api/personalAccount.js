import api from "@/api/index.js";

export const fetchPersonalAccount = async (userID) => {
  try {
    const response = await api.get(`/accounts/sync?userId=${userID}`);

    return response.data;
  } catch (error) {
    console.error("Codef 조회 실패", error);
    throw error;
  }
};
