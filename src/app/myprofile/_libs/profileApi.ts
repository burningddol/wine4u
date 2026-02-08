import Axios from "axios";
import axios from "@/libs/api/axios";
import type {
  MyReviewItem,
  MyReviewsResponse,
  UpdateProfileBody,
  UpdateProfileResponse,
} from "@/types/myprofile/types";

export async function getMyReviews(params?: {
  cursor?: number;
  limit?: number;
}): Promise<MyReviewsResponse> {
  const searchParams = new URLSearchParams();
  if (params?.cursor != null) searchParams.set("cursor", String(params.cursor));
  if (params?.limit != null) searchParams.set("limit", String(params.limit));
  const query = searchParams.toString();
  const url = query ? `/auth/me/reviews?${query}` : "/auth/me/reviews";
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
  return { list, nextCursor };
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
}

export async function getMyWines(params?: {
  cursor?: number;
  limit?: number;
}): Promise<MyWinesResponse> {
  const searchParams = new URLSearchParams();
  if (params?.cursor != null) searchParams.set("cursor", String(params.cursor));
  if (params?.limit != null) searchParams.set("limit", String(params.limit));
  const query = searchParams.toString();
  const url = query ? `/auth/me/wines?${query}` : "/auth/me/wines";
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
  return { list, nextCursor };
}

export async function updateUserNickname(
  nickname: string,
  image?: string | null,
): Promise<UpdateProfileResponse> {
  try {
    const body: UpdateProfileBody = { nickname };
    if (image != null && image !== "") body.image = image;
    const res = await axios.patch<UpdateProfileResponse>("/auth/me", body, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (err: unknown) {
    if (Axios.isAxiosError(err) && err.response != null) {
      const status = err.response.status;
      const data = err.response.data as Record<string, unknown> | undefined;
      const message =
        status === 403
          ? "현재 API 서버에서 허용하지 않습니다."
          : data != null && typeof data.message === "string"
            ? data.message
            : data != null && Array.isArray(data.message)
              ? (data.message as string[]).join(", ")
              : data != null && typeof data.error === "string"
                ? data.error
                : "닉네임 변경에 실패했습니다.";
      throw new Error(status ? `${message} (${status})` : message);
    }
    throw err;
  }
}

/** PATCH /auth/me — 서버에서 /auth/me, /users/me 둘 다 시도 */
export async function updateUserImage(
  imageUrl: string,
): Promise<UpdateProfileResponse> {
  try {
    const res = await axios.patch<UpdateProfileResponse>(
      "/auth/me",
      { image: imageUrl },
      { headers: { "Content-Type": "application/json" } },
    );
    return res.data;
  } catch (err: unknown) {
    if (Axios.isAxiosError(err) && err.response != null) {
      const status = err.response.status;
      const data = err.response.data as Record<string, unknown> | undefined;
      const message =
        data != null && typeof data.message === "string"
          ? data.message
          : data != null && Array.isArray(data.message)
            ? (data.message as string[]).join(", ")
            : data != null && typeof data.error === "string"
              ? data.error
              : status === 403
                ? "현재 API 서버에서 프로필 이미지 수정을 허용하지 않습니다. API 제공처 설정 이슈입니다."
                : "이미지 변경에 실패했습니다.";
      throw new Error(status ? `${message} (${status})` : message);
    }
    throw err;
  }
}
