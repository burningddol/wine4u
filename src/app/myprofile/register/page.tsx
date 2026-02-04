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
      <div className="grid grid-cols-2 gap-4">
        {displayWines.map((wine) => (
          <WineCard key={wine.id} wine={wine} />
        ))}
      </div>
    </div>
  );
}

function WineCard({ wine }: { wine: any }) {
  return (
    <article className="border border-gray-300 rounded-lg overflow-hidden hover:shadow-md transition cursor-pointer group">
      {/* 와인 이미지 */}
      <div className="aspect-square bg-gray-100 flex items-center justify-center relative">
        <span className="text-5xl">🍷</span>
      </div>

      {/* 와인 정보 */}
      <div className="p-4">
        <h3 className="font-bold text-black mb-1 text-lg">{wine.wineName}</h3>
        <p className="text-sm text-gray-600 mb-2">
          {wine.type} • {wine.region}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-primary">
            ₩{wine.price.toLocaleString()}
          </p>
          <span className="text-xs text-gray-500">{wine.registeredDate}</span>
        </div>
      </div>
    </article>
  );
}
