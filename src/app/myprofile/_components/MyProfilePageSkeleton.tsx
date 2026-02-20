import ReviewsTabSkeleton from "./ReviewsTabSkeleton";

const Sk = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-gray-200 ${className}`} />
);

export default function MyProfilePageSkeleton() {
  return (
    <div className="mx-auto mt-[70px] flex min-h-screen w-full max-w-[1140px] flex-col gap-15 lg:flex-row lg:gap-0">
      {/* ── 좌측 사이드바 ── */}
      <aside className="top-0 mt-8 w-full shrink-0 px-10 lg:sticky lg:top-[70px] lg:mt-0 lg:w-[290px] lg:self-start lg:px-6">
        <div className="flex flex-col gap-5 lg:gap-6 lg:py-7">
          {/* 프로필 이미지 + 닉네임 */}
          <div className="flex flex-col items-center gap-3 md:gap-7">
            <Sk className="h-20 w-20 rounded-full md:h-25 md:w-25 lg:h-[160px] lg:w-[160px]" />
            <Sk className="h-6 w-32 rounded md:h-7 md:w-40" />
          </div>

          {/* 닉네임 입력 폼 */}
          <div className="flex flex-row items-end justify-center gap-4 md:flex-col md:items-center md:justify-start">
            <Sk className="h-10 w-48 rounded" />
            <Sk className="h-10 w-24 rounded" />
          </div>
        </div>
      </aside>

      {/* ── 우측 탭 섹션 ── */}
      <section className="w-full border-l border-gray-200 bg-white px-4 md:px-0">
        {/* 탭 바 */}
        <div className="flex gap-6 border-b border-gray-200 px-[4px] py-1 md:gap-8 md:px-10">
          <Sk className="h-14 w-28 rounded" />
          <Sk className="h-14 w-36 rounded" />
        </div>

        {/* 탭 콘텐츠 자리 — 리뷰 탭 스켈레톤 미리보기 */}
        <ReviewsTabSkeleton />
      </section>
    </div>
  );
}
