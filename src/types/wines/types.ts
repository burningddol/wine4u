export type WineType = 'RED' | 'WHITE' | 'SPARKLING';

export interface User {
  id: number;
  nickname: string;
  image: string;
}

export interface Like {
  user: {
    id: number;
  };
}

export interface RecentReview {
  id: number;
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  likes: Like[];
}

export interface RecommendedWine {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: WineType;
  avgRating: number;
  reviewCount: number;
  recentReview: RecentReview | null;
}

export type RecommendedWines = RecommendedWine[];

export interface Wine {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: WineType;
  avgRating: number;
  reviewCount: number;
  recentReview: RecentReview | null;
  userId: number;
}

export interface WineListResponse {
  totalCount: number;
  nextCursor: number | null;
  list: Wine[];
}

export interface WineFilterValues {
  type?: WineType;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
}
