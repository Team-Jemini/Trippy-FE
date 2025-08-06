// 숫자 3자리마다 콤마(,)를 붙여줌
export function numberWithCommas(x) {
  if (typeof x !== "number" && typeof x !== "string") return x;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// '2025-07-29' 형태를 '7월 29일'로 바꿔줌
export function formatDateToKorean(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${parseInt(month)}월 ${parseInt(day)}일`;
}

// 날짜 데이터에서 시간 데이터만 '15:00' 형태로 추출
export function extractTime(dateTimeStr) {
  const date = new Date(dateTimeStr);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}
