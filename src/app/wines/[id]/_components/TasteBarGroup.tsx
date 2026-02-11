import WineTasteBar from "./TasteBar";
import { WineTasteAroma } from "@/types/detail/types";

interface Props {
  reviews?: WineTasteAroma[];
  values?: {
    body: number;
    tannins: number;
    sweetness: number;
    acidity: number;
  }; // 모달용 (선택적)
  onChange?: (key: string, value: number) => void; // 모달용 콜백
  layout?: "column" | "grid";
}
export default function TasteBarGroup({
  reviews,
  values,
  onChange,
  layout = "column",
}: Props) {
  const tasteAverages = reviews
    ? {
        body:
          reviews.reduce((acc, cur) => acc + cur.lightBold, 0) /
            reviews.length || 0,
        tannins:
          reviews.reduce((acc, cur) => acc + cur.smoothTannic, 0) /
            reviews.length || 0,
        sweetness:
          reviews.reduce((acc, cur) => acc + cur.drySweet, 0) /
            reviews.length || 0,
        acidity:
          reviews.reduce((acc, cur) => acc + cur.softAcidic, 0) /
            reviews.length || 0,
      }
    : null;

  const currentData = values ||
    tasteAverages || { body: 0, tannins: 0, sweetness: 0, acidity: 0 };

  const containerClass =
    layout === "grid"
      ? "grid grid-cols-2 gap-x-10 gap-y-2 " // 리뷰리스트 드롭다운내의 2열 2행
      : "flex flex-col gap-2 ";
  return (
    <div className={containerClass}>
      <WineTasteBar
        label="바디감"
        value={currentData.body}
        onChange={onChange ? (val) => onChange("body", val) : undefined}
      />
      <WineTasteBar
        label="탄닌"
        value={currentData.tannins}
        onChange={onChange ? (val) => onChange("tannins", val) : undefined}
      />
      <WineTasteBar
        label="당도"
        value={currentData.sweetness}
        onChange={onChange ? (val) => onChange("sweetness", val) : undefined}
      />
      <WineTasteBar
        label="산미"
        value={currentData.acidity}
        onChange={onChange ? (val) => onChange("acidity", val) : undefined}
      />
    </div>
  );
}
