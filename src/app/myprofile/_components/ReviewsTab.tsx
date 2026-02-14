"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useMemo } from "react";
import { getMyReviews, deleteReview } from "@/app/myprofile/_libs/profileApi";
import type { MyReviewItem } from "@/types/myprofile/types";
import type { LoginedUser } from "@/types/auth/types";

import { Button } from "@/components/ui/Button";
import { useModal } from "@/components/ModalProvider";
import { useProfileTab } from "../_contexts/ProfileTabContext";

import { useUser } from "@/components/UserProvider";
import { wineTasteAroma } from "@/utils/wineTasteAroma";
import ReviewEditModal from "./modal/ReviewModal";
import ReviewItem from "./ReviewItem";

export default function ReviewsTab({
  showToast,
}: {
  showToast: (message: string, type: "success" | "error") => void;
}) {
  const { user } = useUser();
  const router = useRouter();

  const [reviews, setReviews] = useState<MyReviewItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setReviewCount } = useProfileTab();

  const { showModal } = useModal();

  useEffect(() => {
    setReviewCount(reviews.length);
  }, [reviews.length, setReviewCount]);

  const loadReviews = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMyReviews();
      setReviews(data.list ?? []);
    } catch (any: any) {
      setError(
        any instanceof Error ? any.message : "리뷰 목록을 불러오지 못했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const tastes = useMemo(() => {
    if (!user || user === "isPending") return [];

    const me = user as LoginedUser;
    const teamId = me.teamId;

    return reviews.map((r) =>
      wineTasteAroma(r, { user: me, teamId: teamId ?? "" }),
    );
  }, [reviews, user]);

  const handleEdit = useCallback(
    (review: MyReviewItem) => {
      showModal(
        <ReviewEditModal mode="edit" review={review} onSuccess={loadReviews} />,
        "리뷰 수정",
        460,
        700,
      );
    },
    [showModal, loadReviews],
  );

  const handleDelete = useCallback(
    async (id: number) => {
      const ok = window.confirm("리뷰를 삭제하시겠습니까?");
      if (!ok) return;

      try {
        await deleteReview(id);
        setReviews((prev) => {
          const next = prev.filter((r) => r.id !== id);
          // setReviewCount(next.length);
          return next;
        });
        showToast("삭제되었습니다", "success");
      } catch {
        showToast("삭제에 실패했습니다", "error");
      }
    },
    [showToast, setReviewCount],
  );

  if (user === "isPending") {
    return <div>로딩중...</div>;
  }

  if (!user) {
    return <div>로그인 후 이용...</div>;
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="text-error">{error}</p>
        <Button type="button" className="mt-4" onClick={loadReviews}>
          다시 시도
        </Button>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <div className="flex flex-col items-center justify-center gap-6">
          <img src="/icons/exclamation_mark.svg" />
          <p className="text-2xl font-bold">작성한 리뷰가 없습니다.</p>
        </div>
        <Button
          type="button"
          className="mt-4"
          onClick={() => router.push("/wines")}
        >
          리뷰 작성하기
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col-reverse gap-20 px-8 py-10">
        {reviews.map((review, index) => (
          <ReviewItem
            key={review.id}
            review={review}
            taste={tastes[index]}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </>
  );
}
