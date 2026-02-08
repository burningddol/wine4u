import Image from "next/image";
import { Wine } from "@/types/wines/types";
import StarRating from "@/components/StarRating";
import { memo } from "react";
import { cn } from "@/libs/utils";
import Link from "next/link";

interface Props {
  wine: Wine;
}

function WineCard({ wine }: Props) {
  return (
    <Link href={`/wines/${wine.id}`} className="no-underline">
      <article className="flex max-w-[370px] cursor-pointer flex-col justify-start">
        <div
          className={cn(
            "group relative flex h-[332px] w-[332px] items-center justify-center",
            "overflow-hidden bg-gray-100 xl:h-[360px] xl:w-[370px]",
          )}
        >
          <div
            className={cn(
              "relative h-[250px] w-[250px] xl:h-[288px] xl:w-[288px]",
              "transition-transform duration-300 group-hover:scale-110",
            )}
          >
            <Image
              src={wine.image}
              alt={wine.name}
              fill
              className="object-contain"
            />
          </div>
          <div
            className={cn(
              "absolute h-full w-full bg-gray-300 opacity-0",
              "transition-opacity duration-300 group-hover:opacity-30",
            )}
          />
        </div>

        <div className="mt-5 mb-1 flex items-center gap-2">
          <StarRating rating={wine.avgRating} />
          <span className="text-sm text-gray-600">
            {wine.reviewCount}개의 후기
          </span>
        </div>

        <h3 className="mt-2 line-clamp-2 w-50 text-lg leading-snug font-bold break-words">
          {wine.name}
        </h3>

        {wine.recentReview && (
          <>
            <hr className="mt-4 border-gray-300" />
            <div className="mt-2.5">
              <p className="text-sm font-bold">최신 후기</p>
              <p className="mt-0.5 line-clamp-2 text-sm text-gray-600">
                {wine.recentReview.content}
              </p>
            </div>
          </>
        )}
      </article>
    </Link>
  );
}

export default memo(WineCard);
