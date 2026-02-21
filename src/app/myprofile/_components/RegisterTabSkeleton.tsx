const Sk = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-gray-200 ${className}`} />
);

function WineCardSkeleton() {
  return (
    <article className="flex w-full flex-col gap-6 overflow-hidden md:w-[calc(50%-38px)]">
      {/* 정사각형 이미지 영역 */}
      <Sk className="aspect-[1/1] w-full rounded" />

      {/* 텍스트 영역 */}
      <div className="flex flex-col gap-6 pb-5">
        <div className="flex flex-col gap-[6px]">
          <Sk className="h-7 w-2/3 rounded" />
          <Sk className="h-4 w-1/3 rounded" />
        </div>
        <Sk className="h-7 w-1/3 rounded" />
      </div>
    </article>
  );
}

export default function RegisterTabSkeleton() {
  return (
    <div className="flex flex-col gap-20 py-10 md:flex-row md:flex-wrap md:gap-x-[76px] md:gap-y-20 md:px-8">
      <WineCardSkeleton />
      <WineCardSkeleton />
      <WineCardSkeleton />
      <WineCardSkeleton />
    </div>
  );
}
