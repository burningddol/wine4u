import Image from 'next/image';
import LandingSection from './_components/LandingSection';

export default function Home() {
  return (
    <div>
      <LandingSection>
        <section className="m-auto mb-35 flex w-full flex-col bg-white px-10 xl:px-40">
          <article className="mt-20 flex flex-col items-end justify-between xl:flex-row xl:items-center">
            <p className="mx-auto mb-6 xl:mb-0">
              <span className="mb-3 block w-40 text-lg font-bold break-keep">
                매달 새롭게 만나는 와인 추천 콘텐츠
              </span>
              <span className="text-sm text-gray-500">
                매달 다양한 인기 와인을 만나보세요.
              </span>
            </p>

            <div className="relative h-[233px] w-[359px] md:h-[470px] md:w-[725px]">
              <Image src="/main/recommend.jpg" fill alt="와인추천이미지" />
            </div>
          </article>

          <article className="mt-20 flex flex-col-reverse items-start justify-between xl:flex-row xl:items-center">
            <div className="relative h-[233px] w-[359px] md:h-[470px] md:w-[725px]">
              <Image src="/main/type.jpg" fill alt="와인추천이미지" />
            </div>

            <p className="mx-auto mb-6 xl:mb-0">
              <span className="mb-3 block w-40 text-lg font-bold break-keep">
                다양한 필터로 찾는 내 맞춤 와인
              </span>
              <span className="block text-sm text-gray-500">
                와인 타입, 가격, 평점으로
              </span>
              <span className="block text-sm text-gray-500">
                나에게 맞는 와인을 쉽게 검색해요.
              </span>
            </p>
          </article>

          <article className="mt-20 flex flex-col items-end justify-between xl:flex-row xl:items-center">
            <p className="mx-auto mb-6 xl:mb-0">
              <span className="mb-3 block w-25 text-lg font-bold break-keep">
                직관적인 리뷰 시스템
              </span>
              <span className="block text-sm text-gray-500">
                와인 타입, 가격, 평점으로
              </span>
              <span className="block text-sm text-gray-500">
                나에게 맞는 와인을 쉽게 검색해요.
              </span>
            </p>

            <div className="relative h-[233px] w-[359px] md:h-[470px] md:w-[725px]">
              <Image src="/main/review.jpg" fill alt="와인추천이미지" />
            </div>
          </article>
        </section>
      </LandingSection>
    </div>
  );
}
