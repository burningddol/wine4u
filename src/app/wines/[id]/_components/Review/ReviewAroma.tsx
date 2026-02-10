import Image from "next/image";

interface ReviewAromaProps {
  aroma: string[];
}

export default function ReviewAroma({ aroma }: ReviewAromaProps) {
  return (
    <div className="flex flex-row">
      {aroma.map((name, index) => (
        <div key={name} className="m-2 flex gap-4">
          <div className="relative h-7 w-7">
            <Image
              src={`/winedetail/icon_${name.toLowerCase()}.png`}
              alt={name}
              fill
            ></Image>
          </div>
          <span>{name}</span>
          {index < aroma.length - 1 && (
            <span className="mr-2 text-gray-700">•</span>
          )}
        </div>
      ))}
    </div>
  );
}
