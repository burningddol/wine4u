import { WineTasteAroma } from "@/types/detail/types";
import { getAromaKR } from "@/utils/getAromaKR";
import Image from "next/image";
interface AromaTop4Props {
  reviews: WineTasteAroma[];
}
export default function AromaTop4({ reviews }: AromaTop4Props) {
  // flatMap으로 aroma 해당하는 한 배열로 합치기

  const allAromas = reviews.flatMap((reviews) => reviews.aroma);
  //reduce로 {"AROMA":2} 재배열, 초기값 {}
  const counts = allAromas.reduce((acc: Record<string, number>, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});

  const getTop4 = Object.entries(counts)
    .sort((a, b) => b[1] - a[1]) // 인덱스 1번요소를 내림차순으로 정렬
    .slice(0, 4) // 0번인덱스부터 4번째까지
    .map(([name]) => name); // [name, number]에서 name만 모으기

  const displayList = [...getTop4, "NONE", "NONE", "NONE", "NONE"].slice(0, 4);
  return (
    <div className="flex h-[148px] w-full gap-3">
      {displayList.map((aroma, index) => {
        const isNone = aroma === "NONE";
        const src = isNone
          ? "/winedetail/none.svg"
          : `/winedetail/${aroma.toLowerCase()}.jpg`;
        const label = isNone ? "-" : getAromaKR(aroma);
        return (
          <div
            key={`${aroma}-${index}`}
            className={`flex flex-col ${index === 3 ? "hidden md:flex" : "flex"}`}
          >
            <div
              className={`relative h-[100px] w-[100px] overflow-hidden rounded-md ${isNone ? "bg-[#F2F2F2]" : ""}`}
            >
              <Image
                src={src}
                alt={`${aroma}향`}
                fill
                sizes={isNone ? "20px" : undefined}
                className={isNone ? "object-contain p-4" : "object-cover"}
              ></Image>
            </div>
            <span className="mt-3 flex justify-center text-center text-[16px] font-medium">
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
