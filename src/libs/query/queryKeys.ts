export const QUERY_KEYS = {
  wineDetail: (id: string | number) => ["wine-detail", String(id)] as const,
  myReviews: ["my-reviews"] as const,
  myWines: ["my-wines"] as const,
} as const;
