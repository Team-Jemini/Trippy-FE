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

// 사용자 계좌 목록 조회
export const getAccountList = async (userId) => {
  try {
    const response = await api.get(`${BASE_URL}/accounts?userId=${userId}`);

    return response.data.data;
  } catch (error) {
    console.error("계좌 목록 조회 실패", error);
    throw error;
  }
};

// 환율 및 계좌 잔액(외화/원화) 출력
export const getRatesAndBalance = async (accoundId, currencyCode, userId) => {
  try {
    const response = await api.get(
      `${BASE_URL}/rate-balance?userId=${userId}&currencyCode=${currencyCode}&accountId=${accoundId}`,
    );

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

// // -------------------------------------------------------------

// // Get 함수
// // api.get 함수의 인자로 API 요청 엔드포인트만 전달하면 됩니다.
// export const getAccount = async (userId) => {
//   try {
//     const response = await api.get(`/exchange?userId=${userId}`);

//     return response.data;
//   } catch (error) {
//     console.error("계좌 조회 실패", error);
//     throw error;
//   }
// };

// // Post 함수
// // api.post 함수 인자로 엔드포인트와 전달할 데이터 객체를 넣어주면 됩니다.
// // accountRequest: API로 넘겨줄 데이터 body
// // 보통 함수 호출 뷰 코드에서 json 형태로 담아서 객체로 전달합니다.
// export const postAccount = async (userId, accountRequest) => {
//   try {
//     const response = await api.post(/accounts?userId=${userId}, accountRequest);

//     return response.data;
//   } catch (error) {
//     console.error("계좌 생성 실패", error);
//     throw error;
//   }
// }
