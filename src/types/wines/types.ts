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
  type: 'RED' | 'WHITE' | 'SPARKLING';
  avgRating: number;
  reviewCount: number;
  recentReview: RecentReview | null; // 리뷰가 없는 경우 null
}

export type RecommendedWines = RecommendedWine[];

export interface Wine {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: 'RED' | 'WHITE' | 'SPARKLING';
  avgRating: number;
  reviewCount: number;
  recentReview: RecentReview | null;
}

export interface WineListResponse {
  totalCount: number;
  nextCursor: number | null;
  list: Wine[];
}
