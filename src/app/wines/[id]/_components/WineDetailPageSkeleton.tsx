const Sk = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-gray-200 ${className}`} />
);

function ReviewCardSkeleton() {
  return (
    <div className="my-10 w-full">
      {/* 별점 */}
      <Sk className="h-5 w-28 rounded" />

      {/* 아바타 + 닉네임 */}
      <div className="mt-5 flex flex-row">
        <Sk className="h-16 w-16 rounded-full" />
        <div className="ml-4 flex flex-col justify-center gap-2">
          <Sk className="h-4 w-28 rounded" />
          <Sk className="h-4 w-20 rounded" />
        </div>
      </div>

      {/* 아로마 태그 */}
      <div className="mt-4 flex gap-2">
        <Sk className="h-7 w-16 rounded-full" />
        <Sk className="h-7 w-20 rounded-full" />
        <Sk className="h-7 w-14 rounded-full" />
      </div>

      {/* 본문 텍스트 */}
      <div className="mt-4 mb-10 flex flex-col gap-2">
        <Sk className="h-4 w-full rounded" />
        <Sk className="h-4 w-5/6 rounded" />
        <Sk className="h-4 w-4/6 rounded" />
      </div>

      {/* 맛 바 그룹 */}
      <div className="flex flex-col gap-3">
        {["바디감", "탄닌", "당도", "산미"].map((label) => (
          <div key={label} className="flex items-center gap-3">
            <Sk className="h-4 w-10 rounded" />
            <Sk className="h-2 flex-1 rounded-full" />
            <Sk className="h-4 w-10 rounded" />
          </div>
        ))}
      </div>

      {/* 구분선 */}
      <div className="solid m-0 mx-auto mt-5 w-full border-b border-[#D1D1D1]" />
    </div>
  );
}

export default function WineDetailPageSkeleton() {
  return (
    <div>
      {/* ── Hero 배경 ── */}
      <div className="bg-winesHero absolute z-0 flex h-[330px] w-full items-center bg-cover bg-center pt-[70px] md:h-[440px] xl:h-[520px] xl:rounded-b-[88px]" />

      {/* ── WineDetail 미러 ── */}
      <div className="relative w-full">
        <div className="top-0 left-0 mx-auto mt-[70px] flex min-h-[330px] w-full max-w-[1100px] flex-col md:flex-row md:items-center">
          {/* 좌측 이미지 영역 */}
          <div className="relative flex h-[330px] w-full items-end justify-center overflow-hidden md:h-[440px] md:w-3/5 xl:h-[520px]">
            <Sk className="h-[260px] w-[120px] rounded-lg md:h-[360px] md:w-[150px] xl:h-[440px] xl:w-[180px]" />
          </div>

          {/* 우측 텍스트 영역 */}
          <div className="relative mt-10 px-10 md:h-92 md:w-130 md:p-5 xl:p-0">
            {/* 별점 + 리뷰 수 */}
            <div className="flex flex-row items-center gap-5">
              <Sk className="h-7 w-36 rounded" />
              <Sk className="h-5 w-24 rounded" />
            </div>
            {/* 와인 이름 */}
            <div className="mt-5 flex flex-col gap-3">
              <Sk className="h-12 w-72 rounded" />
              <Sk className="h-10 w-52 rounded" />
            </div>
            {/* 원산지 */}
            <Sk className="mt-3 h-6 w-48 rounded xl:mt-5" />
            {/* 가격 */}
            <div className="mt-5 flex justify-end md:mt-3 xl:mt-5">
              <Sk className="h-8 w-36 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* ── 맛 / 향 섹션 ── */}
      <div className="m-auto my-20 flex max-w-[1100px] flex-col md:p-5 xl:flex-row">
        {/* 좌측 - 맛 */}
        <div className="mb-24 flex min-w-[510px] flex-col md:flex-row xl:mb-0 xl:flex-col">
          <div className="mb-8 flex min-w-50 flex-col pl-8 xl:flex-row xl:justify-between">
            <Sk className="h-6 w-36 rounded" />
            <Sk className="mt-2 h-5 w-24 rounded xl:mt-0" />
          </div>
          <div className="flex flex-col gap-4 px-8 md:pl-0">
            {["바디감", "탄닌", "당도", "산미"].map((label) => (
              <div key={label} className="flex items-center gap-3">
                <Sk className="h-4 w-12 flex-shrink-0 rounded" />
                <Sk className="h-2 flex-1 rounded-full" />
                <Sk className="h-4 w-12 flex-shrink-0 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* 우측 - 향 */}
        <div className="md:min-h[440px] flex min-w-[480px] flex-col justify-between md:flex-row xl:ml-[120px] xl:min-h-[230px] xl:flex-col">
          <div className="mb-14 flex min-h-8 min-w-50 flex-col pl-8 xl:flex-row xl:justify-between">
            <Sk className="h-6 w-36 rounded" />
            <Sk className="mt-2 h-5 w-24 rounded xl:mt-0" />
          </div>
          <div className="mx-auto flex h-[148px] min-w-[300px] gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`flex flex-col gap-2 ${i === 3 ? "hidden md:flex" : "flex"}`}
              >
                <Sk className="h-[100px] w-[100px] rounded-md" />
                <Sk className="mx-auto h-4 w-14 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 구분선 ── */}
      <div className="solid m-0 mx-auto mb-20 w-7/8 border-[2px] border-b border-[#D1D1D1] xl:w-[1140px]" />

      {/* ── 리뷰 + 사이드바 섹션 ── */}
      <div className="m-auto flex w-full max-w-[1140px] flex-col-reverse xl:flex-row xl:justify-between">
        {/* 리뷰 목록 */}
        <div className="h-full min-h-[480px] w-10/11 xl:mr-20 xl:w-[725px]">
          {/* 헤더 */}
          <div className="flex h-8 flex-row items-center gap-4 pl-2 xl:pl-0">
            <Sk className="ml-4 h-6 w-20 rounded" />
            <Sk className="h-5 w-8 rounded" />
          </div>
          {/* ReviewCard × 3 */}
          <ReviewCardSkeleton />
          <ReviewCardSkeleton />
          <ReviewCardSkeleton />
        </div>

        {/* 사이드바 */}
        <div className="h-fit w-full flex-col gap-8 p-6 xl:sticky xl:top-20 xl:flex xl:w-[285px] xl:border-none xl:p-0">
          <div className="flex flex-row justify-between gap-6 p-5 xl:flex-col xl:justify-start xl:p-0">
            <div className="flex flex-col justify-between gap-4 xl:w-full">
              {/* 별점 + 평균 */}
              <div className="flex flex-col gap-2 md:w-70 xl:flex-row xl:items-baseline">
                <Sk className="h-7 w-36 rounded" />
                <Sk className="h-10 w-24 rounded" />
              </div>
              {/* 리뷰 남기기 버튼 (md) */}
              <Sk className="hidden h-12 w-full rounded-sm md:block xl:hidden" />
            </div>

            {/* RatingBar 5개 */}
            <div className="ml-5 flex flex-1 flex-col gap-2 md:ml-20 xl:ml-0 xl:w-full">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-2">
                  <Sk className="h-4 w-4 rounded" />
                  <Sk className="h-2 flex-1 rounded-full" />
                </div>
              ))}
            </div>
          </div>

          {/* 리뷰 남기기 버튼 (mobile / xl) */}
          <Sk className="mt-6 h-[50px] w-full rounded-sm md:hidden xl:mt-0 xl:block xl:h-12" />
        </div>
      </div>
    </div>
  );
}
