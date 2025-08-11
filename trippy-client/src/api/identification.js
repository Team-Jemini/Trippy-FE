import axios from "axios";
import api from "./index";

export const addResidentCard = async (userId, data) => {
  const response = await api.post(
    `/residentCard`,
    {
      imgUrl: data.imgUrl,
      name: data.name,
      identity: data.identity,
      address: data.address,
      resIssueDate: data.resIssueDate,
    },
    {
      headers: {
        "X-USER-ID": userId,
      },
    },
  );
  return response.data;
};

export const addPassport = async (userId, data) => {
  //TODO: 여권 사진
  const response = await api.post(
    `/passport`,
    {
      passportNumber: data.passportNumber,
      nameKr: data.nameKr,
      nameEn: data.nameEn,
      birthDate: data.birthDate,
      gender: data.gender,
      countryCode: data.countryCode,
      expireDate: data.expireDate,
    },
    {
      headers: {
        "X-USER-ID": userId,
      },
    },
  );

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
