import api from "./index";

//export const fetchCodefAndSave = (accountId) =>
//api.post("cards/codef", null, { params: { accountId } });

//export const getCardSummaries = () => api.get("cards/summary");

//export const getCardDetails = () => api.get("cards/detail");
export const fetchCodefAndSave = async (accountId) => {
  const response = await api.post("cards/codef", null, {
    params: { accountId },
  });

  return response.data;
};

export const getCardSummaries = async () => {
  const response = await api.get("cards/summary");

  return response.data;
};

export const getCardDetails = async () => {
  const response = await api.get("cards/detail");
};
// ✅ 추가: 주카드 설정
//export const setMainCard = (cardId, config = {}) =>
//api.put(`cards/${cardId}/main`, null, { ...config });

export const activateQrCodes = () => {
  api.post("cards/qr/activate", null);
  return response.data;
};

export const deleteCard = async (cardId, config = {}) => {
  const response = await api.delete(`cards/${cardId}`, { ...config });

  return response.data;
};

export const updateCardNickname = async (cardId, cardNickname, config = {}) => {
  const response = await api.put(`cards/${cardId}/nickname`, null, {
    params: { cardNickname },
    ...config,
  });

  return response.data;
};

export const setMainCard = async (cardId, config = {}) => {
  const response = await api.put(`cards/${cardId}/main`, null, { ...config });

  return response.data;
};
