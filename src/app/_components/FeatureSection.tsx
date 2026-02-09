import FeatureArticle from "./FeatureArticle";

const FEATURES = [
  {
    title: "매달 새롭게 만나는 와인 추천 콘텐츠",
    descriptions: ["매달 다양한 인기 와인을 만나보세요."],
    imageSrc: "/main/recommend.jpg",
    imageAlt: "와인추천이미지",
  },
  {
    title: "다양한 필터로 찾는 내 맞춤 와인",
    descriptions: [
      "와인 타입, 가격, 평점으로",
      "나에게 맞는 와인을 쉽게 검색해요.",
    ],
    imageSrc: "/main/type.jpg",
    imageAlt: "와인추천이미지",
    reverse: true,
  },
  {
    title: "직관적인 리뷰 시스템",
    titleWidth: "w-30",
    descriptions: ["다양한 와인들의 리뷰를", "직관적으로 확인하고 등록해요."],
    imageSrc: "/main/review.jpg",
    imageAlt: "와인추천이미지",
  },
];

export default function FeatureSection() {
  return (
    <section className="m-auto mb-35 flex w-full flex-col bg-white xl:px-40">
      {FEATURES.map((feature, index) => (
        <FeatureArticle key={index} {...feature} />
      ))}
    </section>
  );
}
