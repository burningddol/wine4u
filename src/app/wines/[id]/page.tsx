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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 1. 와인 상세 데이터 하나만 딱 부릅니다.
        const detailData = await getWineDetail(Number(id));

        // 2. 상태값들을 한꺼번에 업데이트합니다.
        setWineData(detailData);

        // 만약 데이터 안에 reviews가 있다면 넣고, 없으면 빈 배열
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

    if (id) fetchData();
  }, [id]);

  if (loading)
    return <div className="p-10 text-center">와인 정보를 불러오는 중</div>;
  if (error)
    return (
      <div className="p-10 text-center text-red-500">에러 발생: {error}</div>
    );
  if (!wineData)
    return (
      <div className="p-10 text-center text-white">데이터가 없습니다.</div>
    );

  return (
    <div>
      <div className="bg-winesHero top-0 z-[-1] mt-[70px] flex h-[650px] w-full bg-cover bg-center md:h-[650px] xl:h-[603px] xl:rounded-b-[88px]">
        <WineDetail wine={wineData} className="min-w-[1100px]" />
      </div>
      <div className="m-auto my-10 flex min-h-[300px] max-w-[1100px]">
        <div className="flex max-w-[500px] flex-col gap-4">
          <div className="flex flex-row justify-between">
            <h2 className="mb-2 text-xl font-bold">어떤 맛이 나나요?</h2>
            <h3 className="text-gray-600">( {wineData.reviewCount}명 참여 )</h3>
          </div>
          <WineTasteBarGroup reviews={reviews} />
        </div>
        <div className="mx-10 flex min-w-[480px] flex-col gap-4">
          <div className="flex max-h-10 justify-between">
            <h2 className="mb-2 text-xl font-bold">어떤 향이 있나요?</h2>
            <h3 className="text-gray-600">( {wineData.reviewCount}명 참여 )</h3>
          </div>
          <AromaTop4 reviews={reviews} />
        </div>
      </div>
      <div className="solid m-0 mx-auto w-[1100px] border-b"></div>
      <div className="m-0 mx-auto flex w-[1100px] gap-10">
        <div className="h-full w-[778px]">
          <div className="felx-row flex">
            <h2 className="mb-2 text-xl font-bold">리뷰목록</h2>
            <h3 className="ml-3 text-gray-600">{wineData.reviewCount}개</h3>
          </div>
          <ReviewList reviews={reviews} />
        </div>
        <div className="h-[300px] w-[285px]">
          <div className="felx-row flex">
            <StarRating rating={wineData.avgRating} size={30} />{" "}
            <h3>{wineData.avgRating}</h3>
            <h3>/5.0</h3>
          </div>
          <ReviewBarGroup reviews={reviews}></ReviewBarGroup>
          <button
            onClick={() =>
              showModal(<ReviewForm wine={wineData} />, "리뷰 등록", 550, 1000)
            }
            className="h-12 w-70 cursor-pointer rounded-sm bg-black text-white"
          >
            리뷰남기기
          </button>
        </div>
      </div>
    </div>
  );
}
