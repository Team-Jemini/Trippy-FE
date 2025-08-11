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

export function formatPhoneNumber(phone) {
  const digits = phone.replace(/\D/g, "");

  if (digits.length === 11) {
    // 11자리: 3-4-4
    return digits.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  } else if (digits.length === 10) {
    // 10자리: 3-3-4 (ex: 02-123-4567)
    return digits.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  } else {
    // 그 외는 원래 문자열 반환 (또는 빈 문자열 등 처리 가능)
    return phone;
  }
}

