import api from "./index";

export const fetchCodefAndSave = (userId, accountId) =>
  api.post("cards/codef", null, { params: { userId, accountId } });

export const getCardSummaries = (userId) => api.get("cards/summary", { params: { userId } });

export const getCardDetails = (userId) => api.get("cards/detail", { params: { userId } });

// ✅ 추가: 카드 삭제
export const deleteCard = (cardId, config = {}) => api.delete(`cards/${cardId}`, { ...config });

// ✅ 추가: 별명 수정 (백엔드가 @RequestParam 으로 받음)
export const updateCardNickname = (cardId, cardNickname, config = {}) =>
  api.put(`cards/${cardId}/nickname`, null, { params: { cardNickname }, ...config });

// ✅ 추가: 주카드 설정
export const setMainCard = (cardId, config = {}) =>
  api.put(`cards/${cardId}/main`, null, { ...config });

export const activateQrCodes = (userId) =>
  api.post("cards/qr/activate", null, { params: { userId } });
