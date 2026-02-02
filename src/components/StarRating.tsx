import Image from 'next/image';

/**
 * star rating
 * @author burningddol
 */

interface StarRatingProps {
  rating: number;
  maxStars?: number;
}

function StarIcon() {
  return <Image src="/star.svg" width={20} height={20} alt="별" />;
}

function EmptyStarIcon() {
  return <Image src="/emptyStar.svg" width={20} height={20} alt="별" />;
}

export default function StarRating({ rating, maxStars = 5 }: StarRatingProps) {
  let rate = Math.round(rating);
  if (rate > maxStars) rate = maxStars;

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: rate }, (_, i) => (
        <StarIcon key={i + 200} />
      ))}
      {Array.from({ length: maxStars - rate }, (_, i) => (
        <EmptyStarIcon key={i + 100} />
      ))}
    </div>
  );
}
