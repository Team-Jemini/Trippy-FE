import api from "./index";

export const fetchCodefAndSave = (accountId) =>
  api.post("cards/codef", null, { params: { accountId } });

export const getCardSummaries = () => api.get("cards/summary");

export const getCardDetails = () => api.get("cards/detail");

export const deleteCard = (cardId, config = {}) => api.delete(`cards/${cardId}`, { ...config });

export const updateCardNickname = (cardId, cardNickname, config = {}) =>
  api.put(`cards/${cardId}/nickname`, null, { params: { cardNickname }, ...config });

export const setMainCard = (cardId, config = {}) =>
  api.put(`cards/${cardId}/main`, null, { ...config });

export const activateQrCodes = () => api.post("cards/qr/activate", null);
