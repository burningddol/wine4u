"use client";

import { FormikHelpers } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { FocusTarget } from "./Character";
import Image from "next/image";
import { LoginFormValues, loginSchema } from "../_libs/authSchema";
import { LoginData } from "@/types/auth/types";
import { postLoginData } from "../../../libs/api/auth/getAPIAuth";
import { useToast } from "@/components/ToastProvider";
import { useUser } from "@/components/UserProvider";
import { cn } from "@/libs/utils";
import AuthForm, { FieldConfig } from "./AuthForm";

interface LoginFormProps {
  onFocusChange: (target: FocusTarget) => void;
  onTypingChange: (typing: boolean) => void;
}

const LOGIN_FIELDS: FieldConfig[] = [
  {
    label: "이메일",
    name: "email",
    type: "email",
    placeholder: "codeit@email.com",
    autoComplete: "email",
    focusTarget: "email",
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
];

export default function LoginForm({
  onFocusChange,
  onTypingChange,
}: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useUser();
  const { showToast } = useToast();

  const handleKakaoLogin = () => {
    window.location.href = process.env.NEXT_PUBLIC_KAKAO_AUTH_URL!;
  };

  const onSubmit = async (
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>,
  ) => {
    setIsLoading(true);
    const loginData: LoginData = {
      email: values.email,
      password: values.password,
    };
    try {
      const data = await postLoginData(loginData);
      setUser(data.user);
      showToast("로그인에 성공했습니다", "success");
      router.replace("/");
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || "로그인에 실패했습니다";
      console.log(errorMessage);
      showToast(errorMessage, "error");
    } finally {
      setIsLoading(false);
      actions.resetForm();
    }
  };

  return (
    <AuthForm<LoginFormValues>
      fields={LOGIN_FIELDS}
      initialValues={{ email: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={onSubmit}
      isLoading={isLoading}
      submitLabel="로그인"
      bottomText="처음 방문하셨나요?"
      bottomLinkText="회원가입"
      bottomLinkHref="/signup"
      onFocusChange={onFocusChange}
      onTypingChange={onTypingChange}
      extraButtons={
        <button
          className={cn(
            "mt-2 flex h-14 w-full cursor-pointer",
            "items-center justify-center gap-2 border border-1",
            "rounded-sm bg-white text-xl font-normal text-black",
          )}
          type="button"
          onClick={handleKakaoLogin}
        >
          <Image
            src="/auth/kakao.svg"
            width={24}
            height={24}
            alt="카카오 로고"
          />
          카카오 간편로그인
        </button>
      }
    />
  );
}
