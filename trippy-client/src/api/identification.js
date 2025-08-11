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

export const requestResidentCard = async (userId) => {
  const response = await axios.get(`${api.defaults.baseURL}/residentCard`, {
    headers: {
      "X-USER-ID": userId,
    },
  });
  return response.data.data;
};
