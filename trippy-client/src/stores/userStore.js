import { defineStore } from "pinia";
import { ref, toRaw } from "vue";
import { postUser } from "@/api/user.js";

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

  const joinUser = () => {
    const rawData = toRaw(userInputValue.value);
    return postUser(rawData);
  };

  return {
    userInputValue,
    setUserInputValue,
    setUserPassword,
    joinUser,
  };
});
