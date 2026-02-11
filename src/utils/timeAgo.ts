// 시간

export function timeAgo(isoString: string, now = new Date()): string {
  const date = new Date(isoString);

  const diff = now.getTime() - date.getTime();

  if (diff < 0) return "방금 전";

  const second = Math.floor(diff / 1000);
  const minute = Math.floor(second / 60);
  const hour = Math.floor(minute / 60);
  const day = Math.floor(hour / 24);
  const week = Math.floor(day / 7);
  const month = Math.floor(day / 30);
  const year = Math.floor(day / 365);

  if (minute < 1) return `${second}초 전`;
  if (hour < 1) return `${minute}분 전`;
  if (day < 1) return `${hour}시간 전`;
  if (week < 1) return `${day}일 전`;
  if (month < 1) return `${week}주 전`;
  if (year < 1) return `${month}개월 전`;
  return `${year}년 전`;
}
