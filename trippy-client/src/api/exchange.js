import api from "./index";

const BASE_URL = `/exchange`;

// 환율 데이터 저장
export const postExchangeRate = async () => {
  try {
    const response = await api.post(BASE_URL);

    return response.data;
  } catch (error) {
    console.error("환율 정보 저장 실패", error);
    throw error;
  }
};

// 환율 데이터 목록 조회
export const getExchangeRate = async () => {
  try {
    const response = await api.get(`${BASE_URL}/rates`);
    // 환율 데이터 목록 받아오기
    return response.data.data;
  } catch (error) {
    console.error("환율 정보 조회 실패", error);
    throw error;
  }
};

// 환율 및 계좌 잔액(외화/원화) 출력
export const getRatesAndBalance = async (accountId, currencyCode) => {
  try {
    const response = await api.get(
      `${BASE_URL}/rate-balance`,
      {
        params: {
          accountId: accountId,
          currencyCode: currencyCode,
        }});

    return response.data;
  } catch (error) {
    console.error("적용할 환율 및 계좌 잔액 조회 실패", error);
    throw error;
  }
};

// 환전 내역 저장
export const postExchange = async () => {
  try {
    const response = await api.post(`${BASE_URL}/exchange`);

    return response.data;
  } catch (error) {
    console.error("환전 거래 실패", error);
    throw error;
  }
};
