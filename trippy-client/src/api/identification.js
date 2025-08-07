import axios from "axios";

export const addResidentCard = async (userId, data) => {
  const response = await axios.post(
    "http://localhost:8080/residentCard",
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

export const fetchResidentCard = async (userId) => {
  const response = await axios.get("http://localhost:8080/residentCard", {
    headers: {
      "X-USER-ID": userId,
    },
  });

  return response.data.data;
};
