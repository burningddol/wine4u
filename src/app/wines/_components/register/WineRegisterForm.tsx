"use client";

import { Form, Formik, FormikHelpers } from "formik";
import { useModal } from "@/components/ModalProvider";
import { cn } from "@/libs/utils";
import {
  wineRegisterSchema,
  WineRegisterFormValues,
} from "../../_libs/wineRegisterSchema";
import ImageUploadField from "./ImageUploadField";
import TextInput from "./TextInput";
import WineTypeSelector from "./WineTypeSelector";
import { getImageURL, postWine } from "@/libs/api/wines/getAPIData";
import { useToast } from "@/components/ToastProvider";

export interface PostWineValue {
  name: string;
  region: string;
  image: string;
  price: number;
  type: "RED" | "WHITE" | "SPARKLING";
}

interface WineRegisterFormProps {
  onSuccess?: () => void;
}

export default function WineRegisterForm({ onSuccess }: WineRegisterFormProps) {
  const { onClose } = useModal();
  const { showToast } = useToast();

  const onSubmit = async (
    values: WineRegisterFormValues,
    actions: FormikHelpers<WineRegisterFormValues>,
  ) => {
    try {
      const ImageURL = await getImageURL(values.image);
      if (!ImageURL) throw new Error("이미지 등록 실패");

      const wine: PostWineValue = {
        name: values.name,
        region: values.region,
        image: ImageURL.url,
        price: values.price,
        type: values.type,
      };

      await postWine(wine);

      actions.resetForm();
      onClose();
      showToast("와인을 등록했습니다", "success");
      onSuccess?.();
    } catch (e) {
      console.log(e);
      showToast("등록에 실패했습니다", "error");
    }
  };

  return (
    <Formik<WineRegisterFormValues>
      initialValues={{
        image: null as unknown as File,
        name: "",
        price: 0,
        type: "RED",
        region: "",
      }}
      validationSchema={wineRegisterSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-6">
          <ImageUploadField />
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
              "hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            와인 등록하기
          </button>
        </Form>
      )}
    </Formik>
  );
}
