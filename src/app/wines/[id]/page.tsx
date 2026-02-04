import WineDetail from '../_components/_detail/WineDetail';
import WineTaste from '../_components/_detail/WineTaste';
import { MockData } from '../_components/_detail/MockData';

export default async function WinesPage() {
  const wineData = MockData[0];

  return (
    <div>
      <div className="bg-winesHero absolute top-0 z-[-1] h-[439px] w-full bg-cover bg-center md:h-[554px] xl:h-[603px] xl:rounded-b-[88px]" />
      <WineDetail
        wine={wineData}
        className="min-w-[1100px] border-solid border-red-500"
      ></WineDetail>
      <div className="m-auto my-10 flex min-h-[450px] max-w-[1100px]">
        <div className="flex max-w-[500px] flex-col gap-4">
          <div className="flex flex-row justify-between">
            <h2 className="mb-2 text-xl font-bold">어떤 맛이 나나요?</h2>
            <h3 className="text-gray-600">( {wineData.reviewCount}명 참여 )</h3>
          </div>
          <WineTaste label="바디감" value={4} />
          <WineTaste label="탄닌" value={2.5} />
          <WineTaste label="당도" value={5.3} />
          <WineTaste label="산미" value={3.7} />
        </div>
        <div className="mx-10 flex min-w-[480px] flex-col gap-4">
          <div className="flex flex-row justify-between">
            <h2 className="mb-2 text-xl font-bold">어떤 향이 있나요?</h2>
            <h3 className="text-gray-600">( {wineData.reviewCount}명 참여 )</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
