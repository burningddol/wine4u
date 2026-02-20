"use client";

import { useEffect, useState, use } from "react";
import WineDetail from "./_components/WineDetail";
import WineTasteBarGroup from "./_components/TasteBarGroup";
import AromaTop4 from "./_components/AromaTop4";
import ReviewList from "./_components/Review/ReviewList";
import StarRating from "@/components/StarRating";
import ReviewBarGroup from "./_components/RatingBarGroup";
import { getWineDetail } from "@/libs/api/wineDetail/getAPIData";
import { WineDetail as WineDetailType } from "@/types/detail/types";
import { WineTasteAroma } from "@/types/detail/types";
import { useModal } from "@/components/ModalProvider";
import ReviewForm from "./_components/Review/ReviewForm";
import LoadingState from "@/app/myprofile/_components/LoadingState";
import ScrollToTop from "@/components/ScrollToTop";

export default function WinesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { showModal } = useModal();
  const [wineData, setWineData] = useState<WineDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<WineTasteAroma[]>([]);
  const openReviewModal = () => {
    showModal(
      <ReviewForm wine={wineData!} onRefresh={refreshReviews} />,
      "리뷰 등록",
      550,
      1000,
    );
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      const detailData = await getWineDetail(Number(id));
      setWineData(detailData);
      if (detailData.reviews) {
        setReviews(detailData.reviews);
      }
    } catch (err: any) {
      console.error("데이터 로딩 실패:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshReviews = async () => {
    try {
      const updatedDetailData = await getWineDetail(Number(id));

      setWineData((prev) => {
        if (!prev) return updatedDetailData;

        return {
          ...prev,

          avgRating: updatedDetailData.avgRating,

          reviewCount: updatedDetailData.reviewCount,

          reviews: updatedDetailData.reviews,
        };
      });

      if (updatedDetailData.reviews) {
        setReviews(updatedDetailData.reviews);
      }
    } catch (err) {
      console.error("리뷰 새로고침 실패:", err);
    }
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingState message="와인 정보를 불러오는 중..." size={10} />
      </div>
    );
  if (error)
    return (
      <div className="p-10 text-center text-red-500">에러 발생: {error}</div>
    );
  if (!wineData)
    return <div className="text-center text-white">데이터가 없습니다.</div>;

  return (
    <div>
      <div className="bg-winesHero absolute z-0 flex h-[330px] w-full items-center bg-cover bg-center pt-[70px] md:h-[440px] xl:h-[520px] xl:rounded-b-[88px]" />
      <WineDetail wine={wineData} className="min-w-[1140px]" />

      <div className="m-auto my-20 flex max-w-[1100px] flex-col md:p-5 xl:flex-row">
        <div className="mb-24 flex min-w-[510px] flex-col md:flex-row xl:mb-0 xl:flex-col">
          <div className="mb-8 flex min-w-50 flex-col pl-8 xl:flex-row xl:justify-between">
            <h2 className="mb-0 text-xl font-bold md:mb-2">
              어떤 맛이 나나요?
            </h2>
            <h3 className="text-lg text-gray-600">
              ( {wineData.reviewCount.toLocaleString()}명 참여 )
            </h3>
          </div>
          <div className="px-8 md:pl-0">
            <WineTasteBarGroup reviews={reviews} />
          </div>
        </div>

        <div className="md:min-h[440px] flex min-w-[480px] flex-col justify-between md:flex-row xl:ml-[120px] xl:min-h-[230px] xl:flex-col">
          <div className="mb-14 flex min-h-8 min-w-50 flex-col pl-8 xl:flex-row xl:justify-between">
            <h2 className="mb-2 text-xl font-bold">어떤 향이 있나요?</h2>
            <h3 className="text-lg text-gray-600">
              ( {wineData.reviewCount.toLocaleString()}명 참여 )
            </h3>
          </div>
          <div className="mx-auto min-w-[300px]">
            <AromaTop4 reviews={reviews} />
          </div>
        </div>
      </div>

      {/*와인디테일&리뷰리스트 구분선*/}
      <div className="solid m-0 mx-auto mb-20 w-7/8 border-[2px] border-b border-[#D1D1D1] xl:w-[1140px]" />

      <div className="m-auto flex w-full max-w-[1140px] flex-col-reverse xl:flex-row xl:justify-between">
        <div
          className={`h-full min-h-[480px] ${reviews.length === 0 ? "w-full xl:w-[1140px]" : "w-10/11 xl:mr-20 xl:w-[725px]"}`} //리뷰개수 0개일때 화면너비 상이
        >
          <div className="flex h-8 flex-row items-center pl-2 xl:pl-0">
            <h2 className="ml-4 text-xl font-bold">리뷰 목록</h2>
            <h3 className="ml-4 text-lg text-gray-600">
              {wineData.reviewCount.toLocaleString()}개
            </h3>
          </div>
          <ReviewList
            reviews={reviews}
            openReviewModal={openReviewModal}
            onRefresh={refreshReviews}
          />
        </div>

        {reviews.length > 0 && (
          <div className="h-fit w-full flex-col gap-8 p-6 xl:sticky xl:top-20 xl:flex xl:w-[285px] xl:border-none xl:p-0">
            <div className="flex flex-row justify-between gap-6 p-5 xl:flex-col xl:justify-start xl:p-0">
              <div className="flex flex-col justify-between gap-4 xl:w-full">
                <div className="flex flex-col gap-2 md:w-70 xl:flex-row">
                  <StarRating rating={wineData.avgRating} size={28} />
                  <div className="flex items-baseline font-bold">
                    <h3 className="text-3xl md:text-4xl">
                      {wineData.avgRating.toFixed(1)}
                    </h3>
                    <h3 className="ml-2 text-3xl text-gray-400"> / 5.0</h3>
                  </div>
                </div>

                <button
                  onClick={openReviewModal}
                  className="hidden h-12 w-full cursor-pointer rounded-sm bg-black text-white transition-colors hover:bg-gray-800 md:block xl:hidden"
                >
                  리뷰 남기기
                </button>
              </div>

              <div className="ml-5 flex-1 md:ml-20 xl:ml-0 xl:w-full">
                <ReviewBarGroup reviews={reviews} />
              </div>
            </div>
            <button
              onClick={openReviewModal}
              className="mt-6 h-[50px] w-full cursor-pointer rounded-sm bg-black text-white transition-colors hover:bg-gray-800 md:hidden xl:mt-0 xl:block xl:h-12"
            >
              리뷰 남기기
            </button>
          </div>
        )}

        <ScrollToTop />
      </div>
    </div>
  );
}
