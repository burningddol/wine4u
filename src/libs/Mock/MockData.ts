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
  user: user;
  isLiked: {};
  wineId: number;
  teamId: string;
}

export interface user {
  id: number;
  nickname: string;
  image: string;
}

export const MockData2: WineTasteAroma[] = [
  {
    id: 1,
    rating: 5,
    lightBold: 0,
    smoothTannic: 0,
    drySweet: 0,
    softAcidic: 0,
    aroma: ["CHERRY", "OAK", "SOIL"],
    content:
      "와인 리뷰1  와인 리뷰1  와인 리뷰1  와인 리뷰1  와인 리뷰1  와인 리뷰1  와인 리뷰1  와인 리뷰1  와인 리뷰1  와인 리뷰1  ",
    createdAt: "2026-02-06T09:29:49.492Z",
    updatedAt: "2026-02-06T09:29:49.492Z",
    user: {
      id: 1,
      nickname: "닉네임1",
      image:
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wine/user/1162/1746000583720/image-removebg-preview(12).png",
    },
    isLiked: {},
    wineId: 0,
    teamId: "string",
  },
  {
    id: 2,
    rating: 3,
    lightBold: 0,
    smoothTannic: 0,
    drySweet: 0,
    softAcidic: 0,
    aroma: ["APPLE", "OAK", "TROPICAL"],
    content:
      "로렘 입숨(lorem ipsum; 줄여서 립숨, lipsum)은 출판이나 그래픽 디자인 분야에서 폰트, 타이포그래피, 레이아웃 같은 그래픽 요소나 시각적 연출을 보여줄 때 사용하는 표준 채우기 텍스트로, 최종 결과물에 들어가는 실제적인 문장 내용이 채워지기 전에 시각 디자인 프로젝트 모형의 채움 글로도 이용된다. 이런 용도로 사용할 때 로렘 입숨을 그리킹(greeking)이라고도 부르며, 때로 로렘 입숨은 공간만 차지하는 무언가를 지칭하는 용어로도 사용된다.",
    createdAt: "2026-02-06T09:29:49.492Z",
    updatedAt: "2026-02-06T09:29:49.492Z",
    user: {
      id: 1,
      nickname: "닉네임2",
      image:
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wine/user/1162/1746000583720/image-removebg-preview(12).png",
    },
    isLiked: {},
    wineId: 0,
    teamId: "string",
  },
  {
    id: 3,
    rating: 5,
    lightBold: 0,
    smoothTannic: 0,
    drySweet: 0,
    softAcidic: 0,
    aroma: ["CHERRY", "TOAST", "APPLE"],
    content: "Mock데이터 와인리뷰3.",
    createdAt: "2026-02-06T09:29:49.492Z",
    updatedAt: "2026-02-06T09:29:49.492Z",
    user: {
      id: 1,
      nickname: "닉네임3",
      image:
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wine/user/1162/1746000583720/image-removebg-preview(12).png",
    },
    isLiked: {},
    wineId: 0,
    teamId: "string",
  },
  {
    id: 4,
    rating: 2,
    lightBold: 0,
    smoothTannic: 0,
    drySweet: 0,
    softAcidic: 0,
    aroma: ["CHERRY", "OAK", "SOIL"],
    content:
      "로렘 입숨(lorem ipsum; 줄여서 립숨, lipsum)은 출판이나 그래픽 디자인 분야에서 폰트, 타이포그래피, 레이아웃 같은 그래픽 요소나 시각적 연출을 보여줄 때 사용하는 표준 채우기 텍스트로, 최종 결과물에 들어가는 실제적인 문장 내용이 채워지기 전에 시각 디자인 프로젝트 모형의 채움 글로도 이용된다. 이런 용도로 사용할 때 로렘 입숨을 그리킹(greeking)이라고도 부르며, 때로 로렘 입숨은 공간만 차지하는 무언가를 지칭하는 용어로도 사용된다.",
    createdAt: "2026-02-06T09:29:49.492Z",
    updatedAt: "2026-02-06T09:29:49.492Z",
    user: {
      id: 1,
      nickname: "닉네임4 ",
      image:
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wine/user/1162/1746000583720/image-removebg-preview(12).png",
    },
    isLiked: {},
    wineId: 0,
    teamId: "string",
  },
];
