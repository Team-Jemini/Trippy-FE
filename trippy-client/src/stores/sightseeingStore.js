import { defineStore } from "pinia";

export const useSightseeingStore = defineStore("sightseeing", {
  state: () => ({
    sightseeings: [],
  }),

  actions: {
    setSightseeing(data) {
      this.sightseeings = data;
    },

    postSightseeingReservation: async function (formData) {
      try {
        // 실제 서버 요청 시:
        // const res = await axios.post("/api/sightseeing", formData, {
        //   headers: { "Content-Type": "multipart/form-data" }
        // });
        // this.sightseeings.push(res.data);

        // 더미 저장 (파일을 URL로 변환해서 보여주기 위함)
        const file = formData.get("voucherFile");
        const imageUrl = URL.createObjectURL(file);

        this.sightseeings.push({
          id: Date.now().toString(),
          title: formData.get("title"),
          dateTime: formData.get("dateTime"),
          voucherImage: imageUrl,
        });
      } catch (err) {
        console.error("등록 실패:", err);
        throw err;
      }
    },
  },
});
