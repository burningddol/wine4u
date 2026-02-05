import Image from 'next/image';
import StarRating from '@/components/StarRating';

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

export default function WineDetail({ wine }: WineDetailProps) {
  return (
    <div className="m-auto my-0 flex min-h-[450px] max-w-[1100px]">
      <div className="relative min-h-[450px] min-w-[500px] overflow-hidden">
        와인디테일
        <Image
          src={`/wines/${wine.type}.png`}
          alt="와인 타입 이미지"
          fill
          sizes="max-width: 768px "
          className="translate-x-5 object-contain opacity-30"
        ></Image>
        <Image
          src={wine.image}
          alt="와인 상세이미지"
          fill
          className="translate-y-3 object-contain"
        ></Image>
      </div>
      <div className="relative ml-[50px] min-h-[400px] min-w-[550px]">
        <div className="mx-0 mt-30 flex flex-row">
          <StarRating rating={wine.avgRating}></StarRating>
          <span className="ml-5">{wine.reviewCount}개의 후기</span>
        </div>
        <div className="mt-5 text-4xl font-bold">{wine.name}</div>
        <div className="mt-5 text-2xl text-gray-600">{wine.region}</div>
        <div className="mt-15 text-right text-3xl font-bold">{wine.price}</div>
      </div>
    </div>
  );
}
