import { WineType } from "@/types/wines/types";
import { cn } from "@/libs/utils";

const WINE_TYPES: { label: string; value: WineType }[] = [
  { label: "Red", value: "RED" },
  { label: "White", value: "WHITE" },
  { label: "Sparkling", value: "SPARKLING" },
];

interface Props {
  selected?: WineType;
  onSelect: (value: WineType) => void;
  isDesktop: boolean;
}

export default function TypeFilter({ selected, onSelect, isDesktop }: Props) {
  return (
    <section>
      <h3 className="mb-3 text-lg font-bold">타입</h3>
      <div className={cn("flex gap-2", isDesktop && "flex-col")}>
        {WINE_TYPES.map(({ label, value }) => (
          <button
            key={value}
            aria-pressed={value === selected}
            onClick={() => onSelect(value)}
            className={cn(
              "inline-flex w-fit cursor-pointer items-center gap-1.5 self-start rounded-full border px-4 py-2 text-sm whitespace-nowrap",
              value === selected ? "bg-black text-white" : "bg-white",
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}
