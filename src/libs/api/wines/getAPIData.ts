import { RecommendedWines } from '@/types/wines/types';

export async function fetchRecommendedWines(
  limit: number,
): Promise<RecommendedWines> {
  const res = await fetch(
    `https://winereview-api.vercel.app/14-2/wines/recommended?limit=${limit}`,
    {
      next: { revalidate: 300 }, // 5분마다
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch recommended wines: ${res.status}`);
  }

  const data = await res.json();
  return data;
}
