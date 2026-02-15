import { useRef, useState, useEffect } from "react";
import { useField, useFormikContext } from "formik";
import Image from "next/image";
import { cn } from "@/libs/utils";
import { WineRegisterFormValues } from "../_libs/wineRegisterSchema";

type Props = {
  initialImageUrl: string | null;
  alt?: string;
};

export default function ImageUploadField({
  initialImageUrl,
  alt = "와인 이미지",
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialImageUrl,
  );
  const [_, meta] = useField<File | null>("image");
  const { setFieldValue, setFieldTouched } =
    useFormikContext<WineRegisterFormValues>();

  useEffect(() => {
    setImagePreview(initialImageUrl);
    setFieldValue("image", null, false);
    setFieldTouched("image", false, false);
  }, [initialImageUrl, setFieldValue, setFieldTouched]);

  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (imagePreview?.startsWith("blob:")) URL.revokeObjectURL(imagePreview);
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
              alt={alt}
              className="h-full w-full object-contain"
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
