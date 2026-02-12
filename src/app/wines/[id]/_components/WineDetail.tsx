import Image from "next/image";
import StarRating from "@/components/StarRating";

interface WineDetailProps {
  wine: {
    id: number;
    name: string;
    image: string;
    type: string;
    price: number;
    region: string;
    avgRating: number;
    reviewCount: number;
  };
  className?: string;
}

const WINE_IMAGE_POS = {
  RED: "translate-x-[120px] translate-y-5", // 레드만 우측으로 더 이동
  WHITE: "translate-x-5 translate-y-5",
  SPARKLING: "translate-x-5 translate-y-5",
} as const;

const WINE_BG_STYLE = {
  RED: "translate-x-[-20px] opacity-30",
  WHITE: "opacity-30",
  SPARKLING: "opacity-30 rounded-md", // 스파클링만 둥글게
} as const;

export default function WineDetail({ wine }: WineDetailProps) {
  const wineType = wine.type as keyof typeof WINE_IMAGE_POS;

  const imagePos = WINE_IMAGE_POS[wineType] || WINE_IMAGE_POS.WHITE;
  const bgStyle = WINE_BG_STYLE[wineType] || WINE_BG_STYLE.WHITE;
  return (
    <div className="m-auto my-0 flex min-h-[450px] max-w-[1100px]">
      <div className="relative min-h-[450px] min-w-[500px] overflow-hidden">
        <Image
          src={`/winedetail/type_${wine.type}.png`}
          alt="와인 타입 이미지"
          fill
          sizes="max-width: 768px "
          className={`${bgStyle} object-contain opacity-30`}
        ></Image>
        <Image
          src={wine.image}
          alt="와인 상세이미지"
          fill
          className={`${imagePos} object-contain`}
        ></Image>
      </div>
      <div className="relative ml-[50px] min-h-[400px] min-w-[550px]">
        <div className="mx-0 mt-30 flex flex-row">
          <StarRating rating={wine.avgRating} />
          <span className="ml-5">{wine.reviewCount}개의 후기</span>
        </div>
        <div className="mt-5 text-4xl font-bold">{wine.name}</div>
        <div className="mt-5 text-2xl text-gray-600">{wine.region}</div>
        <div className="mt-15 text-right text-3xl font-bold">{wine.price}</div>
      </div>
    </div>
  );
}
