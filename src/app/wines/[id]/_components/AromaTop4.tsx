import { WineTasteAroma } from "@/types/detail/types";
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
  return (
    <div className="flex h-50 w-full">
      {getTop4.map((aroma) => (
        <div key={aroma} className="flex flex-col gap-4">
          <div className="relative ml-4 h-30 w-30 overflow-hidden rounded-md">
            <Image
              src={`/winedetail/${aroma}.jpg`}
              alt={`${aroma}향`}
              fill
            ></Image>
          </div>
          <span className="text-center">{aroma}</span>
        </div>
      ))}
    </div>
  );
}
