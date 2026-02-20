export const AROMA_MAP: Record<string, string> = {
  CHERRY: "체리",
  BERRY: "베리",
  OAK: "오크",
  VANILLA: "바닐라",
  PEPPER: "후추",
  BAKING: "베이킹",
  GRASS: "풀",
  APPLE: "사과",
  PEACH: "복숭아",
  CITRUS: "시트러스",
  TROPICAL: "트로피칼",
  MINERAL: "미네랄",
  FLOWER: "꽃",
  TOBACCO: "담배",
  EARTH: "흙",
  CHOCOLATE: "초콜릿",
  SPICE: "향신료",
  CARAMEL: "카라멜",
  LEATHER: "가죽",
};

export const getAromaKR = (en: string) => {
  if (en === "NONE") return "설문 없음";
  return AROMA_MAP[en.toUpperCase()] || en;
};
