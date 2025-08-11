import { ref } from "vue";
import { defineStore } from "pinia";
import api from "@/api/groupAccount";

export const useGroupMemberStore = defineStore("groupMember", () => {
  const loading = ref(false);
  const error = ref(null);
  const groupMember = ref([]);
  const groupMemberError = ref(null);

  const groupMembers = ref([]);

  const getGroupMemberList = async (accountId) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.getGroupMember(accountId);
      groupMember.value = response;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return { loading, error, groupMember, groupMemberError, groupMembers, getGroupMemberList };
});
