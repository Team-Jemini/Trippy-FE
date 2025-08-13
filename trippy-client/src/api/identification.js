import api from "./index";

export const addResidentCard = async (data) => {
  const response = await api.post(`/residentCard`, data);
  return response.data;
};

export const addPassport = async (data) => {
  //TODO: 여권 사진
  const response = await api.post(`/passport`, data);
  return response.data;
};

export const requestResidentCard = async () => {
  const response = await api.get(`/residentCard`);
  return response.data.data;
};

export const requestPassport = async () => {
  const response = await api.get(`/passport`);
  return response.data.data;
};
