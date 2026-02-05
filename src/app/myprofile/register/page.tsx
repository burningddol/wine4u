'use client';

export default function MyWinesPage() {
  // TODO: 실제 API 연동
  const mockWines = [
    {
      id: 1,
      wineName: 'Sentinel Carbernet Sauvignon 2016',
      region: 'Western Cape, South Africa',
      price: 64990,
    },
    {
      id: 2,
      wineName: 'Sentinel Carbernet Sauvignon 2016',
      region: 'Western Cape, South Africa',
      price: 64990,
    },
    {
      id: 3,
      wineName: 'Sentinel Carbernet Sauvignon 2016',
      region: 'Western Cape, South Africa',
      price: 64990,
    },
  ];

  const displayWines = mockWines.length > 0 ? mockWines : mockWines;

  if (displayWines.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">등록된 와인이 없습니다.</p>
        <button className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90">
          와인 등록하기
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap gap-x-19 w-full gap-y-10 py-10 px-8">
        {displayWines.map((wine) => (
          <WineCard key={wine.id} wine={wine} />
        ))}
      </div>
    </div>
  );
}

function WineCard({ wine }: { wine: any }) {
  return (
    <article className="flex flex-col gap-6 w-[calc(50%-38px)] overflow-hidden cursor-pointer group">
      {/* 와인 이미지 */}
      <div className="aspect-square bg-gray-100 flex items-center justify-center relative">
        <span className="text-5xl">🍷</span>
      </div>

      {/* 와인 정보 */}
      <div className="flex flex-col gap-6 pb-5">
        <div className="relative flex flex-col gap-[6px]">
          <h3 className="w-2/3 text-2xl font-bold">{wine.wineName}</h3>
          <p className="text-md font-normal text-gray-300 mb-2">
            {wine.region}
          </p>
          <div className="absolute top-0 right-0">삭제</div>
        </div>
        <p className="text-2xl font-bold">
          ₩{wine.price.toLocaleString()}
        </p>
      </div>
    </article>
  );
}
