export interface Review {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface WineDetail {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: "WHITE" | "RED" | "SPARKLING" | "ROSE"; // 문자열 리터럴로 정확히 지정
  avgRating: number;
  reviewCount: number;
  recentReview: Review | null;
  userId: number;
  reviews: WineTasteAroma[];
}

export interface WineTasteAroma {
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
  wine: {
    id: number;
    name: string;
    region: string;
    image?: string;
  };
  likes?: { user: { id: number } }[];
  isLiked: {};
  wineId: number;
  teamId: string;
  user: User;
}

export interface User {
  id: number;
  nickname: string;
  image: string | null;
}
