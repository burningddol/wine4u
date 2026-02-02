import { fetchRecommendedWines } from '@/libs/api/wines/getAPIData';
import RecommendedWineList from './_components/RecommendedWines';

export default async function WinesPage() {
  const recommendedWines = await fetchRecommendedWines(10);

  return (
    <>
      <div className="bg-winesHero absolute top-0 z-[-1] h-[439px] w-full bg-cover bg-center md:h-[554px] xl:h-[603px] xl:rounded-b-[88px]" />
      <RecommendedWineList recommendedWines={recommendedWines} />
    </>
  );
}
