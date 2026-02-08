import { useField, useFormikContext } from "formik";
import Image from "next/image";
import { cn } from "@/libs/utils";
import { WineType } from "@/types/wines/types";
import { WineRegisterFormValues } from "../../_libs/wineRegisterSchema";

const WINE_TYPES: { label: string; value: WineType; icon: string }[] = [
  { label: "Red", value: "RED", icon: "/wines/red.png" },
  { label: "White", value: "WHITE", icon: "/wines/white.png" },
  { label: "Sparkling", value: "SPARKLING", icon: "/wines/sparkling.png" },
];

export default function WineTypeSelector() {
  const [field, meta] = useField<WineType>("type");
  const { setFieldValue } = useFormikContext<WineRegisterFormValues>();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <label className="text-md font-medium text-gray-800">타입</label>
        {meta.touched && meta.error && (
          <span className="text-error text-xs">{meta.error}</span>
        )}
      </div>
      <div className="flex gap-2">
        {WINE_TYPES.map(({ label, value, icon }) => (
          <button
            key={value}
            type="button"
            onClick={() => setFieldValue("type", value)}
            className={cn(
              "flex cursor-pointer items-center gap-1.5 rounded-full border border-gray-300 px-3 py-2 text-sm",
              field.value === value
                ? "border-black bg-black text-white"
                : "bg-white text-black",
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
    </div>
  );
}
