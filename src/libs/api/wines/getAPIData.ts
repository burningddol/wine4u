import {
  RecommendedWines,
  WineListResponse,
  WineType,
} from '@/types/wines/types';

const API_BASE = 'https://winereview-api.vercel.app/14-2';

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
  const res = await fetch(
    `${API_BASE}/wines/recommended?limit=${limit}`,
    {
      next: { revalidate: 10 },
    },
  );

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
  params.append('limit', limit.toString());

  if (cursor) params.append('cursor', cursor.toString());
  if (type) params.append('type', type);
  if (minPrice !== undefined) params.append('minPrice', minPrice.toString());
  if (maxPrice !== undefined) params.append('maxPrice', maxPrice.toString());
  if (rating !== undefined) params.append('rating', rating.toString());
  if (name) params.append('name', name);

  const res = await fetch(`${API_BASE}/wines?${params.toString()}`, {
    next: { revalidate: 1 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch wines: ${res.status}`);
  }

  return res.json();
}
