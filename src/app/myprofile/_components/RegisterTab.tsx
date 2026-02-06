"use client";

export default function RegisterTab() {
  const mockWines = [
    {
      id: 1,
      wineName: "Sentinel Carbernet Sauvignon 2016",
      region: "Western Cape, South Africa",
      price: 64990,
    },
    {
      id: 2,
      wineName: "Sentinel Carbernet Sauvignon 2016",
      region: "Western Cape, South Africa",
      price: 64990,
    },
    {
      id: 3,
      wineName: "Sentinel Carbernet Sauvignon 2016",
      region: "Western Cape, South Africa",
      price: 64990,
    },
  ];

  const displayWines = mockWines.length > 0 ? mockWines : mockWines;

  if (displayWines.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-600">등록된 와인이 없습니다.</p>
        <button className="bg-primary hover:bg-opacity-90 mt-4 rounded-md px-4 py-2 text-white">
          와인 등록하기
        </button>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-wrap gap-x-19 gap-y-10">
      {displayWines.map((wine) => (
        <WineCard key={wine.id} wine={wine} />
      ))}
    </div>
  );
}

function WineCard({
  wine,
}: {
  wine: { id: number; wineName: string; region: string; price: number };
}) {
  return (
    <article className="group flex w-[calc(50%-38px)] cursor-pointer flex-col gap-6 overflow-hidden">
      {/* 와인 이미지 */}
      <div className="relative flex aspect-square items-center justify-center bg-gray-100">
        <span className="text-5xl">🍷</span>
      </div>

      {/* 와인 정보 */}
      <div className="flex flex-col gap-6 pb-5">
        <div className="relative flex flex-col gap-[6px]">
          <h3 className="w-2/3 text-2xl font-bold">{wine.wineName}</h3>
          <p className="text-md mb-2 font-normal text-gray-300">
            {wine.region}
          </p>
          <div className="absolute top-0 right-0">삭제</div>
        </div>
        <p className="text-2xl font-bold">₩{wine.price.toLocaleString()}</p>
      </div>
    </article>
  );
}
