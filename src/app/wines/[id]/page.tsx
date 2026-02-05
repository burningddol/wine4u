import WineDetail from "./_components/WineDetail";
import WineTasteBarGroup from "./_components/TasteBarGroup";
import { MockData } from "@/libs/Mock/MockData";
import AromaTop4 from "./_components/AromaTop4";

export default async function WinesPage() {
  const wineData = MockData[0];

  return (
    <div>
      <div className="bg-winesHero top-0 z-[-1] mt-[70px] flex h-[650px] w-full bg-cover bg-center md:h-[650px] xl:h-[603px] xl:rounded-b-[88px]">
        <WineDetail wine={wineData} className="min-w-[1100px]"></WineDetail>
      </div>
      <div className="m-auto my-10 flex min-h-[450px] max-w-[1100px]">
        <div className="flex max-w-[500px] flex-col gap-4">
          <div className="flex flex-row justify-between">
            <h2 className="mb-2 text-xl font-bold">어떤 맛이 나나요?</h2>
            <h3 className="text-gray-600">( {wineData.reviewCount}명 참여 )</h3>
          </div>
          <WineTasteBarGroup></WineTasteBarGroup>
        </div>
        <div className="mx-10 flex min-w-[480px] flex-col gap-4">
          <div className="flex max-h-10 justify-between">
            <h2 className="mb-2 text-xl font-bold">어떤 향이 있나요?</h2>
            <h3 className="text-gray-600">( {wineData.reviewCount}명 참여 )</h3>
          </div>
          <AromaTop4></AromaTop4>
        </div>
      </div>
    </div>
  );
}
