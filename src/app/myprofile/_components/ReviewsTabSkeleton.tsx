const Sk = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-gray-200 ${className}`} />
);

function ReviewItemSkeleton({ divider }: { divider?: boolean }) {
  return (
    <article className="relative flex flex-col gap-12 px-2">
      {divider && <div className="border-t border-gray-200" />}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-5">
            {/* 별점 + 날짜 + 드롭다운 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Sk className="h-5 w-28 rounded" />
                <Sk className="h-4 w-20 rounded" />
              </div>
              <Sk className="h-8 w-8 rounded-full" />
            </div>

            {/* WineSummary */}
            <div className="flex gap-4">
              <Sk className="h-20 w-[62px] flex-shrink-0 rounded" />
              <div className="flex flex-col justify-center gap-2">
                <Sk className="h-5 w-40 rounded" />
                <Sk className="h-4 w-24 rounded" />
              </div>
            </div>
          </div>

          {/* 본문 텍스트 */}
          <div className="flex flex-col gap-2">
            <Sk className="h-4 w-full rounded" />
            <Sk className="h-4 w-5/6 rounded" />
            <Sk className="h-4 w-3/4 rounded" />
          </div>
        </div>

        {/* TasteBarGroup (grid layout) */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-x-5 md:gap-y-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Sk className="h-4 w-10 flex-shrink-0 rounded" />
              <Sk className="h-2 flex-1 rounded-full" />
              <Sk className="h-4 w-10 flex-shrink-0 rounded" />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function ReviewsTabSkeleton() {
  return (
    <div className="flex flex-col gap-20 py-10 md:px-8">
      <ReviewItemSkeleton />
      <ReviewItemSkeleton divider />
      <ReviewItemSkeleton divider />
    </div>
  );
}
