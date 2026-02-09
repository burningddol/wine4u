// @/libs/api/wineDetail/getAPIData.ts
import axios from "@/libs/api/axios";
import { WineDetail, WineTasteAroma } from "@/types/detail/types";

// WineDetail 타입에 reviews가 포함되어 있다고 확장 (타입 에러 방지)
export interface WineDetailWithReviews extends WineDetail {
  reviews: WineTasteAroma[];
}

export async function getWineDetail(
  id: number,
): Promise<WineDetailWithReviews> {
  const res = await axios.get(`/wines/${id}`);
  return res.data;
}
