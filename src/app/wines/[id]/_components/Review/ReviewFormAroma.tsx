interface AromaProps {
  selectedAromas: string[];
  onToggleAroma: (aroma: string) => void;
}

const AROMA_LIST = [
  "APPLE",
  "CHERRY",
  "CHOCOLATE",
  "COCONUT",
  "FLOWER",
  "GRAPE",
  "HERB",
  "MINERAL",
  "OAK",
  "ORANGE",
  "PEACH",
  "SOIL",
  "TOAST",
  "TROPICAL",
];

export default function ReviewFormAroma({
  selectedAromas,
  onToggleAroma,
}: AromaProps) {
  return (
    <div className="mt-6">
      <h3 className="mb-3 text-sm font-bold text-gray-800">
        기억에 남는 향이 있나요?
      </h3>
      <div className="flex flex-wrap gap-2">
        {AROMA_LIST.map((aroma) => {
          const isSelected = selectedAromas.includes(aroma);
          return (
            <button
              key={aroma}
              type="button"
              onClick={() => onToggleAroma(aroma)}
              className={`rounded-full border px-4 py-2 text-xs font-bold transition-all ${
                isSelected
                  ? "cursor-pointer border-black bg-black text-white"
                  : "cursor-pointer border-gray-200 bg-white hover:border-gray-400"
              }`}
            >
              {aroma}
            </button>
          );
        })}
      </div>
    </div>
  );
}
