import { requestOcr as requestOcrApi } from "@/api/ocr";
import { defineStore } from "pinia";

export const useOcrStore = defineStore("ocr", {
  state: () => ({
    file: null,
    previewUrl: "",
    result: null, // { name, personalNum, address, issueDate, authority }
    loading: false,
    error: null,
  }),
  actions: {
    setFile(f) {
      if (this.previewUrl) URL.revokeObjectURL(this.previewUrl);
      this.file = f;
      this.previewUrl = f ? URL.createObjectURL(f) : "";

      this.result = null;
      this.error = null;
    },
    clear() {
      if (this.previewUrl) URL.revokeObjectURL(this.previewUrl);
      this.file = null;
      this.previewUrl = "";
      this.result = null;
      this.error = null;
      this.loading = false;
    },
    async requestOcr() {
      if (!this.file) throw new Error("파일이 없습니다.");

      this.loading = true;
      this.error = null;
      try {
        const res = await requestOcrApi(this.file);
        this.result = res.data;
        return this.result;
      } catch (e) {
        this.error = e;
        throw e;
      } finally {
        this.loading = false;
      }
    },
  },
});
