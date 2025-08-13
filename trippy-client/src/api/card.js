import api from "./index";

export const fetchCodefAndSave = (accountId) =>
  api.post("cards/codef", null, { params: { accountId } });

export const getCardSummaries = () => api.get("cards/summary");

export const getCardDetails = () => api.get("cards/detail");

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
