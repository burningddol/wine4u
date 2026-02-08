import * as yup from "yup";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const wineRegisterSchema = yup.object({
  image: yup
    .mixed<File>()
    .required("와인 사진을 등록해주세요")
    .test(
      "fileSize",
      "파일 크기는 5MB 이하만 가능합니다",
      (value) => value instanceof File && value.size <= MAX_FILE_SIZE,
    )
    .test("fileName", "파일 이름은 영문 및 숫자만 허용됩니다", (value) => {
      if (!(value instanceof File)) return false;
      const baseName = value.name.replace(/\.[^.]+$/, "");
      return /^[a-zA-Z0-9]+$/.test(baseName);
    }),
  name: yup.string().required("와인 이름을 입력해주세요"),
  price: yup
    .number()
    .typeError("숫자를 입력해주세요")
    .positive("가격은 0보다 커야 합니다")
    .required("가격을 입력해주세요"),
  type: yup
    .string()
    .oneOf(["RED", "WHITE", "SPARKLING"] as const, "와인 타입을 선택해주세요")
    .required("와인 타입을 선택해주세요"),
  region: yup.string().required("원산지를 입력해주세요"),
});

export type WineRegisterFormValues = yup.InferType<typeof wineRegisterSchema>;
