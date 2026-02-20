import {
  ImageURL,
  RecommendedWines,
  WineListResponse,
  WineType,
} from "@/types/wines/types";
import axios from "../axios";
import { PostWineValue } from "@/app/wines/_components/register/WineRegisterForm";

const API_BASE = "https://winereview-api.vercel.app/21-310338";

export interface FetchWinesParams {
  limit: number;
  cursor?: number;
  type?: WineType;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  name?: string;
}

export async function fetchRecommendedWines(
  limit: number,
): Promise<RecommendedWines> {
  const res = await fetch(`${API_BASE}/wines/recommended?limit=${limit}`, {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch recommended wines: ${res.status}`);
  }

  const data = await res.json();
  return data;
}

export async function fetchWines({
  limit,
  cursor,
  type,
  minPrice,
  maxPrice,
  rating,
  name,
}: FetchWinesParams): Promise<WineListResponse> {
  const params = new URLSearchParams();
  params.append("limit", limit.toString());

  if (cursor) params.append("cursor", cursor.toString());
  if (type) params.append("type", type);
  if (minPrice !== undefined) params.append("minPrice", minPrice.toString());
  if (maxPrice !== undefined) params.append("maxPrice", maxPrice.toString());
  if (rating !== undefined) params.append("rating", rating.toString());
  if (name) params.append("name", name);

  const res = await fetch(`${API_BASE}/wines?${params.toString()}`, {
    next: { revalidate: 1 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch wines: ${res.status}`);
  }

  return await res.json();
}

export async function getImageURL(file: File): Promise<ImageURL | null> {
  try {
    const formData = new FormData();
    formData.append("image", file);
    const res = await axios.post("/images/upload", formData);
    return res.data;
  } catch (e) {
    console.log(`Failed to load ImageURL: ${e}`);
    return null;
  }
}

export async function postWine(wine: PostWineValue) {
  try {
    await axios.post("/wines", wine);
  } catch (e) {
    console.log(`Failed to post wine: ${e}`);
  }
}

export async function postWineBotMessage(message: string): Promise<string> {
  const wineData = await fetchWines({ limit: 10000 });
  const wineList = wineData.list.map((w) => ({ id: w.id, name: w.name }));
  const res = await axios.post("/winebot", { wineList, message });
  return res.data.answer;
}

interface WineByAI {
  id: number;
  name: string;
  image: string;
}

export async function getWineById(id: number): Promise<WineByAI> {
  const res = await axios.get(`/wines/${id}`);

  return res.data;
}
