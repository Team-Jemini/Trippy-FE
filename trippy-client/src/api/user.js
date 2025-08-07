// 예시 코드입니다. 참고해서 코드 작성해주세용

import api from './index';

export const getUserInfo = (userId) => {
  return api.get(`/user/${userId}`);
};

export const updateUser = (userId, data) => {
  return api.put(`/user/${userId}`, data);
};
