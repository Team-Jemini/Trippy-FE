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

// 날짜 데이터에서 시간 데이터만 '15:00' 형태로 출력
export function extractTime(dateTimeStr) {
  const date = new Date(dateTimeStr);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}

// iso 형식의 날짜 데이터를 yyyy.mm.dd 형태로 출력
export const formatIsoDate = (iso) => {
  const d = new Date(iso);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}.${mm}.${dd}`;
};

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

// 바우처 날짜 파싱 함수 (숙소/관광용) ("25.08.09(토) 08:00"  -> Date 객체 )
export const parseVoucherDate = (dateString) => {
  // "25.08.09(토) 08:00" -> Date 객체
  const datePart = dateString.split("(")[0]; // "25.08.09"
  const [year, month, day] = datePart.split(".");
  return new Date(`20${year}`, month - 1, day);
};

// 날짜에서 요일 추출 헬퍼 함수 ( "2025-08-28(일)" -> { date: "2025-08-28", dayOfWeek: "일" } )
export const extractDateAndDayOfWeek = (dateWithDayOfWeek) => {
  // "2025-08-28(일)" 형식에서 날짜와 요일 분리
  const match = dateWithDayOfWeek.match(/^(\d{4}-\d{2}-\d{2})\((.)\)$/);
  if (match) {
    return {
      date: match[1], // "2025-08-28"
      dayOfWeek: match[2], // "일"
    };
  }
  // 매칭 실패시 fallback
  return {
    date: dateWithDayOfWeek.split("(")[0] || dateWithDayOfWeek,
    dayOfWeek: "미정",
  };
};

// 시간 형식 정규화 함수 ( "0:30"  -> "00:30" )
export const normalizeTime = (timeString) => {
  if (!timeString) return "00:00";

  const parts = timeString.split(":");
  if (parts.length === 2) {
    const hours = parts[0].padStart(2, "0");
    const minutes = parts[1].padStart(2, "0");
    return `${hours}:${minutes}`;
  }
  return timeString;
};
