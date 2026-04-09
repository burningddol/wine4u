import type { WineFilterValues } from "@/types/wines/types";

export const WINES_QUERY_KEY = "wines" as const;

export const INITIAL_FILTER: WineFilterValues = {
  type: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  rating: undefined,
};

export const WINES_PER_PAGE = 6;
