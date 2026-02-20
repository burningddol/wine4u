import { getAromaKR } from "@/utils/getAromaKR";

interface AromaProps {
  selectedAromas: string[];
  onToggleAroma: (aroma: string) => void;
}

const AROMA_LIST = [
  "CHERRY",
  "BERRY",
  "OAK",
  "VANILLA",
  "PEPPER",
  "BAKING",
  "GRASS",
  "APPLE",
  "PEACH",
  "CITRUS",
  "TROPICAL",
  "MINERAL",
  "FLOWER",
  "TOBACCO",
  "EARTH",
  "CHOCOLATE",
  "SPICE",
  "CARAMEL",
  "LEATHER",
];

export default function ReviewFormAroma({
  selectedAromas,
  onToggleAroma,
}: AromaProps) {
  return (
    <div className="">
      <h3 className="mb-4 text-xl font-bold text-gray-800">
        기억에 남는 향이 있나요?
      </h3>
      <div className="flex flex-wrap gap-2 gap-y-3">
        {AROMA_LIST.map((aroma) => {
          const isSelected = selectedAromas.includes(aroma);
          return (
            <button
              key={aroma}
              type="button"
              onClick={() => onToggleAroma(aroma)}
              className={`text-md h-12 rounded-full border px-5 py-2 font-bold transition-all ${
                isSelected
                  ? "cursor-pointer border-black bg-black text-white"
                  : "cursor-pointer border-gray-200 bg-white hover:border-gray-400"
              }`}
            >
              {getAromaKR(aroma)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
