import Kb from "@/assets/svg/card/kb.svg";
import Shinhan from "@/assets/svg/card/shinhan.svg";
import Hana from "@/assets/svg/card/hana.svg";
import Woori from "@/assets/svg/card/woori.svg";
import Kakao from "@/assets/svg/card/kakao.svg";
import Nh from "@/assets/svg/card/nh.svg";
// import Toss from "@/assets/svg/card/toss.svg";

const ORG = {
  "0301": { logo: Kb, bgColor: "#F8B500" }, // KB국민
  "0306": { logo: Shinhan, bgColor: "#236FFF" }, // 신한
  // 필요 시 추가: "0302": OO, "0311": 하나, "0309": 우리, ...
};

const NAME_FALLBACK = [
  { re: /(국민|KB)/i, logo: Kb, bgColor: "#F8B500" },
  { re: /(신한)/i, logo: Shinhan, bgColor: "#236FFF" },
  { re: /(하나)/i, logo: Hana, bgColor: "#07A44D" },
  { re: /(우리)/i, logo: Woori, bgColor: "#3E7DB4" },
  { re: /(카카오)/i, logo: Kakao, bgColor: "#FEE500" },
  { re: /(농협|NH)/i, logo: Nh, bgColor: "#00A651" },
  // { re: /(토스|Toss)/i, logo: Toss,    bgColor: "#2F64FF" },
];

export function getCardBrand(card) {
  const code = String(card?.organization ?? card?.field ?? "").padStart(4, "0");
  if (ORG[code]) return ORG[code];

  const text = `${card?.cardNickname ?? ""} ${card?.cardName ?? ""}`.trim();
  const f = NAME_FALLBACK.find((x) => x.re.test(text));
  return f ?? { logo: null, bgColor: "#CBD0D7" };
}
