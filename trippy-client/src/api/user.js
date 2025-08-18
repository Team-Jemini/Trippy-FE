import api from './index';

export const postUser = async (data) => {
  try {
    const response = await api.post("/user/signup", data);
    return response.data;
  } catch (error) {
    console.error("회원 등록 실패", error);
    throw error;
  }
};

export const postPassword = async (data) => {
  try {
    const response = await api.post("/user/password", {
      password: data
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const postCodeRequest = async (phoneNumber) => {
  try {
    const response = await api.post("/user/phoneNumber", {
      phoneNumber: phoneNumber
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const postVerifyRequest = async (phoneNumber, verifyCode) => {
  try {
    const response = await api.post("/user/phoneNumber/verify", {
      phoneNumber: phoneNumber,
      verifyCode: verifyCode,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};
