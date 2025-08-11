import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("User", () => {
  const joinUserInfo = ref({
    name: "",
    password: "",
    phone: "",
    residentNum: ""
  });

  const setJoinUserInfo = (data) => {
    joinUserInfo.value = { ...joinUserInfo.value, ...data };
  };

  return {
    joinUserInfo,
    setJoinUserInfo,
  };
});
