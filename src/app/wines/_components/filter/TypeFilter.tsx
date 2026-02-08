import { WineType } from "@/types/wines/types";
import { cn } from "@/libs/utils";
import Image from "next/image";

const WINE_TYPES: { label: string; value: WineType; icon: string }[] = [
  { label: "Red", value: "RED", icon: "/wines/red.png" },
  { label: "White", value: "WHITE", icon: "/wines/white.png" },
  { label: "Sparkling", value: "SPARKLING", icon: "/wines/sparkling.png" },
];

interface Props {
  selected?: WineType;
  onSelect: (value: WineType) => void;
  isDesktop: boolean;
}

export default function TypeFilter({ selected, onSelect, isDesktop }: Props) {
  return (
    <section>
      <h3 className="mb-4 text-lg font-bold">타입</h3>
      <div className={cn("flex gap-2", isDesktop && "flex-col")}>
        {WINE_TYPES.map(({ label, value, icon }) => (
          <button
            key={value}
            aria-pressed={value === selected}
            onClick={() => onSelect(value)}
            className={cn(
              "text-md inline-flex w-fit cursor-pointer items-center gap-1.5 self-start rounded-full border border-gray-300 px-3 py-2 whitespace-nowrap",
              value === selected
                ? "border-black bg-black text-white"
                : "bg-white",
            )}
          >
            <Image
              src={icon}
              alt={label}
              width={20}
              height={20}
              className="rounded-full"
            />
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}
