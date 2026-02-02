import { RecommendedWines } from '@/types/wines/types';

export async function fetchRecommendedWines(
  limit: number,
): Promise<RecommendedWines> {
  const res = await fetch(
    `https://winereview-api.vercel.app/14-2/wines/recommended?limit=${limit}`,
    {
      next: { revalidate: 10 }, // 10초 마다
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch recommended wines: ${res.status}`);
  }

  const data = await res.json();
  return data;
}

export interface fetchWinesProps {
  limit: number;
  cursor?: number;
  type?: 'RED' | 'WHITE' | 'SPARKLING';
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  name?: string;
}

export async function fetchWines({
  limit,
  cursor,
  type,
  minPrice,
  maxPrice,
  rating,
  name,
}: fetchWinesProps): Promise<any> {
  const params = new URLSearchParams();
  params.append('limit', limit.toString());

  if (cursor) params.append('cursor', cursor.toString());
  if (type) params.append('type', type);
  if (minPrice !== undefined) params.append('minPrice', minPrice.toString());
  if (maxPrice !== undefined) params.append('maxPrice', maxPrice.toString());
  if (rating !== undefined) params.append('rating', rating.toString());
  if (name) params.append('name', name);

  const url = `https://winereview-api.vercel.app/14-2/wines?${params.toString()}`;

  const res = await fetch(url, {
    next: { revalidate: 1 }, // 1초 주기
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch wines: ${res.status}`);
  }

  return res.json();
}
