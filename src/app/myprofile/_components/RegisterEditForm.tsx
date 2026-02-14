"use client";

import Image from "next/image";
import { useModal } from "@/components/ModalProvider";
import { useToast } from "@/components/ToastProvider";
import { Form, Formik, FormikHelpers } from "formik";
import { cn } from "@/libs/utils";
import { getImageURL } from "@/libs/api/wines/getAPIData";

import { MyWineItem, updateWine } from "../_libs/profileApi";

import ImageUploadField from "./ImageUploadField";
import TextInput from "@/app/wines/_components/register/TextInput";

import WineTypeSelector from "@/app/wines/_components/register/WineTypeSelector";
import {
  WineRegisterFormValues,
  wineRegisterSchema,
} from "../_libs/wineRegisterSchema";

export default function RegisterEditForm({
  wine,
  onSuccess,
}: {
  wine: MyWineItem;
  onSuccess: () => void;
}) {
  const { onClose } = useModal();
  const { showToast } = useToast();

  const onSubmit = async (
    values: WineRegisterFormValues,
    actions: FormikHelpers<WineRegisterFormValues>,
  ) => {
    try {
      // const ImageURL = await getImageURL(values.image);
      // if (!ImageURL) throw new Error("이미지 등록 실패");
      // const imageURL = ImageURL.url;

      let nextImageUrl = wine.image ?? "";

      if (values.image instanceof File) {
        const ImageURL = await getImageURL(values.image);
        if (!ImageURL) throw new Error("이미지 등록 실패");
        nextImageUrl = ImageURL.url;
      }

      await updateWine(wine.id, {
        name: values.name,
        region: values.region,
        // image: imageURL ?? undefined,
        image: nextImageUrl ?? undefined,
        price: values.price,
        avgRating: 0,
        type: values.type,
      });

      actions.resetForm();
      onClose();
      showToast("와인을 수정했습니다", "success");
      onSuccess();
    } catch (e) {
      console.log(e);
      showToast("수정에 실패했습니다", "error");
    }
  };

  return (
    <Formik<WineRegisterFormValues>
      initialValues={{
        image: null as any,
        name: wine.name ?? "",
        price: wine.price ?? 0,
        type: (wine.type as any) ?? "RED",
        region: wine.region ?? "",
      }}
      enableReinitialize
      validationSchema={wineRegisterSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-6">
          <div className="relative">
            {/* {wine.image ? (
              <div className="flex h-[140px] w-[140px] flex-col gap-2 p-3">
                <span className="relative block h-full w-full">
                  <Image
                    src={wine.image}
                    alt={wine.name ?? ""}
                    fill
                    className="flex items-center justify-center object-contain"
                    unoptimized={wine.image.startsWith("http")}
                  />
                </span>
              </div>
            ) : null} */}

            <ImageUploadField
              initialImageUrl={wine.image ?? null}
              alt={wine.name ?? ""}
            />
          </div>

          <TextInput
            label="와인 이름"
            name="name"
            placeholder="와인 이름 입력"
          />

          <TextInput label="가격" name="price" type="number" />

          <WineTypeSelector />

          <TextInput label="원산지" name="region" placeholder="원산지 입력" />

          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "mt-4 w-full cursor-pointer rounded-sm bg-black py-3.5 text-sm font-bold text-white",
              "disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            와인 수정하기
          </button>
        </Form>
      )}
    </Formik>
  );
}
