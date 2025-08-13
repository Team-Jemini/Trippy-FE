import { ref } from "vue";
import { defineStore } from "pinia";
import api from "@/api/groupAccount";

export const useGroupMemberStore = defineStore("groupMember", () => {
  const loading = ref(false);
  const error = ref(null);

  const groupMembers = ref([]);

  const getGroupMemberList = async (accountId) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.getGroupAccountMembers(accountId);
      groupMembers.value = response;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return { loading, error, groupMembers, getGroupMemberList };
});
