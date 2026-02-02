import { fetchRecommendedWines, fetchWines } from '@/libs/api/wines/getAPIData';
import RecommendedWineList from './_components/RecommendedWines';
import WineList from './_components/WineList';

export default async function WinesPage() {
  const [recommendedWines, wines] = await Promise.all([
    fetchRecommendedWines(10),
    fetchWines({ limit: 6 }),
  ]);

  return (
    <>
      <div className="bg-winesHero absolute top-0 z-[-1] h-[439px] w-full bg-cover bg-center md:h-[554px] xl:h-[603px] xl:rounded-b-[88px]" />
      <RecommendedWineList recommendedWines={recommendedWines} />
      <WineList wines={wines} />
    </>
  );
}
