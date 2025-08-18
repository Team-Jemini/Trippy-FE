import api from "./index";

export const requestOcr = async (file) => {
  const formData = new FormData();
  formData.append("file", file); // 서버에서 MultipartFile로 받을 경우

  const response = await api.post("/ocr", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
