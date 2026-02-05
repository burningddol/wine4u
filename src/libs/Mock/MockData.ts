interface Review {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface Wine {
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
}

export const MockData: Wine[] = [
  {
    id: 1004,
    name: "샤또 크뤼조 화이트",
    region: "프랑스 남서부 쥐랑",
    image:
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wine/user/1162/1746000583720/image-removebg-preview(12).png",
    price: 54900,
    type: "WHITE",
    avgRating: 4.5,
    reviewCount: 2,
    recentReview: {
      id: 2464,
      content: "맛좋아요",
      createdAt: "2025-05-08T13:58:57.297Z",
      updatedAt: "2025-05-08T13:58:57.297Z",
    },
    userId: 1133,
  },
];
interface WineTasteAroma {
  id: number;
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
}

export const MockData2: WineTasteAroma[] = [
  {
    id: 1,
    rating: 0,
    lightBold: 0,
    smoothTannic: 0,
    drySweet: 0,
    softAcidic: 0,
    aroma: ["CHERRY", "OAK", "SOIL"],
  },
  {
    id: 2,
    rating: 0,
    lightBold: 0,
    smoothTannic: 0,
    drySweet: 0,
    softAcidic: 0,
    aroma: ["APPLE", "OAK", "APPLE"],
  },
  {
    id: 3,
    rating: 0,
    lightBold: 0,
    smoothTannic: 0,
    drySweet: 0,
    softAcidic: 0,
    aroma: ["CHERRY", "TOAST", "APPLE"],
  },
  {
    id: 4,
    rating: 0,
    lightBold: 0,
    smoothTannic: 0,
    drySweet: 0,
    softAcidic: 0,
    aroma: ["CHERRY", "OAK", "SOIL"],
  },
];
