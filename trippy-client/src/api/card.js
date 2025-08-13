import api from "./index";

export const fetchCodefAndSave = async (accountId) => {
  const response = await api.post(
    "cards/codef",
    null,
    {
      params: { accountId }
    });

  return response.data;
}

export const getCardSummaries = async () => {
  const response = await api.get("cards/summary");

  return response.data;
}

export const getCardDetails = async () => {
  const response = await api.get("cards/detail");

  return response.data;
}

// ✅ 추가: 카드 삭제
export const deleteCard = (cardId, config = {}) => api.delete(`cards/${cardId}`, { ...config });

// ✅ 추가: 별명 수정 (백엔드가 @RequestParam 으로 받음)
export const updateCardNickname = (cardId, cardNickname, config = {}) =>
  api.put(`cards/${cardId}/nickname`, null, { params: { cardNickname }, ...config });

// ✅ 추가: 주카드 설정
export const setMainCard = (cardId, config = {}) =>
  api.put(`cards/${cardId}/main`, null, { ...config });
