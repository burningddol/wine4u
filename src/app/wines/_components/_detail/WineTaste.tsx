import { useId } from 'react';

interface WineTasteProps {
  label: string;
  value: number; // 0 ~ 5 (6단계이므로 인덱스는 0~5)
  fillColor?: string;
}

const WINE_INFO = {
  바디감: { low: '가벼워요', mid: '적당해요', high: '진해요' },
  당도: { low: '드라이해요', mid: '중간단맛', high: '달아요' },
  산미: { low: '안셔요', mid: '새콤해요', high: '많이셔요' },
  탄닌: { low: '부드러워요', mid: '적당해요', high: '많이셔요' },
} as const;

const getTasteText = (label: string, value: number) => {
  const config = WINE_INFO[label as keyof typeof WINE_INFO];
  if (!config) return '';

  if (value <= 2) return config.low;
  if (value <= 4) return config.mid;
  return config.high;
};

export default function WineTaste({
  label,
  value,
  fillColor = '#333236',
}: WineTasteProps) {
  const uid = useId();
  const maxSteps = 6; // 맛 6단계
  const tasteText = getTasteText(label, value); // 각 영역별 text 추출

  return (
    <div className="flex w-full items-center justify-between gap-4 py-2">
      <div className="flex h-8 w-14 items-center justify-center rounded-sm bg-gray-200 text-center text-gray-800">
        {label}
      </div>
      <div className="block h-5 w-px bg-gray-400"></div>
      <div className="flex h-3 flex-1 gap-1">
        {Array.from({ length: maxSteps }, (_, i) => {
          // 각 칸이 얼마나 채워질지 계산 (0~100)
          const fill = Math.min(Math.max((value - i) * 100, 0), 100);
          const gradientId = `${uid}-pill-${i}`;

          return (
            <div
              key={i}
              className={`bg-winesHero relative h-full flex-1 ${
                i === 0 ? 'rounded-l-full' : '' // 맨 앞만 왼쪽 둥글게
              } ${
                i === maxSteps - 1 ? 'rounded-r-full' : '' // 맨 뒤만 오른쪽 둥글게
              } overflow-hidden`} // 내부에서 채워지는 색이 둥근 모서리에 맞춰 잘리도록
            >
              {/* 실제 채워지는 게이지 (SVG) */}
              <svg className="h-full w-full" aria-hidden="true">
                <defs>
                  <linearGradient id={gradientId}>
                    <stop offset={`${fill}%`} stopColor={fillColor} />
                    <stop offset={`${fill}%`} stopColor="transparent" />
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill={`url(#${gradientId})`} />
              </svg>
            </div>
          );
        })}
        <div className="h-20 w-20 text-right">{tasteText}</div>
      </div>
    </div>
  );
}
