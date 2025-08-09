import api from "@/api/index.js";

export const fetchPersonalAccount = (userID) => {
  return api.post(`/account/sync/${userID}`);
};
