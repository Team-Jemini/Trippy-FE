import { defineStore } from "pinia";
import { ref } from "vue";
import { postUser, postPassword } from "@/api/user.js";

export const useUserStore = defineStore("User", () => {
  const userInputValue = ref({
    name: "",
    password: "",
    phone: "",
    residentNum: ""
  });

  const setUserInputValue = (data) => {
    userInputValue.value = { ...userInputValue.value, ...data };
  };

  const setUserPassword = (password) => {
    userInputValue.value.password = password;
  };

  const joinUser = async () => {
    const response = await postUser(userInputValue.value);
    if (!response) return;
    localStorage.setItem("accessToken", response?.data.accessToken);
    return response.code;
  };

  return {
    userInputValue,
    setUserInputValue,
    setUserPassword,
    joinUser,
  };
});
