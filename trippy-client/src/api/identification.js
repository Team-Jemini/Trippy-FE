import api from "./index";

export const addResidentCard = async (userId, data) => {
  const response = await api.post(`/residentCard`, data, {
    headers: {
      "X-USER-ID": userId,
    },
  });
  return response.data;
};

export const addPassport = async (userId, data) => {
  //TODO: 여권 사진
  const response = await api.post(`/passport`, data, {
    headers: {
      "X-USER-ID": userId,
    },
  });

  return response.data;
};

export const requestResidentCard = async (userId) => {
  const response = await api.get(`/residentCard`, {
    headers: {
      "X-USER-ID": userId,
    },
  });
  return response.data.data;
};

export const requestPassport = async (userId) => {
  const response = await api.get(`/passport`, {
    headers: {
      "X-USER-ID": userId,
    },
  });
  return response.data.data;
};
