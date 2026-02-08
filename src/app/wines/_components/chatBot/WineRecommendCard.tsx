import Image from "next/image";
import Link from "next/link";

interface Props {
  wine: {
    id: number;
    name: string;
    image: string;
    reason?: string;
  };
}

export default function WineRecommendCard({ wine }: Props) {
  return (
    <div className="max-w-[80%] self-start overflow-hidden rounded-sm border border-gray-300 bg-white">
      <div className="relative h-[120px] w-full bg-gray-100">
        <Image
          src={wine.image}
          alt={wine.name}
          fill
          className="object-contain"
        />
      </div>
      <div className="flex flex-col gap-2 p-3">
        <p className="text-lg font-bold text-gray-800">{wine.name}</p>

        <Link
          href={`/wines/${wine.id}`}
          className="bg-primary mt-1 rounded-sm py-2 text-center text-sm font-bold text-white"
        >
          와인 보러가기
        </Link>
      </div>
    </div>
  );
}
