import api from "./index";

export const fetchCodefAndSave = (userId, accountId) =>
  api.post("cards/codef", null, { params: { userId, accountId } });

export const getCardSummaries = (userId) => api.get("cards/summary", { params: { userId } });

export const getCardDetails = (userId) => api.get("cards/detail", { params: { userId } });
