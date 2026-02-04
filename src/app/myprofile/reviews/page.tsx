'use client';

export default function MyReviewsPage() {
  // TODO: 실제 API 연동
  const reviews = [
    {
      id: 1,
      wineName: 'Sentinel Carbernet Sauvignon 2016',
      region: 'Western Cape, South Africa',
      rating: 5,
      content:
        '첫 모금에서 느껴지는 진한 블랙베리와 블랙커런트의 깊은 풍미가 인상적이었어요. 입 안을 가득 채우는 묵직한 바디감과 함께, 오크 숙성에서 오는 바닐라, 스파이스, 은은한 토스트 향이 균형 있게 어우러집니다. 시간이 지날수록 다크 초콜릿과 가죽 같은 성숙한 노트가 올라오면서, 여운이 길고도 부드럽게 이어져요. 타닌은 뚜렷하지만 과하지 않고,  단단한 구조감 덕분에 고기 요리나 숙성 치즈와 특히 잘 어울리는 와인이었습니다.',
      date: '2024-02-02',
      likes: 24,
    },
    {
      id: 2,
      wineName: 'Sentinel Carbernet Sauvignon 2016',
      region: 'Western Cape, South Africa',
      rating: 5,
      content:
        '첫 모금에서 느껴지는 진한 블랙베리와 블랙커런트의 깊은 풍미가 인상적이었어요. 입 안을 가득 채우는 묵직한 바디감과 함께, 오크 숙성에서 오는 바닐라, 스파이스, 은은한 토스트 향이 균형 있게 어우러집니다. 시간이 지날수록 다크 초콜릿과 가죽 같은 성숙한 노트가 올라오면서, 여운이 길고도 부드럽게 이어져요. 타닌은 뚜렷하지만 과하지 않고,  단단한 구조감 덕분에 고기 요리나 숙성 치즈와 특히 잘 어울리는 와인이었습니다.',
      date: '2024-02-03',
      likes: 2,
    },
  ];

  // 리뷰가 없을 시 메시지 출력
  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">작성한 리뷰가 없습니다.</p>
        <button className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90">
          리뷰 작성하기
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <article
          key={review.id}
          className="border border-gray-300 rounded-lg p-6 hover:shadow-md transition"
        >
          {/* 헤더: 별점, 날짜, 삭제 버튼 */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-yellow-500 text-lg font-bold">
                ★ {review.rating}
              </span>
              <span className="text-sm text-gray-600">{review.date}</span>
            </div>
            <button className="text-sm text-gray-600 hover:text-error transition">
              삭제
            </button>
          </div>

          {/* 와인 정보 */}
          <div className="flex gap-4 mb-4 pb-4 border-b border-gray-300">
            <div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center flex-shrink-0">
              <span className="text-3xl">🍷</span>
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-lg font-bold text-black mb-1">
                {review.wineName}
              </h3>
              <p className="text-sm text-gray-600">{review.region}</p>
            </div>
          </div>

          {/* 리뷰 내용 */}
          <div className="mb-4">
            <p className="text-gray-800 leading-relaxed">{review.content}</p>
          </div>

          {/* 좋아요 */}
          <div className="flex items-center">
            <button className="flex items-center gap-1 text-gray-600 hover:text-primary transition">
              <span>👍</span>
              <span className="text-sm">{review.likes}</span>
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
