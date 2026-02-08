export interface User {
  id: number;
  nickname: string;
  image: string;
}

export interface UpdateProfileBody {
  nickname?: string;
  image?: string;
}

export interface UpdateProfileResponse {
  id: number;
  nickname: string;
  image?: string;
  updatedAt?: string;
  createdAt?: string;
  teamId?: string;
}

export interface MyReviewItem {
  id: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt?: string;
  lightBold?: number;
  smoothTannic?: number;
  drySweet?: number;
  softAcidic?: number;
  aroma?: string[];
  wine: {
    id: number;
    name: string;
    region: string;
    image?: string;
  };
  likes?: { user: { id: number } }[];
}

export interface MyReviewsResponse {
  list: MyReviewItem[];
  nextCursor: number | null;
  totalCount?: number;
}
