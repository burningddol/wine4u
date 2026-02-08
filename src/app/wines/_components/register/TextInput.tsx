import { useField } from "formik";
import { cn } from "@/libs/utils";

export default function TextInput({
  label,
  name,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
}) {
  const [field, meta] = useField(name);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <label className="text-md font-medium text-gray-800">{label}</label>
        {meta.touched && meta.error && (
          <span className="text-error text-xs">{meta.error}</span>
        )}
      </div>
      <div className="relative">
        <input
          {...field}
          type={type}
          placeholder={placeholder}
          className={cn(
            "h-11 w-full rounded-sm border border-1 bg-white px-6 text-base outline-none focus:ring-0",
            meta.touched && meta.error ? "border-error" : "border-gray-300",
          )}
        />
        {name === "price" && (
          <span className="absolute top-2.5 right-2.5">₩</span>
        )}
      </div>
    </div>
  );
}
