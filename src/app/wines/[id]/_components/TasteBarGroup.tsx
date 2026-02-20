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

  const layoutClass =
    layout === "grid"
      ? "grid grid-cols-1 md:grid-cols-2 md:gap-x-5 md:gap-y-2 " // sm cols 1열씩, md부터 2행2열 그리드
      : "flex flex-col";
  return (
    <div className={`${layoutClass}`}>
      <WineTasteBar
        label="바디감"
        value={currentData.body}
        onChange={onChange ? (val) => onChange("body", val) : undefined}
        layout={layout}
      />
      <WineTasteBar
        label="탄닌"
        value={currentData.tannins}
        onChange={onChange ? (val) => onChange("tannins", val) : undefined}
        layout={layout}
      />
      <WineTasteBar
        label="당도"
        value={currentData.sweetness}
        onChange={onChange ? (val) => onChange("sweetness", val) : undefined}
        layout={layout}
      />
      <WineTasteBar
        label="산미"
        value={currentData.acidity}
        onChange={onChange ? (val) => onChange("acidity", val) : undefined}
        layout={layout}
      />
    </div>
  );
}
