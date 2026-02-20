// 테이스팅바

import { MyReviewItem } from "@/types/myprofile/types";
import { LoginedUser } from "@/types/auth/types";
import { WineTasteAroma, User } from "@/types/detail/types";

export function wineTasteAroma(
  review: MyReviewItem,
  opts: { user: LoginedUser; teamId: string },
): WineTasteAroma {
  const isLiked =
    Array.isArray(review.likes) &&
    review.likes.some((l) => l.user?.id === opts.user.id);

  const user: User = {
    id: opts.user.id,
    nickname: opts.user.nickname,
    image: opts.user.image ?? null,
  };

  return {
    id: review.id,
    rating: review.rating,

    lightBold: review.lightBold ?? 0,
    smoothTannic: review.smoothTannic ?? 0,
    drySweet: review.drySweet ?? 0,
    softAcidic: review.softAcidic ?? 0,
    aroma: review.aroma ?? [],

    content: review.content,
    createdAt: review.createdAt,
    updatedAt: review.updatedAt ?? review.createdAt,

    user,
    isLiked,
    wine: review.wine,

    wineId: review.wine.id,
    teamId: opts.teamId,
  };
}
