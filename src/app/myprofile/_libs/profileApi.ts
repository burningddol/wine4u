import Axios from "axios";
import axios from "@/libs/api/axios";
import type {
  User,
  MyReviewItem,
  MyReviewsResponse,
} from "@/types/myprofile/types";
import { promises } from "dns";

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

//

export async function getMyReviews(params?: {
  cursor?: number;
  limit?: number;
}): Promise<MyReviewsResponse> {
  const searchParams = new URLSearchParams();
  const limit = params?.limit ?? DEFAULT_REVIEWS_LIMIT;
  searchParams.set("limit", String(limit));
  if (params?.cursor != null) searchParams.set("cursor", String(params.cursor));
  const query = searchParams.toString();
  const url = `/users/me/reviews?${query}`;
  try {
    const res = await axios.get(url);
    const raw = res.data as Record<string, unknown> | unknown[];
    const list: MyReviewItem[] = Array.isArray(raw)
      ? (raw as MyReviewItem[])
      : ((raw?.list ?? raw?.data ?? raw?.reviews ?? []) as MyReviewItem[]);
    const nextCursor =
      typeof raw === "object" &&
      raw !== null &&
      !Array.isArray(raw) &&
      "nextCursor" in raw
        ? (raw.nextCursor as number | null)
        : null;
    const totalCount =
      typeof raw === "object" &&
      raw !== null &&
      !Array.isArray(raw) &&
      "totalCount" in raw &&
      typeof (raw as Record<string, unknown>).totalCount === "number"
        ? ((raw as Record<string, unknown>).totalCount as number)
        : undefined;
    return { list, nextCursor, totalCount };
  } catch (err: unknown) {
    if (Axios.isAxiosError(err) && err.response?.status === 400) {
      const data = err.response.data as Record<string, unknown> | undefined;
      const msg =
        data != null && typeof data.message === "string"
          ? data.message
          : data != null && Array.isArray(data.message)
            ? (data.message as string[]).join(", ")
            : "리뷰 목록 API가 요청 형식을 거부했습니다. 백엔드 경로/파라미터를 확인해 주세요.";
      throw new Error(`${msg} (400)`);
    }
    throw err;
  }
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

const DEFAULT_WINES_LIMIT = 20;

export async function getMyWines(params?: {
  cursor?: number;
  limit?: number;
}): Promise<MyWinesResponse> {
  const searchParams = new URLSearchParams();
  const limit = params?.limit ?? DEFAULT_WINES_LIMIT;
  searchParams.set("limit", String(limit));
  if (params?.cursor != null) searchParams.set("cursor", String(params.cursor));
  const query = searchParams.toString();
  const url = `/users/me/wines?${query}`;
  try {
    const res = await axios.get(url);
    const raw = res.data as Record<string, unknown> | unknown[];
    const list: MyWineItem[] = Array.isArray(raw)
      ? (raw as MyWineItem[])
      : ((raw?.list ?? raw?.data ?? raw?.wines ?? []) as MyWineItem[]);
    const nextCursor =
      typeof raw === "object" &&
      raw !== null &&
      !Array.isArray(raw) &&
      "nextCursor" in raw
        ? (raw.nextCursor as number | null)
        : null;
    const totalCount =
      typeof raw === "object" &&
      raw !== null &&
      !Array.isArray(raw) &&
      "totalCount" in raw &&
      typeof (raw as Record<string, unknown>).totalCount === "number"
        ? ((raw as Record<string, unknown>).totalCount as number)
        : undefined;
    return { list, nextCursor, totalCount };
  } catch (err: unknown) {
    if (Axios.isAxiosError(err) && err.response?.status === 400) {
      const data = err.response.data as Record<string, unknown> | undefined;
      const msg =
        data != null && typeof data.message === "string"
          ? data.message
          : data != null && Array.isArray(data.message)
            ? (data.message as string[]).join(", ")
            : "등록 와인 목록 API가 요청 형식을 거부했습니다. 백엔드 경로/파라미터를 확인해 주세요.";
      throw new Error(`${msg} (400)`);
    }
    throw err;
  }
}
