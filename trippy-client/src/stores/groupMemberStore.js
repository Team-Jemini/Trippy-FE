import { ref } from "vue";
import { defineStore } from "pinia";
import peopleList from "@/_dummy/peopleList.json";
import groupMembersList from "@/_dummy/groupMembers_dummy.json";

export const useGroupMemberStore = defineStore("groupMember", () => {
  const groupMember = ref([]);
  const groupMemberError = ref(null);

  const groupMembers = ref([]);

  const setGroupMember = async () => {
    try {
      groupMember.value = await peopleList;
      groupMembers.value = await groupMembersList;
    } catch {
      groupMemberError.value = "멤버 데이터를 불러오는 데 실패했습니다.";
    }
  };

  return { groupMember, groupMemberError, groupMembers, setGroupMember };
});
