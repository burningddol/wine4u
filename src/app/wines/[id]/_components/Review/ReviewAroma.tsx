import { getAromaKR } from "@/utils/getAromaKR";
import Image from "next/image";

interface ReviewAromaProps {
  aroma: string[];
}

export default function ReviewAroma({ aroma }: ReviewAromaProps) {
  return (
    <div className="my-5 flex w-full flex-wrap">
      {aroma.map((name, index) => (
        <div
          key={`${name}-${index}`}
          className="m-2 flex items-center gap-4 py-1 pr-2"
        >
          <div className="relative h-7 w-7">
            <Image
              src={`/winedetail/icon_${name.toLowerCase()}.png`}
              alt={name}
              fill
            ></Image>
          </div>
          <div className="flex items-center text-center text-lg font-normal text-[#A3A3A3]">
            {getAromaKR(name)}
          </div>
          {index < aroma.length - 1 && (
            <span className="mr-2 text-gray-700">•</span>
          )}
        </div>
      ))}
    </div>
  );
}
