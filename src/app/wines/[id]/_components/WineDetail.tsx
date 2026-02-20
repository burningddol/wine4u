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
  RED: "translate-x-15 md:translate-x-20 translate-y-10",
  WHITE: "translate-x-5 translate-y-10",
  SPARKLING: "translate-y-10",
} as const;

const WINE_BG_STYLE = {
  RED: "  h-[300px] w-[200px] md:h-[400px] md:w-[250px] xl:h-[500px] xl:w-[400px]",
  WHITE:
    "  h-[260px] w-[260px] md:h-[400px] md:w-[350px] xl:h-[480px] xl:w-[480px]",
  SPARKLING:
    " overflow-hidden h-full w-full md:rounded-3xl md:h-[300px] md:w-[380px] xl:h-[300px] xl:w-[480px] my-auto",
} as const;

export default function WineDetail({ wine }: WineDetailProps) {
  const wineType = wine.type as keyof typeof WINE_IMAGE_POS;

  const imagePos = WINE_IMAGE_POS[wineType];
  const bgStyle = WINE_BG_STYLE[wineType];
  return (
    <div className="relative w-full">
      <div className="top-0 left-0 mx-auto mt-[70px] flex min-h-[330px] w-full max-w-[1100px] flex-col md:flex-row md:items-center">
        <div className="relative flex h-[330px] w-full items-end justify-center overflow-hidden md:h-[440px] md:w-3/5 xl:h-[520px]">
          <div className={`${bgStyle} relative`}>
            <Image
              src={`/winedetail/type_${wine.type.toLowerCase()}.png`}
              alt="와인 타입 이미지"
              fill
              className={`contain opacity-30`}
            />
          </div>
          <div>
            <Image
              src={wine.image}
              alt="와인 상세이미지"
              fill
              priority
              className={`${imagePos} object-contain opacity-100`}
            />
          </div>
        </div>
        <div className="relative mt-10 px-10 md:h-92 md:w-130 md:p-5 xl:p-0">
          <div className="mx-0 flex flex-row">
            <StarRating rating={wine.avgRating} size={30} />
            <span className="ml-5 text-xl text-gray-600 md:text-2xl">
              {wine.reviewCount.toLocaleString()}개의 후기
            </span>
          </div>
          <div className="mt-2 mt-5 text-5xl leading-snug font-bold break-keep">
            {wine.name}
          </div>
          <div className="mt-2 text-2xl text-gray-600 md:mt-3 xl:mt-5">
            {wine.region}
          </div>
          <div className="mt-5 text-right text-3xl font-bold md:mt-3 xl:mt-5">
            {wine.price.toLocaleString()}원
          </div>
        </div>
      </div>
    </div>
  );
}
