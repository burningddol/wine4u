"use client";

import { FormikHelpers } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { FocusTarget } from "./Character";
import { SignUpFormValues, signUpSchema } from "../_libs/authSchema";
import { SignUpData } from "@/types/auth/types";
import { postSignUpData } from "../../../libs/api/auth/getAPIAuth";
import { useToast } from "@/components/ToastProvider";
import { useUser } from "@/components/UserProvider";
import AuthForm, { FieldConfig } from "./AuthForm";

interface SignUpFormProps {
  onFocusChange: (target: FocusTarget) => void;
  onTypingChange: (typing: boolean) => void;
}

const SIGNUP_FIELDS: FieldConfig[] = [
  {
    label: "이메일",
    name: "email",
    type: "email",
    placeholder: "codeit@email.com",
    autoComplete: "email",
    focusTarget: "email",
  },
  {
    label: "닉네임",
    name: "nickname",
    type: "text",
    placeholder: "닉네임을 입력해주세요",
    autoComplete: "username",
    focusTarget: "nickname",
  },
  {
    label: "비밀번호",
    name: "password",
    type: "password",
    placeholder: "비밀번호를 입력하세요",
    autoComplete: "new-password",
    forPassword: true,
    focusTarget: "password",
  },
  {
    label: "비밀번호 확인",
    name: "confirmPassword",
    type: "password",
    placeholder: "비밀번호를 다시 한 번 입력하세요",
    autoComplete: "new-password",
    forPassword: true,
    focusTarget: "password",
  },
];

export default function SignUpForm({
  onFocusChange,
  onTypingChange,
}: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useUser();
  const { showToast } = useToast();

  const onSubmit = async (
    values: SignUpFormValues,
    actions: FormikHelpers<SignUpFormValues>,
  ) => {
    setIsLoading(true);
    const signUpData: SignUpData = {
      email: values.email,
      nickname: values.nickname,
      password: values.password,
      passwordConfirmation: values.confirmPassword,
    };
    try {
      const data = await postSignUpData(signUpData);
      setUser(data.user);
      showToast("회원가입에 성공했습니다", "success");
      router.replace("/");
    } catch (e: any) {
      const errorMessage =
        e.response?.data?.message || "회원가입에 실패했습니다";
      console.log(errorMessage);
      showToast(errorMessage, "error");
    } finally {
      setIsLoading(false);
      actions.resetForm();
    }
  };

  return (
    <AuthForm<SignUpFormValues>
      fields={SIGNUP_FIELDS}
      initialValues={{
        email: "",
        nickname: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={signUpSchema}
      onSubmit={onSubmit}
      isLoading={isLoading}
      submitLabel="회원가입"
      bottomText="계정이 이미 있으신가요?"
      bottomLinkText="로그인"
      bottomLinkHref="/login"
      onFocusChange={onFocusChange}
      onTypingChange={onTypingChange}
    />
  );
}
