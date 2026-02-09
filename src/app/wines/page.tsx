import { fetchRecommendedWines, fetchWines } from '@/libs/api/wines/getAPIData';
import RecommendedWineList from './_components/recommend/RecommendedWines';
import WineList from './_components/WineList';

export const revalidate = 1; // 어차피 사용자적어서 서버부담없으니 1초로함

export default async function WinesPage() {
  const [recommendedWines, wines] = await Promise.all([
    fetchRecommendedWines(10),
    fetchWines({ limit: 6 }),
  ]);

  return (
    <>
      <div className="bg-winesHero absolute top-0 z-[-1] h-[439px] w-full bg-cover bg-center md:h-[554px] xl:h-[560px] xl:rounded-b-[88px]" />
      <RecommendedWineList recommendedWines={recommendedWines} />
      <WineList wines={wines} />
    </>
  );
}
