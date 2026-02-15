import Axios from "axios";
import axios from "@/libs/api/axios";
import type {
  User,
  MyReviewItem,
  MyReviewsResponse,
} from "@/types/myprofile/types";

const DEFAULT_REVIEWS_LIMIT = 20;

// 닉네임, 이미지 변경
export async function updateProfile(body: {
  nickname?: string;
  image?: string;
}): Promise<User> {
  const res = await axios.patch("/users/me", body);
  return res.data;
}

export async function updateUserNickname(nickname: string): Promise<User> {
  return updateProfile({ nickname });
}

export async function updateUserImageUrl(image: string): Promise<User> {
  return updateProfile({ image });
}

export async function updateImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);
  const res = await axios.post("/images/upload", formData);
  return res.data.url;
}

export async function updateUserImageFile(file: File): Promise<User> {
  const imageUrl = await updateImage(file);
  return updateUserImageUrl(imageUrl);
}

// 내가 쓴 후기
export async function getMyReviews(params?: {
  limit?: number;
  cursor?: number | null;
}): Promise<MyReviewsResponse> {
  const res = await axios.get<MyReviewsResponse>("/users/me/reviews", {
    params: {
      limit: params?.limit ?? DEFAULT_REVIEWS_LIMIT,
      cursor: params?.cursor ?? null,
    },
  });

  return res.data;
}

export interface MyWineItem {
  id: number;
  name: string;
  region: string;
  image?: string;
  price: number;
  type?: string;
}

export interface MyWinesResponse {
  list: MyWineItem[];
  nextCursor: number | null;
  totalCount?: number;
}

export async function deleteReview(id: number): Promise<void> {
  await axios.delete(`/reviews/${id}`);
}

// 리뷰 업데이트
export async function updateReview(
  id: number,
  body: {
    rating: number;
    lightBold: number;
    smoothTannic: number;
    drySweet: number;
    softAcidic: number;
    aroma: string[];
    content: string;
  },
): Promise<MyReviewItem> {
  const res = await axios.patch(`/reviews/${id}`, body);
  return res.data;
}

// 내가 등록한 와인
const DEFAULT_WINES_LIMIT = 20;

export async function getMyWines(params?: {
  limit?: number;
  cursor?: number | null;
}): Promise<MyWinesResponse> {
  const res = await axios.get<MyWinesResponse>("/users/me/wines", {
    params: {
      limit: params?.limit ?? DEFAULT_WINES_LIMIT,
      cursor: params?.cursor ?? null,
    },
  });
  return res.data;
}

export async function deleteWine(id: number): Promise<void> {
  await axios.delete(`/wines/${id}`);
}

export async function updateWine(
  id: number,
  body: {
    name: string;
    region: string;
    image?: string;
    price: number;
    avgRating: number;
    type?: string;
  },
): Promise<MyWineItem> {
  const res = await axios.patch(`/wines/${id}`, body);
  return res.data;
}

// 리뷰 좋아요
export async function likeReview(reviewId: number) {
  await axios.post(`/reviews/${reviewId}/like`);
}

export async function unlikeReview(reviewId: number) {
  await axios.delete(`/reviews/${reviewId}/like`);
}
