import { useId } from "react";

interface WineTasteProps {
  label: string;
  value: number; // 0 ~ 5 (6단계이므로 인덱스는 0~5)
  fillColor?: string;
  onChange?: (newValue: number) => void;
  layout?: "column" | "grid"; //상단 와인디테일 or 리뷰내에 그리드
}

const WINE_INFO = {
  바디감: { low: "가벼워요", mid: "적당해요", high: "진해요" },
  당도: { low: "드라이해요", mid: "중간단맛", high: "달아요" },
  산미: { low: "안셔요", mid: "새콤해요", high: "많이셔요" },
  탄닌: { low: "부드러워요", mid: "적당해요", high: "떫어요" },
} as const;

const getTasteText = (label: string, value: number) => {
  const config = WINE_INFO[label as keyof typeof WINE_INFO];
  if (!config) return "설문 없음";
  if (value === null || value === undefined || value === 0) {
    return "설문 없음";
  }
  if (value <= 2) return config.low;
  if (value <= 4) return config.mid;
  return config.high;
};

export default function WineTaste({
  label,
  value,
  fillColor = "#333236",
  onChange, // 리뷰남기기 모달
  layout = "column", //상단 와인디테일 or 리뷰내에 그리드
}: WineTasteProps) {
  const uid = useId();
  const isInputMode = !!onChange; //리뷰남기기 모달내 와인 맛
  const config = WINE_INFO[label as keyof typeof WINE_INFO];
  const maxSteps = 6; // 맛 6단계

  /*layout=column 상단와인내의 그래프 / 
   layout=grid 리뷰내에 그래프 /
   isIpuMode 리뷰폼 내의 선택그래프 */

  return (
    <div className="mb-[20px] flex h-full w-full items-center justify-between gap-4">
      {/* 와인 디테일 박스o 레이블 */}
      {!isInputMode && (
        <div className="flex h-[30px] w-14 shrink-0 items-center justify-center rounded-sm bg-[#F2F2F2] text-sm font-bold text-[#8C8C8B]">
          {label}
        </div>
      )}
      {/*리뷰 폼 내 박스x 레이블*/}
      <div className="flex flex-col items-center gap-2 text-center md:flex-row md:gap-4">
        {isInputMode && <span className="w-15 text-lg font-bold">{label}</span>}

        {/*레이블 뒤 선*/}
        {(layout === "column" || isInputMode) && (
          <div className="hidden h-6 w-[1px] bg-[#D1D1D1] md:block"></div>
        )}
        {/*리뷰 폼 내 좌측 최저 값 명시*/}
        <div className="flex h-3 flex-1 items-center gap-1">
          {isInputMode && config && (
            <span className="text-md w-18 shrink-0 text-[#A3A3A3]">
              {config.low}
            </span>
          )}

          {Array.from({ length: maxSteps }, (_, i) => {
            const fill = Math.min(Math.max((value - i) * 100, 0), 100);
            const gradientId = `${uid}-pill-${i}`;

            return (
              <div
                key={i}
                onClick={() => onChange?.(i + 1)}
                className={`bg-winesHero relative h-3 flex-1 md:h-full ${
                  i === 0 ? "rounded-l-full" : "" // 맨 앞만 왼쪽 둥글게
                } ${
                  i === maxSteps - 1 ? "rounded-r-full" : "" // 맨 뒤만 오른쪽 둥글게
                } overflow-hidden ${onChange ? "cursor-pointer" : ""} `}
              >
                {/* 실제 채워지는 게이지 (SVG) */}
                <svg className="h-full w-full" aria-hidden="true">
                  <defs>
                    <linearGradient id={gradientId}>
                      <stop offset={`${fill}%`} stopColor={fillColor} />
                      <stop offset={`${fill}%`} stopColor="transparent" />
                    </linearGradient>
                  </defs>
                  <rect
                    width="100%"
                    height="100%"
                    fill={`url(#${gradientId})`}
                  />
                </svg>
              </div>
            );
          })}
          {/*리뷰 폼 내 좌측 최고 값 명시(인풋모드 ? 최고값 : 리뷰내 레이블 밸류*/}
          {isInputMode && config ? (
            <span className="text-md flex w-14 shrink-0 justify-end text-[#A3A3A3]">
              {config.high}
            </span>
          ) : (
            <div className="text-md flex w-17 items-center justify-end text-right">
              {getTasteText(label, value)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
