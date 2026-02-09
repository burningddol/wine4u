import WineTasteBar from "./TasteBar";
import { WineTasteAroma } from "@/types/detail/types";

interface Props {
  reviews: WineTasteAroma[];
  layout?: "column" | "grid";
}
export default function TasteBarGroup({ reviews, layout = "column" }: Props) {
  const tasteAverages = {
    body:
      reviews.length > 0
        ? reviews.reduce((acc, cur) => acc + cur.lightBold, 0) / reviews.length
        : 0,
    tannins:
      reviews.length > 0
        ? reviews.reduce((acc, cur) => acc + cur.smoothTannic, 0) /
          reviews.length
        : 0,
    sweetness:
      reviews.length > 0
        ? reviews.reduce((acc, cur) => acc + cur.drySweet, 0) / reviews.length
        : 0,
    acidity:
      reviews.length > 0
        ? reviews.reduce((acc, cur) => acc + cur.softAcidic, 0) / reviews.length
        : 0,
  };

  const containerClass =
    layout === "grid"
      ? "grid grid-cols-2 gap-x-8 gap-y-2" // 2행 2열 (또는 데이터 수에 따라 자동 배치)
      : "flex flex-col gap-2";
  return (
    <div className={containerClass}>
      <WineTasteBar label="바디감" value={tasteAverages.body} />
      <WineTasteBar label="탄닌" value={tasteAverages.tannins} />
      <WineTasteBar label="당도" value={tasteAverages.sweetness} />
      <WineTasteBar label="산미" value={tasteAverages.acidity} />
    </div>
  );
}
