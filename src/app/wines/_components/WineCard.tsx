import Image from 'next/image';
import { Wine } from '@/types/wines/types';
import StarRating from '@/components/StarRating';

interface Props {
  wine: Wine;
}

export default function WineCard({ wine }: Props) {
  return (
    <div className="flex max-w-[370px] flex-col">
      <div className="flex h-[332px] w-full items-center justify-center bg-gray-100 xl:h-[360px]">
        <div className="relative h-[332px] w-[332px] xl:w-[370px]">
          <Image
            src={wine.image}
            alt={wine.name}
            fill
            className="object-contain"
            sizes="(max-width: 1280px) 332px, 370px"
          />
        </div>
      </div>

      <div className="mt-5 mb-1 flex items-center gap-2">
        <StarRating rating={wine.avgRating} />
        <span className="text-sm text-gray-600">
          {wine.reviewCount}개의 후기
        </span>
      </div>

      <h3 className="mt-2 text-lg leading-snug font-bold">{wine.name}</h3>

      {wine.recentReview && (
        <>
          <hr className="mt-4 border-gray-300" />
          <div className="mt-3">
            <p className="text-sm font-bold">최신 후기</p>
            <p className="mt-1 line-clamp-2 text-sm text-gray-600">
              {wine.recentReview.content}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
