import axios from "axios";
import api from "./index";

export const addResidentCard = async (userId, data) => {
  const response = await axios.post(
    `${api.defaults.baseURL}/residentCard`,
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
  console.log(userId);
  console.log(data);

  //TODO: 여권 사진
  const response = await axios.post(
    `${api.defaults.baseURL}/passport`,
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
  const response = await axios.get(`${api.defaults.baseURL}/residentCard`, {
    headers: {
      "X-USER-ID": userId,
    },
  });
  return response.data.data;
};

export const requestPassport = async (userId) => {
  const response = await axios.get(`${api.defaults.baseURL}/passport`, {
    headers: {
      "X-USER-ID": userId,
    },
  });
  return response.data.data;
};
