import { cn } from "@/libs/utils";

const RATING_OPTIONS: { label: string; value: number | undefined }[] = [
  { label: "전체", value: undefined },
  { label: "4.5 - 5.0", value: 5 },
  { label: "4.0 - 4.5", value: 4.5 },
  { label: "3.5 - 4.0", value: 4 },
  { label: "3.0 - 3.5", value: 3.5 },
];

interface Props {
  selected?: number;
  onSelect: (value: number | undefined) => void;
}

export default function RatingFilter({ selected, onSelect }: Props) {
  return (
    <section>
      <h3 className="mb-3 text-lg font-bold">평점</h3>
      <div className="flex flex-col gap-3">
        {RATING_OPTIONS.map(({ label, value }) => {
          const isChecked = selected === value;
          return (
            <label
              key={label}
              className="flex cursor-pointer items-center gap-3"
            >
              <button
                onClick={() => onSelect(isChecked ? undefined : value)}
                className={cn(
                  "flex h-5 w-5 cursor-pointer items-center justify-center rounded border",
                  isChecked
                    ? "border-black bg-white"
                    : "border-gray-300 bg-white",
                )}
              >
                {isChecked && (
                  <span className="h-3 w-3 rounded-xs bg-black" />
                )}
              </button>
              <span className="text-base text-gray-800">{label}</span>
            </label>
          );
        })}
      </div>
    </section>
  );
}
