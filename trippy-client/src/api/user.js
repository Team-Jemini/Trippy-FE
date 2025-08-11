import api from './index';

export const postUser = async (data) => {
  try {
    const response = await api.post(`/user/signup`, data);
    return response.data;
  } catch (error) {
    console.error("회원 등록 실패", error);
    throw error;
  }
};

export const postPassword = async (userId, data) => {
  try {
    const response = await api.post(`/user/password?userId=${userId}`, {
      password: data
    });
    return response.data;
  } catch (error) {
    return error;
  }
}
