import { fetchResidentCardFromServer } from "@/api/identification";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useIdCardStore = defineStore("idCard", () => {
  const residentCard = ref(null);
  const isResidentRegistered = ref(false);

  const fetchResidentCard = async (userId) => {
    try {
      const response = await fetchResidentCardFromServer(userId);
      residentCard.value = response;
      isResidentRegistered.value = true;
    } catch (e) {
      residentCard.value = null;
      isResidentRegistered.value = false;
      console.error("주민등록 가져오기 실패");
    }
  };

  return { fetchResidentCard };
});
