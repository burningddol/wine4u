import { useRef, useState } from "react";
import { useField, useFormikContext } from "formik";
import Image from "next/image";
import { cn } from "@/libs/utils";
import { WineRegisterFormValues } from "../../_libs/wineRegisterSchema";

export default function ImageUploadField() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [_, meta] = useField<File>("image");
  const { setFieldValue, setFieldTouched } =
    useFormikContext<WineRegisterFormValues>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setFieldTouched("image", true, false);
    setFieldValue("image", file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <label className="text-md font-medium text-gray-800">와인 사진</label>
      </div>
      <div className="flex items-end gap-5">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "flex h-35 w-35 cursor-pointer items-center justify-center overflow-hidden rounded-sm bg-gray-100",
            meta.touched && meta.error ? "border-error border" : "",
          )}
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="와인 미리보기"
              className="h-full w-full object-cover"
            />
          ) : (
            <Image
              src="/wines/placeholder.svg"
              width={140}
              height={140}
              alt="플레이스홀더"
            />
          )}
        </button>
        {meta.touched && meta.error && (
          <span className="text-error text-xs">{meta.error}</span>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}
