import { http } from "./http";

export const fetchCodefAndSave = (userId, accountId) =>
  http.post("/cards/codef", null, { params: { userId, accountId } });

export const getCardSummaries = (userId) => http.get("/cards/summary", { params: { userId } });

export const getCardDetails = (userId) => http.get("/cards/detail", { params: { userId } });
