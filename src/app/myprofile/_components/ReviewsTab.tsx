"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyReviews, deleteReview } from "@/app/myprofile/_libs/profileApi";
import type { MyReviewItem } from "@/types/myprofile/types";
import type { LoginedUser } from "@/types/auth/types";

import { Button } from "@/components/ui/Button";
import { useModal } from "@/components/ModalProvider";
import { useDialog } from "@/components/DialogProvider";
import { useProfileTab } from "../_contexts/ProfileTabContext";

import { useUser } from "@/components/UserProvider";
import { wineTasteAroma } from "@/utils/wineTasteAroma";
import ReviewEditModal from "./modal/ReviewModal";
import ReviewItem from "./ReviewItem";
import EmptyState from "./EmptyState";
import ReviewsTabSkeleton from "./ReviewsTabSkeleton";
import { QUERY_KEYS } from "@/libs/query/queryKeys";

export default function ReviewsTab({
  showToast,
}: {
  showToast: (message: string, type: "success" | "error") => void;
}) {
  const { user } = useUser();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setReviewCount } = useProfileTab();
  const { showModal } = useModal();
  const { showConfirm } = useDialog();

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: QUERY_KEYS.myReviews,
    queryFn: () => getMyReviews(),
  });

  const reviews: MyReviewItem[] = data?.list ?? [];

  useEffect(() => {
    setReviewCount(reviews.length);
  }, [reviews.length, setReviewCount]);

  const { mutate: removeReview } = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myReviews });
      showToast("삭제되었습니다", "success");
    },
    onError: () => {
      showToast("삭제에 실패했습니다", "error");
    },
  });

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
        <ReviewEditModal
          mode="edit"
          review={review}
          onSuccess={() =>
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myReviews })
          }
        />,
        "리뷰 수정",
      );
    },
    [showModal, queryClient],
  );

  const handleDelete = useCallback(
    (id: number) => {
      showConfirm("리뷰를 삭제하시겠습니까?", () => removeReview(id));
    },
    [showConfirm, removeReview],
  );

  if (user === "isPending" || isLoading) return <ReviewsTabSkeleton />;

  if (!user) {
    return <div>로그인 후 이용...</div>;
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="text-error">{error.message}</p>
        <Button type="button" className="mt-4" onClick={() => refetch()}>
          다시 시도
        </Button>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <EmptyState
        message="작성한 리뷰가 없습니다."
        actionLabel="리뷰 작성하기"
        onAction={() => router.push("/wines")}
      />
    );
  }

  return (
    <>
      <div className="flex flex-col-reverse gap-20 py-10 md:px-8">
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
