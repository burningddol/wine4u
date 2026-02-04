import { useId } from 'react';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: number;
  fillColor?: string;
  emptyColor?: string;
}

const STAR_PATH =
  'M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z';

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

// i번째 별이 채워질 퍼센트(0~100). rating=3.7이면 0,1,2는 100 / 3은 70 / 4는 0
const getFillPercent = (rating: number, i: number) =>
  clamp((rating - i) * 100, 0, 100);

export default function StarRating({
  rating,
  maxStars = 5,
  size = 20,
  fillColor = '#000000',
  emptyColor = '#e2e1e1',
}: StarRatingProps) {
  //svg fill window객체에서 아이디 공유라 고유값 써야함
  const uid = useId();
  const safeRating = clamp(rating, 0, maxStars);

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: maxStars }, (_, i) => {
        const fill = getFillPercent(safeRating, i);
        const gradientId = `${uid}-star-${i}`;

        return (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            aria-hidden
          >
            <defs>
              <linearGradient id={gradientId}>
                <stop offset={`${fill}%`} stopColor={fillColor} />
                <stop offset={`${fill}%`} stopColor={emptyColor} />
              </linearGradient>
            </defs>

            <path d={STAR_PATH} fill={`url(#${gradientId})`} />
          </svg>
        );
      })}
    </div>
  );
}
