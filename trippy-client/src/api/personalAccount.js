import api from "@/api/index.js";

export const fetchPersonalAccount = async () => {
  try {
    const response = await api.get(`/accounts/sync`);

    return response.data;
  } catch (error) {
    console.error("Codef 조회 실패", error);
    throw error;
  }
};

export const postPersonalAccount = async (accountsData) => {
  try {
    const response = await api.post(`/accounts/save`, accountsData);

    return response.data;
  } catch (error) {
    console.error("계좌 등록 실패", error);
    throw error;
  }
}
