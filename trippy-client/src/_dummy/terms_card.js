const terms = [
  {
    title: "카드 불러오기 이용동의",
    required: true,
    checked: false,
    contents: [
      {
        title: "서비스 이용약관",
        required: true,
        checked: false,
      },
      {
        title: "개인정보 수집/이용 동의",
        required: true,
        checked: false,
      },
      {
        title: "본인 인증 서비스 이용약관",
        required: true,
        checked: false,
      },
    ],
  },
  {
    title: "카드 불러오기 이용동의",
    required: false,
    checked: false,
    contents: [
      {
        title: "혜택 제공을 위한 개인정보 수집/이용 동의",
        required: false,
        checked: false,
      },
      {
        title: "광고성 정보 수신 동의",
        required: false,
        checked: false,
      },
      {
        title: "추천 서비스 이용동의",
        required: false,
        checked: false,
      },
    ],
  },
];

export { terms };
